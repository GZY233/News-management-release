var express = require('express');
const NewsController = require('../../controllers/web/NewsController');
var Newsrouter = express.Router();



Newsrouter.get("/webapi/news/list",NewsController.list)
Newsrouter.get("/webapi/news/list/:id",NewsController.list)
Newsrouter.get("/webapi/news/getlist/:id",NewsController.getlist)
Newsrouter.get("/webapi/news/getlist1/:id",NewsController.getlist1)





module.exports = Newsrouter