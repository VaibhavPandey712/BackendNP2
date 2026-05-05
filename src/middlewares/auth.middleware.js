import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

async function authMiddleware(req,res,next){
    const {token}=req.cookies;
    

    if(!token){
        return res.status(401).json({
            message:"Token not received"
        })
    }

    try{
        const data=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findOne({
            _id:data.id
        })
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }
        req.user=user;
        next();

        
    }catch(err){
        res.status(401).json({
            message:"Invalid token"
        })
    }
    
}

export default authMiddleware;