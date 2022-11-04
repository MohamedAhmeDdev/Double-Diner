const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



const requireAuth = async (req,res,next) => {
    // verify authentication
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({error : 'authorization token required '})
    }
 
    const token = authorization.split(' ')[1]
    try {
    //   const {id} =   jwt.verify(token , process.env.SECRET)
      const { id } = jwt.verify(token, process.env.SECRET)
    //   req.user = await User.findOne({id}).select('Id')
      req.user = await User.findOne({ id }).select('id')
      next()
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'request is not auhorized'})
    }
}

module.exports = requireAuth