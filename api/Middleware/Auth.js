const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = (req,res,next)=>{
    const token = req.header('authorization')

    if(!token){
       return res.status(417).json({message:"Token not found"}) 
    }

    jwt.verify(token, config.get('jwtSecret'), function(err,decoded){
        
        if(err){
            return res.status(417).json({message:'Token is invalid'})
        }else{
            req.user = decoded.user
            next()
        }
    })
}