const productService = require("../../services/web/productService")

const productController = {
    getlist: async(req,res)=>{
        const result = await productService.getlist()
        res.send({
            ok:1,
            data:result
        })
    }
}

module.exports = productController