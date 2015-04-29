var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	title: String, 
	body: String, 
	category: Array,
	tags: Array,
	status: String, 
	url: {type: String, unique: true}, 
	author: {
		name : String,
		id : String
	},
	createdOn: {type: Date, default: Date.now()},
	modifiedOn: {type: Date} 
});

module.exports = mongoose.model('Blog', blogSchema);