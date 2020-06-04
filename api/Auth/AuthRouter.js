const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const { check, validationResult } = require('express-validator');

const Usermodel = require("../Users/UserModel.js")
const Authware = require("../Middleware/Auth.js")


// get
// used to get a logged in user
// private access
router.get('/', Authware, async (req,res)=>{


    let id = req.user.id

    try{

        const user = await Usermodel.findById(id).select('-password')
        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        return res.status(200).json(user)

    }catch(err){
        console.error(err.message);
        res.status(500).json({message:'server error'});
    }
})

// post
// used to login the user
// public access
router.post('/',[
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please include password').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors:errors.array()})
    }
    const {email, password} = req.body;
    try{
        //first making sure the user exists
        let user = await Usermodel.findOne({email});
        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        //second comparing the hashed password from our found user to the one given to use from the request
        let match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).json({message:'wrong password'})
        }

        //now we make another token to send back to the user
        let payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn: 360000
        },(err,token)=>{
            if (err){
                throw err
            }else{
                res.status(200).json({message:'login successful', token})
            }
        })

        
    }catch(err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})


module.exports = router