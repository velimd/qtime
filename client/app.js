var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'UsersController',
		templateUrl: 'views/login.html'
	})
	.when('/signup',{
		controller:'UsersController',
		templateUrl: 'views/signup.html'
	})
	.when('/login',{
		controller:'UsersController',
		templateUrl: 'views/login.html'
	})
	.when('/polls',{
		controller:'PollsController',
		templateUrl: 'views/polls.html'
	})
	.when('/polls/details/:id',{
		controller:'PollsController',
		templateUrl: 'views/poll_details.html'
	})
	.when('/polls/add',{
		controller:'PollsController',
		templateUrl: 'views/add_poll.html'
	})
	.when('/polls/edit/:id',{
		controller:'PollsController',
		templateUrl: 'views/edit_poll.html'
	})
	.when('/quiz/add',{
		controller:'PollsController',
		templateUrl: 'views/add_quiz.html'
	})
	.when('/quiz/edit/:id',{
		controller:'PollsController',
		templateUrl: 'views/edit_quiz.html'
	})
	.when('/quiz/details/:id',{
		controller:'PollsController',
		templateUrl: 'views/quiz_details.html'
	})
	.when('/quiz/addpoll/:id',{
		controller:'PollsController',
		templateUrl: 'views/add_quizpoll.html'
	})
	.when('/quizpoll/details/:id',{
		controller:'PollsController',
		templateUrl: 'views/quizpoll_detail.html'
	})
	.when('/qp/details/:id',{
		controller:'PollsController',
		templateUrl: 'views/qp_details.html'
	})
	.when('/qp/edit/:id',{
		controller:'PollsController',
		templateUrl: 'views/edit_qp.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});