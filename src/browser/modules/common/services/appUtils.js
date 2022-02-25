const delayTime = 1000;

/**
 * @ngdoc service
 * @name appUtils
 * @description
 * This service is meant to have generic utility methods that the app may need and that can't be
 * categorized in any of the existing modules.
 *
 * @memberof common
 */
class AppUtils {
  /**
   * @param {$q}       $q        To access angular promises service.
   * @param {$timeout} $timeout  To generate delayed promises.
   */
  constructor(
    $q,
    $timeout,
  ) {
    'ngInject';

    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
  }
  /**
   * Capitalize the first letter of each word in text.
   *
   * @param {String} text  The text to capitalize.
   *
   * @return {String}
   */
  capitalize(text) {
    return text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  }
  /**
   * Return a resolved promise after waiting some delay time.
   *
   * @param {Number} delay  The time in milliseconds for the delay.
   *
   * @return {Promise}
   */
  delayedPromise(delay = delayTime) {
    return this.$q((resolve) => {
      this.$timeout(() => {
        resolve();
      }, delay);
    });
  }
  /**
   * Its escape the given string so it can be used on a regular expression.
   *
   * @param {String} text  The text to escape.
   *
   * @return {String}
   */
  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  /**
   * Get all the query parameters from a URL.
   *
   * @param {String} url  The URL to process.
   *
   * @return {Object}
   */
  getQueryParams(url) {
    const paramsArray = url.split(/[&||?]/);
    // Since the first argument is the url path, create the queryParams object there.
    paramsArray[0] = {};

    return paramsArray.reduce((queryParams, group) => {
      const string = (group || '').split('=');
      const [key] = string;
      const [, value] = string;

      queryParams[key] = decodeURIComponent(value);
      return queryParams;
    });
  }
}

export default AppUtils;
