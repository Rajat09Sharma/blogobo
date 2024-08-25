const express = require("express");
const multer = require("multer");

const { authUser } = require("../middleware/auth");
const Blog = require("../models/blog");
const {handleCreateBlog,handleLogout,handleGetBlogbyId,handleComment,handleUserBlogs}=require("../controllers/user")

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/Uploads/")
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now();
        cb(null, `${uniquePrefix}-${file.originalname}`)
    }
}) 

const upload = multer({ storage: storage })


router.get("/add-blog", authUser, (req, res) => {
    res.render("createBlog", { user: req.user });
})

router.post("/add-blog",authUser,upload.single("coverImage"),handleCreateBlog)

router.get("/logout",authUser,handleLogout);

router.get("/blog/:id",authUser,handleGetBlogbyId);

router.post("/Comment",handleComment);

router.get("/blogs/:id",handleUserBlogs)

module.exports = router;
