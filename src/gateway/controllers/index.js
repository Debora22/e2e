const { advocatesController } = require('./advocates.controller');
const { collectionsController } = require('./collections.controller');
const { keywordsController } = require('./keywords.controller');
const { mediaController } = require('./media.controller');
const { rightsController } = require('./rights.controller');
const { schedulerController } = require('./scheduler.controller');
const { settingsController } = require('./settings.controller');
const { sharingController } = require('./sharing.controller');
const { socialController } = require('./social.controller');
const { streamsController } = require('./streams.controller');
const { usersController } = require('./users.controller');
const { whitelistController } = require('./whitelist.controller');
const { zendeskController } = require('./zendesk.controller');

module.exports = {
  advocatesController,
  collectionsController,
  keywordsController,
  mediaController,
  rightsController,
  schedulerController,
  settingsController,
  sharingController,
  socialController,
  streamsController,
  usersController,
  whitelistController,
  zendeskController,
};
