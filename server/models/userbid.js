const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userbidSchema = new mongoose.Schema({
    userId:{
        type:String,
        ref:"user"
    },
    items:[{
        jobId:{
            type:String,
            ref:"item"
        },
        name:{
            type:String,
        },
    }],
   
    desc:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
   
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("Userbid",userbidSchema)