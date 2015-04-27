var express = require('express');
var router = express.Router();
var passport = require('passport'); 
var crypto = require('crypto'); 
var async = require('async'); 
var User = require('../models/user');


// index page of auth
router.get('/', function(req, res){    
	res.render('auth/index.jade', {
		'loginError':req.flash('loginError'),
		'registerError':req.flash('registerError')
	});
});


// login page
router.get('/login', function(req, res){   
	res.render('auth/login.jade', {});
});  


// process login page
router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){  
		if(err || !user){ 
			res.json({'status':'error', 'message' : info.message})
		} else { 
			if(user.status == 'active'){ 
				req.logIn(user, function(err) {
					if (err) { 
						res.json({'status':'error', 'message' : 'Unable to login, please try again later.'}) 
					} else {
						res.json({'status':'success', 'message' : 'Successfully logged in.', 'redirect':'/'+user.type})
					};
			    }); 
			}else{
				res.json({'status':'error', 'message' : 'This account\'s status is still pending, please try again later.'}) 
			}
		};
	})(req, res, next);
});


// logout process
router.get('/logout', function(req, res){
	req.logout(); 
	res.redirect('/auth');
});


// register page
router.get('/register', function(req, res){ 
	res.render('auth/register.jade', {});
});


// process register page
router.post('/register', function(req, res){ 
	User.register(new User({ username : req.body.username, firstname:req.body.firstname, lastname:req.body.lastname, type:'writer', status:'pending', avatar:'none.jpg' }), req.body.password, function(err, user) {
		if (err) { 
			res.json({'status':'error', 'message' : err.message})
		} else {
			res.json({'status':'success','message':'Registration is successful. We wil evaluate your profile and contact you when approved. Thank you.'});
		} 
	}); 
});


// forgot password process
router.post('/forgot', function(req, res){
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({ email: req.body.email }, function(err, user) {
				if (!user) {
					req.flash('error', 'No account with that email address exists.');
					return res.redirect('/forgot');
				}

				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

				user.save(function(err) {
					done(err, token, user);
				});
			});
		},
		function(token, user, done) {
			console.log(token);
			console.log(user);
			done('done');
		}
	], function(err){
		if(err) {
			return console.log(err);
		}
		res.redirect('/forgot');
	});
});


// reset password process
router.post('/reset/:token', function(req, res){
	console.log('resetting password');
	async.waterfall([
		function(done){
			User.findOne({resetPasswordToken: req.params.token}, function(err, user){
				if(!user){
					console.log('token invalid');
				}else{
					console.log('user found');
					console.log(user.firstname);

					//user.password = req.body.password;

					user.setPassword(req.body.password, function(err){
						if(err){
							console.log('error setPassword');
						}else{ 
							console.log('success setPassword')
							user.resetPasswordToken = undefined;
			        		user.resetPasswordExpires = undefined;

			        		user.save(function(err){
			        			if(err){
			        				console.log('error in saving new password')
			        			}else{
			        				done(err, user);
			        				console.log('resetted')
			        			}
			        		})
						}
					})
				} 
			})
		}
	], function(err){
		if(err){ 
			console.log(err);
		}else{
			console.log('zzzzz');
		}
	})
});


module.exports = router;