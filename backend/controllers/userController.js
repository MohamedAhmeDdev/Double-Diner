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
  const { email, password } = req.body;
  const foundUser = await users.findOne({ where: { email: email } }) // find email and password in database

  if (!email || !password) // if there is no email & password send status 400
  return res.sendStatus(400); 

  if (!foundUser){ // if the email and password does not much send 401
    return res.sendStatus(401)
  }

  const dbPassword = foundUser.password;  // find HashPassword in database
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
        return res.sendStatus(401)
    } else {
      return res.json({ 'message': 'success' })
    }
  });
};


  

module.exports = {
    createUsers,
    verifyUser
}

