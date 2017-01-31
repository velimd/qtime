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
}]);