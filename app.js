var express = require('express')
var app = express()
var index = require('./routes/index');
var logger = require('morgan');
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', index);

app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', err.message);
});

module.exports = app;
