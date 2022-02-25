/**
 * @ngdoc service
 * @name waitForExternalLibrary
 * @description
 * This service waits for external libraries to be available,
 * if after a second is not loaded the promise will fail.
 *
 * @memberof common
 */
class WaitForExternalLibrary {
  /**
   * @param {$interval} $interval  To get the interval service.
   * @param {$q}        $q         To get the promise service.
   * @param {$window}   $window    To get the external library.
   */
  constructor(
    $interval,
    $q,
    $window,
  ) {
    'ngInject';

    /**
     * The local reference to the `$interval` service.
     *
     * @type {$interval}
     */
    this.$interval = $interval;
    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
  }
  /**
   * Public function that waits for a library to be ready. It runs 10 times of 100ms,
   * if the library is not ready by then it reject the promise.
   *
   * @param {String} library  Global library to ask and wait for.
   *
   * @return {Promise}
   */
  toLoad(library) {
    return this.$q((resolve, reject) => {
      const iterations = 10;
      const delay = 100;

      const loop = this.$interval((currentIteration) => {
        if (this._isLibraryReady(library)) {
          this.$interval.cancel(loop);
          resolve();
        } else if (currentIteration === (iterations - 1)) {
          reject();
        }
      }, delay, iterations, false);
    });
  }
  /**
   * Ask for library availability.
   *
   * @param {String} library  Library name.
   *
   * @return {Boolean}
   */
  _isLibraryReady(library) {
    return !!this.$window[library];
  }
}

export default WaitForExternalLibrary;
