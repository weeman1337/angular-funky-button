(function() {
    'use strict';

    angular
        .module('demo')
        .config(setupRoutes);

    setupRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function setupRoutes($stateProvider, $urlRouterProvider) {

        // For any unmatched url show the demo
        $urlRouterProvider.otherwise("/demo");

        $stateProvider.state('demo', {
            url: '/demo',
            templateUrl: 'partials/demo.html',
            controller: 'DemoController'
        });

        $stateProvider.state('docs', {
            url: '/docs',
            templateUrl: 'partials/docs.html'
        });
    }
})();
