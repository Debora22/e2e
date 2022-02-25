/**
 * @ngdoc directive
 * @name olapicFocusOn
 * @restrict A
 * @description
 * Focus the element based on the given expression.
 *
 * @example
 * <input olapic-focus-on="focusExpression" />
 *
 * @return {Object} The directive properties.
 *
 * @memberof common
 */
const focusOn = () => ({
  restrict: 'A',
  scope: {
    focusOn: '<olapicFocusOn',
  },
  link($scope, $element) {
    const [element] = Array.from($element);

    const stopWatch = $scope.$watch(() => $scope.focusOn, () => {
      if ($scope.focusOn) {
        element.focus();
      }
    });

    $scope.$on('$destroy', () => {
      stopWatch();
    });
  },
});

export default focusOn;
