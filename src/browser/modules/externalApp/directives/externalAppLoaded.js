/**
 * @ngdoc directive
 * @name externalAppLoaded
 * @description
 * This directive allows us to use angular callback functions for HTML
 * elements supporting the "load" event, like iframes. It has a retry mechanism
 * to prevent to the race condition of Chrome canceling the load of the src.
 * For the case of iframe, the callback provided to this directive will
 * receive its original location in order to distinguish which iframe is
 * loading / triggering a function.
 *
 * @param {$timeout} $timeout          To check for if the app is loaded after some time.
 * @param {Object}   appConfiguration  To get the external apps urls configuration.
 *
 * @return {Object} The directive properties.
 *
 * @memberof externalApp
 */
const ExternalAppLoaded = (
  $timeout,
  appConfiguration,
) => {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      callback: '&externalAppLoaded',
    },
    link($scope, $element) {
      const [element] = Array.from($element);
      const maxRetries = 5;
      let appLoaded = false;
      let retry = 0;

      const isAppLoaded = () => {
        $timeout(() => {
          if (element && !appLoaded && retry < maxRetries) {
            // eslint-disable-next-line no-self-assign
            element.src = element.src;
            retry++;
            isAppLoaded();
          }
        }, appConfiguration.externalAppsWaitTime);
      };

      $element.on('load', () => {
        appLoaded = true;
        const contentLocation = $element.length && element.contentWindow ?
          element.contentWindow.location :
          undefined;

        $timeout(() => {
          $scope.callback({
            contentLocation,
          });
        });
      });

      isAppLoaded();
    },
  };
};

export default ExternalAppLoaded;
