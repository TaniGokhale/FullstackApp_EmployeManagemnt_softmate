const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
const token =req.headers["authorization"]

if(!token){
    return res.status(403).json({message:"no token generated"})
}

try{
    const decoded=jwt.verify(token,"secretkey")
    req.user=decoded
    next()

}catch(err){
    return res.status(401).json({message:"invalid token"})
}

}

module .exports=verifyToken