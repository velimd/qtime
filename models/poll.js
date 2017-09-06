var mongoose = require('mongoose');
var shortid = require('shortid');

// Polls Schema
var pollsSchema = mongoose.Schema({
	_id: {
    	type: String,
    	'default': shortid.generate
	},
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
	quiz: { type: String},
	isQuizPoll:{type: String, default:"no"}
});

var quizSchema = mongoose.Schema({
	_id: {
    	type: String,
    	'default': shortid.generate
	},
	title:{
		type: String,
		required: true
	},
	user:{type: String, required: true}
});

var sessionquiz = mongoose.Schema({
	_id: {
    	type: String,
    	'default': shortid.generate
	},
	question: { type: String, required:true},
	user:{type: String, required: true}
});

var Polls = module.exports = mongoose.model('Polls', pollsSchema);
var Quiz = module.exports = mongoose.model('Quiz', quizSchema);
var Session = module.exports = mongoose.model('Session', sessionquiz);

// Get  Polls
module.exports.getPolls = function(username, callback, limit){
	Polls.find({user:username, isQuizPoll:"no"}, callback).limit(limit);
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

//Answer1
module.exports.updateAnswer1 = function(id, options, callback){
	var query = {_id: id};
	Polls.findOneAndUpdate(query, {$inc: {Score1:1}}, options, callback);
}

//Answer2
module.exports.updateAnswer2 = function(id, options, callback){
	var query = {_id: id};
	Polls.findOneAndUpdate(query, {$inc: {Score2:1}}, options, callback);
}

//Answer3
module.exports.updateAnswer3 = function(id, options, callback){
	var query = {_id: id};
	Polls.findOneAndUpdate(query, {$inc: {Score3:1}}, options, callback);
}

//Answer4
module.exports.updateAnswer4 = function(id, options, callback){
	var query = {_id: id};
	Polls.findOneAndUpdate(query, {$inc: {Score4:1}}, options, callback);
}

module.exports.resetAnswers = function(id, options, callback){
	var query = {_id: id};
	Polls.findOneAndUpdate(query, {$set: {Score1: 0, Score2: 0, Score3: 0, Score4:0}}, options, callback);
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

///NEXT QUESTION IN QUIZ

module.exports.getNextPoll = function(username, id, pollid, callback, limit){
	Polls.findOne({user:username, quiz:id, _id:{$gt: pollid}}, callback).sort({_id:1});
}

///PREVIOUS QUESTION IN QUIZ

module.exports.getPreviousPoll = function(username, id, pollid, callback, limit){
	Polls.findOne({user:username, quiz:id, _id:{$lt: pollid}}, callback).sort({_id:-1});
}

//////////////////////////////session
module.exports.getSessionById = function(id, callback){
	Session.findById(id, callback);
}
module.exports.getSession = function(username, callback, limit){
	Session.findOne({user:username}, callback).sort({_id: -1});
}
module.exports.getAllSessions = function(callback, limit){
	Session.find(callback).limit(limit);
}

module.exports.createSession = function(session, callback){
	Session.create(session, callback);
}

module.exports.updateSession = function(id, session, options, callback){
	var query = {_id: id};
	Session.findOneAndUpdate(query, session, options, callback);
}

module.exports.deleteSession = function(id, callback){
	var query = {user: id};
	Session.remove(query, callback);
}

module.exports.getQuizFirstPolls = function(username, id, callback, limit){
	Polls.findOne({user:username, quiz:id}, callback);
}