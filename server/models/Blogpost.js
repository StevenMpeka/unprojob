const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc: {
        type: String,
        required: true,
      },
    image:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
     }
},{timestamps:true})

mongoose.model("BlogPost",BlogSchema)