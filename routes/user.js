const { Router } = require("express")
const  userRouter = Router();
userRouter.post("/signup", (req, res) => {

})
userRouter.post("/signin", (req, res) => {

})

userRouter.get("/purchases", (req, res) => {
res.json({
    message:"hello"
})
})
module.exports = {
    userRouter:userRouter
}