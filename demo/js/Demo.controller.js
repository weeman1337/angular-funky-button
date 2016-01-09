(function() {
    'use strict';

    angular
        .module('demo')
        .controller('DemoController', DemoController);

    DemoController.$inject = ['$scope', '$timeout', '$q'];

    function DemoController($scope, $timeout, $q) {

        $scope.handlers = {};

        $scope.error = false;

        $scope.dismissError = false;

        $scope.work = function() {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve();
            }, 1500);
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
})();
