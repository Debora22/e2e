/**
 * @ngdoc service
 * @name Intercom
 * @description
 * This service works as interface with Intercom to identify users sessions.
 *
 * @memberof common
 */
class Intercom {
  /**
   * @param {$window}                $window                 To get the global Intercom object.
   * @param {Object}                 appConfiguration        To get the Intercom configuration.
   * @param {AppErrorHandler}        appErrorHandler         To display any error.
   * @param {WaitForExternalLibrary} waitForExternalLibrary  To know when the Intercom service has been
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
     * The local reference to the `intercom` object.
     *
     * @type {Object}
     */
    this.intercom = appConfiguration.features.intercom;
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
   * Clears user info associated to the current session. This will be triggered
   * everytime the user logs out or switches customer.
   */
  clearUser() {
    if (this.intercom.enabled) {
      this.$window.Intercom('shutdown');
    }
  }
  /**
   * Identify an account and user on Intercom.
   *
   * @param {Object} account  The account to identify.
   * @param {Object} user     The user to identify.
   */
  identify(account, user) {
    if (this.intercom.enabled) {
      const name = user.name.replace(/"/g, '').trim() || user.email;

      this._load()
      .then(() => {
        this.$window.Intercom('boot', {
          app_id: this.intercom.id,
          name,
          email: user.email,
          company: {
            id: account.id.toString(),
            name: account.name,
          },
        });
      })
      .catch((error) => this.appErrorHandler.silent(error));
    }
  }
  /**
   * Track an event on Intercom.
   *
   * @param {String} event  The event to track.
   */
  trackEvent(event) {
    if (this.intercom.enabled) {
      this.$window.Intercom('trackEvent', event);
    }
  }
  /**
   * Returns a `$q` promise that will be resolved when `window.Intercom` becomes available, in
   * order to prevent the usage of Intercom if the thing has not been loaded yet (async script,
   * network problems, whatever).
   *
   * @return {Promise}
   */
  _load() {
    return this.waitForExternalLibrary.toLoad('Intercom');
  }
}

export default Intercom;
