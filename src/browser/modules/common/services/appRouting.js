/**
 * @ngdoc service
 * @name appRouting
 * @description
 * A service to handle the app errors.
 *
 * @memberof common
 */
class AppRouting {
  /**
   * @param {$location}              $sanitize               To sanitize the redirect path.
   * @param {AppSession}             appSession              To check if the user is authenticated.
   * @param {AppSessionCapabilities} appSessionCapabilities  To check if the user has permissions for the route.
   */
  constructor(
    $sanitize,
    appSession,
    appSessionCapabilities,
  ) {
    'ngInject';

    /**
     * The local reference to the `$sanitize` service.
     *
     * @type {$sanitize}
     */
    this.$sanitize = $sanitize;
    /**
     * The local reference to the `appSession` service.
     *
     * @type {AppSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `appSessionCapabilities` service.
     *
     * @type {AppSessionCapabilities}
     */
    this.appSessionCapabilities = appSessionCapabilities;
  }
  /**
   * Validate if the authenticated user has permissions to access a route.
   *
   * @param {Object} route              The route to validate.
   * @param {String} fallbackURL        The url to redirect to if the validation fails.
   * @param {String} authenticationURL  The url to redirect to if the user is not authenticated.
   * @param {String} redirectPath       The path to redirect to if the user is not authenticated.
   *
   * @return {Object} The result of validating the route.
   */
  validate(route, fallbackURL = '/', authenticationURL = '/login', redirectPath) {
    const result = {
      allowed: false,
      denied: true,
      redirectTo: '',
    };

    const opts = {
      requiresAnonymous: false,
      requiresAuth: true,
      requiresPermissions: [],
      requiresSwitchAccountEnabled: false,
    };

    Object.keys(opts).forEach((name) => {
      if (angular.isDefined(route[name])) {
        opts[name] = route[name];
      }
    });

    if (opts.requiresAnonymous) {
      opts.requiresAuth = false;
      opts.requiresPermissions = [];
    } else if (opts.requiresAuth) {
      opts.requiresAnonymous = false;
    }

    const isAuthenticated = this.appSession.isAuthenticated();
    if (opts.requiresAuth && !isAuthenticated) {
      const redirect = this.$sanitize(encodeURIComponent(route.redirectPath || redirectPath));
      result.redirectTo = `${authenticationURL}?redirect=${redirect}`;
    } else if (this._checkAuthPermission(opts, isAuthenticated)) {
      result.redirectTo = route.fallbackURL || fallbackURL;
    } else {
      result.allowed = true;
    }

    result.denied = !result.allowed;

    return result;
  }
  /**
   * Check if the route is not compliant with the anonymous rule and permissions.
   *
   * @param {Object}  opts             The route config object.
   * @param {Boolean} isAuthenticated  If the user is authenticated or not.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _checkAuthPermission(opts, isAuthenticated) {
    return (
      opts.requiresAnonymous &&
      isAuthenticated
    ) || (
      opts.requiresPermissions &&
      !this.appSessionCapabilities.hasRoutePermissions(opts.requiresPermissions)
    ) || (
      opts.requiresSwitchAccountEnabled &&
      !this.appSession.canSwitchAccount()
    );
  }
}

export default AppRouting;
