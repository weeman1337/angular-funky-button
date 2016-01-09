(function() {
    'use strict';

    /**
     * @desc "angular-funky-button" module definition.
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
