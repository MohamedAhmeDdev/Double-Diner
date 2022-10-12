const admin = require("../models/AdminModel.js")
const staff = require("../models/StaffModel.js")
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv'); dotenv.config()


const createToken = (id) => {
  return JWT.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}


const verifyAdmin = async (req, res) => {
  const {fullName, department} = req.body;

  const findAdmin = await staff.findOne({ where: { fullName: fullName, department: 'Manager', department: 'Supervisor' } })

  if (!fullName || !department) 
    return res.sendStatus(400);

  if (!findAdmin) { 
    return res.sendStatus(401)
    } else {
        const token = createToken(findAdmin.id)
        res.json({'message': 'success'})
    }

};



const getAdmin = async (req, res) => {
  try {
    const user = await admin.findAll();
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
}



module.exports = {
  verifyAdmin,
  getAdmin
}

