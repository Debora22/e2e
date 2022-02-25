/**
 * @ngdoc service
 * @name Fullstory
 * @description
 * This service works as interface with FullStory to identify users
 * sessions on this system.
 *
 * @memberof common
 */
class Fullstory {
  /**
   * @param {$window}                $window                 To get the global FullStory object.
   * @param {Object}                 appConfiguration        To get the FullStory configuration.
   * @param {AppErrorHandler}        appErrorHandler         To display any error.
   * @param {WaitForExternalLibrary} waitForExternalLibrary  To know when the FullStory service has been
   *                                                         successfully started.
   */
  constructor(
    $window,
    appConfiguration,
    appErrorHandler,
    waitForExternalLibrary,
  ) {
    'ngInject';

    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The local reference to the `fullStory` object.
     *
     * @type {Object}
     */
    this.fullStory = appConfiguration.features.fullStory;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * Local reference to `waitForExternalLibrary` service.
     *
     * @type {WaitForExternalLibrary}
     */
    this.waitForExternalLibrary = waitForExternalLibrary;
  }
  /**
   * Clear Fullstory cookie.
   */
  clearUserCookie() {
    if (this.fullStory.enabled) {
      this._load()
      .then(() => {
        this.$window.FS.clearUserCookie();
      })
      .catch((error) => this.appErrorHandler.silent(error));
    }
  }
  /**
   * Identify an account and user on Fullstory.
   *
   * @param {Object} account  The account to identify.
   * @param {Object} user     The user to identify.
   */
  identify(account, user) {
    if (this.fullStory.enabled) {
      const name = user.name.replace(/"/g, '').trim() || user.email;

      this._load()
      .then(() => {
        this.$window.FS.identify(user.email, {
          email: user.email,
          displayName: name,
          brand_str: account.name,
          brandId_str: account.id.toString(),
        });
      })
      .catch((error) => this.appErrorHandler.silent(error));
    }
  }
  /**
   * Returns a `$q` promise that will be resolved when `window.FS` becomes available, in
   * order to prevent the usage of FS if the thing has not been loaded yet (async script,
   * network problems, whatever).
   *
   * @return {Promise}
   */
  _load() {
    return this.waitForExternalLibrary.toLoad('FS');
  }
}

export default Fullstory;
