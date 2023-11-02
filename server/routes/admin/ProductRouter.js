var express = require('express');
const  ProductController = require('../../controllers/admin/ProductController');
var Productrouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

Productrouter.post("/adminapi/product/add",upload.single('file'),ProductController.add)
Productrouter.get("/adminapi/product/getlist",ProductController.getlist)
Productrouter.get("/adminapi/product/getlist/:id",ProductController.getlist)
Productrouter.delete("/adminapi/product/dellist/:id",ProductController.dellist)
Productrouter.post("/adminapi/product/upload",upload.single('file'),ProductController.upload)
Productrouter.get("/adminapi/product/paginatio",ProductController.paginatio)
Productrouter.get("/adminapi/product/pagination",ProductController.pagination)

module.exports = Productrouter