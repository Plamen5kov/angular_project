    angular.module('issueTracker.users.authentication', [])
        .factory('authentication', [
            '$http',
            '$cookies',
            '$q',
            '$location',
            'identity',
            "$rootScope",
            'BASE_URL',
            function($http, $cookies, $q, $location, identity, $rootScope, BASE_URL) {
                
                var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';
                
                function preserveUserData(data) {
                    console.log("preserving user data: ")
                    console.log(data);
                    var accessToken = data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                }
                
                function registerUser(user) {
                    var deferred = $q.defer();
                    
                    $http.post(BASE_URL + 'api/Account/Register', user)
                        .then(function(response) {
                            identity.requestUserProfile(user)
                                .then(function(tokenData) {
                                    deferred.resolve(response.data);
                                    preserveUserData(tokenData);
                                    $rootScope.isAuthenticated = true;
                                });
                        });
                    
                    return deferred.promise;
                }
                
                function isAuthenticated() {
                    return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
                }
                
                function logout() {
                    $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                    $http.defaults.headers.common.Authorization = undefined;
                    identity.removeUserProfile();
                    $location.path('/');
                }
                
                function refreshCookie() {
                    if (isAuthenticated()) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                        identity.requestUserProfile(angular.fromJson(sessionStorage.currentUser));
                    }
                }
                
                return {
                    registerUser: registerUser,
                    isAuthenticated: isAuthenticated,
                    refreshCookie: refreshCookie,
                    logout: logout
                }
        }]);