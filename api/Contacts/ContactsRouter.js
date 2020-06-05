const express = require('express')
const AuthMiddle = require('../Middleware/Auth.js')
const { check, validationResult } = require('express-validator');

const ContactModel = require("./ContactModel.js")
const UserModel = require("../Users/UserModel.js")
const router = express.Router()


// get all contacts per user
// private access
//////////////////////////////////////alter route to check param===token.id
router.get('/:Userid', AuthMiddle, async (req,res)=>{


    let Userid = req.params.Userid

    try{

        let contacts = await ContactModel.find({user:Userid}).sort({date:-1})
        
        return res.status(200).json({contacts})
        
    }catch(err){
        console.error(err.message)
        res.status(500).json({message:'server error'})
    }
    
})

// add contact
// private access
//////////////////////////////////////alter route to check param===token.id
router.post('/:Userid', AuthMiddle, [
    check('name', "Please add name").not().isEmpty(),
    check('email','Please add email').isEmail()
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, phone, type} = req.body
    let Userid = req.params.Userid

    try{
        const newContact = new ContactModel({
            name,
            email,
            phone,
            type,
            user:Userid
        })
        //putting the saved contact in a variable to send back
        const contact = await newContact.save()

        return res.status(200).json({message:'contact saved',contact})
    }catch(err){
        contact.error(err.message)
        return res.status(500).json({message:'server error'})
    }

})

// edit contact by contact id
// private access
///////////////////////////////also add another user parameter here to avoid multiple database calls
router.put('/:Userid/:id', AuthMiddle, async(req,res)=>{

    let id = req.params.id
    let Userid = req.params.Userid
    // const {name, email, phone, type} = req.body;
    let body = req.body

    //you dont need to build a object
    // //build object
    // const contactFields = {}
    // if(name) contactFields.name = name;
    // if(email) contactFields.email = email;
    // if(phone) contactFields.phone = phone;
    // if(type) contactFields.type = type;

    try{
        //getting the contact saved in the database
        let contact = await ContactModel.findById(id)
        if(!contact){
            return res.status(404).json({message:'contact not found'})
        }
        //checking to see if the user actually owns the contact
        if(contact.user.toString()!== Userid){
            return res.status(401).json({message:'hacker!'})
        }

        contact = await ContactModel.findByIdAndUpdate(id, {$set: body}, {new:true})

        res.status(200).json({message:'update complete', contact})


        
    }catch(err){
        console.error(err.message)
        return res.status(500).json({message:"server error"})
    }
})

// delete contact by contact id
// private access
///////////////////////////////also add another user parameter here to avoid multiple database calls
router.delete('/:Userid/:id', AuthMiddle, async (req,res)=>{

    let id = req.params.id
    let Userid = req.params.Userid
    

    try{
        //see if contact exists
        let contact = await ContactModel.findById(id)
        if(!contact){
            return res.status(404).json({message:'contact not found'})
        }
        //see if we own it
        if(contact.user.toString()!== Userid){
            return res.status(401).json({message:'hacker!'})
        }

        await ContactModel.findByIdAndRemove(id)

        res.status(200).json({message:'contact deleted'})

    }catch(err){
        console.error(err.message)
        return res.status(500).json({message:"server error"})
    }
})



module.exports = router