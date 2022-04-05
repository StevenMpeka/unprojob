const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const BidPostSchema = new mongoose.Schema({
    
    body:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},{timestamps:true})

mongoose.model("BidPost",BidPostSchema)