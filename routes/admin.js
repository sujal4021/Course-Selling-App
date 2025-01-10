const { Router } = require("express")
const z = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")
const adminRouter = Router();
const { AdminModel, courseModel } = require("../db")
const { adminMiddleware } = require("../middleware/admin")

adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Define Zod schema for input validation
    const adminInputSchema = z.object({
        firstname: z.string().min(1).max(50),
        lastname: z.string().min(1).max(50),
        email: z.string().email().min(4).max(50),
        password: z.string().min(6).max(200),
    });

    try {
        adminInputSchema.parse({ firstname, lastname, email, password });
        const salt = await bcrypt.genSalt(5);
        const hashedpassword = await bcrypt.hash(password, salt);
        // Save admin to the database
        await AdminModel.create({
            firstname,
            lastname,
            email,
            password: hashedpassword,
        });

        res.status(201).json({ message: "admin created successfully" });
    } catch (e) {
        res.status(400).json({
            error: e instanceof z.ZodError ? e.errors : e.message,
        });
    }
})
adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the admin by email
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if (admin) {
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD)
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
})


adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const { title, description, imageUrl, price } = req.body

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    res.json({
        message: "Course Created ",
        courseId: course._id
    })
})
adminRouter.put("/course", (req, res) => {

})
adminRouter.get("/course/bulk", (req, res) => {

})
module.exports = {
    adminRouter: adminRouter
}