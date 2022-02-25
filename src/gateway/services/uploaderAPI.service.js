const { provider } = require('jimpex');
const ObjectUtils = require('wootils/shared/objectUtils');

const { OlapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * The is the service to comunicate with the Uploader API.
 *
 * @extends OlapicAPI
 */
class UploaderAPI extends OlapicAPI {
  /**
   * @param {Object}             apiConfig             The configuration for the API the client will
   *                                                   make requests to.
   * @param {String}             apiConfig.url         The API entry point.
   * @param {APIClientEndpoints} apiConfig.endpoints   A dictionary of named endpoints relative to
   *                                                   the API entry point.
   * @param {HTTP}               http                  To get the `fetch` function for this service
   *                                                   to use on all the requests.
   * @param {Class}              HTTPError             To format the received errors.
   * @param {String}             genericError          The error to return when no error message can be obtained.
   * @param {String}             olapicCustomerHeader  The olapic customer header configuration.
   */
  constructor(
    apiConfig,
    http,
    HTTPError,
    genericError,
    olapicCustomerHeader,
  ) {
    super(apiConfig, http, HTTPError, genericError);

    /**
     * The local reference to the `olapicCustomerHeader` cofig.
     *
     * @type {Stringt}
     */
    this.olapicCustomerHeader = olapicCustomerHeader;
  }
  /**
   * Makes a request to upload media.
   *
   * @param {Object} req   The received request.
   * @param {Object} body  The request body.
   *
   * @return {Promise}
   */
  uploadMedia(req, body) {
    body.customer_id = req.headers[this.olapicCustomerHeader];

    return this.post(
      this.endpoint('media'),
      ObjectUtils.lowerCamelToSnakeKeys(body, ['userId']),
      this._buildRequestOptions(req),
    );
  }
}

/**
 * This is the provider for the Uploader API service.
 *
 * @type {Provider}
 */
const uploaderAPI = provider((app) => {
  const appConfiguration = app.get('appConfiguration');

  app.set('uploaderAPI', () => new UploaderAPI(
    appConfiguration.get('uploaderAPIServer'),
    app.get('http'),
    app.get('HTTPError'),
    appConfiguration.get('genericError'),
    appConfiguration.get('olapicCustomerHeader'),
  ));
});

module.exports = {
  UploaderAPI,
  uploaderAPI,
};
