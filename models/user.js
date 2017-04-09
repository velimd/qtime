var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var usersSchema = mongoose.Schema({
	username:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('Users', usersSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password=hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.comparePassword = function(userPassword, hash, callback) {
	bcrypt.compare(userPassword, hash, function(err, isMatch) {
     	if(err){
     		return callback(err);
     	}
     	callback(null, isMatch);
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

