const express = require('express')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
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

    const {name, email, password} = req.body;

    try {

        let user = await Usermodel.findOne({email:email})
        if(user){
            res.status(406).json({message:'Email already in use'})
        }

        user = new Usermodel({
            name,
            email,
            password
        })

        let salt = await bcrypt.genSalt(11)

        user.password = await bcrypt.hash(password,salt);

        await user.save();

        res.status(200).json({message:'user saved'})
    }catch(error) {
        console.error(err.message)
        res.status(500).json({message:'server error'})
    }
})


module.exports = router