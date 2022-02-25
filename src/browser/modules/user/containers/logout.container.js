/**
 * @ngdoc controller
 * @name LogoutContainer
 * @description
 * This container handles the logout.
 *
 * @memberof user
 */
class LogoutContainer {
  /**
   * @param {$location}       $location        To redirect the user when the signout process finishes.
   * @param {$timeout}        $timeout         To wait some time before redirecting.
   * @param {AppErrorHandler} appErrorHandler  To display any error.
   * @param {AppSession}      appSession       To perform the signout.
   */
  constructor(
    $location,
    $timeout,
    appErrorHandler,
    appSession,
  ) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appSession` service.
     *
     * @type {AppSession}
     */
    this.appSession = appSession;
  }
  /**
   * Perform the signout on component's init method.
   */
  $onInit() {
    this.appSession.signout()
    .then(() => {
      this.$timeout(() => {
        this.$location.url('/');
      });
    })
    .catch((error) => {
      this.appErrorHandler.silent(error);
      this.$location.url('/');
    });
  }
}

/**
 * @ngdoc component
 * @name logoutContainer
 * @description
 * The logout container.
 *
 * @memberof user
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {LogoutContainer}
   */
  controller: LogoutContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: '<div class="odsSmallIndicator -fullHeight"></div>',
};
