var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const boom=require('@hapi/boom')
//const engines = require('consolidate');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/views/products');
var apiProducts =require('./routes/api/products')
var app = express();
const bodyParser = require('body-parser');
const isRequestAjaxOrApi=require('./utils/isRequestAjaxOrApi')
const authApiRouter=require('./routes/api/auth')
const helmet=require('helmet')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.engine('hbs', engines.handlebars)
//error handlers
const {
  logErrors,
  errorHandler,
  clientErrorHandler,
  //wrapErrors
}=require('./utils/middlewares/errorsHandlers')
// app.set('views', './views')
// app.set('view engine', 'hbs')

app.use(helmet())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static(path.join(__dirname, "public")));


// app.use(function (req,res,next) {
//   if(isRequestAjaxOrApi(req)){
//     const {
//       output:{ statusCode,payload}
//     }=boom.notFound();
//     res.status(statusCode).json(payload)
//   }
//   res.status(404).render("404")
// })
//routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productosRouter);
apiProducts(app);
//app.use('/api/products/', apiProducts);
app.use('/api/auth',authApiRouter)

app.use(logErrors)

//app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)


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
