'use strict';

/* Round Forms Directives */

var roundFormsDirectives = angular.module('RoundFormsDirectives', []);

roundFormsDirectives.directive('ngActive', function() {
    // directive description object
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs) {
            iElement.on('click', function () {
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

roundFormsDirectives.directive('ngIntegerTarotScore', function() {
    var INTEGER_REGEXP = /^\-?\d+$/;
    var MAX_VALUE = 91;
    // directive description object
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, ctrl) {
            // todo: ca rentre pas ici quand j'update l'autre input au blur!
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue) && viewValue <= MAX_VALUE) {
                    // it is valid
                    ctrl.$setValidity('integer-tarot-score', true);

                    if (ctrl.$name === 'attackScore') {
                        scope.Round.defenseScore = MAX_VALUE - viewValue;
                    } else {
                        scope.Round.attackScore = MAX_VALUE - viewValue;
                    }

                    iElement.parent().removeClass('has-error');
                    iElement.parent().addClass('has-success');
                    iElement.parent().next().removeClass('has-error');
                    iElement.parent().next().addClass('has-success');
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer-tarot-score', false);

                    if (ctrl.$name === 'attackScore') {
                        scope.Round.defenseScore = null;
                    } else {
                        scope.Round.attackScore = null;
                    }

                    iElement.parent().removeClass('has-success');
                    iElement.parent().addClass('has-error');
                    iElement.parent().next().removeClass('has-success');
                    iElement.parent().next().addClass('has-error');
                    return undefined;
                }
            });
        }
    }
});