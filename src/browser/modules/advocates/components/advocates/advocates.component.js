import template from './advocates.html';
import './advocates.scss';

import noAdvocatesImage from '../../../../assets/images/noAdvocates.svg';
import noAdvocatesSearchImage from '../../../../assets/images/noAdvocatesSearch.svg';

/**
 * @ngdoc controller
 * @name Advocates
 * @description
 * This component renders the advocates section.
 *
 * @memberof advocates
 */
class Advocates {
  constructor() {
    /**
     * Reference to the advocates image.
     *
     * @type {String}
     */
    this.noAdvocatesImage = noAdvocatesImage;
    /**
     * Reference to the advocates search without results image.
     *
     * @type {String}
     */
    this.noAdvocatesSearchImage = noAdvocatesSearchImage;
  }
}

/**
 * @ngdoc component
 * @name advocates
 * @description
 * This component displays the advocates section.
 *
 * @memberof advocates
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Advocates}
   */
  controller: Advocates,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template,
  /**
   * Component bindings.
   *
   * @type {Object}
   * @property {Array}       advocates                  The filtered list of advocates to display.
   * @property {Array}       allAdvocates               The list of advocates to display.
   * @property {String}      currencySymbol             The currency symbol.
   * @property {Array}       dateRangeOptions           The list of date range options.
   * @property {Boolean}     isFocusRevenue             If the customer is revenue focused.
   * @property {Boolean}     loading                    If there are advocates being loaded.
   * @property {Pagination}  pagination                 The pagination information.
   * @property {String}      search                     The text to search advocates for.
   * @property {Object}      selectedDateRange          The seleted date range option.
   * @property {Object}      selectedSort               The sort to order the collections with.
   * @property {Array}       sortList                   The list of available sort types to display.
   * @property {Array}       suggestions                The list of suggestions to show.
   * @property {Object}      tooltips                   The list of tooltips to show.
   * @property {Function}    onDateRangeSelection       Callback for when selecting a date range.
   * @property {Function}    onExportDownload           Callback for downloading csv data export.
   * @property {Function}    onPaginationNextClick      Callback for when the pagination next button is clicked.
   * @property {Function}    onPaginationPreviousClick  Callback for when the pagination previous button is clicked.
   * @property {Function}    onSearchTextChange         Callback for when the text search changes. It receives the
   *                                                    new search text.
   * @property {Function}    onSearchTrigger            Callback for when the search is triggered. It receives the
   *                                                    new search text.
   * @property {Function}    onSortSelected             Callback for when a new sort is selected. It receives
   *                                                    the selected sort.
   * @property {Function}    onSuggestionClick          Callback to show the results when suggestion is clicked.
   *                                                    It receives the suggestion.
   */
  bindings: {
    advocates: '<',
    allAdvocates: '<',
    currencySymbol: '<',
    dateRangeOptions: '<',
    isFocusRevenue: '<',
    loading: '<',
    pagination: '<',
    search: '<',
    selectedDateRange: '<',
    selectedSort: '<',
    sortList: '<',
    suggestions: '<',
    tooltips: '<',
    onDateRangeSelection: '&',
    onExportDownload: '&',
    onPaginationNextClick: '&',
    onPaginationPreviousClick: '&',
    onSearchTextChange: '&',
    onSearchTrigger: '&',
    onSortSelected: '&',
    onSuggestionClick: '&',
  },
};
