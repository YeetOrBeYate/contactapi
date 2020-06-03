const express = require('express')

const router = express.Router()


// get all contacts per user
// private access
router.get('/', (req,res)=>{
    res.send('get all contacts')
})

// add contact
// private access
router.post('/', (req,res)=>{
    res.send('add contact')
})

// edit contact by contact id
// private access
router.put('/:id', (req,res)=>{
    res.send('update contact')
})

// delete contact by contact id
// private access
router.delete('/:id', (req,res)=>{
    res.send('delete contact')
})



module.exports = router