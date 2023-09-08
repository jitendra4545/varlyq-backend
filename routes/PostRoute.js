const express = require('express')
const { Auth } = require('../middleware/Auth')
const { PostModel } = require('../model/PostModel')

const PostRouter = express.Router()

PostRouter.get("/", Auth, async(req, res) => {
    try{
     const allData=  await PostModel.find()
       res.send(allData)
    }catch(err){
        res.send({ "msg": "Something went wrong ! unable to get post" ,"err":err.message})
    }
})


PostRouter.post('/', Auth, async (req, res) => {
    const { message, comments, createdBy } = req.body

    console.log(message, comments, createdBy)
    try {
        let newdata = new PostModel({ message, comments, createdBy })

        await newdata.save()

        res.send({ "msg": "Post created Successfully" })

    } catch (err) {
       res.send({ "msg": "Something went wrong ! unable to create post" ,"err":err.message})
    }
})


PostRouter.delete('/:id',Auth, async (req, res) => {
    const id=req.params.id
    const UserId=req.body.createdBy 
   
    try {
   let data=  await PostModel.findOne({createdBy:UserId})
   console.log(data)
   if(data){
    await PostModel.findOneAndDelete({_id:id})
    res.send({ "msg": "Post deleted Successfully" })
   }else{
    res.send({ "msg": "unable to find post" })
   }
      
    } catch (err) {
        res.send({ "msg": "Something went wrong ! unable to delete post" ,"err":err.message})
    }
})

PostRouter.patch('/:id',Auth, async (req, res) => {
    const id=req.params.id
    const UserId=req.body.createdBy 
    const {message}=req.body
    try {
        let data=  await PostModel.findOne({createdBy:UserId})
        console.log(data)
        if(data){
            await PostModel.findOneAndUpdate({_id:id},{message:message})
            res.send({ "msg": "Post updated Successfully" })
           }else{
            res.send({ "msg": "unable to find post" })
           } 
    } catch (err) {
        res.send({ "msg": "Something went wrong ! unable to upadate post" ,"err":err.message})
    }
})



module.exports = {
    PostRouter
}