var express = require('express');
var router = express.Router(); 
var Blog = require('../../models/blog');

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
				'writter':req.user,
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
				'writter':req.user,
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
 
module.exports = router;