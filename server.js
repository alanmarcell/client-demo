"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'developement';
var http = require('http');
const app = express();

app.set('port', port);

app.use('/app', express.static(path.resolve(__dirname, './dist')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

// // for system.js to work. Can be removed if bundling.
// app.use(express.static(path.resolve(__dirname, '../client')));
// app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
};

app.get('/*', renderIndex);

if (env === 'developement') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err,
      message: err.message
    });
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});


var server = http.createServer(app);

server.listen(app.get('port'), function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express angular app is listening on port:' + port);
});
