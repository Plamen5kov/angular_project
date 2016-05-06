angular.module('issueTracker.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        "$httpParamSerializer",
        'BASE_URL',
        function($http, $q, $httpParamSerializer, BASE_URL) {
        
            var deferred = $q.defer();
        
            var currentUser = undefined;
        
            return {
                getCurrentUser: function () {
                    var userFromSs = sessionStorage.currentUser;
                    return userFromSs;
                },
                removeUserProfile: function() {
                    console.log("something removing the current user")
                    currentUser = undefined;
                },
                requestUserProfile: function(user) {
                    sessionStorage.currentUser = angular.toJson(user);
                    var userProfileDeferred = $q.defer();

                    var apiTokenBody = {
                        "username": user.email,
                        "password": user.password,
                        "grant_type": "password"
                    }

                    $http({
                        method: "POST",
                        url: BASE_URL + 'api/Token',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data : $httpParamSerializer(apiTokenBody)
                    })
                    .then(function(response) {
                        currentUser = response.data;
                        deferred.resolve(currentUser);
                        userProfileDeferred.resolve(currentUser);
                    });
                        
                    return userProfileDeferred.promise;
                }
            };
    }]);