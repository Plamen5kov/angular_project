angular.module("issueTracker.common", [])
    .controller("MainCtrl", [
        "$scope",
        "identity",
        "authentication",
        function($scope, identity, authentication) {
            console.log("passing trhough main controller: auth?: "+ authentication.isAuthenticated())
            if(authentication.isAuthenticated()) {
                $scope.isAuthenticated = true;
            }
        }]);