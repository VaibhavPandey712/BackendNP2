import express from "express"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { registerController ,  loginController } from "../controllers/auth.controller.js"

const router = express.Router();


router.post("/register", registerController)

router.post("/login", loginController)



router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Logged out successfully"
    })
})



export default router;