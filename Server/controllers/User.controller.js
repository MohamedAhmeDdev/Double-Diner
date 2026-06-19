const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const User = require("../models/User.model");
const nodemailer = require('nodemailer')
const dotenv = require("dotenv");
dotenv.config();

const createToken = (id, name, email) => {
  return JWT.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    JWT_SECRET, { expiresIn: "1d" }
  );
};

// signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

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
    });

    const token = createToken(user.id, user.name, user.email);
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
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

// login
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

    const token = createToken(foundUser.id, foundUser.name, foundUser.email);
    return res.status(200).json({
      success: true,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        token: token,
        role: foundUser.role,
        userStatus: foundUser.userStatus,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// for changing role - admin
const updateRole = async (req, res) => { 
  try {
    const updatedUser = await User.update(req.body, { where: { id: req.params.id} });
    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// for changing username or password and activate 
const updateDetails = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, { where: { id: req.params.id}});
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
  try {
    const users = await User.findAll();
    return res.status(200).json({
      success: true,
      users: users.filter((user) => user.role !== "admin"),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { id: id } });
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

// FORGOT PASSWORD (FIXED FOR RENDER & GMAIL)
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

    // Explicit configurations bypasses Render's general port 25 filters
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Use 465 (SSL) or 587 (TLS). Do not rely on service: 'gmail' defaults
      secure: true, 
      auth: {
        user: process.env.USER,
        pass: process.env.PASS, // MUST BE A 16-DIGIT GMAIL APP PASSWORD
      },
    });

    const mailOption = {
      from: process.env.USER,
      to: user.email,
      subject: "Forgot password link",
      html: `<p>You requested a password reset. Click the link below to proceed (expires in 5 mins):</p>
             <a href="https://double-diner.netlify.app/resetPassword/${user.id}">Forgot Password</a>`
    };
    
    // Converted to modern async/await syntax to stop hanging errors
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
    await User.update({ password: encryptPassword }, { where: { id: req.params.id } });
    
    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// delete user by id - admin
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } 

    await User.destroy({ where: { id: id } });
    return res.status(200).json({
      success: true,
      user: { id: user.id },
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