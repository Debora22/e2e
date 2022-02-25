import { olapicSSOClient } from 'olapic-sso-client';

/**
 * @ngdoc service
 * @name appSession
 * @description
 * A service to handle the integration with the SSO.
 *
 * @memberof common
 */
class AppSession {
  /**
   * @param {$location} $location         To get the absolute url.
   * @param {Object}    appConfiguration  To get the sso configuration.
   * @param {AppEvents} appEvents         To listen for the app events.
   * @param {Object}    APP_EVENTS        The name of the app events to listen for.
   */
  constructor(
    $location,
    appConfiguration,
    appEvents,
    APP_EVENTS,
  ) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `appConfiguration` object.
     *
     * @type {Object}
     */
    this.appConfiguration = appConfiguration;
    /**
     * The local reference to the `appEvents` service.
     *
     * @type {AppEvents}
     */
    this.appEvents = appEvents;
    /**
     * The local reference to the `APP_EVENTS` constant.
     *
     * @type {Object}
     */
    this.APP_EVENTS = APP_EVENTS;

    this._configureSSOClient();
  }
  /**
   * Authenticate the user in the platform.
   *
   * @return {Promise} The authentication result promise.
   */
  authenticate() {
    olapicSSOClient.setConfig({
      callback: this.$location.absUrl(),
    });

    return olapicSSOClient.authenticate();
  }
  /**
   * Checks whether the user can switch the selected account.
   *
   * @return {Boolean}
   */
  canSwitchAccount() {
    return olapicSSOClient.canSwitchAccount();
  }
  /**
   * Get the current app session.
   *
   * @return {Object} The app session.
   */
  getSession() {
    return olapicSSOClient.getSession();
  }
  /**
   * Get if the user is authenticated.
   *
   * @return {Boolean} If the user is authenticated.
   */
  isAuthenticated() {
    return olapicSSOClient.isAuthenticated();
  }
  /**
   * Checks if the sessions is outdated or mnot.
   *
   * @return {Boolean}
   */
  isTheAccountOutdated() {
    return olapicSSOClient.isTheAccountOutdated();
  }
  /**
   * Execute a function when the sso account change event is emitted.
   * This event is emitted when the session account information is changed. This can happen in the
   * switch account process.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionAccountChange(fn) {
    return olapicSSOClient.on(olapicSSOClient.EVENTS.session.accountChange, fn);
  }
  /**
   * Execute a function when the sso change event is emitted.
   * This event is emitted when the session information is changed. This can happen in the
   * load, create, signout and update process.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionChange(fn) {
    return olapicSSOClient.on(olapicSSOClient.EVENTS.session.change, fn);
  }
  /**
   * Execute a function when the sso created event is emitted.
   * This event is emitted when the session information is successfully created.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionCreated(fn) {
    return olapicSSOClient.on(olapicSSOClient.EVENTS.session.creationSuccess, fn);
  }
  /**
   * Execute a function when the sso finish event is emitted.
   * This event is emitted when the session information has finished to be created.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionCreationFinishes(fn) {
    return olapicSSOClient.on(olapicSSOClient.EVENTS.session.creationFinish, fn);
  }
  /**
   * Execute a function when the sso start event is emitted.
   * This event is emitted when the session information is starting to be created.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionCreationStarts(fn) {
    return olapicSSOClient.on(olapicSSOClient.EVENTS.session.creationStart, fn);
  }
  /**
   * Execute a function when the sso end event is emitted.
   * This event is emitted when the user signout and the session information is
   * successfully cleared from the storage.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionEnded(fn) {
    return olapicSSOClient.once(olapicSSOClient.EVENTS.session.end, fn);
  }
  /**
   * Execute a function when the sso interrupted event is emitted.
   * This event is emitted when the session information is cleared by an external source.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionInterrupted(fn) {
    return olapicSSOClient.once(olapicSSOClient.EVENTS.session.interrupted, fn);
  }
  /**
   * Execute a function when the sso load event is emitted.
   * This event is emitted when the session information is successfully loaded from the storage.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionLoaded(fn) {
    return olapicSSOClient.on(olapicSSOClient.EVENTS.session.load, fn);
  }
  /**
   * Execute a function when the app event session unauthorized is emitted.
   * This event is emitted when a response with status unauthorized is intercepted.
   *
   * @param {Function} fn  The function to subscribe.
   *
   * @return {Function} The unsubscribe function.
   */
  onSessionUnauthorized(fn) {
    return this.appEvents.once(this.APP_EVENTS.session.unauthorized, fn);
  }
  /**
   * Refreshes the session information saved by the client.
   *
   * @return {Promise} The refresh session result promise.
   */
  refreshSession() {
    return olapicSSOClient.refreshSession();
  }
  /**
   * Signout the user in the platform.
   *
   * @return {Promise} The signout result promise.
   */
  signout() {
    return olapicSSOClient.signout();
  }
  /**
   * Removes the currently selected account and takes the user to the SSO,
   * where he/she can choose a new one.
   *
   * @return {Promise}  If the re-authentication was successful, it will resolve
   *                    the new session information, otherwise it will fail with an error.
   */
  switchAccount() {
    olapicSSOClient.setConfig({
      callback: `${this.$location.absUrl()}?redirect=${this.$location.previousRoute || '/'}`,
    });

    return olapicSSOClient.switchAccount();
  }
  /**
   * Configure the sso client.
   */
  _configureSSOClient() {
    const { sso } = this.appConfiguration;
    olapicSSOClient.setClientConfig({
      api: {
        url: sso.url,
      },
    });
    olapicSSOClient.setConfig(sso.settings);
  }
}

export default AppSession;
