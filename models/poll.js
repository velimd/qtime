var mongoose = require('mongoose');

// Polls Schema
var pollsSchema = mongoose.Schema({
	Question:{
		type: String,
		required: true,
	},
	Answer1:{
		type: String,
		required: true
	},
	Score1:{
			type:Number,
			default: 0,
	},
	Answer2:{
		type: String,
		required: true
	},
	Score2:{
			type:Number,
			default: 0,
	},
	Answer3:{
		type: String,
		required: true
	},
	Score3:{
			type:Number,
			default: 0
	},
	Answer4:{
		type: String,
		required: true
	},
	Score4:{
			type:Number,
			default: 0
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Polls = module.exports = mongoose.model('Polls', pollsSchema);

// Get  Polls
module.exports.getPolls = function(callback, limit){
	Polls.find(callback).limit(limit);
}

// Get  Polls
module.exports.getPollById = function(id, callback){
	Polls.findById(id, callback);
}

//Add Poll
module.exports.addPoll = function(poll, callback){
	Polls.create(poll, callback);
}

//Update Poll
module.exports.updatePoll = function(id, poll, options, callback){
	var query = {_id: id};
	var update = {
		Question: poll.Question,
		Answer1: poll.Answer1,
		Answer2: poll.Answer2,
		Answer3: poll.Answer3,
		Answer4: poll.Answer4
	};
	Polls.findOneAndUpdate(query, update, options, callback);
}

//Delete Poll
module.exports.deletePoll = function(id, callback){
	var query = {_id: id};
	Polls.remove(query, callback);
}