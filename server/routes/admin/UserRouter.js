var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var Userrouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

/* GET home page. */
Userrouter.post('/adminapi/user/login',UserController.login);
Userrouter.post('/adminapi/user/upload',upload.single('file'),UserController.upload);
Userrouter.post('/adminapi/user/add',upload.single('file'),UserController.add);
Userrouter.get('/adminapi/user/list',UserController.list);
Userrouter.delete('/adminapi/user/list/:id',UserController.delist);
Userrouter.get('/adminapi/user/list/:id',UserController.getlist);
Userrouter.put('/adminapi/user/list/:id',UserController.uplist);
Userrouter.get('/adminapi/user/pagination',UserController.pagination);
Userrouter.get('/adminapi/user/paginatio',UserController.paginatio);
Userrouter.post('/adminapi/user/jwt',UserController.jwt);

module.exports = Userrouter;
