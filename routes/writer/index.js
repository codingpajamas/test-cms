var express = require('express');
var router = express.Router(); 
var Blog = require('../../models/blog');
var fs = require('fs');

router.get('/', function(req, res){ 
	res.render('writer/index.jade', {'admin':req.user});
}); 

router.get('/blogs', function(req, res){ 
	Blog.find({}, {}, {sort: '-createdOn'}, function(err, blogs){
		res.render('writer/blogs.jade', {
			'admin':req.user,
			blogs : blogs
		});
	});
}); 

// create form
router.get('/blogs/add', function(req, res){ 
	res.render('writer/create.jade', {'admin':req.user});
}); 

// create process
router.post('/blogs/add', function(req, res){ 
	var url = req.body.postTitle;
	prettyUrl = url.replace(/ /g, '_').toLowerCase();

	var author = {
		'name' : req.user.firstname + ' ' + req.user.lastname,
		'id' : req.user._id
	}

	var arrTags = req.body.postTags ? req.body.postTags.split(',') : [];

	Blog.create({
		title : req.body.postTitle, 
		body : req.body.postBody,  
		status : req.body.status, 
		url : prettyUrl,  
		author : author,
		createdOn : new Date, 
		category : req.body.category,
		tags: arrTags
	}, function(err, blog){
		if(!err){ 
			 console.log('success')
		} else {
			console.log(err); 
		} 
		res.redirect('/writer/blogs');
	});  
}); 

// edit form
router.get('/blogs/:id/edit', function(req, res){ 
	Blog.findById(req.params.id, function(err, blog){
		if(err){ 
			console.log(err);
			res.redirect('/writer/blogs');
		} else {  
			res.render('writer/edit.jade', {
				'admin':req.user,
				blog : blog
			});
		}
	}); 
}); 

//edit process
router.post('/blogs/edit', function(req, res){ 

	var arrTags = req.body.postTags ? req.body.postTags.split(',') : [];
	
	Blog.findByIdAndUpdate(
		req.body._id, {
		title : req.body.postTitle, 
		body : req.body.postBody,
		status : req.body.status,
		modifiedOn : new Date, 
		category : req.body.category,
		tags: arrTags
	}, function(err, blog){
		if(!err){ 
			console.log('success');
		} else {
			console.log(err); 
		}
		res.redirect('/writer/blogs');
	});
}); 

// delete confirm
router.get('/blogs/:id/delete', function(req, res){ 
	Blog.findOne({'_id':req.params.id},{},{}, function(err, post){
		if(!err){
			res.render('writer/delete.jade', {
				'admin':req.user,
				'post':post
			});
		} else {
			console.log(err);
		}
	});
}); 

// delete process
router.post('/blogs/delete', function(req, res){ 
	Blog.findByIdAndRemove(req.body.id, function(err, post){
		if(err){
			console.log(err)
		}
		res.redirect('/writer/blogs');
	});
}); 

//upload process
router.post('/blogs/upload', function(req, res){  
	var uploadTS = new Date().getTime().toString();
	var objFile = req.files['files[]']; 
	 
	if(objFile.size > 0){ 
		var newPath = __dirname + "/../../public/uploads/blog-images/" + uploadTS + "-" + objFile.name; 
		fs.renameSync(objFile.path, newPath); 
		var uploadedFileName = uploadTS + "-" + objFile.name;  
		res.json({
			"files":[
				{
					"url":'/uploads/blog-images/' + uploadedFileName
				}
			]
		});
	};
	 
}); 
 

//upload delete process
router.post('/blogs/deleteupload', function(req, res){  
	var filePath = __dirname + "/../../public" + req.body.file;
	fs.unlink(filePath, function(err){
		if(!err){
			res.send( 'Successfully deleted on disk ' + req.body.file);		
		} else {
			console.log(err);
			res.send( 'Error deleting on disk ' + req.body.file);		
		};
	});
}); 
 
module.exports = router;