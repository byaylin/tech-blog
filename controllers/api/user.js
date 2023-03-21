const express = require('express');
const router = express.Router();
const { User,Post } = require('../models');
const bcrypt = require("bcrypt");
//const saltRounds = 10;

router.get("/", (req,res) => {
  User.findAll().then(userData => {
    res.json(userData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
})

router.get("/logout", (req,res) => {
  req.session.destroy();
  res.send("logged out")
})

router.get("/:id", (req,res) => {
  User.findByPk(req.params.id, {
    include: [Post]
  }).then(userData => {
    res.json(userData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
})

router.post("/",(req,res) => {
    console.log(req.body);
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(userData => {
    req.session.userId= userData.id;
    req.session.username= userData.username;
    res.json(userData)
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg:"oops",err})
  })
})

router.post("/login", (req,res) => {
  User.findOne({
  where:{
    email:req.body.email
  }
}).then(userData=>{
  if(!userData){
    return res.status(401).json({msg:"wrong username or password"})
  } else {
    if(bcrypt.compareSync(req.body.password, userData.password)){
      req.session.userId= userData.id;
      req.session.username= userData.username;
          return res.json(userData)
        } else {
          return res.status(401).json({msg:"wrong username or password"})
        }
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg:"oh noes!",err})
   })
});

module.exports = router;