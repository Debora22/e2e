/**
 * @ngdoc constant
 * @name WHITELIST_STATUSES
 * @description
 * The list of status types for the whitelist section.
 *
 * @type {Object}
 * @property {Object} allUsers       The status for all users.
 * @property {Object} activeUsers    The status for active users.
 * @property {Object} expiredUsers   The status for expired users.
 * @property {Object} upcomingUsers  The status for upcoming users.
 *
 * @memberof whitelist
 */
const whitelistStatuses = {
  allUsers: {
    id: 1,
    name: '',
    fullName: 'All Users',
  },
  activeUsers: {
    id: 2,
    name: 'active',
    fullName: 'Active',
  },
  expiredUsers: {
    id: 3,
    name: 'inactive',
    fullName: 'Expired',
  },
  upcomingUsers: {
    id: 4,
    name: 'upcoming',
    fullName: 'Upcoming',
  },
};

export default whitelistStatuses;
