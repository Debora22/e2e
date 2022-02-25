import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name AdvocatesList
 * @description
 * This service is used to search for advocates.
 *
 * @memberof advocates
 */
class AdvocatesList extends EntitiesList {
  /**
   * @param {$filter} $filter  To filter the advocates list.
   * @param {$q}      $q       To reject error responses.
   * @param {AppAPI}  appAPI   To make the API requests.
   */
  constructor(
    $filter,
    $q,
    appAPI,
  ) {
    super($q);

    /**
     * The local reference to the `$filter` service.
     *
     * @type {$filter}
     */
    this.$filter = $filter;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The advocates list.
     *
     * @type {Array}
     */
    this.advocates = [];
    /**
     * The amount of advocates per page the list will load and show.
     *
     * @type {Object}
     */
    this.pageSize = 20;
    /**
     * The pagination information.
     *
     * @type {Object}
     */
    this.pagination = {
      from: 0,
      to: 0,
      total: 0,
      next: false,
      prev: false,
    };
    /**
     * The text to search advocates for.
     *
     * @type {String}
     */
    this.search = '';
    /**
     * The list of suggestions to show.
     *
     * @type {?Array}
     */
    this.suggestions = null;
    /**
     * The sort to order the advocates with.
     *
     * @type {Object}
     */
    this.selectedSort = {};

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Call the API to make the advocates request.
   *
   * @param {String}  conversionInterval  The conversion window.
   * @param {String}  currency            The currency code.
   * @param {Moment}  dateFrom            The start date to display the analytics.
   * @param {Moment}  dateTo              The end date to display the analytics.
   * @param {Boolean} isEnterprise        If the account is enterprise.
   * @param {Boolean} isFocusRevenue      If we are displaying revenue focused analytics.
   *
   * @return {Promise}
   */
  getAdvocates(conversionInterval, currency, dateFrom, dateTo, isEnterprise, isFocusRevenue) {
    this.advocates = [];

    return this._getEntities(conversionInterval, currency, dateFrom, dateTo, isEnterprise, isFocusRevenue)
    .then(() => {
      this.refreshAdvocatesList();
    });
  }
  /**
   * Get the next page of advocates.
   */
  getNextPage() {
    if (!this.pagination.next) {
      throw new Error('Unable to fetch the next page');
    }

    const from = this.pagination.from + this.pageSize;
    this.refreshAdvocatesList(from);
  }
  /**
   * Get the previous page of advocates.
   */
  getPreviousPage() {
    if (!this.pagination.prev) {
      throw new Error('Unable to fetch the previous page');
    }

    const from = this.pagination.from - this.pageSize;
    this.refreshAdvocatesList(from);
  }
  /**
   * Generate the advocates list, by first filtering using the search text.
   * Then, we generate the pagination object.
   * Finally we filter the list according to the page size and the starting point.
   *
   * @param {Number} from  The starting point to set the pagination to.
   */
  refreshAdvocatesList(from = 1) {
    // First filter the advocates entities with the search text not using strict comparison.
    this.advocates = this.$filter('filter')(
      this.entities,
      { q: this.search },
    );

    this.advocates = this.$filter('orderBy')(
      this.advocates,
      this.selectedSort.field,
      !this.selectedSort.asc,
    );

    const to = Math.min((from + this.pageSize) - 1, this.advocates.length);
    this.pagination = {
      from,
      to,
      total: this.advocates.length,
      next: to !== this.advocates.length,
      prev: from !== 1,
    };

    this.advocates = this.$filter('limitTo')(
      this.advocates,
      this.pageSize,
      from - 1,
    );
  }
  /**
   * Update the search by the given text and refresh the advocates list.
   *
   * @param {String} search  The text to search advocates for.
   */
  searchAdvocates(search) {
    this.search = search;
    this.suggestions = null;
    this.refreshAdvocatesList();
  }
  /**
   * Generate the suggestions based on the advocates list.
   *
   * @param {String} search  The text from search field.
   */
  searchSuggestions(search = '') {
    const username = search.toLowerCase();
    const suggestions = this.entities
    .filter((advocate) => advocate.ambassador.username.includes(username))
    .map((advocate) => (advocate.ambassador.username));

    this.suggestions = [...new Set(suggestions)].map((item) => ({ label: item }));
  }
  /**
   * Format an API response in order to the get the advocates list.
   *
   * @param {Array} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    return response.map((advocate) => ({
      ...advocate,
      q: advocate.ambassador.username,
    }));
  }
  /**
   * Call the API to make the request for the advocates list.
   *
   * @param {...*} args  The arguments to make the request with.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(...args) {
    return this.appAPI.getAdvocates(...args);
  }
}

/**
 * @ngdoc factory
 * @name advocatesList
 * @description
 * This object contains a method to create a new instance of the {@link AdvocatesList}.
 *
 * @param {$filter} $filter  To filter the advocates list.
 * @param {$q}      $q       To reject error responses.
 * @param {AppAPI}  appAPI   To make the API requests.
 *
 * @return {Function}
 *
 * @memberof advocates
 */
const advocatesList = (
  $filter,
  $q,
  appAPI,
) => {
  'ngInject';

  return {
    getNewInstance: () => new AdvocatesList(
      $filter,
      $q,
      appAPI,
    ),
  };
};

export default advocatesList;
