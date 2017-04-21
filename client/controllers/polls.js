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
		var id = $routeParams.id;
		$http.get('/api/polls/'+id).then(function(response){
			console.log(response.data);
			$scope.poll= response.data;
		});
	}

	$scope.addPoll=function(){
		console.log($scope.poll);
		$http.post('/api/polls/', $scope.poll).then(function(response){
			if(response.data.success){
				window.location.href='#!/polls';
			}
			else{
				$scope.error=false;
			}
		});
	}

	$scope.updatePoll=function(){
		var id = $routeParams.id;
		$http.put('/api/polls/'+id, $scope.poll).then(function(response){
			if(response.data.success){
				window.location.href='#!/polls';
			}
			else{
				$scope.error=false;
			}
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
		var id = $routeParams.id;
		$http.get('/api/quiz/'+id).then(function(response){
			console.log(response.data);
			$scope.quiz= response.data;
		});
	}

	$scope.addQuiz=function(){
		console.log($scope.quiz);
		$http.post('/api/quiz/', $scope.quiz).then(function(response){
			if(response.data.success){
				window.location.href='#!/polls';
			}
			else{
				$scope.error=false;
			}
		});
	}

	$scope.updateQuiz=function(){
		var id = $routeParams.id;
		$http.put('/api/quiz/'+id, $scope.quiz).then(function(response){
			if(response.data.success){
				window.location.href='#!/polls';
			}
			else{
				$scope.error=false;
			}
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
			if(response.data.success){
				window.location.href='#!/quiz/details/'+id;
			}
			else{
				$scope.error=false;
			}
		});
	}

	$scope.getQuizPoll=function(){
		var id = $routeParams.id;
		$http.get('/api/quizpoll/'+id).then(function(response){
			console.log(response.data);
			$scope.quizpoll= response.data;
		});
	}

	$scope.getNextPoll=function(id){
		$http.get('/api/npoll/'+id).then(function(response){
			if(response.data!=null){
				$scope.poll= response.data;
				window.location.href='#!/quizpoll/details/'+$scope.poll._id;
			}
		});
	}

	$scope.getPreviousPoll=function(id){
		$http.get('/api/ppoll/'+id).then(function(response){
			if(response.data!=null){
				$scope.poll= response.data;
				window.location.href='#!/quizpoll/details/'+$scope.poll._id;
			}
		});
	}

	$scope.getSession=function(){
		$http.get('/api/session').then(function(response){
			$scope.qsession= response.data;
		});
	}

	$scope.createSession=function(){
		$http.post('/api/session').then(function(response){
			$scope.qsession= response.data;
			window.location.href="#!/quizpoll/details/"+$scope.qsession.question;
		});
	}

	$scope.updateSession=function(){
		$http.put('/api/session').then(function(response){
			$scope.qsession= response.data;
		});
	}

	$scope.endSession=function(){
		$http.delete('/api/session').then(function(response){
			$scope.quiz= response.data;
			window.location.href='#!/quiz/details/'+$scope.quiz;
		});
	}
	$scope.logoutUser=function(){
		$http.get('/api/logout').then(function(response){
			if(response.data.success){
				window.location.href='#';
			}
		});
	}
	$scope.resetAnswer=function(){
		var id = $routeParams.id;
		$http.put('/api/resetanswer/'+id, $scope.poll).then(function(response){
			window.location.href='#!/polls/details/'+id;
		});
	}

	$scope.resetQAnswer=function(){
		var id = $routeParams.id;
		$http.put('/api/resetanswer/'+id, $scope.poll).then(function(response){
			window.location.href='#!/quizpoll/details/'+id;
		});
	}

	$scope.resetQPAnswer=function(){
		var id = $routeParams.id;
		$http.put('/api/resetanswer/'+id, $scope.poll).then(function(response){
			window.location.href='#!/qp/details/'+id;
		});
	}

	$scope.refresh=function(){
		var id = $routeParams.id;
		$http.get('/api/polls/'+id).then(function(response){
			console.log(response.data);
			$scope.poll= response.data;
			window.location.href='#!/polls/details/'+id;
		});
	}
	$scope.qrefresh=function(){
		var id = $routeParams.id;
		$http.get('/api/polls/'+id).then(function(response){
			console.log(response.data);
			$scope.poll= response.data;
			window.location.href='#!/quizpoll/details/'+id;
		});
	}
	$scope.qprefresh=function(){
		var id = $routeParams.id;
		$http.get('/api/polls/'+id).then(function(response){
			console.log(response.data);
			$scope.poll= response.data;
			window.location.href='#!/qp/details/'+id;
		});
	}
	$scope.back=function(){
		window.history.back();
	}
}]);