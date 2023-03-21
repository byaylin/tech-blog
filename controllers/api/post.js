const express = require('express');
const router = express.Router();
const { User,Post } = require('../../models');

router.get("/",(req,res) => {
  Post.findAll().then(postData => {
    res.json(postData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
})
router.get("/:id", (req,res) => {
  Post.findByPk(req.params.id, {
    include:[User, Comment]
  }).then(postData => {
    res.json(postData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
})

router.post("/",(req,res) => {
  if(!req.session.userId){
    return res.status(403).json({msg:"please login to complete this action"})
  }
  console.log(req.body);
  Post.create({
    UserId: req.session.userId,
    title: req.body.title,
    post: req.body.post,
  }).then(postData => {
    res.json(postData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
})

router.delete("/:id",(req,res) => {
  if(!req.session.userId){
    return res.status(403).json({msg:"login first to post"})
  }
  console.log(req.body);
  Post.findByPk(req.params.id).then(postData => {
    if(!postData) {
      return res.status(404).json({msg:"hmmm... that post does not exist"})
    } else if(postData.UserId !== req.session.userId) {
      return res.status(403).json({msg:"oops not your post"})
    }
    Post.destroy({
      where:{
        id: req.params.id,
      }
    }).then(postData => {
      res.json(postData)
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg:"oops",err})
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
});

module.exports = router;