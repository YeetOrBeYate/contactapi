const express = require('express')

const router = express.Router()

// post
// Used for register a user
// Public access
router.post('/',(req,res)=>{
    res.send('register a user lol')
})


module.exports = router