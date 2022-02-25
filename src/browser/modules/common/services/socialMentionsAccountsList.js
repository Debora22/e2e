import EntitiesList from '../abstracts/entitiesList';

/**
 * @ngdoc service
 * @name SocialMentionsAccountsList
 * @description
 * This service is used to get the customer social mentions accounts (business Instagram accounts
 * connected to the Facebook social account).
 *
 * @memberof common
 */
class SocialMentionsAccountsList extends EntitiesList {
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
   * Call the API to make the social mentions accounts request.
   *
   * @return {Promise}
   */
  getSocialMentionsAccounts() {
    return this._getEntities();
  }
  /**
   * Format an API response in order to the get the social mentions accounts list.
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
   * Call the API to make the request for the social mentions accounts list.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest() {
    return this.appAPI.getSocialMentionsAccounts();
  }
}

/**
 * @ngdoc factory
 * @name socialMentionsAccountsList
 * @description
 * This object contains a method to create a new instanece of the {@link SocialMentionsAccountsList}.
 *
 * @param {$q}     $q      To reject error responses.
 * @param {AppAPI} appAPI  To make the API requests.
 *
 * @return {Function}
 *
 * @memberof common
 */
const socialMentionsAccountsList = (
  $q,
  appAPI,
) => {
  'ngInject';

  return {
    getNewInstance: () => new SocialMentionsAccountsList(
      $q,
      appAPI,
    ),
  };
};

export default socialMentionsAccountsList;
