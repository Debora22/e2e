/**
 * @ngdoc controller
 * @name AdvocatesContainer
 * @description
 * This container displays the advocates section.
 *
 * @memberof advocates
 */
class AdvocatesContainer {
  /**
   * @param {analyticsExportAPI}  analyticsExportAPI            To fetch the export data.
   * @param {AppErrorHandler}     appErrorHandler               To display any error.
   * @param {Object}              advocatesList                 To fetch the advocates.
   * @param {AppSession}          appSession                    To get the app session.
   * @param {Moment}              moment                        To perform date manipulation.
   * @param {Array}               ADVOCATES_DATE_RANGE_OPTIONS  To get the date range options.
   * @param {Array}               ADVOCATES_SORT_ENGAGEMENT     To get the sort for engagement focus.
   * @param {Array}               ADVOCATES_SORT_REVENUE        To get the sort for revenue focus.
   * @param {Object}              ADVOCATES_TOOLTIPS            To get the tooltips for advocate's metrics.
   */
  constructor(
    analyticsExportAPI,
    appErrorHandler,
    advocatesList,
    appSession,
    moment,
    ADVOCATES_DATE_RANGE_OPTIONS,
    ADVOCATES_SORT_ENGAGEMENT,
    ADVOCATES_SORT_REVENUE,
    ADVOCATES_TOOLTIPS,
  ) {
    'ngInject';

    /**
     * The local reference to the `analyticsExportAPI` service.
     *
     * @type {analyticsExportAPI}
     */
    this.analyticsExportAPI = analyticsExportAPI;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `advocatesList` service.
     *
     * @type {AdvocatesList}
     */
    this.advocatesList = advocatesList.getNewInstance();
    /**
     * The local reference to the `appSession` service.
     *
     * @type {AppSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
    /**
     * The local reference to the `dateRange` constant.
     *
     * @type {Array}
     */
    this.dateRangeOptions = ADVOCATES_DATE_RANGE_OPTIONS;
    /**
     * The local reference to the `conversionInterval` constant.
     *
     * @type {?String}
     */
    this.conversionInterval = null;
    /**
     * The local reference to the `currencyCode` constant.
     *
     * @type {?String}
     */
    this.currencyCode = null;
    /**
     * The local reference to the `currencySymbol` constant.
     *
     * @type {?String}
     */
    this.currencySymbol = null;
    /**
     * Flag that indicates if the customer is an enterprise account or not.
     *
     * @type {Boolean}
     */
    this.isEnterprise = false;
    /**
     * Flag that indicates if the customer is revenue focused.
     *
     * @type {Boolean}
     */
    this.isFocusRevenue = false;
    /**
     * The selected Date Range.
     *
     * @type {?Object}
     */
    this.selectedDateRange = null;
    /**
     * The local reference to the `sortEngagementList` constant.
     *
     * @type {Array}
     */
    this.sortEngagementList = [
      ADVOCATES_SORT_ENGAGEMENT.CTRDesc,
      ADVOCATES_SORT_ENGAGEMENT.CTRAsc,
      ADVOCATES_SORT_ENGAGEMENT.shoppingClicksDesc,
      ADVOCATES_SORT_ENGAGEMENT.shoppingClicksAsc,
      ADVOCATES_SORT_ENGAGEMENT.lightBoxDesc,
      ADVOCATES_SORT_ENGAGEMENT.lightBoxAsc,
    ];
    /**
     * The local reference to the `sortRevenueList` constant.
     *
     * @type {Array}
     */
    this.sortRevenueList = [
      ADVOCATES_SORT_REVENUE.revenueDesc,
      ADVOCATES_SORT_REVENUE.revenueAsc,
      ADVOCATES_SORT_REVENUE.conversionsDesc,
      ADVOCATES_SORT_REVENUE.conversionsAsc,
      ADVOCATES_SORT_REVENUE.CVRDesc,
      ADVOCATES_SORT_REVENUE.CVRAsc,
      ADVOCATES_SORT_REVENUE.lightBoxDesc,
      ADVOCATES_SORT_REVENUE.lightBoxAsc,
    ];
    /**
     * The local reference to the `sortList` constant.
     *
     * @type {Array}
     */
    this.sortList = [];
    /**
     * The local reference to the `tooltips` constant.
     *
     * @type {Tooltips}
     */
    this.tooltips = ADVOCATES_TOOLTIPS;
  }
  /**
   * Set the initial load.
   */
  $onInit() {
    const { account } = this.appSession.getSession();
    this.conversionInterval = account.settings.analytics_conversion_interval;
    this.currencyCode = account.settings.currency_info.code;
    this.currencySymbol = account.settings.currency_info.symbol;
    this.isEnterprise = account.settings.analytics_enterprise_analytics;
    this.isFocusRevenue = !account.settings.analytics_dashboard_engagement;
    this.sortList = this.isFocusRevenue ? this.sortRevenueList : this.sortEngagementList;

    this.onDateRangeSelection(this.dateRangeOptions[0]);
    [this.advocatesList.selectedSort] = this.sortList;
  }
  /**
   * Check if we should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoading() {
    return this.advocatesList.loading ||
      this.analyticsExportAPI.loading;
  }
  /**
   * Each time a new date range is selected, refresh the advocates list.
   *
   * @param {Object} dateRange  The dateRange to set as selected.
   */
  onDateRangeSelection(dateRange) {
    this.selectedDateRange = dateRange;
    this._getAdvocates();
  }
  /**
   * Callback for download the export csv data.
   *
   * @return {Promise}
   */
  onExportDownload() {
    return this.analyticsExportAPI.downloadCsvFile(
      this.conversionInterval,
      this.currencyCode,
      this._processDate(this.selectedDateRange.range.from),
      this._processDate(this.selectedDateRange.range.to),
      this.isEnterprise,
      this.isFocusRevenue,
    )
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Callback when the pagination `Next` button is clicked.
   * It will get the next Advocates users page.
   */
  onPaginationNextClick() {
    this.advocatesList.getNextPage();
  }
  /**
   * Callback when the pagination `Previous` button is clicked.
   * It will get the previous Advocates users page.
   */
  onPaginationPreviousClick() {
    this.advocatesList.getPreviousPage();
  }
  /**
   * Callback when a search text changes.
   *
   * @param {String} search  The text from search field.
   */
  onSearchTextChange(search) {
    if (search) {
      this.advocatesList.searchSuggestions(search);
    } else {
      this.advocatesList.searchAdvocates(search);
    }
  }
  /**
   * Whenever the text in the search box changes, update the search and refresh the advocates list.
   *
   * @param {String} search  The text to search advocates for.
   */
  onSearchTrigger(search) {
    this.advocatesList.searchAdvocates(search);
  }
  /**
   * When a new sort is selected, update the selected sort and refresh the advocates list.
   *
   * @param {Object} sort  The sort to set as selected.
   */
  onSortSelected(sort) {
    this.advocatesList.selectedSort = sort;
    this.advocatesList.refreshAdvocatesList();
  }
  /**
   * Callback to show the results when suggestion is clicked.
   *
   * @param {String} suggestion  The clicked suggestion.
   */
  onSuggestionClick(suggestion) {
    this.advocatesList.searchAdvocates(suggestion);
  }
  /**
   * Get the Advocates users.
   *
   * @access protected
   */
  _getAdvocates() {
    this.advocatesList.getAdvocates(
      this.conversionInterval,
      this.currencyCode,
      this._processDate(this.selectedDateRange.range.from),
      this._processDate(this.selectedDateRange.range.to),
      this.isEnterprise,
      this.isFocusRevenue,
    )
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Build a date from the provided dateOption.
   *
   * @param {?Object} dateOption  The selected date option.
   *
   * @return {Moment}
   *
   * @access protected
   */
  _processDate(dateOption) {
    const date = this.moment();

    if (dateOption) {
      if (
        dateOption.unit &&
        dateOption.value
      ) {
        date.subtract(dateOption.unit, dateOption.value);
      }

      if (dateOption.startOf) {
        date.startOf(dateOption.startOf);
      }

      if (dateOption.endOf) {
        date.endOf(dateOption.endOf);
      }
    }

    return date;
  }
}

/**
 * @ngdoc component
 * @name advocatesContainer
 * @description
 * The advocates container.
 *
 * @memberof advocates
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {AdvocatesContainer}
   */
  controller: AdvocatesContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      class="odsSmallIndicator -fullScreen"
      ng-if="$ctrl.isLoading()"
    ></div>
    <advocates
      advocates="$ctrl.advocatesList.advocates"
      all-advocates="$ctrl.advocatesList.entities"
      currency-symbol="$ctrl.currencySymbol"
      date-range-options="$ctrl.dateRangeOptions"
      is-focus-revenue="$ctrl.isFocusRevenue"
      loading="$ctrl.advocatesList.loading"
      pagination="$ctrl.advocatesList.pagination"
      search="$ctrl.advocatesList.search"
      selected-date-range="$ctrl.selectedDateRange"
      selected-sort="$ctrl.advocatesList.selectedSort"
      sort-list="$ctrl.sortList"
      suggestions="$ctrl.advocatesList.suggestions"
      tooltips="$ctrl.tooltips"
      on-date-range-selection="$ctrl.onDateRangeSelection(dateRange)"
      on-export-download="$ctrl.onExportDownload()"
      on-pagination-next-click="$ctrl.onPaginationNextClick()"
      on-pagination-previous-click="$ctrl.onPaginationPreviousClick()"
      on-search-text-change="$ctrl.onSearchTextChange(search)"
      on-sort-selected="$ctrl.onSortSelected(item)"
      on-search-trigger="$ctrl.onSearchTrigger(search)"
      on-suggestion-click="$ctrl.onSuggestionClick(suggestion)"
    ></advocates>
  `,
};
