const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const BlogPost =  mongoose.model("BlogPost")




router.get('/allblogpost',requireLogin,(req,res)=>{
  BlogPost.find()
  .populate("postedBy","_id name")
  .sort('-createdAt')
  .then((posts)=>{
      res.json({posts})
  }).catch(err=>{
      console.log(err)
  })
  
})

router.post('/createblogpost',requireLogin,(req,res)=>{
  const {title,desc,image} = req.body 
  if(!title || !desc || !image){
    return  res.status(422).json({error:"Plase add all the fields"})
  }
  req.user.password = undefined
  const post = new BlogPost({
      title,
      desc,
      image,
      postedBy:req.user
  })
  post.save().then(result=>{
      res.json({post:result})
  })
  .catch(err=>{
      console.log(err)
  })
})

router.get('/myblogpost',requireLogin,(req,res)=>{
  BlogPost.find({postedBy:req.user._id})
  .populate("postedBy","_id name")
  .then(mypost=>{
      res.json({mypost})
  })
  .catch(err=>{
      console.log(err)
  })
})

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new BlogPost(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("BlogPost has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/myblogpost:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await BlogPost.find({ username });
    } else if (catName) {
      posts = await BlogPost.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await BlogPost.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;