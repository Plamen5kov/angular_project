angular.module("issueTracker.allProjects", ["issueTracker.users.authentication"])
	.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/allProjects', {
            templateUrl: 'app/projects/all-projects.html',
            controller: 'AllProjectsCtrl'
        });
    }])
	.controller("AllProjectsCtrl", [
		"$scope",
        "$location",
        "authentication",
		function allPRojectsCtrl($scope, $location, authentication) {
            
            console.log('loading app projects and we are authenticated: ' + authentication.isAuthenticated());
            if(!authentication.isAuthenticated()) {
                $location.path("/")
            }
            $scope.isAuthenticated = authentication.isAuthenticated();
			$scope.navMessage = "this is all projects page!";
		}
	])