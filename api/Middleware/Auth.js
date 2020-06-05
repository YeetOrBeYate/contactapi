const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = (req,res,next)=>{
    let Userid = req.params.Userid
    const token = req.header('authorization')

    if(!token || !Userid){
       return res.status(417).json({message:"Token or Userid not found"}) 
    }

    jwt.verify(token, config.get('jwtSecret'), function(err,decoded){
        
        if(err){
            return res.status(417).json({message:'Token is invalid'})
        }else{
            req.user = decoded.user
            // console.log(decoded.user.id, "===", Userid)
            if(decoded.user.id === Userid){
                // console.log('will advance')
                next()
            }else{
                res.status(401).json({message:'Userid and token do not match'})
            }
        }
    })
}