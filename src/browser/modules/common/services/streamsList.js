import EntitiesList from '../abstracts/entitiesList';

/**
 * @ngdoc service
 * @name StreamsList
 * @description
 * This service is used to handle streams; allowing us to search, link or unlink them to media.
 *
 * @memberof common
 */
class StreamsList extends EntitiesList {
  /**
   * @param {$q}       $q        To reject error responses.
   * @param {AppAPI}   appAPI    To make the API requests.
   * @param {AppUtils} appUtils  To escape regular expressions.
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
   * Call the API to change the position of the streams of a media.
   *
   * @param {Number} mediaId    The media id to which the streams will be changed.
   * @param {Array}  positions  The new stream positions.
   *
   * @return {Promise}
   */
  changeStreamsPositions(mediaId, positions) {
    return this._requestWithLoading(() => this.appAPI.changeStreamsPositions(
      mediaId,
      positions,
    ));
  }
  /**
   * Get the next page of streams using the pagination next link.
   *
   * @return {Promise}
   */
  getNextPage() {
    if (!this.pagination.next) {
      return this.$q.reject(new Error('Unable to fetch the next page'));
    }

    const streamSearchParams = this.appUtils.getQueryParams(this.pagination.next);
    return this._loadNextPage(streamSearchParams);
  }
  /**
   * Call the API to search for streams.
   * If an error is returned by the `EntitiesList`, return the error.
   * If not, it was an abort error, so just return the entities.
   *
   * @param {String} text  The text to search for.
   *
   * @return {Promise}
   */
  getStreams(text) {
    const streamSearchParams = { phrase: text };

    return this._getEntities(streamSearchParams)
    .catch((error) => (error ? this.$q.reject(error) : this.entities));
  }
  /**
   * Call the API to link or unlink (save or remove) streams.
   *
   * @param {Array}   mediaIds  The media ids where the streams will be linked/unlinked.
   * @param {Array}   streams   The streams to link or unlink.
   * @param {Boolean} isAdding  If we are adding or removing streams.
   *
   * @return {Promise}
   */
  saveStreams(mediaIds, streams, isAdding) {
    return this._requestWithLoading(() => this.appAPI.saveStreams(
      mediaIds,
      streams,
      isAdding,
    ));
  }
  /**
   * Format an API response in order to the get the streams list and the pagination object.
   *
   * @param {Object} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    this.pagination = response.metadata.pagination;

    if (this.pagination.from < 1) {
      this.pagination.from = 1;
    }
    return response.data;
  }
  /**
   * Call the API to make the request for the streams list.
   * Save the request as the current one.
   *
   * @param {StreamSearchParams} streamSearchParams  The params to add to the search.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(streamSearchParams) {
    this._currentRequest = this.appAPI.getStreams(streamSearchParams);

    return this._currentRequest;
  }
  /**
   * Call the API to make the request for the next streams page.
   *
   * @param {StreamSearchParams} streamSearchParams  The params to add to the search.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeNextPageRequest(streamSearchParams) {
    return this.appAPI.getStreams(streamSearchParams);
  }
}

/**
 * @ngdoc factory
 * @name streamsList
 * @description
 * This object contains a method to create a new instanece of the {@link StreamsList}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To escape regular expressions.
 *
 * @return {Function}
 *
 * @memberof library
 */
const streamsList = (
  $q,
  appAPI,
  appUtils,
) => {
  'ngInject';

  return {
    getNewInstance: () => new StreamsList(
      $q,
      appAPI,
      appUtils,
    ),
  };
};

export default streamsList;
