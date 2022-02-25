const openPostSections = [
  'New Content',
  'Saved For Later',
  'Rights Pending',
  'Approved Content',
  'Reported',
  'Discarded',
];
const discardSections = [
  'New Content',
  'Saved For Later',
  'Rights Pending',
  'Approved Content',
  'Reported',
];
const discardPrimarySections = [
  'New Content',
  'Saved For Later',
  'Reported',
];
const discardSecondarySections = [
  'Rights Pending',
  'Approved Content',
];
const approveSections = [
  'New Content',
  'Saved For Later',
  'Reported',
];
const saveSections = [
  'New Content',
];
const approveForReviewSections = [
  'Saved For Later',
  'Reported',
];
const tagToStreamPrimarySections = [
  'Rights Pending',
  'Approved Content',
];
const tagToStreamSecondarySections = [
  'New Content',
  'Saved For Later',
];
const saveForLaterSections = [
  'New Content',
  'Approved Content',
];
const saveForLaterForReviewSections = [
  'Approved Content',
];
const restoreSections = [
  'Discarded',
];
const downloadSections = [
  'New Content',
  'Saved For Later',
  'Approved Content',
  'Reported',
  'Discarded',
];
const shareSections = [
  'Approved Content',
];
const editMediaSections = [
  'New Content',
  'Saved For Later',
  'Approved Content',
];

/**
 * @ngdoc constant
 * @name LIBRARY_ACTIONS
 * @description
 * The list of actions for library.
 *
 * @type {Array<Action>}
 *
 * @memberof library
 */
const libraryActions = [{
  id: 'openPost',
  name: 'Open Original Post',
  visible: {
    modal: {
      secondary: openPostSections,
    },
  },
  single: true,
}, {
  id: 'discard',
  name: 'Discard',
  permission: {
    name: 'content.action.discard',
    phrase: 'Discard Content',
  },
  visible: {
    card: {
      primary: discardPrimarySections,
      secondary: discardSecondarySections,
    },
    library: { primary: discardSections },
    modal: {
      primary: discardPrimarySections,
      secondary: discardSecondarySections,
    },
  },
}, {
  id: 'approve',
  name: 'Approve',
  permission: {
    name: 'content.action.approve',
    phrase: 'Approve Content',
  },
  visible: {
    card: { primary: approveSections },
    library: { primary: approveSections },
    modal: { primary: approveSections },
  },
  withoutSettings: [
    'content_discovery_for_review_flow',
  ],
}, {
  id: 'saveForReview',
  name: 'Save',
  permission: {
    name: 'content.action.approve',
    phrase: 'Save Content',
  },
  visible: {
    card: { primary: saveSections },
    library: { primary: saveSections },
    modal: { primary: saveSections },
  },
  requiresSettings: [
    'content_discovery_for_review_flow',
  ],
}, {
  id: 'approveForReview',
  name: 'Approve',
  permission: {
    name: 'content.action.approve',
    phrase: 'Approve Content',
  },
  visible: {
    card: { primary: approveForReviewSections },
    library: { primary: approveForReviewSections },
    modal: { primary: approveForReviewSections },
  },
  requiresSettings: [
    'content_discovery_for_review_flow',
  ],
}, {
  id: 'tagToStream',
  name: 'Tag to Stream',
  permission: {
    name: 'content.action.tagtostream',
    phrase: 'Tag Content',
  },
  visible: {
    card: {
      primary: tagToStreamPrimarySections,
      secondary: tagToStreamSecondarySections,
    },
    library: {
      primary: tagToStreamPrimarySections,
      secondary: tagToStreamSecondarySections,
    },
  },
}, {
  id: 'saveForLater',
  name: 'Save for Later',
  permission: {
    name: 'content.action.saveforlater',
    phrase: 'Save For Later Content',
  },
  visible: {
    card: { secondary: saveForLaterSections },
    library: { secondary: saveForLaterSections },
    modal: { secondary: saveForLaterSections },
  },
  withoutSettings: [
    'content_discovery_for_review_flow',
  ],
}, {
  id: 'saveForLaterForReview',
  name: 'Save for Later',
  permission: {
    name: 'content.action.saveforlater',
    phrase: 'Save For Later Content',
  },
  visible: {
    card: { secondary: saveForLaterForReviewSections },
    library: { secondary: saveForLaterForReviewSections },
    modal: { secondary: saveForLaterForReviewSections },
  },
  requiresSettings: [
    'content_discovery_for_review_flow',
  ],
}, {
  id: 'restore',
  name: 'Restore',
  permission: {
    name: 'content.action.restore',
    phrase: 'Restore Content',
  },
  visible: {
    card: { primary: restoreSections },
    library: { primary: restoreSections },
    modal: { primary: restoreSections },
  },
}, {
  id: 'download',
  name: 'Download',
  permission: {
    name: 'content.action.download',
    phrase: 'Download Content',
  },
  visible: {
    card: { secondary: downloadSections },
    library: { secondary: downloadSections },
    modal: { secondary: downloadSections },
  },
}, {
  id: 'share',
  name: 'Share',
  visible: {
    card: { secondary: shareSections },
    library: { secondary: shareSections },
  },
  className: 'share_button_click',
}, {
  id: 'editMedia',
  name: 'Edit Media',
  visible: {
    modal: { secondary: editMediaSections },
  },
  single: true,
}];

export default libraryActions;
