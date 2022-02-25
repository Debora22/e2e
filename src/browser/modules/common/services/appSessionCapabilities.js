/**
 * @ngdoc service
 * @name appSessionCapabilities
 * @description
 * A service to provide extra capabilities around the app session.
 *
 * @memberof common
 */
class AppSessionCapabilities {
  /**
   * @param {AppSession} appSession  To get the current app session.
   */
  constructor(appSession) {
    'ngInject';

    /**
     * The local reference to the `appSession` service.
     *
     * @type {Object}
     */
    this.appSession = appSession;
  }
  /**
   * Get the user permissions.
   *
   * @return {Object} The user permissions.
   */
  getPermissions() {
    const { account, application } = this.getSession();
    return Object.assign({}, account.permissions, application ? application.permissions : {});
  }
  /**
   * Get the current app session.
   *
   * @return {Object} The app session.
   */
  getSession() {
    return this.appSession.getSession();
  }
  /**
   * Check if the user has certain permissions.
   *
   * @param {String|Array} names  The permissions to check.
   * @param {Boolean}      any    If we need to check if the user has all the permissions (false)
   *                              or at least one (true).
   *
   * @return {Boolean} If the user has the permissions.
   */
  hasPermissions(names, any = false) {
    const list = angular.isArray(names) ? names : [names];
    const permissions = this.getPermissions();
    return any ?
      list.some((name) => permissions[name] === true) :
      !list.some((name) => permissions[name] !== true);
  }
  /**
   * Check if the user has permissions to access a route.
   *
   * @param {String|Array} names  The permissions to check.
   *
   * @return {Boolean} If the user has the permissions.
   */
  hasRoutePermissions(names) {
    return !names.some((name) => !this.hasPermissions(name, angular.isArray(name)));
  }
  /**
   * Check if the provided user is the same that is authenticated.
   *
   * @param {Number} userId  The user id to check.
   *
   * @return {Boolean} If the user is the one that is authenticated.
   */
  isSelf(userId) {
    return this.getSession().user.id === userId;
  }
}

export default AppSessionCapabilities;
