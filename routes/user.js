const { Router } = require("express");
const bcrypt = require("bcrypt");
const userRouter = Router();
const { UserModel } = require("../db");
const z = require("zod");
const {JWT_USER_PASSWORD_PASSWORD} = require("../config")

const jwt = require("jsonwebtoken");
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Define Zod schema for input validation
    const userInputSchema = z.object({
        firstname: z.string().min(1).max(50),
        lastname: z.string().min(1).max(50),
        email: z.string().email().min(4).max(50),
        password: z.string().min(6).max(200),
    });

    try {
        userInputSchema.parse({ firstname, lastname, email, password });
        const salt = await bcrypt.genSalt(5);
        const hashedpassword = await bcrypt.hash(password, salt);
        // Save user to the database
        await UserModel.create({
            firstname,
            lastname,
            email,
            password: hashedpassword,
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (e) {
        res.status(400).json({
            error: e instanceof z.ZodError ? e.errors : e.message,
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if (user) {
            const token = jwt.sign({
                id: user._id
            }, JWT_USER_PASSWORD)
            res.json({ token: token });
        }
        else {
            res.json({
                message: "Incorrect Credentials"
            })
        }


    } catch (e) {
        res.status(400).json({
            error: e instanceof z.ZodError ? e.errors : e.message,
        });
    }
});


userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "hello",
    });
});

module.exports = {
    userRouter: userRouter
};
