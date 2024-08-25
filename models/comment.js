const {Schema,model} = require("mongoose");

const commentSchema= new Schema({
    text:{
        type:String,
        require:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    }
},{timestamps:true});

const Comment=model("comment",commentSchema);

module.exports=Comment; 