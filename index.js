// declare dependencies
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash'); 
var multer = require('multer');

// configurations
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'awesomefoodstop', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(multer({dest: './public/tmp'}))

require('./config/db')(mongoose); /* database configuration */
require('./config/passport')(passport, LocalStrategy); /* database configuration */  

// routes
require('./routes')(app);


// start app
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Listening to port ' + port);
})