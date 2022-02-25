/**
 * This abstract class contains the basic implementation to support
 * fetching a list of entities and perform pagination over it.
 *
 * @abstract
 *
 * @memberof common
 */
class EntitiesList {
  /**
   * @param {$q} $q  To reject error responses.
   *
   * @abstract
   */
  constructor($q) {
    if (new.target === EntitiesList) {
      throw new TypeError('EntitiesList is an abstract class, it can\'t be instantiated directly');
    }

    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The list of entities.
     *
     * @type {Array}
     */
    this.entities = [];
    /**
     * The pagination information.
     *
     * @type {Object}
     */
    this.pagination = {};
    /**
     * Flag that indicates if a request to fetch the entities is in progress.
     *
     * @type {Boolean}
     */
    this.loading = false;
    /**
     * Map of the available request types.
     *
     * @type {Object}
     * @property {String} first     The request to fetch the first page of entities.
     * @property {String} next      The request to fetch the next page of entities.
     * @property {String} previous  The request to fetch the previous page of entities.
     * @access protected
     */
    this._requestTypes = {
      first: 'first',
      next: 'next',
      previous: 'previous',
    };
    /**
     * Map of the available pagination types.
     *
     * @type {Object}
     * @property {String} page  The page pagination type. On every request type the list of entities
     *                          will be overwritten with the fetch response.
     * @property {String} list  The list pagination type. When fetching the next page of entities, the
     *                          result will be appended to the list of entities.
     * @access protected
     */
    this._paginationTypes = {
      page: 'page',
      list: 'list',
    };
    /**
     * Indicates the type of pagination the entities list is performing.
     *
     * @type {String}
     * @access protected
     */
    this._paginationType = this._paginationTypes.page;
  }
  /**
   * Perform the type of request acording to the given `requestType`,
   * then format the response object and set the entities list, according
   * to the selected pagination type.
   *
   * @param {String} requestType  The type of request it is being done.
   * @param {...*}   args         The arguments to make the request with.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _fetch(requestType, ...args) {
    let result;

    if (this.loading) {
      result = this.$q.reject(new Error('Another request is being made'));
    } else {
      this.loading = true;

      switch (requestType) {
      case this._requestTypes.first:
        result = this._makeFirstRequest(...args);
        break;
      case this._requestTypes.next:
        result = this._makeNextPageRequest(...args);
        break;
      case this._requestTypes.previous:
        result = this._makePreviousPageRequest(...args);
        break;
      default:
        result = this.$q.reject(new Error('Unknown Request Type'));
        break;
      }

      result = result
      .then((response) => {
        const entities = this._formatResponse(response, ...args);
        this.loading = false;

        if (
          requestType === this._requestTypes.next &&
          this._paginationType === this._paginationTypes.list
        ) {
          this.entities.push(...entities);
        } else {
          this.entities = entities;
        }
        return this.entities;
      })
      .catch((error) => {
        this.loading = false;
        return this.$q.reject(error);
      });
    }

    return result;
  }
  /**
   * Format the response to the proper entity object and get the pagination object.
   *
   * @abstract
   */
  _formatResponse() {
    throw new Error('The `_formatResponse` method hasn\'t been overwritten');
  }
  /**
   * Call the `_fetch` method with a `first` requestType and the arguments of the request.
   *
   * @param {...*} args  The arguments to make the request with.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _getEntities(...args) {
    this.entities = [];

    return this._fetch(this._requestTypes.first, ...args);
  }
  /**
   * Call the `_fetch` method with a `next` requestType and the arguments of the request.
   *
   * @param {...*} args  The arguments to make the request with.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _loadNextPage(...args) {
    return this._fetch(this._requestTypes.next, ...args);
  }
  /**
   * Call the `_fetch` method with a `previous` requestType and the arguments of the request.
   *
   * @param {...*} args  The arguments to make the request with.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _loadPreviousPage(...args) {
    return this._fetch(this._requestTypes.previous, ...args);
  }
  /**
   * Call the API to make the first entities request.
   *
   * @return {Promise}
   *
   * @abstract
   * @access protected
   */
  _makeFirstRequest() {
    return this.$q.reject(new Error('The `_makeFirstRequest` method hasn\'t been overwritten'));
  }
  /**
   * Call the API to make the next page entities request.
   *
   * @return {Promise}
   *
   * @abstract
   * @access protected
   */
  _makeNextPageRequest() {
    return this.$q.reject(new Error('The `_makeNextPageRequest` method hasn\'t been overwritten'));
  }
  /**
   * Call the API to make the previous page entities request.
   *
   * @return {Promise}
   *
   * @abstract
   * @access protected
   */
  _makePreviousPageRequest() {
    return this.$q.reject(new Error('The `_makePreviousPageRequest` method hasn\'t been overwritten'));
  }
  /**
   * Execute a request with loading functions.
   *
   * @param {Function} fn  The request to make.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _requestWithLoading(fn) {
    this.loading = true;

    return fn()
    .then((response) => {
      this.loading = false;
      return response;
    })
    .catch((error) => {
      this.loading = false;
      return this.$q.reject(error);
    });
  }
  /**
   * Set the pagination type as `list`.
   * Each new next page will be appended to the entities.
   *
   * @access protected
   */
  _setPaginationAsList() {
    this._paginationType = this._paginationTypes.list;
  }
  /**
   * Set the pagination type as `page`.
   * Each new fist, previous or next page will be set as the new entities.
   *
   * @access protected
   */
  _setPaginationAsPage() {
    this._paginationType = this._paginationTypes.page;
  }
}

export default EntitiesList;
