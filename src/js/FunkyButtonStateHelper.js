
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
                }
            }

            return FunkyButtonStateHelper;
        }
    ]
);
