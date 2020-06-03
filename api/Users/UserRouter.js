const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

const model = require('./UserModel.js')

// post
// Used for register a user
// Public access
router.post('/',[
    check('name', "Please add name").not().isEmpty(),
    check('email', "Please include valid email").isEmail(),
    check('password', "Please include a password with 6 or more characters").isLength({min: 6})
],(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    res.send("passed")
})


module.exports = router