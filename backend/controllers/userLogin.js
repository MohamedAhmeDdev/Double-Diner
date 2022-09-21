const users = require("../models/userModel.js")

const verifyUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body

  if (!email || !password) return res.sendStatus(400);  // if there is no email & password send status 400

  const foundUser = await users.findOne({ where: { email: email, password: password } }) // find email and password in database

  if (!foundUser) { // if the email and password does not much send 401
    return res.sendStatus(401)
  } else {
    return res.json({ 'message': 'success' })
  }
}


module.exports = {
  verifyUser
}

