module.exports = function (app) {
    app.use('/', require('./pages')); 
    app.use('/blogs', require('./blogs')); 
    app.use('/auth', require('./auth'));
    app.use('/admin', isLoggedIn, require('./admin'));
    app.use('/writer', require('./writer'));
    app.use('/editor', isLoggedIn, require('./editor'));

    function isLoggedIn(req, res, next) { 
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/auth');
	};

};