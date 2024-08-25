const express = require("express");

const {handleGetSignUp,handlePostSignUp,handleGetLogin,handlePostLogin}=require("../controllers/index");
const Blog = require("../models/blog");

const router=express.Router();


router.get("/",async (req,res)=>{
   const blogs=await Blog.find({});
   return res.render("home",{blogs,user:req.user});
});

router.route("/signUp").get(handleGetSignUp).post(handlePostSignUp)

router.route("/logIn").get(handleGetLogin).post(handlePostLogin);




module.exports=router;