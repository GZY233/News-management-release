var express = require('express');
const productController = require('../../controllers/web/productController');
var productrouter = express.Router();

productrouter.get("/webapi/product/getlist",productController.getlist)
module.exports = productrouter