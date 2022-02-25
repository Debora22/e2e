import EntitiesList from '../abstracts/entitiesList';

/**
 * @ngdoc service
 * @name KeywordsList
 * @description
 * This service is used to search for keywords suggestions.
 *
 * @memberof common
 */
class KeywordsList extends EntitiesList {
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
   * Call the API to make the keywords suggestions request.
   * If an error is returned by the `EntitiesList`, return the error.
   * If not, it was an abort error, so just return the entities.
   *
   * @param {String} search  The text to search keywords suggestions for.
   *
   * @return {Promise}
   */
  getKeywordsSuggestions(search) {
    return this._getEntities(search)
    .catch((error) => (error ? this.$q.reject(error) : this.entities));
  }
  /**
   * Format an API response in order to the get the keywords list.
   *
   * @param {Array}  response  The response to format.
   * @param {String} search    The text to search keywords suggestions for.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response, search) {
    const escapedSearch = this.appUtils.escapeRegExp(search);
    const searchRegex = new RegExp(`(${escapedSearch})`, 'ig');

    return response.keywords.map((keyword) => ({
      name: keyword,
      label: keyword.replace(searchRegex, '<strong>$1</strong>'),
    }));
  }
  /**
   * Call the API to make the request for the keywords list.
   * Save the request as the current one.
   *
   * @param {String} search  The text to search keywords suggestions for.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(search) {
    this._currentRequest = this.appAPI.getKeywordsSuggestions(search);

    return this._currentRequest;
  }
}

/**
 * @ngdoc factory
 * @name keywordsList
 * @description
 * This object contains a method to create a new instance of the {@link KeywordsList}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To create delayed promises.
 *
 * @return {Function}
 *
 * @memberof library
 */
const keywordsList = (
  $q,
  appAPI,
  appUtils,
) => {
  'ngInject';

  return {
    getNewInstance: () => new KeywordsList(
      $q,
      appAPI,
      appUtils,
    ),
  };
};

export default keywordsList;
