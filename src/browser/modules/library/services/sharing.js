import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name Sharing
 * @description
 * This service is used to get the sharing url of a list of media.
 *
 * @memberof library
 */
class Sharing extends EntitiesList {
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
   * Perform a request to request to create a sharing document.
   *
   * @param {Array} media  The media to be shared.
   *
   * @return {Promise}
   */
  createSharingDocument(media) {
    return this._requestWithLoading(() => {
      this._currentRequest = this.appAPI.createSharingDocument(media);

      return this._currentRequest;
    });
  }
}

/**
 * @ngdoc factory
 * @name sharing
 * @description
 * This object contains a method to create a new instance of the {@link Sharing}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To create delayed promises.
 *
 * @return {Function}
 *
 * @memberof library
 */
const sharing = (
  $q,
  appAPI,
  appUtils,
) => {
  'ngInject';

  return {
    getNewInstance: () => new Sharing(
      $q,
      appAPI,
      appUtils,
    ),
  };
};

export default sharing;
