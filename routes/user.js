const { Router } = require("express");
const bcrypt = require("bcrypt");
const userRouter = Router();
const { UserModel } = require("../db");
const z = require("zod");

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
    res.json({ message: "Signin logic here" });
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "hello",
    });
});

module.exports = {
    userRouter: userRouter
};
