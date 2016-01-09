(function() {
    'use strict';

    /**
     * @desc Defines the "funky-button" directive.
     */
    angular
        .module('angular-funky-button')
        .directive('funkyButton', funkyButton);

    funkyButton.$inject = ['FunkyButtonLinker'];

    function funkyButton(FunkyButtonLinker) {
        return {
            priority: 1,
            restrict: 'A',
            scope: {
                funkyButton: '=funkyButton',
                fubuClick: '&fubuClick'
            },
            transclude: true,
            link: FunkyButtonLinker,
            controller: 'FunkyButtonController'
        };
    }
})();
