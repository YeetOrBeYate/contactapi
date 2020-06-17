const express = require('express')
const cors = require('cors')
const UserRouter = require("./Users/UserRouter.js")
const AuthRouter = require("./Auth/AuthRouter.js")
const ContactRouter = require("./Contacts/ContactsRouter.js")

const connectDB =require("../config/db.js")

const app = express()

app.use(express.json())
app.use(cors())

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