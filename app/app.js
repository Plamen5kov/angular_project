'use strict';

angular.module('issueTracker', [
        'ngRoute',
        'ngCookies',
        'issueTracker.common',
        'issueTracker.common.footer',
        'issueTracker.common.validation',
        'issueTracker.common.datepicker',
        'issueTracker.home',
        'issueTracker.users.identity'
    ])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
        
        $httpProvider.interceptors.push(['$q','toastr', function($q, toastr) {
            return {
                'responseError': function(rejection) {
                    if (rejection.data && rejection.data['error_description']) {
                        toastr.error(rejection.data['error_description']);
                    }
                    else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']){
                        var errors = rejection.data.modelState[''];
                        if (errors.length > 0) {
                            toastr.error(errors[0]);
                        }
                    }
                    
                    return $q.reject(rejection);
                }
            }
        }]);
    }])
    .run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('/');
            }
        });
        
        authentication.refreshCookie();
    }])
    .constant('jQuery', $)
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
