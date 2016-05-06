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
            if(!authentication.isAuthenticated()) {
                $location.path("/")
            }
			$scope.navMessage = "this is all projects page!";
		}
	])