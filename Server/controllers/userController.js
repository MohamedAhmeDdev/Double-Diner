const users = require("../models/userModel.js")
const staff = require("../models/StaffModel.js")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv'); dotenv.config()


const createToken = (id, name, email) => {
  return JWT.sign({ 
    id: id,
    name:name,
    email: email,
   }, process.env.SECRET, { expiresIn: '3d' })
}

const createUsers = async (req, res) => {
  const { name, email, password } = req.body
  const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  const checkingIfEmailExists = await users.findOne({ where: { email: email } })   // find email in database
  const encryptPassword = await bcrypt.hash(password, 10)


  if (name.length === 0 || email.length === 0 || password.length < 4 || !regEx.test(email)) {
    return res.sendStatus(400)
  }

  if (checkingIfEmailExists) {  // if the email much send 401
    return res.sendStatus(401)
  } else {
    try {
      const user = users.create({
        name: name,
        email: email,
        password: encryptPassword
      });
      const token = createToken(user)
      res.status(200).json({ email, password, token })
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}


const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await users.findOne({ where: { email: email } }) // find email and password in database

  if(!email || !password){
    return res.sendStatus(400)
  }

  if (!foundUser) { // if the email and password does not much send 401
    return res.sendStatus(401)
  }

  const dbPassword = foundUser.password;  // find HashPassword in database
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      return res.sendStatus(401)
    } else {
      const token = createToken(foundUser)
      res.status(200).json({foundUser,password, token })
    }
  });
};



// ------admin----
const verifyAdmin = async (req, res) => {
  const { fullName, department } = req.body;

  const findAdmin = await staff.findOne({ where: { fullName: fullName, department: 'Manager' } })

  if (!fullName || !department)
    return res.sendStatus(400);

  if (!findAdmin) {
    return res.sendStatus(401)
  } else {
    const token = createToken(findAdmin.id)
    res.status(200).json({ fullName, department, token })
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


const updateUser = async (req, res) => {
  const { name, password, confirmPassword } = req.body
  const encryptPassword = await bcrypt.hash(password, 10)

  if (name.length === 0 || confirmPassword.length === 0 || password.length < 4 ) {
    return res.sendStatus(400)
  }

   
  if(password === confirmPassword){
    res.json({ message: "correct" });
  }else{
    return res.sendStatus(401)
}


  try {
    let userUpdate = {
      name: name,
      password: encryptPassword
    }
      await users.update(userUpdate, {
          where: { id: req.params.id}
      });
      res.json({"message": "Updated"});
  } catch (error) {
      res.json({ message: error.message });
  }


}



module.exports = {
  createUsers,
  verifyUser,
  verifyAdmin,
  getUsers,
  updateUser
}

