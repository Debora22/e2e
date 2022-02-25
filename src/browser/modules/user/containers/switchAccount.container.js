/**
 * @ngdoc controller
 * @name SwitchAccountContainer
 * @description
 * This container handles the switch account.
 *
 * @memberof user
 */
class SwitchAccountContainer {
  /**
   * @param {$location}       $location        To redirect the user when the switch account process finishes.
   * @param {$timeout}        $timeout         To wait some time before redirecting.
   * @param {AppErrorHandler} appErrorHandler  To display any error.
   * @param {AppSession}      appSession       To perform the switch account.
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
   * Perform the switchAccount on component's init method.
   */
  $onInit() {
    this.appSession.switchAccount()
    .then(() => {
      this.$timeout(() => {
        let redirect = this.$location.search().redirect || '/';

        // Prevent the user from looping in the switch-account section.
        if (['/admin/accounts', '/switch-account'].includes(redirect)) {
          redirect = '/';
        }

        this.$location.url(redirect);
      });
    })
    .catch((error) => {
      this.appErrorHandler.silent(error);
      this.$location.url('/login');
    });
  }
}

/**
 * @ngdoc component
 * @name switchAccountContainer
 * @description
 * The switchAccount container.
 *
 * @memberof user
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SwitchAccountContainer}
   */
  controller: SwitchAccountContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: '<div class="odsSmallIndicator -fullHeight"></div>',
};
