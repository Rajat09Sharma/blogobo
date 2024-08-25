const  jwt = require('jsonwebtoken');

const secretKey=process.env.SECRET_KEY;

async function createToken(user) {    
    try {
        const token=await jwt.sign({
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            role:user.role
        },secretKey);
        if(token) return token;
    } catch (error) {
        console.log("Jwt createToken errror---");
    }
}

async function  verifyToken(token) {
    try {
        const result= await jwt.verify(token,secretKey);
        if(result) return result;
    } catch (error) {
        console.log("error verify token----");
        throw new Error("Unauthorised user!");  
    }
}

module.exports={
    createToken,
    verifyToken,
}