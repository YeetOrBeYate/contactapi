const express = require('express')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()

const Usermodel = require('./UserModel.js')

// post
// Used for register a user
// Public access
router.post('/',[
    // isEmpty returns true for the asertion that something is empty, so not() isEmpty() checks the opposite for that asertion:false
    check('name', "Please add name").not().isEmpty(),
    check('email', "Please include valid email").isEmail(),
    check('password', "Please include a password with 6 or more characters").isLength({min: 6})
],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //destructure the req body BEFORE the try catch
    const {name, email, password} = req.body;

    try {
        //Check to see if the user exists
        let user = await Usermodel.findOne({email:email})
        if(user){
            return res.status(406).json({message:'Email already in use'})
        }

        //contructing a user according to our model
        user = new Usermodel({
            name,
            email,
            password
        })

        //Using brypt to salt and hash password
        let salt = await bcrypt.genSalt(11)
        user.password = await bcrypt.hash(password,salt);

        //saving the user in our database
        await user.save();

        //making a payload for our jwt token
        const payload = {
            user:{
                id:user.id //I know we dont have id in out schema but this id is generated when making a new document
            }
        }

        //Making the token and sending it to the client
        jwt.sign(payload,config.get('jwtSecret'), {
            expiresIn: 360000
        },(err,token)=>{
            if(err){
                throw err;
            }else{
                res.status(200).json({message:'user saved',token})
            }
        })

    }catch(error) {
        console.error(err.message)
        res.status(500).json({message:'server error'})
    }
})


module.exports = router