/**
 * @ngdoc service
 * @name Heap
 * @description
 * This service works as interface of Heap to identify users sessions.
 *
 * @memberof common
 */
class Heap {
  /**
   * @param {$window}                $window                 To get the global Heap object.
   * @param {Object}                 appConfiguration        To get the Heap configuration.
   * @param {AppErrorHandler}        appErrorHandler         To display any error.
   * @param {WaitForExternalLibrary} waitForExternalLibrary  To know when the Heap service has been
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
     * The local reference to the `heapAnalytics` object.
     *
     * @type {Object}
     */
    this.heapAnalytics = appConfiguration.features.heapAnalytics;
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
  clearUserEvents() {
    if (this.heapAnalytics.enabled) {
      this.$window.heap.clearEventProperties();
    }
  }
  /**
   * Identify an account and user on Heap.
   *
   * @param {Object} account  The account to identify.
   * @param {Object} user     The user to identify.
   */
  identify(account, user) {
    if (this.heapAnalytics.enabled) {
      /*
       * name fallback based on Homer0's suggestion, he already hit that rock.
       * https://github.com/Olapic/ContentEngine-Admin/pull/10#discussion_r215475211
      */
      const name = user.name.replace(/"/g, '').trim() || user.email;

      this._load()
      .then(() => {
        this.$window.heap.addEventProperties({
          customer_id: account.id.toString(),
          customer_name: account.name,
        });

        this.$window.heap.addUserProperties({
          email: user.email,
          user_name: name,
        });
      })
      .catch((error) => this.appErrorHandler.silent(error));
    }
  }
  /**
   * Returns a `$q` promise that will be resolved when `window.heap` becomes available.
   *
   * @return {Promise}
   */
  _load() {
    return this.waitForExternalLibrary.toLoad('heap');
  }
}

export default Heap;
