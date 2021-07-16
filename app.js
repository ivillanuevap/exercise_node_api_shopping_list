var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var authenticateRouter = require('./routes/authenticate');
var itemsRouter = require('./routes/items');

var app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/authenticate', authenticateRouter);

module.exports = app;