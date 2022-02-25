/**
 * @ngdoc constant
 * @name WHITELIST_SORT
 * @description
 * The list of sorts for the Whitelist users.
 *
 * @type {Array<Sort>}
 *
 * @memberof whitelist
 *
 */
const whitelistSort = [{
  id: 0,
  name: 'Username A - Z',
  values: {
    key: 'username',
    order: 'asc',
  },
}, {
  id: 1,
  name: 'Username Z - A',
  values: {
    key: 'username',
    order: 'desc',
  },
}, {
  id: 2,
  name: 'Label A - Z',
  values: {
    key: 'label',
    order: 'asc',
  },
}, {
  id: 3,
  name: 'Label Z - A',
  values: {
    key: 'label',
    order: 'desc',
  },
}];

export default whitelistSort;
