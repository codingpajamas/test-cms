module.exports = function(mongoose) {  
	var dbURI = 'mongodb://localhost/authpress';
	mongoose.connect(dbURI);

	mongoose.connection.on('connect', function(){
		console.log('Mongoose connected on ' + dbURI);
	});

	mongoose.connection.on('error', function(err){
		console.log('Mongoose connection : ' + err);
	}); 
}