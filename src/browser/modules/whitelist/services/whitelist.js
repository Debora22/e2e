import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc class
 * @name Whitelist
 * @description
 * This service is used to get the whitelist.
 *
 * @memberof whitelist
 */
class Whitelist extends EntitiesList {
  /**
   * @param {$q}       $q        To reject error responses.
   * @param {AppAPI}   appAPI    To make the API requests.
   * @param {AppUtils} appUtils  To get the query params from the pagination links.
   * @param {Moment}   moment    To perform date manipulation.
   */
  constructor(
    $q,
    appAPI,
    appUtils,
    moment,
  ) {
    super($q);

    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
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
   * Delete a whitelist user.
   *
   * @param {Array<Number>}  whitelistUsersIds  The list of whitelist user ids to delete.
   *
   * @return {Promise}
   */
  deleteWhitelistUsers(whitelistUsersIds) {
    return this._requestWithLoading(() => (
      whitelistUsersIds.length > 1 ?
        this.appAPI.deleteBulkWhitelistUsers(whitelistUsersIds) :
        this.appAPI.deleteWhitelistUser([whitelistUsersIds])
    ));
  }
  /**
   * Get the next page of whitelist users using the pagination next link.
   *
   * @return {Promise}
   */
  getNextPage() {
    if (!this.pagination.links.next) {
      return this.$q.reject(new Error('Unable to fetch the next page'));
    }

    const whitelistUsersSearchParams = this.appUtils.getQueryParams(this.pagination.links.next);
    this._clearBeforeRequest();

    return this._loadNextPage(whitelistUsersSearchParams);
  }
  /**
   * Get the previous page of whitelist users using the pagination prev link.
   *
   * @return {Promise}
   */
  getPreviousPage() {
    if (!this.pagination.links.prev) {
      return this.$q.reject(new Error('Unable to fetch the previous page'));
    }

    const whitelistUsersSearchParams = this.appUtils.getQueryParams(this.pagination.links.prev);
    this._clearBeforeRequest();

    return this._loadPreviousPage(whitelistUsersSearchParams);
  }
  /**
   * Call the API to make the initial whitelist users request.
   *
   * @param {WhitelistUsersSearchParams} whitelistUsersSearchParams  The params to add to the fetch.
   *
   * @return {Promise}
   */
  getWhitelistUsers(whitelistUsersSearchParams = {}) {
    this._clearBeforeRequest();

    return this._getEntities(whitelistUsersSearchParams);
  }
  /**
   * Refresh the current page of whitelist users using the pagination self link.
   *
   * @return {Promise}
   */
  refreshCurrentPage() {
    if (!this.pagination.links.self) {
      return this.$q.reject(new Error('Unable to fetch the current page'));
    }

    const whitelistUsersSearchParams = this.appUtils.getQueryParams(this.pagination.links.self);
    this._clearBeforeRequest();

    return this._getEntities(whitelistUsersSearchParams);
  }
  /**
   * Call the API to create/update a list of whitelist users.
   *
   * @param {Array}         whitelistUsers  The list of whitelist users to create/update.
   * @param {String}        source          The source to set to all whitelist users.
   * @param {Array<String>} labels          Label assigned to the user/s.
   * @param {String}        dateFrom        The from date where the whitelist users are enabled.
   * @param {String}        dateTo          The to date where the whitelist users are enabled.
   *
   * @return {Promise}
   */
  saveWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo) {
    return this._requestWithLoading(() => this.appAPI.saveWhitelistUsers(
      whitelistUsers,
      source,
      labels,
      dateFrom,
      dateTo,
    ));
  }
  /**
   * Call the API to validate a list of whitelist users.
   *
   * @param {Array}         whitelistUsers  The list of whitelist users to validate.
   * @param {String}        source          The source to set to all whitelist users.
   * @param {Array<String>} labels          Label assigned to the user/s.
   * @param {String}        dateFrom        The from date where the whitelist users are enabled.
   * @param {String}        dateTo          The to date where the whitelist users are enabled.
   *
   * @return {Promise}
   */
  validateWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo) {
    return this._requestWithLoading(() => this.appAPI.validateWhitelistUsers(
      whitelistUsers,
      source,
      labels,
      dateFrom,
      dateTo,
    ));
  }
  /**
   * Clear the entities list so the UI get cleared before performing an API request.
   *
   * @access protected
   */
  _clearBeforeRequest() {
    this.entities = [];
  }
  /**
   * Format an API response in order to the get the whitelist users list and the pagination object.
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

    return response.data.map((user) => {
      user.userDatePhrase = this._getWhitelistUserAccountDatesPhrase(user);
      [user.labelsDisplay] = user.labels;
      return user;
    });
  }
  /**
   * Creates a phrase with the days accounts related to the days remaining.
   * For a user to remain active, days until it start or showing a status.
   *
   * @param {Object} user  The whitelist user to process.
   *
   * @return {String}
   *
   * @access protected
   */
  _getWhitelistUserAccountDatesPhrase(user) {
    const { status, dateFrom, dateTo } = user;
    const today = this.moment();
    let daysAccount = 0;
    let phrase = '';

    switch (status) {
    case 'active':
      if (dateTo) {
        daysAccount = Math.ceil(this.moment(dateTo).diff(today, 'days', true));
        phrase = daysAccount > 1 ?
          `${daysAccount} days remaining` :
          'last day';
      } else {
        phrase = 'active';
      }
      break;
    case 'inactive':
      phrase = 'expired';
      break;
    case 'upcoming':
      daysAccount = Math.ceil(this.moment(dateFrom).diff(today, 'days', true));
      phrase = daysAccount > 1 ?
        `starts in ${daysAccount} days` :
        'starts tomorrow';
      break;
    default:
      phrase = '';
    }

    return phrase;
  }
  /**
   * Call the API to make the request for whitelist users first page.
   *
   * @param {WhitelistUsersSearchParams} whitelistUsersSearchParams  The params to add to the fetch.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(whitelistUsersSearchParams = {}) {
    this._currentRequest = this.appAPI.getWhitelistUsers(whitelistUsersSearchParams);

    return this._currentRequest;
  }
  /**
   * Call the API to make the request for the next whitelist users page.
   *
   * @param {WhitelistUsersSearchParams} whitelistUsersSearchParams  The params to add to the fetch.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeNextPageRequest(whitelistUsersSearchParams) {
    return this.appAPI.getWhitelistUsers(whitelistUsersSearchParams);
  }
  /**
   * Call the API to make the request for the previous whitelist users page.
   *
   * @param {WhitelistUsersSearchParams} whitelistUsersSearchParams  The params to add to the fetch.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makePreviousPageRequest(whitelistUsersSearchParams) {
    return this.appAPI.getWhitelistUsers(whitelistUsersSearchParams);
  }
}

/**
 * @ngdoc factory
 * @name whitelist
 * @description
 * This object contains a method to create a new instance of the {@link Whitelist}.
 *
 * @param {$q}       $q        To reject error responses.
 * @param {AppAPI}   appAPI    To make the API requests.
 * @param {AppUtils} appUtils  To get the query params from the pagination links.
 * @param {Moment}   moment    To perform date manipulation.
 *
 * @return {Function}
 *
 * @memberof whitelist
 */
const whitelist = (
  $q,
  appAPI,
  appUtils,
  moment,
) => {
  'ngInject';

  return {
    getNewInstance: () => new Whitelist(
      $q,
      appAPI,
      appUtils,
      moment,
    ),
  };
};

export default whitelist;
