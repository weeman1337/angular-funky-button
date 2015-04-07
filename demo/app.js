
var app = angular.module(
    'app',
    [
        'angular-funky-button'
    ]
);

app.controller(
    'DemoController',
    [
        '$scope', '$timeout', '$q', '$log',
        function($scope, $timeout, $q, $log) {

            $scope.handlers = {};

            $scope.error = false;

            $scope.dismissError = false;

            $scope.work = function() {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve();
                }, 1000);
                return deferred.promise;
            };

            $scope.workShort = function() {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve();
                }, 75);
                return deferred.promise;
            };

            $scope.workWithoutPromise = function() {
                return true;
            };

            $scope.handlers.dismissError = function() {
                $scope.error = false;
                $scope.dismissError = true;
            };

            $scope.workError = function() {
                $scope.error = false;
                $scope.dismissError = false;

                var deferred = $q.defer();
                $timeout(function() {
                    $scope.error = true;
                    deferred.reject();
                }, 1000);
                return deferred.promise;
            }
        }
    ]
);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});
