import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name InstagramBusinessAccountsList
 * @description
 * This service is used to get Instagram Business Accounts List.
 *
 * @memberof library
 */
class InstagramBusinessAccountsList extends EntitiesList {
  /**
   * @param {$q}       $q        To reject error responses.
   * @param {AppAPI}   appAPI    To make the API requests.
   * @param {AppUtils} appUtils  To create delayed promises.
   */
  constructor(
    $q,
    appAPI,
    appUtils,
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
     * The local reference to the `appUtils` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The reference current request in progress.
     *
     * @type {Promise}
     * @access protected
     */
    this._currentRequest = null;
    /**
     * The error of the Instagram Business Accounts request.
     *
     * @type {?Object}
     */
    this.instagramBusinessAccountsError = null;
    /**
     * The list of tapshop accounts.
     *
     * @type {Array}
     */
    this.tapshopAccounts = [];

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * If we are currently doing a request (loading is true), try to cancel the current request.
   * If the cancel method return a success value (true), we must respond with a delayed promise
   * so the loading flag gets changed.
   *
   * @return {Promise}
   */
  cancelCurrentRequest() {
    return this.loading && this.appAPI.cancelRequest(this._currentRequest) ?
      // We are responding with a delayed promise of 0 because we need the cancelRequest to complete.
      this.appUtils.delayedPromise(0) :
      this.$q.resolve();
  }
  /**
   * Call the API to make the Instagram Accounts request.
   *
   * @return {Promise}
   */
  getInstagramBusinessAccounts() {
    return this._getEntities()
    .then((response) => {
      this.instagramBusinessAccountsError = null;
      return response;
    })
    .catch((error) => {
      if (error) {
        this.entities = null;
        this.instagramBusinessAccountsError = error;
        this.tapshopAccounts = [];
      }

      return this.$q.reject(error);
    });
  }
  /**
   * Format an API response in order to the get the Instagram Business Accounts list.
   *
   * @param {Array} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    this.tapshopAccounts = response
    .filter((account) => account.properties && account.properties.shoppable_instagram_active === 'true');
    return response;
  }
  /**
   * Call the API to make the Instagram Business Accounts request.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest() {
    this._currentRequest = this.appAPI.getInstagramBusinessAccounts();

    return this._currentRequest;
  }
}

/**
 * @ngdoc factory
 * @name instagramBusinessAccountsList
 * @description
 * This object contains a method to create a new instance of the {@link InstagramBusinessAccountsList}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To create delayed promises.
 *
 * @return {Object}
 *
 * @memberof library
 */
const instagramBusinessAccountsList = (
  $q,
  appAPI,
  appUtils,
) => {
  'ngInject';

  return {
    getNewInstance: () => new InstagramBusinessAccountsList(
      $q,
      appAPI,
      appUtils,
    ),
  };
};

export default instagramBusinessAccountsList;
