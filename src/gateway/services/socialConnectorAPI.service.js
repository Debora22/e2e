const { OlapicAPI, olapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * The is the service to comunicate with the socialConnector API.
 *
 * @extends OlapicAPI
 */
class SocialConnectorAPI extends OlapicAPI {
  /**
   * Makes a request to get the Facebook Ads Accounts.
   *
   * @param {Object} req         The received request.
   * @param {Number} customerId  The customer id to get the Ads Accounts.
   *
   * @return {Promise}
   */
  getFacebookAdsAccounts(req, customerId) {
    const params = { customerId };

    return this.get(
      this.endpoint('adsAccounts', params),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the Instagram Business Accounts.
   *
   * @param {Object} req         The received request.
   * @param {Number} customerId  The customer id to get the Business Accounts.
   *
   * @return {Promise}
   */
  getInstagramBusinessAccounts(req, customerId) {
    const params = { customerId };

    return this.get(
      this.endpoint('instagramBusinessAccounts', params),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to send media to Facebook Ads Manager.
   *
   * @param {Object}  req          The received request.
   * @param {Number}  customerId   The customer id to send media to Facebook Ads Manager.
   * @param {Number}  adAccountId  The selected Ad Account Id to share media to.
   * @param {Object}  mediaData    The media data to send to Facebook Ads Manager.
   *
   * @return {Promise}
   */
  sendMediaToFacebook(req, customerId, adAccountId, mediaData) {
    const params = { customerId, adAccountId };
    const body = {
      source: 'ce',
      data: mediaData,
    };

    return this.post(
      this.endpoint('adAccountAssets', params),
      body,
      this._buildRequestOptions(req),
    );
  }
}

/**
 * This is the provider for the SocialConnector API service.
 *
 * @type {Provider}
 */
const socialConnectorAPI = olapicAPI('socialConnectorAPI', 'socialConnectorAPIServer', SocialConnectorAPI);

module.exports = {
  SocialConnectorAPI,
  socialConnectorAPI,
};
