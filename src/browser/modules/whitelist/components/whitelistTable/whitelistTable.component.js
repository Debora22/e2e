import template from './whitelistTable.html';
import './whitelistTable.scss';

/**
 * @ngdoc controller
 * @name WhitelistTable
 * @description
 * This component renders the whitelist table.
 *
 * @memberof whitelist
 */
class WhitelistTable {
  constructor() {
    /**
     * The dates range for whitelist users.
     *
     * @type {Object}
     */
    this.dates = {};
    /**
     * The edited whitelist user's labels.
     *
     * @type {String}
     */
    this.labels = '';
    /**
     * The local reference for the selected/edited user.
     *
     * @type {Object?}
     */
    this.user = null;
  }
  /**
   * Set the corresponding date related to the form data.
   *
   * @param {String} date   The type of date.
   * @param {Date}   value  The date value.
   */
  onDateSet(date, value) {
    this.dates[date] = value;
  }
  /**
   * Callback triggered when the label input changes.
   *
   * @param {String} labels  The labels to set.
   */
  onLabelsSet(labels = '') {
    this.labels = labels;
  }
  /**
   * Callback triggered when a label is being selected for strict search.
   *
   * @param {String} label  The label to search.
   */
  onLabelStrictSearch(label) {
    const labelSearchCriteria = this.searchCriteria.find((criteria) => criteria.name === 'label');

    this.onSearchWhitelistUsers({
      search: label,
      criteria: labelSearchCriteria,
      force: true,
      strict: true,
    });
  }
  /**
   * Callback when saving the changes.
   */
  onSaveUserEdit() {
    const whitelistUsers = {
      whitelistUsers: [{ username: this.user.username }],
      source: this.user.source,
      labels: this.labels ? [this.labels] : [],
    };
    const { dateFrom, dateTo } = this.dates;

    if (dateFrom) {
      whitelistUsers.dateFrom = dateFrom.toISOString();
    }
    if (dateTo) {
      whitelistUsers.dateTo = dateTo.toISOString();
    }

    this.onSaveWhitelistUsers(whitelistUsers);
  }
  /**
   * Callback when the user edit mode is triggered.
   *
   * @param {Object} user  The user to edit.
   */
  onUserEdit(user) {
    this.user = user;
    [this.labels] = user.labels;
    this.dates = {};

    const { dateFrom, dateTo } = this.user;
    if (dateFrom) {
      this.dates.dateFrom = new Date(dateFrom);
    }
    if (dateTo) {
      this.dates.dateTo = new Date(dateTo);
    }

    this.onWhitelistUserSelectedChange({
      whitelistUser: user,
      isSelected: user.id,
      isEditing: true,
    });
  }
}

/**
 * @ngdoc component
 * @name whitelistTable
 * @description
 * It defines the table to manage whitlisted users.
 *
 * @memberof whitelist
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {WhitelistTable}
   */
  controller: WhitelistTable,
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
   * @property {Object}     selectedStatus                 The selected element from the filter by status.
   * @property {Object}     selectedWhitelistUsers         The map of selected whitelist users.
   * @property {Number}     selectedWhitelistUsersCount    The count of selected whitelist users.
   * @property {Boolean}    showLabelInput                 Indicates to show or not, the label input.
   * @property {Array}      sortTypes                      The list of sort types available.
   * @property {Array}      userStatuses                   The list of statuses to filter.
   * @property {Boolean}    userEditMode                   Flag to indicate if we are editing a user from the table.
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
   *                                                       update, the selected source and the labels.
   * @property {Function}   onSearchWhitelistUsers         Callback for when we want to search whitelist user by
   *                                                       username. It receives the search to make.
   * @property {Function}   onSortingChange                Callback for when selecting a sorting type.
   * @property {Function}   onStatusChange                 Callback for when selecting a status type.
   * @property {Function}   onWhitelistUserSelectedChange  Callback when the selection of a user is changed. It
   *                                                       receives the user, if it was selected or unselected and
   *                                                       if we are editing or not.
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
    showLabelInput: '<',
    sortTypes: '<',
    statusTypes: '<',
    userEditMode: '<',
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
