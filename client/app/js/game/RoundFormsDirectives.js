'use strict';

/* Round Forms Directives */

var roundFormsDirectives = angular.module('RoundFormsDirectives', []);

roundFormsDirectives.directive('ngActive', function() {
    // directive description object
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, form) {
            iElement.on('click', function (evt) {
                var params = iAttrs.ngModel.split(".");

                var clickedValue;
                if (params.length == 2) {
                    clickedValue = scope[params[0]][params[1]];
                } else {
                    throw new Error("params.length must be equal to 2");
                }

                var children = iElement.children();

                for (var length=children.length, i=0 ; i<length ; i++) {
                    if ($(children[i]).data('value') == clickedValue) {
                        $(children[i]).addClass('active');
                    } else if ($(children[i]).hasClass('active')) {
                        $(children[i]).removeClass('active');
                    }
                }
            });
        }
    }
});

var INTEGER_REGEXP = /^\-?\d+$/;
roundFormsDirectives.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    elm.parent().removeClass('has-error');
                    elm.parent().addClass('has-success');
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer', false);
                    elm.parent().removeClass('has-success');
                    elm.parent().addClass('has-error');
                    return undefined;
                }
            });
        }
    };
});