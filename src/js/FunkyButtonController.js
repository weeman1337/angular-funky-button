
angular.module('angular-funky-button').controller(
    'FunkyButtonController',
    [
        '$scope', '$element', 'funkyButton', 'FunkyButtonStateHelper', '$timeout',
        function($scope, $element, funkyButton, FunkyButtonStateHelper, $timeout) {

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
                        urDismissSuccessWatch = $scope.$watch(function() {  return $scope.options.dismissSuccess($scope.$parent) }, function(dismissSuccess) {
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
                        urDismissErrorWatch = $scope.$watch(function() {  return $scope.options.dismissError($scope.$parent) }, function(dismissError) {
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
                } else if (result === true) {
                    onWorkSuccess();
                } else if (result.then !== undefined && typeof result.then === 'function') {
                    result.then(onWorkSuccess, onWorkError);
                } else {
                    throw new Error('fubu-click function must return true, false or a promise');
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

            $scope.rawClickHandler = function(event) {
                $scope.$apply(
                    function(scope) {
                        onClick();
                    }
                )
            }
        }
    ]
);