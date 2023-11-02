const  mongoose  = require("mongoose")

const NewsType = new mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:Number,
    cover:String,
    isPublish:Number,
    editTime:Date
})
const NewsModel= mongoose.model("news",NewsType)
module.exports = NewsModel