import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name UsersList
 * @description
 * This service is used to create users.
 *
 * @memberof common
 */
class UsersList extends EntitiesList {
  /**
   * @param {$q}     $q      To reject error responses.
   * @param {AppAPI} appAPI  To make the API requests.
   */
  constructor(
    $q,
    appAPI,
  ) {
    'ngInject';

    super($q);

    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Perform a request to create an user.
   *
   * @param {Object} user  The user to create.
   *
   * @return {Promise}
   */
  createUser(user) {
    return this._requestWithLoading(() => this.appAPI.createUser(user));
  }
}

/**
 * @ngdoc factory
 * @name usersList
 * @description
 * This object contains a method to create a new instance of the {@link UsersList}.
 *
 * @param {$q}     $q      To reject error responses.
 * @param {AppAPI} appAPI  To make the API requests.
 *
 * @return {Function}
 *
 * @memberof common
 */
const usersList = (
  $q,
  appAPI,
) => {
  'ngInject';

  return {
    getNewInstance: () => new UsersList(
      $q,
      appAPI,
    ),
  };
};

export default usersList;
