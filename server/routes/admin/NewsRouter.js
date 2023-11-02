var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var Newsrouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/newsupload/' })

Newsrouter.post("/adminapi/news/add",upload.single('file'),NewsController.add)
Newsrouter.get("/adminapi/news/getlist1/:id",NewsController.getlist1)
Newsrouter.get("/adminapi/news/getlist/:id",NewsController.getlist)
Newsrouter.put("/adminapi/news/publish",NewsController.changepublish)
Newsrouter.delete("/adminapi/news/dellist/:id",NewsController.dellist)
Newsrouter.post("/adminapi/news/upload",upload.single('file'),NewsController.upload)
Newsrouter.get("/adminapi/news/paginatio",NewsController.paginatio)
Newsrouter.get("/adminapi/news/pagination",NewsController.pagination)


module.exports = Newsrouter