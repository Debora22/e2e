/**
 * @ngdoc constant
 * @name COLLECTIONS_SORT
 * @description
 * The sorts for the collections.
 *
 * @type {Object}
 * @property {Sort} collectionNameAsc      The ascendant collection name sort.
 * @property {Sort} collectionNameDesc     The descendant collection name sort.
 * @property {Sort} collectionUpdatedDesc  The descendant updated date sort.
 * @property {Sort} collectionUpdatedAsc   The ascendant updated date sort.
 *
 * @memberof collections
 */
const collectionsSort = {
  collectionNameAsc: {
    id: 0,
    name: 'Collection Name (A to Z)',
    field: 'name',
    asc: true,
  },
  collectionNameDesc: {
    id: 1,
    name: 'Collection Name (Z to A)',
    field: 'name',
    asc: false,
  },
  collectionUpdatedDesc: {
    id: 2,
    name: 'Date Modified (Newest First)',
    field: 'filter.updated_at',
    asc: false,
  },
  collectionUpdatedAsc: {
    id: 3,
    name: 'Date Modified (Oldest First)',
    field: 'filter.updated_at',
    asc: true,
  },
};

export default collectionsSort;
