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
	},
	user:{ type: String, required: true},
	quiz: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}],
	isQuizPoll:{type: String, default:"yes"}
});

var quizSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	user:{type: String, required: true}
});


var Polls = module.exports = mongoose.model('Polls', pollsSchema);
var Quiz = module.exports = mongoose.model('Quiz', quizSchema)
// Get  Polls
module.exports.getPolls = function(username, callback, limit){
	Polls.find({user:username, isQuizPoll:"yes"}, callback).limit(limit);
}
module.exports.getAllPolls = function(callback, limit){
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

/////////////////////////////
module.exports.getQuiz = function(username, callback, limit){
	Quiz.find({user:username}, callback).limit(limit);
}

//get quizes
module.exports.getAllQuiz = function(callback, limit){
	Quiz.find(callback).limit(limit);
}

// Get  Quiz
module.exports.getQuizById = function(id, callback){
	Quiz.findById(id, callback);
}

//Add Quiz
module.exports.addQuiz = function(quiz, callback){
	Quiz.create(quiz, callback);
}

//Update Quiz
module.exports.updateQuiz = function(id, quiz, options, callback){
	var query = {_id: id};
	var update = {
		title:quiz.title
	};
	Quiz.findOneAndUpdate(query, update, options, callback);
}

//Delete Quiz
module.exports.deleteQuiz = function(id, callback){
	var query = {_id: id};
	Quiz.remove(query, callback);
}

module.exports.getQuizPolls = function(username, id, callback, limit){
	Polls.find({user:username, quiz:id}, callback).limit(limit);
}