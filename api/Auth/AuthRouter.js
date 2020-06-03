const express = require('express')

const router = express.Router()

// get
// used to get a logged in user
// private access
router.get('/', (req,res)=>{
    res.send('get the logged in user')
})

// post
// used to login the user
// public access
router.post('/', (req,res)=>{
    res.send('login the user')
})


module.exports = router