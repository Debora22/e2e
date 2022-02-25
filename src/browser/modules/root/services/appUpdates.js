/**
 * @ngdoc service
 * @name appUpdates
 * @description
 * A handy service that gets informed when the backend returns `409`, which means that a new version
 * has been released and that the app needs to be updated.
 *
 * @memberof rootModule
 */
class AppUpdates {
  constructor() {
    /**
     * The list of listener functions that need to be called when the app needs to be updated.
     *
     * @type {Array}
     * @ignore
     */
    this._listeners = [];
  }
  /**
   * Sets a callback function to be called any time the app needs to be updated.
   *
   * @param {Function} fn  The function to call. It doesn't receive any argument.
   *
   * @return {Function} An unsubscribe method to remove the callback.
   */
  onNewUpdate(fn) {
    this._listeners.push(fn);
    return () => {
      const index = this._listeners.indexOf(fn);
      if (index > -1) {
        this._listeners.splice(index, 1);
      }
    };
  }
  /**
   * Inform the service that the app needs to be updated and that all the listeners should be
   * informed.
   */
  theAppNeedsToBeUpdated() {
    this._listeners.forEach((fn) => fn());
  }
}

export default AppUpdates;
