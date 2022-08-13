import user from "../models/userModel.js";


export const verifyUser = async(req, res) => {
   console.log(req.body);
   const { email, password}  = req.body

   if (!email || !password) return res.sendStatus(400);

   const foundUser = await user.findOne({where: { email: email, password: password }})

   if (!foundUser) {
   return  res.sendStatus(401)            
   }else{
    return res.json({'message': 'success'})
   }
}
 