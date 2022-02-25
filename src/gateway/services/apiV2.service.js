const ObjectUtils = require('wootils/shared/objectUtils');

const { OlapicAPI, olapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * This is the service to comunicate with the API V2.
 *
 * @extends OlapicAPI
 */
class ApiV2 extends OlapicAPI {
  /**
   * Makes a request to create an user.
   *
   * @param {Object} req   The received request.
   * @param {Object} user  The user to create.
   *
   * @return {Promise}
   */
  createUser(req, user) {
    return this.post(
      this.endpoint('users'),
      ObjectUtils.lowerCamelToSnakeKeys(user, ['screenName']),
      this._buildRequestOptions(req),
    );
  }
}

/**
 * This is the provider for the Photorank API service.
 *
 * @type {Provider}
 */
const apiV2 = olapicAPI('apiV2', 'apiV2Server', ApiV2);

module.exports = {
  ApiV2,
  apiV2,
};
