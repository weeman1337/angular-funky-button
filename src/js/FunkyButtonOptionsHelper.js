(function() {
    'use strict';

    angular.module('angular-funky-button').factory(
        'FunkyButtonOptionsHelper',
        function() {
            return {
                mergeOptions: function(defaults, options) {
                    var self = this;

                    var mergedOptions = angular.copy(defaults);

                    if (typeof options === 'object') {
                        angular.forEach(options, function(value, prop) {
                            if (typeof prop === 'object') {
                                mergedOptions[prop] = self.mergeOptions(defaults[prop], prop);
                            } else {
                                mergedOptions[prop] = value;
                            }
                        });
                    }

                    return mergedOptions;
                }
            };
        }
    );
})();
