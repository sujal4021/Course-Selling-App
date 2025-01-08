const express = require("express")
const app = express();


app.get("/", (req, res) => {
    res.send("Course Selling APP")
})

app.post("/signup", (req, res) => {
})

app.post("/signin", (req, res) => {
})

app.get("/courses", (req, res) => {
})

app.get("/purchaseCourse", (req, res) => {
})

app.get("/allCourses", (req, res) => {
})

app.listen(3000)