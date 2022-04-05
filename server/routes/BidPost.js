const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const BidPost =  mongoose.model("BidPost")


router.get('/allbid',requireLogin,(req,res)=>{
    BidPost.find()
    .populate("postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
  })
  
router.post('/bidpost',requireLogin,(req,res)=>{
    const {body,phone} = req.body 
    if(!body ||!phone ){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const bid = new BidPost({
        body,
        phone,
        postedBy:req.user
    })
    bid.save().then(result=>{
        res.json({bid:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router