/**
 * @ngdoc constant
 * @name COLLECTIONS_PROFILE
 * @description
 * The Instagram Profile collection to add to the list when none exist.
 *
 * @type {Object}
 * @property {String}             name              The collection name.
 * @property {String}             phrase            The collection display phrase.
 * @property {String}             q                 The data used to search a collection by.
 * @property {String}             status            The collection status.
 * @property {CollectionBaseType} base              The collection base.
 * @property {Object}             filter            The collection filters.
 * @property {Object}             filter.id         The collection id.
 * @property {Array}              filter.operators  The collection operators.
 * @property {Array}              filter.streams    The collection streams.
 * @property {Array}              actions           The collection actions.
 *
 * @memberof collections
 */
const collectionsProfile = {
  name: 'Connected Instagram profiles',
  phrase: 'Collect content from all connected Instagram profiles',
  q: 'Connected Instagram profiles Collect content from all connected Instagram profiles',
  status: 'inactive',
  base: {
    type: 'profile',
    data: {
      social_networks: ['instagram'],
    },
  },
  filter: {
    id: 0,
    operators: [{
      name: 'with',
      type: 'profile',
    }],
    streams: [],
  },
  actions: [],
};

export default collectionsProfile;
