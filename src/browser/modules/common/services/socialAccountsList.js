import EntitiesList from '../abstracts/entitiesList';

/**
 * @ngdoc service
 * @name SocialAccountsList
 * @description
 * This service is used to get the customer social accounts (Facebook, Instagram and Twitter accounts).
 *
 * @memberof common
 */
class SocialAccountsList extends EntitiesList {
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
    /**
     * The map of social accounts by network.
     *
     * @type {Object}
     * @property {Array} facebook   The list of Facebook social accounts.
     * @property {Array} instagram  The list of Instagram social accounts.
     * @property {Array} twitter    The list of Twitter social accounts.
     */
    this.socialAccountsByNetwork = {};

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Delete a social account connection.
   *
   * @param {Number} socialConnectionId  The id of the social connection to delete.
   *
   * @return {Promise}
   */
  deleteSocialAccount(socialConnectionId) {
    return this._requestWithLoading(() => (
      this.appAPI.deleteSocialAccount(socialConnectionId)
      .then(() => {
        const index = this.entities.findIndex((socialAccount) => socialAccount.connection.id === socialConnectionId);

        if (index > -1) {
          this.entities.splice(index, 1);
          this._groupAccountsByNetwork();
        }
      })
    ));
  }
  /**
   * Call the API to make the social accounts request.
   *
   * @return {Promise}
   */
  getSocialAccounts() {
    return this._getEntities()
    .then(() => this._groupAccountsByNetwork());
  }
  /**
   * Format an API response in order to the get the social accounts list.
   *
   * @param {Array} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    return response;
  }
  /**
   * Organizes accounts by social network.
   *
   * @access protected
   */
  _groupAccountsByNetwork() {
    this.socialAccountsByNetwork = {};

    this.entities.forEach((socialAccount) => {
      const network = socialAccount.connection.social_network;
      const networkList = this.socialAccountsByNetwork[network];

      if (networkList) {
        networkList.push(socialAccount);
      } else {
        this.socialAccountsByNetwork[network] = [socialAccount];
      }
    });
  }
  /**
   * Call the API to make the request for the social accounts list.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest() {
    return this.appAPI.getSocialAccounts();
  }
}

/**
 * @ngdoc factory
 * @name socialAccountsList
 * @description
 * This object contains a method to create a new instanece of the {@link SocialAccountsList}.
 *
 * @param {$q}     $q      To reject error responses.
 * @param {AppAPI} appAPI  To make the API requests.
 *
 * @return {Function}
 *
 * @memberof common
 */
const socialAccountsList = (
  $q,
  appAPI,
) => {
  'ngInject';

  return {
    getNewInstance: () => new SocialAccountsList(
      $q,
      appAPI,
    ),
  };
};

export default socialAccountsList;
