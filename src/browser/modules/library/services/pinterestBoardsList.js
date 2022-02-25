import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name PinterestBoardsList
 * @description
 * This service is used to get the Pinterest boards List.
 *
 * @memberof library
 */
class PinterestBoardsList extends EntitiesList {
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
     * The pin details.
     *
     * @type {Boolean}
     */
    this.pinDetails = null;

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
   * Clear the entities list.
   */
  clearEntities() {
    this.entities = [];
    this.pinDetails = null;
  }
  /**
   * Call the API to make the Pinterest boards request.
   *
   * @param {Number} socialAccountId  The social account Id to get the boards from.
   *
   * @return {Promise}
   */
  getPinterestBoards(socialAccountId) {
    return this._getEntities(socialAccountId);
  }
  /**
   * Call the API to make the Pinterest Pin request.
   *
   * @param {Number} pinId            The pin Id.
   * @param {Number} socialAccountId  The social account Id.
   *
   * @return {Promise}
   */
  getPinterestPin(pinId, socialAccountId) {
    return this._requestWithLoading(() => (
      this.appAPI.getPinterestPin(pinId, socialAccountId)
      .then((response) => {
        this.pinDetails = response;
        return response;
      })
    ));
  }
  /**
   * Format an API response in order to the get the Pinterest boards list.
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
   * Call the API to make the Pinterest boards request.
   *
   * @param {Number} socialAccountId  The social account Id to get the boards from.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(socialAccountId) {
    this._currentRequest = this.appAPI.getPinterestBoards(socialAccountId);

    return this._currentRequest;
  }
}

/**
 * @ngdoc factory
 * @name pinterestBoardsList
 * @description
 * This object contains a method to create a new instance of the {@link PinterestBoardsList}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To create delayed promises.
 *
 * @return {Object}
 *
 * @memberof library
 */
const pinterestBoardsList = (
  $q,
  appAPI,
  appUtils,
) => {
  'ngInject';

  return {
    getNewInstance: () => new PinterestBoardsList(
      $q,
      appAPI,
      appUtils,
    ),
  };
};

export default pinterestBoardsList;
