/**
 * @ngdoc constant
 * @name LIBRARY_SORT
 * @description
 * The sorts for the library.
 *
 * @type {Object}
 * @property {Sort} dateCollectedDesc  The descendant date collected sort.
 * @property {Sort} dateCollectedAsc   The ascendant collected sort.
 * @property {Sort} recommendedDesc    The descendant recommended sort.
 * @property {Sort} approvedAsc        The ascendant approved sort.
 * @property {Sort} approvedDesc       The descendant approved sort.
 * @property {Sort} discardedAsc       The ascendant discarded sort.
 * @property {Sort} discardedDesc      The descendant discarded sort.
 *
 * @memberof library
 */
const librarySort = {
  dateCollectedDesc: {
    id: 0,
    key: 'dateCollectedDesc',
    name: 'Date collected (newest)',
    values: [{
      key: 'date',
      order: 'desc',
    }],
  },
  dateCollectedAsc: {
    id: 1,
    key: 'dateCollectedAsc',
    name: 'Date collected (oldest)',
    values: [{
      key: 'date',
      order: 'asc',
    }],
  },
  recommendedDesc: {
    id: 2,
    key: 'recommendedDesc',
    name: 'Recommended',
    values: [{
      key: 'score',
      order: 'desc',
    }],
  },
  approvedDesc: {
    id: 3,
    key: 'approvedDesc',
    name: 'Date approved (newest)',
    values: [{
      key: 'date_approved',
      order: 'desc',
    }],
    librarySections: [
      'Approved Content',
    ],
  },
  approvedAsc: {
    id: 4,
    key: 'approvedAsc',
    name: 'Date approved (oldest)',
    values: [{
      key: 'date_approved',
      order: 'asc',
    }],
    librarySections: [
      'Approved Content',
    ],
  },
  discardedDesc: {
    id: 5,
    key: 'discardedDesc',
    name: 'Date discarded (newest)',
    values: [{
      key: 'date_updated',
      order: 'desc',
    }],
    librarySections: [
      'Discarded',
    ],
  },
  discardedAsc: {
    id: 6,
    key: 'discardedAsc',
    name: 'Date discarded (oldest)',
    values: [{
      key: 'date_updated',
      order: 'asc',
    }],
    librarySections: [
      'Discarded',
    ],
  },
};

export default librarySort;
