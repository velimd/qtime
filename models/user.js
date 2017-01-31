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

usersSchema.methods.comparePassword = function(userPassword, callback) {
	bcrypt.compare(userPassword, this.password, function(err, isMatch) {
     	if(err){
     		return callback(err);
     	}
     	callback(null, isMatch);
	});
}

var User = module.exports = mongoose.model('Users', usersSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password=hash;
	        newUser.save(callback);
	    });
	});
}

