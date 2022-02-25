/**
 * @ngdoc component
 * @name olapicCopyToClipboard
 * @restrict A
 * @description
 * Directive that copy text to the clipboard.
 *
 * @example
 * <a
 *   olapic-copy-to-clipboard="Some text to be copied"
 *   olapic-copy-to-clipboard-after-copy="$ctrl.copyResultHandler(success)"
 * >Copy text</a>
 *
 * @param {$window} $window  To get the selected text and document.
 *
 * @return {Object} The directive properties.
 *
 * @memberof common
 */
const copyToClipboard = ($window) => {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      text: '@olapicCopyToClipboard',
      onCopy: '&?olapicCopyToClipboardAfterCopy',
    },
    link: (scope, element) => {
      element.on('click', () => {
        try {
          // Assign the selection object and clear any selected text.
          const selection = $window.getSelection();
          selection.removeAllRanges();

          // Create a new element that will contain the text to be copied.
          const textNode = $window.document.createElement('div');
          textNode.textContent = scope.text;
          textNode.style.cssText = 'opacity:0'; // we can't use display since it won't be visible to copy.
          $window.document.body.appendChild(textNode);

          // Put the recently created element into a new range.
          const range = $window.document.createRange();
          range.selectNodeContents(textNode);

          // Apply the text selection and copy the text.
          selection.addRange(range);
          $window.document.execCommand('copy');

          // Finally, we clear the selection and remove the element.
          selection.removeAllRanges();
          textNode.remove();

          scope.$apply(() => {
            if (scope.onCopy) {
              scope.onCopy({ success: true });
            }
          });
        } catch (err) {
          scope.$apply(() => {
            if (scope.onCopy) {
              scope.onCopy({ success: false });
            }
          });
        }
      });
    },
  };
};

export default copyToClipboard;
