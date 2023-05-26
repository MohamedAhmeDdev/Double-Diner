const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const User = require("../models/User.model");
const nodemailer =require('nodemailer')
const dotenv = require("dotenv");
dotenv.config();

const createToken = (id, name, email) => {
  return JWT.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    JWT_SECRET,{ expiresIn: "1d" }
  );
};



//signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const encryptPassword = await bcrypt.hash(password, 10);

  const checkingIfEmailExists = await User.findOne({ where: { email: email } }); // find email in database
  if (checkingIfEmailExists) {
    // if the email much send 401
    return res.status(401).json({
      success: false,
      message: "Email already exists",
    });
  } else {
    try {
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
      return res.json({ message: error.message });
    }
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username or password is missing",
    });
  }

  // find email and password in database
  const foundUser = await User.findOne({ where: { email: email } });
  // if the email  does not exist
  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: "Invalid login credentials",
    });
  }

  // compare password
  const dbPassword = foundUser.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    } else {
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
    }
  });
};



// for changing role - admin
const updateRole = async (req, res) => { 
  
  try {
 const updatedUser =  await User.update(req.body, { where: {  id: req.params.id} });
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};



// for changing username or password and activate 
const updateDetails = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, { where: { id: req.params.id}})
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};



//Get all users  except admins 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      users: users.filter((user) => user.role !== "admin"),
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};


// get user by  
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
    } else {
      return res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};



const forgotPassword = async(req,res)=>{
  const { email} = req.body;
  
  try {
    if (!email ) {
      return res.status(40).json({
        success: false,
        message: "Email Does Not Exist",
      });
    }
      
    const user = await User.findOne({ where: { email: email } });
    if(!user){
      res.status(404).json({msg:'email does not  exists'})
      
    }else{
    //create a nodeMailer Transport
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user: process.env.USER,
        pass: process.env.PASS ,

      }
    })
    //email option 
    const mailOption={
      to:`${user.email}`,
      subject:"Forgot password link",
      html:'<p>You requested for reset password, You have this email because you have request to recover your account Click on the following link bellow to proceed the link will expire in 5 min <a href="https://double-diner-user.vercel.app/resetPassword/' + user.id + '">Forgot Password</a> if you did not request this please ignore this email and your password will remain the same</p>'
    }
    
    transporter.sendMail(mailOption,(err ,response)=>{
      if(err){
        console.log('There was an error',err);
      }else{
        console.log('There was a response ',response);
        res.status(200).json('recovery email sent ')
      }
     })
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }

}

const resetPassword =async(req,res)=>{
  const { password ,confirm_password} = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);

  if(password === confirm_password){
    console.log("Password Muches")
  }else{
    return res.status(400).json({
      success: false,
      message: "Password Does Not Much",
    });
  }

  try {
    const updatedUser = await User.update({password: encryptPassword}, { where: { id: req.params.id}})
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
}


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
    } else {
      await User.destroy({ where: { id: id } });

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
        },
      });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
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
