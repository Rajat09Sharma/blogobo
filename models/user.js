const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const saltRounds = 10;

const userSchema=new mongoose.Schema({
    fullName:{
        require:true,
        type:String,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    profileImage:{
        type:String,
        default:"/Image/user-avatar.jpg"
    }
},{timestamps:true});


userSchema.pre("save",async function(next){
    const user= this;

    if(!user.isModified("password")) return;

    const salt= await bcrypt.genSalt(saltRounds);
    const hash=await bcrypt.hash(user.password,salt);
    this.password=hash;
    next();
});

const User= mongoose.model("user",userSchema);

module.exports=User;