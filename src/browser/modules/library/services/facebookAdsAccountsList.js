import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name FacebookAdsAccountsList
 * @description
 * This service is used to get Facebook Ads Accounts List.
 *
 * @memberof library
 */
class FacebookAdsAccountsList extends EntitiesList {
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
     * The error of the Facebook Ads Accounts request.
     *
     * @type {?Object}
     */
    this.facebookAdsAccountError = null;

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
   * Call the API to make the Facebook Ads Accounts request.
   *
   * @return {Promise}
   */
  getFacebookAdsAccounts() {
    return this._getEntities()
    .then((response) => {
      this.facebookAdsAccountError = null;
      return response;
    })
    .catch((error) => {
      if (error) {
        this.entities = null;
        this.facebookAdsAccountError = error;
      }

      return this.$q.reject(error);
    });
  }
  /**
   * Format an API response in order to the get the Facebook Ads Accounts list.
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
   * Call the API to make the Facebook Ads Accounts request.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest() {
    this._currentRequest = this.appAPI.getFacebookAdsAccounts();

    return this._currentRequest;
  }
}

/**
 * @ngdoc factory
 * @name facebookAdsAccountsList
 * @description
 * This object contains a method to create a new instance of the {@link FacebookAdsAccountsList}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To create delayed promises.
 *
 * @return {Object}
 *
 * @memberof library
 */
const facebookAdsAccountsList = (
  $q,
  appAPI,
  appUtils,
) => {
  'ngInject';

  return {
    getNewInstance: () => new FacebookAdsAccountsList(
      $q,
      appAPI,
      appUtils,
    ),
  };
};

export default facebookAdsAccountsList;
