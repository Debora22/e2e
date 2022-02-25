const { provider } = require('jimpex');
const { APIClient } = require('jimpex/src/services/http/apiClient');

/**
 * An Olapic API client for the app to use. This object contains the basic
 * implementation to make all necessary request to all Olapic APIs.
 *
 * @abstract
 * @extends APIClient
 */
class OlapicAPI extends APIClient {
  /**
   * @param {Object}             apiConfig            The configuration for the API the client will
   *                                                  make requests to.
   * @param {String}             apiConfig.url        The API entry point.
   * @param {APIClientEndpoints} apiConfig.endpoints  A dictionary of named endpoints relative to
   *                                                  the API entry point.
   * @param {HTTP}               http                 To get the `fetch` function for this service
   *                                                  to use on all the requests.
   * @param {Class}              HTTPError            To format the received errors.
   * @param {String}             genericError         The error to return when no error message can be obtained.
   *
   * @abstract
   */
  constructor(
    apiConfig,
    http,
    HTTPError,
    genericError,
  ) {
    if (new.target === OlapicAPI) {
      throw new TypeError('OlapicAPI is an abstract class, it can\'t be instantiated directly');
    }

    super(
      apiConfig,
      http,
      HTTPError,
    );

    /**
     * A generic string error to return when no error message can be found on the response.
     *
     * @type {String}
     */
    this.genericError = genericError;
  }
  /**
   * Formats an error response into a proper Error object.
   *
   * @param {Object} response  A received response from a request.
   * @param {Number} status    The HTTP status of the request.
   *
   * @return {Error}
   */
  error(response, status) {
    const data = response.data || response.error || {};
    const message = data.error_long_message ||
      data.message ||
      response.statusText ||
      this.genericError;

    return new this._HTTPError(message, status);
  }
  /**
   * Makes a request using the parent fetch method.
   *
   * @param {Object} options  The request options.
   *
   * @return {Promise}
   */
  fetch(options) {
    return super.fetch(options)
    .then((response) => (response.data ? response.data : response));
  }
  /**
   * Build the request options.
   *
   * @param {Object} req      The received request.
   * @param {Object} options  The request options.
   *
   * @return {Promise}
   */
  _buildRequestOptions(req, options = {}) {
    const headers = {};

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    return Object.assign(
      {},
      options,
      { headers, req },
    );
  }
}

/**
 * Creates an olapicAPI service dynamically.
 *
 * @param {String} name           The name of the service.
 * @param {String} configuration  The configuration of the service.
 * @param {Class}  ClientClass    The class the service should instantiate.
 * @return {Provider}
 */
const olapicAPI = (name, configuration, ClientClass) => provider((app) => {
  const appConfiguration = app.get('appConfiguration');

  app.set(name, () => new ClientClass(
    appConfiguration.get(configuration),
    app.get('http'),
    app.get('HTTPError'),
    appConfiguration.get('genericError'),
  ));
});

module.exports = {
  OlapicAPI,
  olapicAPI,
};
