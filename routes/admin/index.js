var express = require('express');
var router = express.Router(); 
var User = require('../../models/user');
var fs = require('fs');

router.get('/', function(req, res){ 
	res.render('admin/index.jade', {'admin':req.user});
}); 

router.get('/users', function(req, res){ 
	User.find({},{},{}, function(err, users){
		if(!err){
			res.render('admin/users/index.jade', {
				'admin':req.user,
				'users':users
			});
		}
	});
}); 

router.get('/users/:id', function(req, res){ 
	User.findOne({_id:req.params.id},{},{}, function(err, user){
		if(!err){
			res.render('admin/users/show.jade', {
				'admin':req.user,
				'user':user
			});
		}
	});
}); 

router.get('/users/:id/edit', function(req, res){ 
	User.findOne({'_id':req.params.id},{},{}, function(err, user){
		if(!err){
			res.render('admin/users/edit.jade', {
				'admin':req.user,
				'user':user
			});
		} else {
			console.log(err);
		}
	});
}); 

router.post('/users/edit', function(req, res){   

	var strAvatar = req.body.avatar_old; 
 
	if (req.files.avatar && req.files.avatar.size !== 0) {  
		var newFileName = req.body.id + "." + req.files.avatar.extension
 		var newPath = __dirname + "/../../public/profiles/"; 
		fs.exists(req.files.avatar.path, function(exists) { 
			if(exists){   
				fs.rename(req.files.avatar.path, newPath + newFileName);
				strAvatar = newFileName;
			}
		});

		strAvatar = newFileName;
	}  

	console.log(strAvatar)



	var strFirstname = req.body.firstname ? req.body.firstname : '';
	var strLastname = req.body.lastname ? req.body.lastname : '';
	var strEmail = req.body.email ? req.body.email : '';
	var strAbout = req.body.about ? req.body.about : '';
	var strType = req.body.type ? req.body.type : '';
	var strStatus = req.body.status ? req.body.status : '';
	 
 
	User.findByIdAndUpdate(req.body.id, {
		firstname : strFirstname,
		lastname : strLastname,
		email : strEmail,
		about : strAbout, 
		type : strType,
		status : strStatus,
		avatar : strAvatar
	}, function(err, user){
		if(!err){
			res.redirect('/admin/users/'+user._id+'/edit')
		}
	}); 
}); 


router.get('/users/:id/delete', function(req, res){ 
	User.findOne({'_id':req.params.id},{},{}, function(err, user){
		if(!err){
			res.render('admin/users/delete.jade', {
				'admin':req.user,
				'user':user
			});
		} else {
			console.log(err);
		}
	});
}); 

router.post('/users/delete', function(req, res){
	User.findByIdAndRemove(req.body.id, function(err, user){
		if(err){
			console.log(err)
		}else{
			// should remove avatar pic
		}
		res.redirect('/admin/users');
	});
});

router.get('/blogs', function(req, res){ 
	res.render('admin/blogs/index.jade', {'admin':req.user});
}); 
 
module.exports = router;