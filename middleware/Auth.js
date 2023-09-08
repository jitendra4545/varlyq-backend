
const  jwt=require('jsonwebtoken')

const Auth=(req,res,next)=>{
  let token=req.headers?.authorization
  console.log(token)
  jwt.verify(token, 'jitendra', function(err, decoded) {
     if(decoded){
        req.body.createdBy=decoded.UserId
        next()
     }else{
     res.send({"msg":"Please login First"})
     }
  });
}


module.exports={
    Auth
}


