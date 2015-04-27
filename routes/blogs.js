var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

router.get('/', function(req, res){ 
	Blog.find({},{},{}, function(err, blogs){
		if(!err){
			res.render('blogs/index.jade', {});
		} else {
			res.send(err);
		}
	});
});

module.exports = router;