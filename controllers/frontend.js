const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

router.get("/", (req,res) => {
  Post.findAll({
    include: [User]
  }).then(postData => {
    console.log(postData)
    const hbsPost = postData.map(post => post.toJSON())
    console.log('==============================')
    console.log(hbsPost)
    res.render("home", {
      allPosts: hbsPost
    })
  })
})

router.get("/login", (req,res) => {
    res.render("login")
})

router.get("/signup",(req,res) => {
    res.render("signup")
})

router.get("/",(req,res) => {
  res.render("home")
})

router.get("/profile",(req,res) => {
  if(!req.session.userId){
    return res.redirect("/login")
  }
  User.findByPk(req.session.userId,{
    include:[Post]
  }).then(userdata=>{
    console.log(userdata)
    const hbsData = userdata.toJSON();
    console.log('==============================')
    console.log(hbsData)
    res.render("profile",hbsData)
  })
});

module.exports = router;