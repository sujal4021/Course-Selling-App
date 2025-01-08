const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect("mongodb://localhost:27017/course-selling-app")
const ObjectId  = mongoose.Types.ObjectId
const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Please provide your name"],
        maxLength: [20, "Your name cannot exceed 20 characters"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Please provide your name"],
        maxLength: [20, "Your name cannot exceed 20 characters"],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please provide your email"],
        maxLength: [40, "Your name cannot exceed 40 characters"],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        maxLength: [16, "Your name cannot exceed 8 characters"],
        trim: true,
    },
})
const adminSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Please provide your name"],
        maxLength: [20, "Your name cannot exceed 20 characters"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Please provide your name"],
        maxLength: [20, "Your name cannot exceed 20 characters"],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please provide your email"],
        maxLength: [40, "Your name cannot exceed 40 characters"],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        maxLength: [16, "Your name cannot exceed 8 characters"],
        trim: true,
    },
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    creatorId: ObjectId,
    imageUrl: String,
})
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId,

})
const UserModel = mongoose.model("users", userSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchasesModel = mongoose.model("purchases", purchaseSchema)
const AdminModel = mongoose.model("admin", adminSchema)


module.exports = {
    UserModel: UserModel,
    courseModel: courseModel,
    purchasesModel: purchasesModel,
    AdminModel: AdminModel
}