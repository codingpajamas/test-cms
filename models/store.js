var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({
	name: String,
	location : String,
	owner: String
});

module.exports = mongoose.model('Store', storeSchema);