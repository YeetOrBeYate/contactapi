const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    //user is the 'foreign key'
    //type is pointed to another schema's generated object id
    //you establish the relationship buy pointing to the schema name *FOUND ON THE MONGO WEBSITE*
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        //doesnt need to be unique because youre not keeping tables in 3NF. Its wierd but you'll get used to it
    },
    phone:{
        type:String
    },
    type:{//I guss there are no key words?
        type:String,
        default:'personal'
    },
    date:{
        type:Date,
        default: Date.now
    }

});

module.exports = mongoose.model('contact', ContactSchema)