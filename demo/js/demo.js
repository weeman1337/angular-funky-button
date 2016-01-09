
var app = angular.module(
    'demo',
    [
        'ui.router',
        'angular-funky-button'
    ]
);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['demo']);
});
