const mongoose=require('mongoose')


const CommentSchema=mongoose.Schema({
    sentBy:String,
    sentAt:Date,
    liked:Array


})


const PostSchema=mongoose.Schema({
    createdBy:String,
    message:String,
    comments:[CommentSchema]
},{
    versionKey:false,
    timestamps:true
})



const PostModel=mongoose.model("varlyqPost",PostSchema)


module.exports={
    PostModel
}