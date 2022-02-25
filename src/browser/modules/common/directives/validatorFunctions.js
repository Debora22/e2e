/**
 * @ngdoc directive
 * @name olapicValidatorFunctions
 * @restrict A
 * @description
 * Add custom function or expression validators to a form controller.
 * The function must return false or the expression be false for the controller to be in error.
 *
 * @example
 * <input olapic-validator-functions="{ 'fnValidation': $ctrl.validateFn, 'expressionValidation': false }" />
 *
 * @memberof common
 *
 * @return {Object} The directive properties.
 */
const validatorFunctions = () => ({
  require: 'ngModel',
  restrict: 'A',
  scope: {
    validatorFunctions: '<olapicValidatorFunctions',
  },
  link($scope, $element, $attr, ngModel) {
    Object.keys($scope.validatorFunctions).forEach((key) => {
      const validator = $scope.validatorFunctions[key];
      const isFn = angular.isFunction(validator);

      // For DOM -> model validation
      ngModel.$parsers.unshift((value) => {
        const valid = isFn ? validator(value) : validator;

        ngModel.$setValidity(key, valid);
        return value;
      });

      // For model -> DOM validation
      ngModel.$formatters.unshift((value) => {
        const valid = isFn ? validator(value) : validator;

        ngModel.$setValidity(key, valid);
        return value;
      });
    });
  },
});

export default validatorFunctions;
