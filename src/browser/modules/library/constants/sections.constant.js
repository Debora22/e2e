import LIBRARY_MEDIA_STATUS from './mediaStatus.constant';

/**
 * @ngdoc constant
 * @name LIBRARY_SECTIONS
 * @description
 * The list of sections for the library.
 *
 * @type {Array}
 * @property {String} id              The section id.
 * @property {String} name            The section name.
 * @property {String} permissionName  The permissions name to check when asserting if the section should be
 *                                    visible or not.
 * @property {String} defaultSort     The default sorting option.
 * @property {Object} filters         The {@link QueryFilter} to set to the query when the section is selected.
 * @property {Object} tooltip         The section tooltip information.
 *
 * @memberof library
 */
const librarySections = [{
  id: 'new',
  name: 'New Content',
  permissionName: 'content.tab.content',
  defaultSort: 'dateCollectedDesc',
  filters: {
    status_id: {
      values: [LIBRARY_MEDIA_STATUS.pending],
    },
    actionable_rights_status: { values: true },
  },
  tooltip: {
    direction: 'right',
    label: 'All your collected content in one place!',
  },
  emptyMessage: 'You can create a collection or upload media to start approving your content.',
}, {
  id: 'approved',
  name: 'Approved Content',
  permissionName: 'content.tab.approved',
  defaultSort: 'approvedDesc',
  filters: {
    status_id: {
      values: [LIBRARY_MEDIA_STATUS.approved],
    },
  },
  tooltip: {
    direction: 'right',
    size: 'large',
    label: 'When you get the rights to your approved content it will appear here. You can tag a stream to publish ' +
      ' the content live.',
  },
  emptyMessage: 'When you get the rights to your approved content it will appear here.' +
    ' Go to New Content to start approving.',
}, {
  id: 'savedForLater',
  name: 'Saved For Later',
  permissionName: 'content.tab.savedforlater',
  defaultSort: 'dateCollectedDesc',
  filters: {
    status_id: {
      values: [LIBRARY_MEDIA_STATUS.savedForLater],
    },
    actionable_rights_status: { values: true },
  },
  emptyMessage: 'If you\'re not sure about something or your need someone else to review it,' +
    ' you can save it for later and it will be moved here.',
}, {
  id: 'rightsPending',
  name: 'Rights Pending',
  permissionName: 'content.tab.rightspending',
  defaultSort: 'dateCollectedDesc',
  filters: {
    status_id: {
      values: [LIBRARY_MEDIA_STATUS.pending, LIBRARY_MEDIA_STATUS.savedForLater],
    },
    actionable_rights_status: { values: false },
  },
  emptyMessage: 'All content that is waiting for a rights response will live here.',
}, {
  id: 'reported',
  name: 'Reported',
  permissionName: 'content.tab.reported',
  defaultSort: 'dateCollectedDesc',
  filters: {
    status_id: {
      values: [LIBRARY_MEDIA_STATUS.reported],
    },
  },
  emptyMessage: 'If someone reports content in a widget or lightbox it will appear here.' +
    ' If you think it was misreported you can Re-Approve.',
}, {
  id: 'discarded',
  name: 'Discarded',
  permissionName: 'content.tab.discarded',
  defaultSort: 'discardedDesc',
  filters: {
    discarded: {
      values: true,
    },
    media_predeleted_only: {
      values: true,
    },
  },
  emptyMessage: 'When you discard content you can always find it here and Restore it if you change your mind.',
}];

export default librarySections;
