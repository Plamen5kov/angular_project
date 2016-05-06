angular.module('issueTracker.common', [])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        function($scope, identity) {
            var user = identity.getCurrentUser()
            if(user) {
                $scope.currentUser = user;
                $scope.isAuthenticated = true;
            }
        }]);