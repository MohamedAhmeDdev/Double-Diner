import user from "../models/userModel.js";


export const createUsers = async (req, res) => {
    const {email} = req.body
    const checkingIfEmailExists = await user.findOne({where:{email:email}})

    if(checkingIfEmailExists){
        return res.sendStatus(401)
    }else{
        try {
            await user.create(req.body);
            res.json({});
        } catch (error) { 
            res.json({ message: error.message });
        } 
    
    }
}



 
