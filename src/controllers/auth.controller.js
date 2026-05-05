import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export async function registerController(req, res) {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({
        username
    })

    if (existingUser) {
        return res.status(409).json({
            message: "user already exist"
        })
    }

    const user = await userModel.create({
        username,
        password: bcrypt.hashSync(password, 8)
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, { 
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.status(201).json({
        message: "Registered Successfully",
        user: user
    })
}

export async function loginController(req, res) {

    const { username, password } = req.body;

    const userExists = await userModel.findOne({
        username
    })

    if (!userExists) {
        return res.json({
            message: "User is not registered"
        })
    }

    if (!bcrypt.compareSync(password, userExists.password)) {
        return res.json({
            message: "Password is Incorrect"
        })
    }

    const token = jwt.sign({
        id: userExists._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, { 
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.json({
        message: "User Logged in Successfully",
        username: userExists.username
    })

}

