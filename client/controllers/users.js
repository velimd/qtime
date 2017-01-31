var myApp = angular.module('myApp');

myApp.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('UsersController loaded...');

	$scope.createUser=function(){
		console.log($scope.user);
		$http.post('/api/signup/', $scope.user).then(function(response){
			window.location.href='#!/';
		});
	}
	$scope.loginUser=function(){
		console.log($scope.user);
		$http.post('/api/authenticate/', $scope.user).then(function(response){
			if(response.data.success){
				window.location.href='#!/polls';
			}
			else{
				console.log("user not found");
			}
		});
	}
}]);