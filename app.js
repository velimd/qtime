var express = require('express');
var session = require('express-session');
var app = express();
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(express.static(__dirname+'/client'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

//Connect to Mongoose
var config = require('./config/database');
mongoose.connect(config.database);

//require('./config/passport')(passport);

//sessions
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));

app.use(passport.session());
//gobal variables
app.use(function (req, res, next) {
	res.locals.user=null;
	res.locals.isAuth=false;
	next();
});
//global.user = null;
//global.isAuth=false;

var User = require('./models/user');

/////////////////////////////////////user
app.post('/api/signup', function(req, res) {
	if(!req.body.username||!req.body.password){
		res.json({success:false, msg: 'Please enter username and password'});
	}
	else{
		var newUser = new User({
			username:req.body.username,
			password:req.body.password
		});
		User.createUser(newUser, function(err, user){
			if (err) {
		        return res.json({success: false, msg: 'Username already exists.'});
		    }
		    res.json({success: true, msg: 'Successful created new user.'});
		})
	}
});

passport.use(new LocalStrategy(function(username, password, done) {
	    User.findOne({username: username}, function(err, user) {
	        if (err) {
	            return done(err, false);
	        }
	        if (user) {
	        	user.comparePassword(password, function(err, isMatch) {
					if(isMatch){
						isAuth=true;
						this.user=user.username;
						done(null, user);
					}
					else{
						done(null, false);
					}
				});
	        } else {
	            done(null, false);
	        }
	    });
}));

	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
  		User.getUserById(id, function(err, user) {
    	done(err, user);
  		});
	});

app.post('/api/authenticate', passport.authenticate('local'), function(req, res) {
	res.json({success: true, msg: 'Successful login.'});
});

/////////////////////////////////////poll

Polls = require('./models/poll');

app.get('/', function(req, res){
	res.send('Hello World! and happy new year');
});

app.get('/api/polls', function(req, res){
	Polls.getPolls(user, function(err, polls){
		if(err){
			throw err;
		}
		res.json(polls);
	});
});

app.get('/api/allpolls', function(req, res){
	Polls.getAllPolls(function(err, polls){
		if(err){
			throw err;
		}
		res.json(polls);
	});
});

app.get('/api/polls/:_id', function(req, res){
	Polls.getPollById(req.params._id, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

app.post('/api/polls', function(req, res){
	var poll = { 
			"Question": req.body.Question,
  			"Answer1": req.body.Answer1,
  			"Answer2": req.body.Answer2,
			"Answer3": req.body.Answer3,
			"Answer4": req.body.Answer4,
			"user": user};
	Polls.addPoll(poll, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

app.put('/api/polls/:_id', function(req, res){
	var id = req.params._id;
	var poll = req.body;
	Polls.updatePoll(id, poll, {}, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

app.delete('/api/polls/:_id', function(req, res){
	var id = req.params._id;
	Polls.deletePoll(id, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});
/////////////////////////////////////quiz

app.get('/api/quiz', function(req, res){
	Polls.getQuiz(user, function(err, quiz){
		if(err){
			throw err;
		}
		res.json(quiz);
	});
});

app.get('/api/allquiz', function(req, res){
	Polls.getAllQuiz(function(err, quiz){
		if(err){
			throw err;
		}
		res.json(quiz);
	});
});

app.get('/api/quizpoll/:_id', function(req, res){
	Polls.getQuizPolls(user, req.params._id, function(err, polls){
		if(err){
			throw err;
		}
		res.json(polls);
	});
});

app.get('/api/quiz/:_id', function(req, res){
	Polls.getQuizById(req.params._id, function(err, quiz){
		if(err){
			throw err;
		}
		res.json(quiz);
	});
});

app.post('/api/quiz', function(req, res){
	var quiz = { 
			"title": req.body.title,
			"user": user};
	Polls.addQuiz(quiz, function(err, poll){
		if(err){
			throw err;
		}
		res.json(quiz);
	});
});

app.put('/api/quiz/:_id', function(req, res){
	var id = req.params._id;
	var quiz = req.body;
	Polls.updateQuiz(id, quiz, {}, function(err, poll){
		if(err){
			throw err;
		}
		res.json(quiz);
	});
});

app.put('/api/answer1/:_id', function(req, res){
	var id = req.params._id;
	Polls.updateAnswer1(id, {}, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

app.put('/api/answer2/:_id', function(req, res){
	var id = req.params._id;
	Polls.updateAnswer2(id, {}, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

app.put('/api/answer3/:_id', function(req, res){
	var id = req.params._id;
	Polls.updateAnswer3(id, {}, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

app.put('/api/answer4/:_id', function(req, res){
	var id = req.params._id;
	Polls.updateAnswer4(id, {}, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});
app.delete('/api/quiz/:_id', function(req, res){
	var id = req.params._id;
	Polls.deleteQuiz(id, function(err, quiz){
		if(err){
			throw err;
		}
		res.json(quiz);
	});
});

app.post('/api/quizpoll/:_id', function(req, res){
	var poll = { 
			"Question": req.body.Question,
  			"Answer1": req.body.Answer1,
  			"Answer2": req.body.Answer2,
			"Answer3": req.body.Answer3,
			"Answer4": req.body.Answer4,
			"user": user,
			"quiz": req.params._id,
			"isQuizPoll":"yes"};
	Polls.addPoll(poll, function(err, poll){
		if(err){
			throw err;
		}
		res.json(poll);
	});
});

///////////////////////////port
app.listen(process.env.PORT || 5000);
console.log('Running on port 5000...');