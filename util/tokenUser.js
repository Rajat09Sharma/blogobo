const User = require("../models/user");

async function tokenUserDetails(data) {
    const user=await User.findById(data.id);
    if(!user) throw new Error("Invalid user!");
    return user;
}

module.exports={
    tokenUserDetails,
}