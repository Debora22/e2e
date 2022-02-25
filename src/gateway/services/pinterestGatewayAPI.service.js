const { OlapicAPI, olapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * The is the service to comunicate with the Pinterest Gateway API.
 *
 * @extends OlapicAPI
 */
class PinterestGatewayAPI extends OlapicAPI {
  /**
   * Makes a request to get the list of Pinterest boards.
   *
   * @param {Object} req              The received request.
   * @param {Number} socialAccountId  The social account Id to get the boards from.
   *
   * @return {Promise}
   */
  getPinterestBoards(req, socialAccountId) {
    const body = {
      socialAccountId,
    };

    return this.post(
      this.endpoint('getBoards'),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the Pin details from Pinterest.
   *
   * @param {Object} req              The received request.
   * @param {Number} pinId            The pinId to get the boards from.
   * @param {Number} socialAccountId  The social account Id to get the pin details from.
   *
   * @return {Promise}
   */
  getPinterestPin(req, pinId, socialAccountId) {
    const params = { pinId };
    const body = { socialAccountId };

    return this.post(
      this.endpoint('getPinDetails', params),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to send media to Pinterest.
   *
   * @param {Object} req              The received request.
   * @param {Number} socialAccountId  The social account Id to send the media to.
   * @param {Object} board            The selected pinterest board to share media to.
   * @param {Array}  media            The media to share to Pinterest.
   *
   * @return {Promise}
   */
  sendMediaToPinterest(req, socialAccountId, board, media) {
    const body = {
      socialAccountId,
      board,
      media,
    };

    return this.post(
      this.endpoint('createPins'),
      body,
      this._buildRequestOptions(req),
    );
  }
}

/**
 * This the provider for the PinterestGatewayAPI service.
 *
 * @type {Provider}
 */
const pinterestGatewayAPI = olapicAPI('pinterestGatewayAPI', 'pinterestGatewayAPIServer', PinterestGatewayAPI);

module.exports = {
  PinterestGatewayAPI,
  pinterestGatewayAPI,
};
