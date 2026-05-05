import express from "express"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { registerController ,  loginController } from "../controllers/auth.controller.js"

const router = express.Router();


router.post("/register", registerController)

router.post("/login", loginController)



import authMiddleware from "../middlewares/auth.middleware.js"

router.get("/logout", authMiddleware, (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Logged out successfully"
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    res.json({
        username: req.user.username
    })
})



export default router;