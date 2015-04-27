var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res){ 
	res.render('editor/index.jade', {'user':req.user});
}); 
 
module.exports = router;