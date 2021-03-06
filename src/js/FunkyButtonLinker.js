(function() {
    'use strict';

    angular
        .module('angular-funky-button')
        .factory('FunkyButtonLinker', FunkyButtonLinker);

    FunkyButtonLinker.$inject = ['$compile', 'funkyButton', '$parse'];

    /**
     * Contains all DOM manipulations of the funky-button directive.
     *
     * @param $compile
     * @param funkyButton
     * @param $parse
     * @returns {Function}
     * @constructor
     */
    function FunkyButtonLinker($compile, funkyButton, $parse) {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function linkFunkyElement(scope, element, funkyElement, funkyType) {
            var wrapperElement = angular.element('<' + funkyElement.nodeName + '></' + funkyElement.nodeName + '>');
            wrapperElement.attr('ng-show', 'show' + capitalizeFirstLetter(funkyType) + ' === true');
            $compile(wrapperElement)(scope);

            scope.options['has' + capitalizeFirstLetter(funkyType) + 'Element'] = true;

            if (funkyElement.hasAttribute('fubu-dismiss') === true) {
                scope.options['dismiss' + capitalizeFirstLetter(funkyType)] = $parse(funkyElement.getAttribute('fubu-dismiss'));
                funkyElement.removeAttribute('fubu-dismiss');
            }

            if (funkyElement.hasAttribute('fubu-class') === true) {
                scope.options.classes[funkyType] = funkyElement.getAttribute('fubu-class');
                scope.options['has' + capitalizeFirstLetter(funkyType) + 'Element'] = true;
                funkyElement.removeAttribute('fubu-class');
            }

            funkyElement.removeAttribute('fubu-' + funkyType);
            wrapperElement.append(funkyElement);

            element.append(wrapperElement);
        }

        return function(scope, element, attributes, controller, transclude) {
            element.addClass('funky-button');

            transclude(function(clone) {
                angular.forEach(clone, function(funkyElement) {

                    if (funkyElement.nodeType === 1) {
                        if (funkyElement.hasAttribute('fubu-default') === true) {
                            linkFunkyElement(scope, element, funkyElement, 'default');
                        } else if (funkyElement.hasAttribute('fubu-confirm') === true) {
                            linkFunkyElement(scope, element, funkyElement, 'confirm');
                        } else if (funkyElement.hasAttribute('fubu-working') === true) {
                            linkFunkyElement(scope, element, funkyElement, 'working');
                        } else if (funkyElement.hasAttribute('fubu-success') === true) {
                            linkFunkyElement(scope, element, funkyElement, 'success');
                        } else if (funkyElement.hasAttribute('fubu-error') === true) {
                            linkFunkyElement(scope, element, funkyElement, 'error');
                        }
                    }
                });
            });

            angular.merge(scope.options, funkyButton.options);
            scope.fubuStateHelper.setDefault();

            element.bind('click', scope.rawClickHandler);
        };
    }
})();
