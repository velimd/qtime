var myApp = angular.module('myApp');

myApp.controller('PollsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('PollsController loaded...');

	$scope.getPolls=function(){
		$http.get('/api/polls').then(function(response){
			console.log(response.data);
			$scope.polls= response.data;
		});
	}

	$scope.getPoll=function(){
		var id = $routeParams.id
		$http.get('/api/polls/'+id).then(function(response){
			console.log(response.data);
			$scope.poll= response.data;
		});
	}

	$scope.addPoll=function(){
		console.log($scope.poll);
		$http.post('/api/polls/', $scope.poll).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.updatePoll=function(){
		var id = $routeParams.id;
		$http.put('/api/polls/'+id, $scope.poll).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.removePoll=function(id){
		$http.delete('/api/polls/'+id).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.getQuizzes=function(){
		$http.get('/api/quiz').then(function(response){
			console.log(response.data);
			$scope.quizzes= response.data;
		});
	}

	$scope.getQuiz=function(){
		var id = $routeParams.id
		$http.get('/api/quiz/'+id).then(function(response){
			console.log(response.data);
			$scope.quiz= response.data;
		});
	}

	$scope.addQuiz=function(){
		console.log($scope.quiz);
		$http.post('/api/quiz/', $scope.quiz).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.updateQuiz=function(){
		var id = $routeParams.id;
		$http.put('/api/quiz/'+id, $scope.quiz).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.removeQuiz=function(id){
		$http.delete('/api/quiz/'+id).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.addQuizPoll=function(){
		var id = $routeParams.id;
		console.log(id);
		$http.post('/api/quizpoll/'+id, $scope.quizpoll).then(function(response){
			window.location.href='#!/polls';
		});
	}

	$scope.getQuizPoll=function(){
		var id = $routeParams.id
		$http.get('/api/quizpoll/'+id).then(function(response){
			console.log(response.data);
			$scope.quizpoll= response.data;
		});
	}
}]);