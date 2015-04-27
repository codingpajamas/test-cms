var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	title: String, 
	body: String, 
	category: String, 
	status: String, 
	url: String, 
	author: {
		name : String,
		id : String
	},
	createdOn: {type: Date, default: Date.now()},
	modifiedOn: {type: Date} 
});

module.exports = mongoose.model('Blog', blogSchema);