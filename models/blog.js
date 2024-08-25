const {Schema,model} = require("mongoose");

const blogSchema= new Schema({
    title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    coverImage:{
        type:String,
    }
},{timestamps:true});

const Blog=model("blog",blogSchema);

module.exports=Blog; 