const users = require("../models/userModel.js")
const bcrypt = require('bcrypt')

const createUsers = async (req, res) => {
    const {name, email, password } = req.body
    const checkingIfEmailExists = await users.findOne({ where: { email: email } })   // find email in database
    const encryptPassword =  await bcrypt.hash(password, 10)

        if (checkingIfEmailExists) {  // if the email much send 401
            return res.sendStatus(401)
        } else {
            try {
               const user = users.create({
                    name: name,
                    email: email,
                    password: encryptPassword
                });
                console.log(name, email, password );
                res.json({});
            } catch (error) {
                res.json({ message: error.message });
            }
        }
        
}


const verifyUser = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) // if there is no email & password send status 400
   return res.sendStatus(400);  

  const foundUser = await users.findOne({ where: { email: email } }) // find email and password in database

  if (!foundUser && (await bcrypt.compare(password, foundUser.password))){ // if the email and password does not much send 401
    return res.sendStatus(401)
  }else{
    return res.json({ 'message': 'success' })
  }
}

  

module.exports = {
    createUsers,
    verifyUser
}

