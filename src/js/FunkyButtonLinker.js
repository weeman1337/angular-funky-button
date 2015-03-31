
angular.module('angular-funky-button').factory(
    'FunkyButtonLinker',
    [
        '$compile', 'funkyButton', 'FunkyButtonOptionsHelper', '$parse', '$log',
        function($compile, funkyButton, FunkyButtonOptionsHelper, $parse, $log) {

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
                $log.debug('FunkyButtonLinker');

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

                scope.options = FunkyButtonOptionsHelper.mergeOptions(funkyButton.options, scope.options);

                scope.fubuStateHelper.setDefault();

                element.bind('click', scope.rawClickHandler);
            }
        }
    ]
);
