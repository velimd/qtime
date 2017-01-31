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
	.otherwise({
		redirectTo: '/'
	});
});