'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var bodyParser = require('body-parser')

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URI);

app.use('/', express.static(process.cwd() + '/client/public'));

app.use(session({
	secret: process.env.SECRET_SESSION || 'secretClementine',
	resave: false,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
