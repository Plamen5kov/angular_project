angular.module('issueTracker.common', [])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        function($scope, identity) {
            identity.getCurrentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                    $scope.isAuthenticated = true;
                });
        }]);