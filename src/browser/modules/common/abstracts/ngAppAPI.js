/* eslint-disable angular/no-private-call */

import APIClient from 'wootils/shared/apiClient';

/**
 * This abstract class contains the basic implementation of an APP API
 * and a way to be able to cancel ongoing requests.
 *
 * @abstract
 *
 * @memberof common
 */
class NgAppAPI extends APIClient {
  /**
   * @param {$http}              $http        To make all the requests.
   * @param {$q}                 $q           To reject error eesponses.
   * @param {String}             url          The API entry point.
   * @param {APIClientEndpoints} endpoints    A dictionary of named endpoints relative to the API entry point.
   * @param {FetchClient}        fetchClient  The fetch function that makes the requests.
   *
   * @abstract
   */
  constructor(
    $http,
    $q,
    url,
    endpoints,
    fetchClient,
  ) {
    if (new.target === NgAppAPI) {
      throw new TypeError('NgAppAPI is an abstract class, it can\'t be instantiated directly');
    }

    super(
      url,
      endpoints,
      fetchClient,
    );

    /**
     * The local reference to the `$http` service.
     *
     * @type {$http}
     */
    this.$http = $http;
    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The list of ongoing requests.
     *
     * @type {Array}
     * @access protected
     */
    this._requests = [];
  }
  /**
   * Given a request to cancel, loop through the list of ongoing requests.
   * For each ongoing request traverse the promise chain to see if given promise exists in the chain.
   * If the given promise exist in the chain, call the cancel method, unregister the request
   * and stop the loop. Finally we return a boolean value if we were able to cancel the request.
   *
   * @param {Promise} promise  The request to cancel.
   *
   * @return {Boolean}
   */
  cancelRequest(promise) {
    return this._requests.some((rootPromise) => {
      let currentPromise = rootPromise;
      let result = false;

      // Traverse the promise chain to see if given promise exists in the chain.
      while (
        currentPromise !== promise &&
        currentPromise.$$state.pending &&
        currentPromise.$$state.pending.length > 0
      ) {
        [[currentPromise]] = currentPromise.$$state.pending;
      }

      /**
       * If this chain contains given promise, then call the cancel method
       * to cancel the http request and unregister the request.
       */
      if (
        currentPromise === promise &&
        angular.isFunction(rootPromise.cancel)
      ) {
        rootPromise.cancel();
        this._unregister(promise);
        result = true;
      }

      return result;
    });
  }
  /**
   * Makes a request using `$http`.
   * Fist we create the request data using a canceller promise as timeout, the given url and options.
   * If the request contains a `body`, we rename it `data`. Then we execute the request, add the cancel method
   * to resolve the canceller promise and add the request to list of ongoing requests.
   * If the request is successful, we unregister the request and return the response data.
   * If an abort error is detected, it means that the request was canceled, so we reject the promise with null.
   *
   * @param {String} url      The url to request.
   * @param {Object} options  The request options.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _fetch(url, options = {}) {
    const canceller = this.$q.defer();
    const request = Object.assign(
      {},
      {
        url,
        timeout: canceller.promise,
      },
      options,
    );

    const { body } = request;
    if (body) {
      delete request.body;
      request.data = body;
    }

    const promise = this.$http(request);

    promise.cancel = () => {
      canceller.resolve();
    };
    this._requests.push(promise);

    return promise.then((response) => {
      this._unregister(promise);

      return response.data ? response.data : response;
    })
    .catch((error) => (error.xhrStatus === 'abort' ? this.$q.reject(null) : this.$q.reject(this.error(error))));
  }
  /**
   * Remove a request from the list of ongoing requests.
   *
   * @param {Promise} promise  The request to remove.
   *
   * @access protected
   */
  _unregister(promise) {
    const index = this._requests.indexOf(promise);
    if (index >= 0) {
      this._requests.splice(index, 1);
    }
  }
}

export default NgAppAPI;
