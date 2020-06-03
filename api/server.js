const express = require('express')
const UserRouter = require("./Users/UserRouter.js")
const AuthRouter = require("./Auth/AuthRouter.js")
const ContactRouter = require("./Contacts/ContactsRouter.js")

const app = express()

app.use(express.json())

app.use('/users', UserRouter)
app.use('/auth', AuthRouter )
app.use('/contact', ContactRouter)

app.get('/',(req,res)=>{
    res.json({message:'happy to see you'})
})



module.exports = app;