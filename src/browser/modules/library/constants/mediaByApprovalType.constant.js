/**
 * @ngdoc constant
 * @name LIBRARY_MEDIA_BY_APPROVAL_TYPE
 * @description
 * The map of media by approval type.
 *
 * @type {Object}
 * @property {Object} withRights           The media with rights.
 * @property {Object} contentEngine        The media to ask for rights using the content engine.
 * @property {Object} chromeExtension      The media to ask for rights using the chrome extension.
 * @property {Object} unavailableMentions  The media we can not ask for rights cause we are
 *                                         missing some mentions account.
 * @property {Object} canNotApprove        The media we can not ask for rights cause there is
 *                                         no available method at the moment.
 *
 * @memberof library
 */
const libraryMediaByApprovalType = {
  withRights: {
    list: [],
    selected: {},
    order: 0,
  },
  contentEngine: {
    list: [],
    selected: {},
    order: 1,
  },
  chromeExtension: {
    list: [],
    selected: {},
    order: 2,
  },
  unavailableMentions: {
    list: [],
    selected: {},
    order: 3,
  },
  canNotApprove: {
    list: [],
    selected: {},
    order: 4,
  },
};

export default libraryMediaByApprovalType;
