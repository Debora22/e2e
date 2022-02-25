/**
 * @ngdoc directive
 * @name olapicElastic
 * @restrict A
 * @description
 * Detect model changes in the element and window resizes,
 * and grow or shrink the element accordingly.
 *
 * @example
 * <input olapic-focus-on="focusExpression" />
 * <textarea ng-model="$ctrl.text" olapic-elastic></textarea>
 *
 * @param {$window} $window  To add the message listener.
 *
 * @return {Object} The directive properties.
 *
 * @memberof common
 */
const elastic = ($window) => {
  'ngInject';

  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      focusOn: '<olapicFocusOn',
    },
    link($scope, $element, $attr, ngModel) {
      const element = $element[0];

      const resize = () => {
        const { scrollHeight } = element;
        element.style.height = `${scrollHeight}px`;

        if (scrollHeight === element.scrollHeight) {
          /**
           * We are done resizing, we must normalize the height,
           * since sometimes the scrollHeight is different than
           * the number of lines * lineHeight.
           *
           * @ignore
           */
          const style = $window.getComputedStyle(element);
          const lineHeight = parseInt(style.lineHeight, 10) || 1;
          const paddingTop = parseInt(style.paddingTop, 10) || 0;
          const paddingBottom = parseInt(style.paddingTop, 10) || 0;
          const borderTop = parseInt(style.borderTop, 10) || 0;
          const borderBottom = parseInt(style.borderBottom, 10) || 0;

          // The inner height is the scrollHeight minus the paddingTop,
          // paddingBottom, borderTop and borderBottom
          let times = scrollHeight - paddingTop - paddingBottom - borderTop - borderBottom;
          // Round up the number of times the lineHeight
          times = Math.ceil(times / lineHeight);

          const height = (times * lineHeight) + paddingTop + paddingBottom + borderTop + borderBottom;
          element.style.height = `${height}px`;
        } else {
          /**
           * As we resize, the scrollHeight can change to shrink more space,
           * so we must resize again.
           *
           * @ignore
           */
          resize();
        }
      };

      const stopWatch = $scope.$watch(() => ngModel.$modelValue, resize);
      $window.addEventListener('resize', resize);

      $scope.$on('$destroy', () => {
        stopWatch();
        $window.removeEventListener('resize', resize);
      });
    },
  };
};

export default elastic;
