const { providers } = require('jimpex');
const { adminAPI2 } = require('./adminAPI2.service');
const { apiV2 } = require('./apiV2.service');
const { pinterestGatewayAPI } = require('./pinterestGatewayAPI.service');
const { reportingAPI } = require('./reportingAPI.service');
const { schedulerAPI } = require('./schedulerAPI.service');
const { sharingAPI } = require('./sharingAPI.service');
const { socialConnectorAPI } = require('./socialConnectorAPI.service');
const { uploaderAPI } = require('./uploaderAPI.service');

module.exports = providers({
  adminAPI2,
  apiV2,
  pinterestGatewayAPI,
  reportingAPI,
  schedulerAPI,
  sharingAPI,
  socialConnectorAPI,
  uploaderAPI,
});
