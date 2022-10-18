const users = require("../models/userModel.js")
const staff = require("../models/StaffModel.js")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv'); dotenv.config()


const createToken = (id) => {
  return JWT.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}

const createUsers = async (req, res) => {
  const { name, email, password } = req.body
  const checkingIfEmailExists = await users.findOne({ where: { email: email } })   // find email in database
  const encryptPassword = await bcrypt.hash(password, 10)


  if (checkingIfEmailExists) {  // if the email much send 401
    return res.sendStatus(401)
  } else {
    try {
      const user = users.create({
        name: name,
        email: email,
        password: encryptPassword
      });
      const token = createToken(user.id)
      res.status(200).json({ email, token })
    } catch (error) {
      res.json({ message: error.message });
    }
  }

}


const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await users.findOne({ where: { email: email } }) // find email and password in database

  if (!email || !password) // if there is no email & password send status 400
    return res.sendStatus(400);

  if (!foundUser) { // if the email and password does not much send 401
    return res.sendStatus(401)
  }

 

  const dbPassword = foundUser.password;  // find HashPassword in database
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      return res.sendStatus(401)
    } else {
      const token = createToken(foundUser.id)
      res.json({ 'message': 'success' })
    }
  });
};


const verifyAdmin = async (req, res) => {
  const {fullName, department} = req.body;

  const findAdmin = await staff.findOne({ where: { fullName: fullName, department: 'Manager' || 'Supervisor' } })

  if (!fullName || !department) 
    return res.sendStatus(400);

  if (!findAdmin) { 
    return res.sendStatus(401)
    } else {
        const token = createToken(findAdmin.id)
        res.json({'message': 'success'})
    }
};


const getUsers = async (req, res) => {
  try {
    const user = await users.findAll();
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
}



module.exports = {
  createUsers,
  verifyUser,
  verifyAdmin,
  getUsers
}

