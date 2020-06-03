const express = require('express')
const UserRouter = require("./Users/UserRouter.js")
const AuthRouter = require("./Auth/AuthRouter.js")
const ContactRouter = require("./Contacts/ContactsRouter.js")

const connectDB =require("../config/db.js")

const app = express()

app.use(express.json())

//connect db
connectDB();

//routers for app
app.use('/users', UserRouter)
app.use('/auth', AuthRouter )
app.use('/contact', ContactRouter)

app.get('/',(req,res)=>{
    res.json({message:`so happy to see you`})
})



module.exports = app;