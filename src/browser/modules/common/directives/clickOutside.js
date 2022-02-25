/**
 * @ngdoc directive
 * @name olapicClickOutside
 * @restrict A
 * @description
 * Execute a callback when clicking outside of an element.
 *
 * @example
 * <input olapic-click-outside="$ctrl.callback()" />
 *
 * @param {$window} $window  To add the message listener.
 *
 * @return {Object} The directive properties.
 *
 * @memberof common
 */
const clickOutside = ($window) => {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      onClickOutside: '&olapicClickOutside',
    },
    link($scope, $element) {
      const [element] = Array.from($element);

      /**
       * The handler for the click event.
       *
       * @param {Event} e  The click event.
       */
      const handler = (e) => {
        if (element === e.target || element.contains(e.target)) {
          return;
        }

        $scope.$apply(() => {
          $scope.onClickOutside();
        });
      };

      $window.addEventListener('click', handler, true);

      $scope.$on('$destroy', () => {
        $window.removeEventListener('click', handler, true);
      });
    },
  };
};

export default clickOutside;
