const Blog = require("../models/blog");
const Comment = require("../models/comment");

async function handleCreateBlog(req,res) {
    const {title,content}=req.body;
    console.log(req.body);
    
    if(!title||!content) return res.render("createBlog",{user:req.user,error:{message:"All fields are required!"}});

    try {
        const userId=req.user.id;
        const coverImage=`/Uploads/${req.file.filename}`;
        const blog= await Blog.create({
            title,
            content,
            coverImage,
            createdBy:userId
        });               
        return res.redirect("/");
    } catch (error) {
        return res.render("createBlog",{user:req.user,error:{message:"Something went wrong, please try again latte."}});
    }
}

async function handleLogout(req,res) {
    res.clearCookie("token");
    res.redirect("/logIn");
}

async function handleGetBlogbyId(req,res) {
    const id =req.params.id;

    try {
        const blog=await Blog.findById(id);
        const comments= await Comment.find({blogId:id}).populate("createdBy").exec();
        console.log(comments);
        
        return res.render("blog",{blog,comments,user:req.user});
    } catch (error) {
        console.log("blog id error---",error);
        
        return res.redirect("/");
    }
}

async function handleComment(req,res) {
    const {text,blogId}=req.body;
    try {
        const createdBy=req.user.id
        const comment=await Comment.create({
            text,
            blogId,
            createdBy
        });
        return res.redirect("/user/blog/"+blogId);
    } catch (error) {
        return res.render("");
    }
}

async function handleUserBlogs(req,res) {
    const id=req.params.id;
    try {
        const blogs =await Blog.find({createdBy:id});
        return res.render("userBlogs",{user:req.user,blogs})

    } catch (error) {
        res.end("faile")
    }   
}

module.exports={
    handleCreateBlog,
    handleLogout,
    handleGetBlogbyId,
    handleComment,
    handleUserBlogs
}