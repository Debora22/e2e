const { OlapicAPI, olapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * The is the service to comunicate with the Sharing API.
 *
 * @extends OlapicAPI
 */
class SharingAPI extends OlapicAPI {
  /**
   * Makes a request to create a sharing document.
   *
   * @param {Object} req    The received request.
   * @param {Array}  media  The media to be shared.
   *
   * @return {Promise}
   */
  createSharingDocument(req, media) {
    const body = {
      media_list: media,
    };

    return this.post(
      this.endpoint('sharing.sharingDocuments'),
      body,
      this._buildRequestOptions(req),
    );
  }
}

/**
 * This is the provider for the Sharing API service.
 *
 * @type {Provider}
 */
const sharingAPI = olapicAPI('sharingAPI', 'sharingAPIServer', SharingAPI);

module.exports = {
  SharingAPI,
  sharingAPI,
};
