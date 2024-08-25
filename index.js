require('dotenv').config()
const express = require("express");
const mongoose=require("mongoose");
const ejs=require("ejs");
const path=require("path");
const  cookieParser = require('cookie-parser')

const indexRoute=require("./routes/index");
const userRoute=require("./routes/user");

const { tokenUserDetails } = require("./util/tokenUser");
const { verifyToken } = require("./util/tokenHandler");

const app= express();
const PORT=3000;


const url=process.env.DB_URL;
mongoose.connect(url).then(e=>console.log("MongoDB connected sucessfully."))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

app.use(async function(req,res,next){
    const token=req.cookies["token"];
    if(!token) return next();
    try{
        const payload=await verifyToken(token);
        req.user=payload; 
        next();
    }catch(error){
        next();
    }
});

app.use("/",indexRoute);

app.use("/user",userRoute)



app.listen(PORT,()=>{
    console.log(`Server startred sucessfully on port: ${PORT}.`);
});