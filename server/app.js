var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Userrouter = require('./routes/admin/UserRouter');
const jwt = require('./util/JWT');
const Newsrouter = require('./routes/admin/NewsRouter');
const webNewsrouter = require('./routes/web/NewsRouter');
const Productrouter =require('./routes/admin/ProductRouter')
const productrouter1 =require('./routes/web/productRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(webNewsrouter)
app.use(productrouter1);
app.use((req,res,next)=>{
  if(req.url==="/adminapi/user/login"){
   next()
   return;
  }
  const token = req.headers["authorization"].split(" ")[1]
  if (token) {
       var payload = jwt.verify(token)
     if (payload) {
      const newtoken = jwt.generate({
      _id:payload._id,
      username:payload.username
      },"1d")
      res.header("Authorization",newtoken)

      next()
    }else{
      res.status(401).send({err:"token过期"})
    }
  }
})
app.use(Userrouter);
app.use(Newsrouter);
app.use(Productrouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
