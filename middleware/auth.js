const { verifyToken } = require("../util/tokenHandler");

async function authUser(req,res,next){
    const token=req.cookies["token"];
    try {
        const payload=await verifyToken(token);
        req.user=payload;
        next();
    } catch (err) {
        console.log("auth error",err.message);
        return res.render("login",{error:{message:err.message}})
    }
}

module.exports={
    authUser,
}