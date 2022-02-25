import template from './whitelist.html';
import './whitelist.scss';

/**
 * @ngdoc component
 * @name whitelist
 * @description
 * This component renders the whitlisted users section.
 *
 * @memberof whitelist
 */
export default {
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
   * @property {Boolean}    loading                        If a request for the whitelist is in progress.
   * @property {Pagination} pagination                     The pagination information.
   * @property {String}     search                         The text of the search box.
   * @property {Array}      searchCriteria                 The list of available search type.
   * @property {Object}     selectedSearchCriteria         The selected element from the search type options.
   * @property {Object}     selectedSortType               The selected element from the sort by options.
   * @property {Object}     selectedStatus                 The selected element from the status by options.
   * @property {Object}     selectedWhitelistUsers         The map of selected whitelist users.
   * @property {Number}     selectedWhitelistUsersCount    The count of selected whitelist users.
   * @property {Array}      sortTypes                      The list of sort types available.
   * @property {Array}      sources                        The list of sources to display.
   * @property {Object}     statusEmpty                    The status to show the no whitelist message on the table.
   * @property {Array}      statusTypes                    The list of statuses to filter.
   * @property {Boolean}    userEditMode                   Flag to indicate if we are editing a user from the table.
   * @property {Boolean}    wasTheSubmitSuccessful         Flag to indicate the result of the form's submit request.
   * @property {Array}      whitelistUsers                 The list of whitelist users to display.
   * @property {Function}   onBulkSelectionToggle          Callback for when the bulk selection it toggled. It receives
   *                                                       a flag indicating if we must set all whitelist users as
   *                                                       selected or not.
   * @property {Function}   onCancelEditMode               Callback for canceling edition mode in the table component.
   * @property {Function}   onDeleteSelectedUsers          Callback for deleting selected whitelist users.
   * @property {Function}   onDeleteWhitelistUser          Callback for when we want to delete a whitelist user. It
   *                                                       receives the whitelist user to delete.
   * @property {Function}   onPaginationNextClick          Callback for when the pagination next button is clicked.
   * @property {Function}   onPaginationPreviousClick      Callback for when the pagination previous button is clicked.
   * @property {Function}   onSaveWhitelistUsers           Callback for when we want to create/update a list of
   *                                                       whitelist users. It receives the whitelist users to
   *                                                       create/update and selected source.
   * @property {Function}   onSearchWhitelistUsers         Callback for when we want to search whitelist user by
   *                                                       username. It receives the search to make.
   * @property {Function}   onSortingChange                Callback when selecting/changing sort by options.
   * @property {Function}   onStatusChange                 Callback when selecting/changing status by options.
   * @property {Function}   onWhitelistUserSelectedChange  Callback when the selection of a user is changed. It
   *                                                       receives the user and if it was selected or unselected.
   */
  bindings: {
    loading: '<',
    pagination: '<',
    search: '<',
    searchCriteria: '<',
    selectedSearchCriteria: '<',
    selectedSortType: '<',
    selectedStatus: '<',
    selectedWhitelistUsers: '<',
    selectedWhitelistUsersCount: '<',
    sortTypes: '<',
    sources: '<',
    statusEmpty: '<',
    statusTypes: '<',
    userEditMode: '<',
    wasTheSubmitSuccessful: '<',
    whitelistUsers: '<',
    onBulkSelectionToggle: '&',
    onCancelEditMode: '&',
    onDeleteSelectedUsers: '&',
    onDeleteWhitelistUser: '&',
    onPaginationNextClick: '&',
    onPaginationPreviousClick: '&',
    onSaveWhitelistUsers: '&',
    onSearchWhitelistUsers: '&',
    onSortingChange: '&',
    onStatusChange: '&',
    onWhitelistUserSelectedChange: '&',
  },
};
