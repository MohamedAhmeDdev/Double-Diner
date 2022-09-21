const users = require("../models/userModel.js")


const createUsers = async (req, res) => {
    const { email } = req.body
    const checkingIfEmailExists = await users.findOne({ where: { email: email } })   // find email in database

    if (checkingIfEmailExists) {  // if the email much send 401
        return res.sendStatus(401)
    } else {
        try {
            await users.create(req.body);
            res.json({});
        } catch (error) {
            res.json({ message: error.message });
        }
    }
}


module.exports = {
    createUsers
}

