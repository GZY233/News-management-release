const productModel = require("../../models/ProductModule")

const productService = {
  getlist: async ()=>{
    return productModel.find();
  }
}
module.exports = productService