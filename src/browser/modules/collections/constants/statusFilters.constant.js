/**
 * @ngdoc constant
 * @name COLLECTIONS_STATUS_FILTERS
 * @description
 * The status filters for the collections.
 *
 * @type {Object}
 * @property {Object} allCollections       The all Collections status filter.
 * @property {Object} activeCollections    The active Collections status filter.
 * @property {Object} inactiveCollections  The inactive Collections status filter.
 *
 * @memberof collections
 */
const collectionsStatusFilters = {
  allCollections: {
    id: 0,
    name: 'All Collections',
  },
  activeCollections: {
    id: 1,
    name: 'Active Collections',
    status: 'active',
  },
  inactiveCollections: {
    id: 2,
    name: 'Inactive Collections',
    status: 'inactive',
  },
};

export default collectionsStatusFilters;
