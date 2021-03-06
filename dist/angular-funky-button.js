(function() {
    'use strict';

    /**
     * "angular-funky-button" module definition.
     */
    angular.module('angular-funky-button', []);

    angular.module('angular-funky-button').provider(
        'funkyButton',
        function FunkyButtonProvider() {

            var self = this;

            this.dismissConfirm = 5000;
            this.dismissSuccess = 2500;
            this.dismissError = 2500;
            this.setWorkingTimeout = 100;

            this.classes = {

            };

            this.$get = [
                function() {
                    return {
                        options: {
                            dismissConfirm: self.dismissConfirm,
                            dismissSuccess: self.dismissSuccess,
                            dismissError: self.dismissError,
                            setWorkingTimeout: self.setWorkingTimeout,
                            classes: self.classes
                        }
                    };
                }
            ];
        }
    );
})();

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

(function() {
    'use strict';

    angular
        .module('angular-funky-button')
        .controller('FunkyButtonController', FunkyButtonController);

    FunkyButtonController.$inject = ['$scope', '$element', 'funkyButton', 'FunkyButtonStateHelper', '$timeout'];

    /**
     * Provides the controller logic of funky-button.
     *
     * @param $scope
     * @param $element
     * @param funkyButton
     * @param FunkyButtonStateHelper
     * @param $timeout
     * @constructor
     */
    function FunkyButtonController($scope, $element, funkyButton, FunkyButtonStateHelper, $timeout) {
        $scope.options = angular.copy(funkyButton.options);

        $scope.fubu = {};

        if ($scope.funkyButton !== undefined) {
            $scope.funkyButton = $scope.fubu;
        }

        $scope.fubu.dismissError = function() {
            if (errorTimeoutPromise !== undefined) {
                $timeout.cancel(errorTimeoutPromise);
            }
            $scope.fubuStateHelper.setDefault();
        };

        $scope.fubu.dismissSuccess = function() {
            if (successTimeoutPromise !== undefined) {
                $timeout.cancel(successTimeoutPromise);
            }
            $scope.fubuStateHelper.setDefault();
        };

        $scope.fubu.click = function() {
            onClick();
        };

        $scope.showDefault = false;
        $scope.showConfirm = false;
        $scope.showWorking = false;
        $scope.showSuccess = false;
        $scope.showError = false;

        $scope.fubu.state = 'default';

        var confirmTimeoutPromise;

        var successTimeoutPromise;

        var errorTimeoutPromise;

        $scope.fubuStateHelper = new FunkyButtonStateHelper($scope, $element, $scope.options);

        var urDismissSuccessWatch;
        function onWorkSuccess() {
            cancelSetWorkingTimeout();

            if ($scope.options.hasSuccessElement === true) {
                $scope.fubuStateHelper.setSuccess();

                var dismissSuccess = $scope.options.dismissSuccess;
                if (typeof dismissSuccess === 'function') {
                    dismissSuccess = dismissSuccess($scope.$parent);
                }

                if (dismissSuccess === false) {
                    urDismissSuccessWatch = $scope.$watch(function() { return $scope.options.dismissSuccess($scope.$parent); }, function(dismissSuccess) {
                        if (dismissSuccess === true) {
                            urDismissSuccessWatch();
                            $scope.fubuStateHelper.setDefault();
                        }
                    });
                } else if (dismissSuccess === true) {
                    $scope.fubuStateHelper.setDefault();
                } else if (dismissSuccess === 0) {

                } else {
                    successTimeoutPromise = $timeout(function () {
                        $scope.fubuStateHelper.setDefault();
                    }, $scope.options.dismissSuccess);
                }

            } else {
                $scope.fubuStateHelper.setDefault();
            }
        }

        function cancelSetWorkingTimeout() {
            if (setWorkingTimeoutPromise !== undefined) {
                $timeout.cancel(setWorkingTimeoutPromise);
            }
        }

        var urDismissErrorWatch;
        function onWorkError() {
            cancelSetWorkingTimeout();

            if ($scope.options.hasErrorElement === true) {
                $scope.fubuStateHelper.setError();

                var dismissError = $scope.options.dismissError;
                if (typeof dismissError === 'function') {
                    dismissError = dismissError($scope.$parent);
                }

                if (dismissError === false) {
                    urDismissErrorWatch = $scope.$watch(function() { return $scope.options.dismissError($scope.$parent); }, function(dismissError) {
                        if (dismissError === true) {
                            urDismissErrorWatch();
                            $scope.fubuStateHelper.setDefault();
                        }
                    });
                } else if (dismissError === true) {
                    $scope.fubuStateHelper.setDefault();
                } else if (dismissError === 0) {

                } else {
                    successTimeoutPromise = $timeout(function () {
                        $scope.fubuStateHelper.setDefault();
                    }, $scope.options.dismissError);
                }

            } else {
                $scope.fubuStateHelper.setDefault();
            }
        }

        function clickHandlerDefault() {
            if ($scope.options.hasConfirmElement === true) {
                clickHandlerDefaultWithConfirmElement();
            } else {
                clickHandlerDefaultWithoutConfirmElement();
            }
        }

        function clickHandlerDefaultWithConfirmElement() {
            $scope.fubuStateHelper.setConfirm();

            if ($scope.options.dismissConfirm !== 0 && $scope.options.dismissConfirm !== false) {
                confirmTimeoutPromise = $timeout(function() {
                    $scope.fubuStateHelper.setDefault();
                }, $scope.options.dismissConfirm);
            }
        }

        function clickHandlerDefaultWithoutConfirmElement() {
            fubuClick();
        }

        function clickHandlerConfirm() {
            if (confirmTimeoutPromise !== undefined) {
                $timeout.cancel(confirmTimeoutPromise);
            }
            fubuClick();
        }

        var setWorkingTimeoutPromise;
        function fubuClick() {

            setWorkingTimeoutPromise = $timeout($scope.fubuStateHelper.setWorking, $scope.options.setWorkingTimeout);

            var result = $scope.fubuClick();
            if (result === false) {
                onWorkError();
            } else if (typeof result === 'object' && result.then !== undefined && typeof result.then === 'function') {
                result.then(onWorkSuccess, onWorkError);
            } else {
                onWorkSuccess();
            }
        }

        function errorToDefault() {
            if (errorTimeoutPromise !== undefined) {
                $timeout.cancel(errorTimeoutPromise);
            }
            $scope.fubuStateHelper.setDefault();
        }

        function clickHandlerError() {
            if ($scope.options.dismissError !== undefined && typeof $scope.options.dismissError === 'function') {
                var dismissError = $scope.options.dismissError($scope.$parent);
                if (dismissError !== false) {
                    errorToDefault();
                }
            } else {
                if ($scope.options.dismissError !== false) {
                    errorToDefault();
                }
            }
        }

        function successToDefault() {
            if (successTimeoutPromise !== undefined) {
                $timeout.cancel(successTimeoutPromise);
            }
            $scope.fubuStateHelper.setDefault();
        }

        function clickHandlerSuccess() {
            if ($scope.options.dismissSuccess !== undefined && typeof $scope.options.dismissSuccess === 'function') {
                var dismissSuccess = $scope.options.dismissSuccess($scope.$parent);
                if (dismissSuccess !== false) {
                    successToDefault();
                }
            } else {
                if ($scope.options.dismissSuccess !== false) {
                    successToDefault();
                }
            }
        }

        function clickHandlerWorking() {
        }

        function onClick() {
            switch ($scope.fubu.state) {
                case 'default':
                    clickHandlerDefault();
                    break;
                case 'confirm':
                    clickHandlerConfirm();
                    break;
                case 'error':
                    clickHandlerError();
                    break;
                case 'success':
                    clickHandlerSuccess();
                    break;
                case 'working':
                    clickHandlerWorking();
                    break;
            }

        }

        $scope.rawClickHandler = function() {
            $scope.$apply(
                function() {
                    onClick();
                }
            );
        };
    }
})();

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

(function() {
    'use strict';

    angular.module('angular-funky-button').factory(
        'FunkyButtonStateHelper',
        [
            function() {

                function FunkyButtonStateHelper($scope, $element, options) {
                    this.setDefault = function() {
                        $element[0].blur();

                        $scope.fubu.state = 'default';

                        $element.removeClass(options.classes.confirm);
                        $element.removeClass('fubu-confirm');
                        $element.removeClass(options.classes.working);
                        $element.removeClass('fubu-working');
                        $element.removeClass(options.classes.success);
                        $element.removeClass('fubu-success');
                        $element.removeClass(options.classes.error);
                        $element.removeClass('fubu-error');

                        $element.addClass(options.classes.default);
                        $element.addClass('fubu-default');

                        $scope.showDefault = true;
                        $scope.showConfirm = false;
                        $scope.showWorking = false;
                        $scope.showSuccess = false;
                        $scope.showError = false;
                    };

                    this.setConfirm = function() {
                        $element[0].blur();

                        $scope.fubu.state = 'confirm';

                        $element.removeClass(options.classes.default);
                        $element.removeClass('fubu-default');
                        $element.removeClass(options.classes.working);
                        $element.removeClass('fubu-working');
                        $element.removeClass(options.classes.success);
                        $element.removeClass('fubu-success');
                        $element.removeClass(options.classes.error);
                        $element.removeClass('fubu-error');

                        $element.addClass(options.classes.confirm);
                        $element.addClass('fubu-confirm');

                        $scope.showDefault = false;
                        $scope.showConfirm = true;
                        $scope.showWorking = false;
                        $scope.showSuccess = false;
                        $scope.showError = false;
                    };

                    this.setWorking = function() {
                        $element[0].blur();

                        $scope.fubu.state = 'working';

                        $element.removeClass(options.classes.default);
                        $element.removeClass('fubu-default');
                        $element.removeClass(options.classes.confirm);
                        $element.removeClass('fubu-confirm');
                        $element.removeClass(options.classes.success);
                        $element.removeClass('fubu-success');
                        $element.removeClass(options.classes.error);
                        $element.removeClass('fubu-error');

                        $element.addClass(options.classes.working);
                        $element.addClass('fubu-working');

                        $scope.showDefault = false;
                        $scope.showConfirm = false;
                        $scope.showWorking = true;
                        $scope.showSuccess = false;
                        $scope.showError = false;
                    };

                    this.setSuccess = function() {
                        $element[0].blur();

                        $scope.fubu.state = 'success';

                        $element.removeClass(options.classes.default);
                        $element.removeClass('fubu-default');
                        $element.removeClass(options.classes.confirm);
                        $element.removeClass('fubu-confirm');
                        $element.removeClass(options.classes.working);
                        $element.removeClass('fubu-working');
                        $element.removeClass(options.classes.error);
                        $element.removeClass('fubu-error');

                        $element.addClass(options.classes.success);
                        $element.addClass('fubu-success');

                        $scope.showDefault = false;
                        $scope.showConfirm = false;
                        $scope.showWorking = false;
                        $scope.showSuccess = true;
                        $scope.showError = false;
                    };

                    this.setError = function() {
                        $element[0].blur();

                        $scope.fubu.state = 'error';

                        $element.removeClass(options.classes.default);
                        $element.removeClass('fubu-default');
                        $element.removeClass(options.classes.confirm);
                        $element.removeClass('fubu-confirm');
                        $element.removeClass(options.classes.working);
                        $element.removeClass('fubu-working');
                        $element.removeClass(options.classes.success);
                        $element.removeClass('fubu-success');

                        $element.addClass(options.classes.error);
                        $element.addClass('fubu-error');

                        $scope.showDefault = false;
                        $scope.showConfirm = false;
                        $scope.showWorking = false;
                        $scope.showSuccess = false;
                        $scope.showError = true;
                    };
                }

                return FunkyButtonStateHelper;
            }
        ]
    );
})();
