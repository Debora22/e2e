const { provider } = require('jimpex');
const ObjectUtils = require('wootils/shared/objectUtils');

const { OlapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * The is the service to comunicate with the Reporting API.
 *
 * @extends OlapicAPI
 */
class ReportingAPI extends OlapicAPI {
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
   * @param {Object}             imageServerConfig    The configuration of the ImageServer.
   */
  constructor(
    apiConfig,
    http,
    HTTPError,
    genericError,
    imageServerConfig,
  ) {
    super(apiConfig, http, HTTPError, genericError);

    /**
     * The local reference to the `imageServerConfig` cofig.
     *
     * @type {Object}
     */
    this.imageServerConfig = imageServerConfig;
  }
  /**
   * Makes a request to get the list of advocates.
   *
   * @param {Object} req     The received request.
   * @param {Object} params  The params to add to the query.
   *
   * @return {Promise}
   */
  getAdvocates(req, params) {
    const { accountType } = params;
    delete params.accountType;

    const endpoint = this.endpoint(
      `advocates.${accountType}`,
      ObjectUtils.lowerCamelToSnakeKeys(params, ['conversionInterval', 'dateFrom', 'dateTo']),
    );

    return this.get(
      endpoint,
      this._buildRequestOptions(req),
    ).then((response) => {
      response.forEach((advocate) => {
        advocate.media.forEach((media) => {
          media.media_url = this._getMediaImageUrl(media);
        });
      });

      return response;
    });
  }
  /**
   * Given a media and the configuration of the ImageServer get the media image url.
   *
   * @param {Object} media  The media to get the image.
   *
   * @return {String}
   *
   * @access protected
   */
  _getMediaImageUrl(media) {
    const key = media.media_key;

    return key.length ?
      `${this.imageServerConfig.url}/${key[0]}/${key[1]}/${key[2]}/${key}/mobile.jpg` :
      '';
  }
}

/**
 * This is the provider for the ReportingAPI service.
 *
 * @type {Provider}
 */
const reportingAPI = provider((app) => {
  const appConfiguration = app.get('appConfiguration');

  app.set('reportingAPI', () => new ReportingAPI(
    appConfiguration.get('reportingAPIServer'),
    app.get('http'),
    app.get('HTTPError'),
    appConfiguration.get('genericError'),
    appConfiguration.get('imageServer'),
  ));
});

module.exports = {
  ReportingAPI,
  reportingAPI,
};
