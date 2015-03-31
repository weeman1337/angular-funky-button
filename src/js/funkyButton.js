
angular.module('angular-funky-button').directive(
    'funkyButton',
    [
        'FunkyButtonLinker',
        function(FunkyButtonLinker) {
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
    ]
);
