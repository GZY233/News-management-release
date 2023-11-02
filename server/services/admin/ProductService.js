const productModel = require("../../models/ProductModule")
const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
       return  productModel.create({
        title, introduction, detail, cover, editTime
       })
    },
    getlist: (id)=>{
        return  id?productModel.findOne({_id:id}):productModel.find()
    },
    dellist: (id)=>{
        return productModel.deleteOne({_id:id})
    },
    upload: ({_id,title,introduction,detail,cover,editTime})=>{
          if(cover){
            return productModel.updateOne({_id},{title,introduction,detail,cover,editTime})
          }
          else{
            return productModel.updateOne({_id},{title,introduction,detail,editTime})
          }

    },
    paginatio:async()=>{
      return await productModel.countDocuments()
     },
     pagination:async(page,skip)=>{
      return await productModel.find().skip(skip).limit(11)
     },
}
module.exports = ProductService