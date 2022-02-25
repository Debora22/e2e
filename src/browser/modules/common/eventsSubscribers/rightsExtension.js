/**
 * @ngdoc overview
 * @name rightsExtension
 * @description
 * When an instagramData message is received, update the instagramProfile of the rights extension.
 * When an mediaUpdate message is received, inform the media update to the service.
 *
 * @param {$rootScope}      $rootScope       To remove the listeners on the $destroy event.
 * @param {$window}         $window          To add the message listener.
 * @param {RightsExtension} rightsExtension  To update the instagramProfile.
 *
 * @memberof common
 */
const rightsExtensionSubscriber = (
  $rootScope,
  $window,
  rightsExtension,
) => {
  'ngInject';

  /**
   * Handle the message events (instagramData and mediaUpdate) coming
   * from the rights extension.
   *
   * @param {Event}  event       The message event.
   * @param {String} event.data  The data of the event.
   */
  const handler = ({ data }) => {
    // We need to use the $apply since the $window.addEventListener is outside the angular scope.
    $rootScope.$root.$apply(() => {
      if (data && data.type === 'instagramData') {
        rightsExtension.setInstagramProfile(data.data);
      } else if (data && data.type === 'mediaUpdate') {
        rightsExtension.triggerMediaUpdate(data.data);
      }
    });
  };

  $window.addEventListener('message', handler);

  $rootScope.$on('$destroy', () => {
    $window.removeEventListener('message', handler);
  });
};

export default rightsExtensionSubscriber;
