const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const BidPost =  mongoose.model("BidPost")
const Userbid = mongoose.model("Userbid")



router.get('/userbid/:id',requireLogin,(req,res)=>{
    Userbid.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         BidPost.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User bid not found"})
    })
})

module.exports = router
