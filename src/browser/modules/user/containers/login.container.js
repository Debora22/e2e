/**
 * @ngdoc controller
 * @name LoginContainer
 * @description
 * This container handles the login.
 *
 * @memberof user
 */
class LoginContainer {
  /**
   * @param {$location}       $location        To redirect the user when the authenticate process finishes.
   * @param {$timeout}        $timeout         To wait some time before redirecting.
   * @param {AppErrorHandler} appErrorHandler  To display any error.
   * @param {AppSession}      appSession       To perform the authenticate.
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
   * Perform the authenticate on component's init method.
   */
  $onInit() {
    this.appSession.authenticate()
    .then(() => {
      this.$timeout(() => {
        this.$location.url(this.$location.search().redirect || '/');
      });
    })
    .catch((error) => this.appErrorHandler.silent(error));
  }
}

/**
 * @ngdoc component
 * @name loginContainer
 * @description
 * The login container.
 *
 * @memberof user
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {LoginContainer}
   */
  controller: LoginContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: '<div class="odsSmallIndicator -fullHeight"></div>',
};
