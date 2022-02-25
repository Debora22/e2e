/**
 * @ngdoc overview
 * @name expireSession
 * @description
 * When a sessionEnded event is triggered, we clear the user cookie.
 * When a sessionInterrupted event is triggered, we clear the user cookie and redirect the user to the login page.
 * When a SessionUnauthorized event is triggered, we clear the user cookie, logout the user
 * and redirect to the login page.
 *
 * @param {$rootScope}      $rootScope       To remove the listeners on the $destroy event.
 * @param {$window}         $window          To change the location href property.
 * @param {AppErrorHandler} appErrorHandler  To display any error.
 * @param {AppSession}      appSession       To logout the user.
 * @param {FullStory}       fullStory        To clear the FullStory's cookies when the user is logged out.
 * @param {Heap}            heap             To Remove Heap events associated to this user.
 * @param {Intercom}        intercom         To close Intercom connection when the user is logged out.
 *
 * @memberof common
 */
const expireSession = (
  $rootScope,
  $window,
  appErrorHandler,
  appSession,
  fullStory,
  heap,
  intercom,
) => {
  'ngInject';

  /**
   * Handle the signout for all the services.
   *
   * @param {Boolean} [needsRedirection=false]  If we need to redirect to the login.
   */
  const signoutFromServices = (needsRedirection = false) => {
    fullStory.clearUserCookie();
    heap.clearUserEvents();
    intercom.clearUser();

    if (needsRedirection) {
      $window.location = '/login';
    }
  };

  const subscriptions = [
    appSession.onSessionEnded(() => {
      signoutFromServices();
    }),

    appSession.onSessionInterrupted(() => {
      signoutFromServices(true);
    }),

    appSession.onSessionUnauthorized(() => {
      signoutFromServices();

      appSession.signout()
      .catch((error) => appErrorHandler.silent(error))
      .then(() => {
        $window.location = `/login?unauthorized=yes&t=${Date.now()}`;
      });
    }),
  ];

  /**
   * Handle the sessionError message coming from photorank.
   *
   * @param {Event}  event       The message event.
   * @param {String} event.data  The data of the event.
   */
  const handler = ({ data }) => {
    if (data === 'sessionError') {
      signoutFromServices(true);
    }
  };

  $window.addEventListener('message', handler);

  $rootScope.$on('$destroy', () => {
    subscriptions.forEach((unsubscribeFn) => unsubscribeFn());
    $window.removeEventListener('message', handler);
  });
};

export default expireSession;
