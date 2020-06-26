const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config()
const db = process.env['connect']
// const db = config.get('mongoURI')

const connectDB = ()=>{
    mongoose.connect(db,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify:false
    })
    .then(()=>{
        console.log('mongodb Connected')
    })
    .catch(err=>{
        console.error(err.message)
        process.exit(1);
    })
}

module.exports=connectDB