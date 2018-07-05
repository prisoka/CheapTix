var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// setup routes:
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const loginRouter = require('./routes/login');
const indexBusiness = require('./routes/index_business');
const eventSubmissionRouter = require('./routes/submitevent');
const createUserRouter = require('./routes/createuser');
const orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/login', loginRouter);
app.use('/index_business', indexBusiness);
app.use('/submitevent', eventSubmissionRouter);
app.use('/createuser', createUserRouter);
app.use('/order', orderRouter);


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
  res.status(err.status || 500).send(err);
  // res.render('error');
});

module.exports = app;
