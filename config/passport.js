module.exports = function(passport, LocalStrategy) {
	var User = require('../models/user');
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};