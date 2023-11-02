const  mongoose  = require("mongoose")

const productType = new mongoose.Schema({
    title:String,
    introduction:String,
    detail:String,
    cover:String,
    editTime:Date
})
const productModel= mongoose.model("product",productType)
module.exports = productModel