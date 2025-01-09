const { Router } = require("express")
const bcrypt = require("bcrypt")
const userRouter = Router();
const { UserModel } = require("../db")
const z = require("zod");
const { mongoose } = require("mongoose");


userRouter.post("/signup", async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    // password hashing 
    const salt = await bcrypt.genSalt(5)
    const hashedpassword = await bcrypt.hash(password, salt)

    // zod input schema
    const user = z.object({
        email: z.string().min(4).max(15),
        hashedpassword: z.string().min(3).max(100)
    })
    try {
        await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            hashedpassword: hashedpassword
        })
        res.status(201).json({ message: "User created successfully" });

    }
    catch (e) {
        res.json({
            error: e.message
        })
    }
})
userRouter.post("/signin", (req, res) => {

})

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "hello"
    })
})
module.exports = {
    userRouter: userRouter
}