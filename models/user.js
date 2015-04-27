var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	username: String,
	password : String,
	firstname : String,
	lastname : String,
	email : String,
	about : String,
	avatar : String,
	type : String,
	createdOn: {type: Date, default: Date.now()},
	modifiedOn : {type: Date},
	status : String,
	resetPasswordToken: String,
  	resetPasswordExpires: Date
}); 

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);