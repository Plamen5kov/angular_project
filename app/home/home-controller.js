angular.module('issueTracker.home', [
        'issueTracker.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location, authentication) {
            if (authentication.isAuthenticated()) {
                // $location.path('/newsFeed');

            }
            
            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        // $location.path('/allProjects');     
                    });
            };
        }]);