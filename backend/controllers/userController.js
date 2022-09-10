const db = require('../models')
const users = db.users


const createUsers = async (req, res) => {
    const {email} = req.body
    const checkingIfEmailExists = await users.findOne({where:{email:email}})

    if(checkingIfEmailExists){
        return res.sendStatus(401)
    }else{
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
 
