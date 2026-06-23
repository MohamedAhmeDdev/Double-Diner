const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const User = require("../models/User.model");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

// Helper to create token (Using user_id)
const createToken = (user_id, name, email) => {
  return JWT.sign(
    {
      id: user_id,
      name: name,
      email: email,
    },
    JWT_SECRET, 
    { expiresIn: "1d" }
  );
};

// SIGNUP
const signup = async (req, res) => {
  const { name, email, password, phone, address, city } = req.body;  

  try {
    const encryptPassword = await bcrypt.hash(password, 10);
    const checkingIfEmailExists = await User.findOne({ where: { email: email } }); 
    
    if (checkingIfEmailExists) {
      return res.status(401).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: encryptPassword,
      phone: phone,
      city: city,
      address:address
    });

    const token = createToken(user.user_id, user.name, user.email);
    return res.status(200).json({
      success: true,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        token: token,
        role: user.role,
      },
    });
  } catch (error) {    
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username or password is missing",
    });
  }

  try {
    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    const token = createToken(foundUser.user_id, foundUser.name, foundUser.email);
    return res.status(200).json({
      success: true,
      user: {
        id: foundUser.user_id,
        name: foundUser.name,
        email: foundUser.email,
        token: token,
        role: foundUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE ROLE (ADMIN ONLY)
const updateRole = async (req, res) => { 
  const { id } = req.params;
  try {
    await User.update(req.body, { where: { user_id: id } });
    const updatedUser = await User.findOne({ where: { user_id: id } });
    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER DETAILS
const updateDetails = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await User.update(req.body, { where: { user_id: id } });
    const updatedUser = await User.findOne({ where: { user_id: id } });

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all users except admins 
const getAllUsers = async (req, res) => {
  console.log("gyfgv");
  
  try {
    const users = await User.findAll();
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { user_id: id } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } 
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// FORGOT PASSWORD
const forgotPassword = async(req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
    
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email does not exist' });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, 
      secure: true, 
      auth: {
        user: process.env.USER,
        pass: process.env.PASS, 
      },
    });

    const mailOption = {
      from: process.env.USER,
      to: user.email,
      subject: "Forgot password link",
      html: `<p>You requested a password reset. Click the link below to proceed (expires in 5 mins):</p>
             <a href="https://double-diner.netlify.app/resetPassword/${user.user_id}">Forgot Password</a>`
    };
    
    await transporter.sendMail(mailOption);
    return res.status(200).json({ success: true, message: 'Recovery email sent successfully' });

  } catch (error) {
    console.error("Mail Error: ", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// RESET PASSWORD
const resetPassword = async(req, res) => {
  const { password, confirm_password } = req.body;

  if (!password || !confirm_password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    const encryptPassword = await bcrypt.hash(password, 10);
    await User.update({ password: encryptPassword }, { where: { user_id: req.params.id } });
    
    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE USER BY ID (ADMIN ONLY)
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { user_id: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } 

    await User.destroy({ where: { user_id: id } });
    return res.status(200).json({
      success: true,
      user: { id: user.user_id },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  login,
  signup,
  forgotPassword,
  resetPassword,
  updateRole,
  updateDetails,
  getAllUsers,
  getUserById,
  deleteUserById,
};