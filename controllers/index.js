const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../util/tokenHandler");

async function handleGetSignUp(req, res) {
    return res.render("signup");
}

async function handlePostSignUp(req, res) {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.render("signUp", { error: { message: "All fields are required!" } });
    }

    try {
        const user = await User.create({
            fullName,
            password,
            email
        });
        if (user) {
            const token = await createToken(user);
            if(token){
                // console.log(token);
                res.cookie("token",token);
                return res.redirect("/");
            }
        }
    } catch (error) {
        console.log("sigup error---", error);
        return res.render("signUp", { error: { message: "Failed to signUp, please try again latter!" } })
    }
}

async function handleGetLogin(req, res) {
    return res.render("login");
}

async function handlePostLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", { error: { message: "All fields are required!" } });
    }
    try {

        const user = await User.findOne({ email });
        if (!user) return res.render("login", { error: { message: "Incorrect email!" } })
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.render("login", { error: { message: "Incorrect password, please try again latter!" } })
        const token = await createToken(user);
        if(token){
            // console.log(token);
            res.cookie("token",token);
            return res.redirect("/");
        }
    } catch (err) {
        console.log("login error---", err);
        return res.render("login", { error: { message: "Failed to login, please try again latter!" } })
    }
}


module.exports = {
    handlePostSignUp,
    handleGetSignUp,
    handleGetLogin,
    handlePostLogin,
}