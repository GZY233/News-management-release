const  mongoose  = require("mongoose")

const UserType = new mongoose.Schema({
    username:String,
    password:String,
    gender:Number,
    introduction:String,
    avatar:String,
    role:Number
})
const UserModel= mongoose.model("user",UserType)
module.exports = UserModel