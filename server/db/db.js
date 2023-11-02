let a=function (seccess, error) {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/company-system");
    mongoose.connection.once("open",()=>{
       seccess()
    })
    mongoose.connection.on("error",()=>{
       error()
    })
    }
    module.exports=a;