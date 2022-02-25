/**
 * @ngdoc controller
 * @name WhitelistContainer
 * @description
 * This container displays the Whitelist section.
 *
 * @memberof whitelist
 */
class WhitelistContainer {
  /**
   * @param {$q}                   $q                         To wait for several promises with the all method.
   * @param {AppErrorHandler}      appErrorHandler            To display any error.
   * @param {AppUtils}             appUtils                   To capitalize a user source.
   * @param {UIMessages}           uiMessages                 To display notification messages.
   * @param {Object}               whitelist                  To fecth the whitelist users.
   * @param {Array}                WHITELIST_SEARCH_CRITERIA  To get the search types.
   * @param {Array}                WHITELIST_SORT             To get the sort types.
   * @param {Array}                WHITELIST_SOURCES          To get the sources list.
   * @param {Object}               WHITELIST_STATUSES         To get the status types list.
   */
  constructor(
    $q,
    appErrorHandler,
    appUtils,
    uiMessages,
    whitelist,
    WHITELIST_SEARCH_CRITERIA,
    WHITELIST_SORT,
    WHITELIST_SOURCES,
    WHITELIST_STATUSES,
  ) {
    'ngInject';

    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appUtils` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `whitelist` service.
     *
     * @type {Whitelist}
     */
    this.whitelist = whitelist.getNewInstance();
    /**
     * The local reference for the types of usernames search.
     *
     * @type {Array}
     */
    this.searchCriteria = WHITELIST_SEARCH_CRITERIA;
    /**
     * The local reference to the `sort` types constant.
     *
     * @type {Array}
     */
    this.sortTypes = WHITELIST_SORT;
    /**
     * The local reference to the `sources` constant.
     *
     * @type {Array}
     */
    this.sources = WHITELIST_SOURCES;
    /**
     * The local reference to the `statuses` constant.
     *
     * @type {Array}
     */
    this.statusTypes = [
      WHITELIST_STATUSES.allUsers,
      WHITELIST_STATUSES.activeUsers,
      WHITELIST_STATUSES.expiredUsers,
      WHITELIST_STATUSES.upcomingUsers,
    ];
    /**
     * The status on where to show the no whitelist message on the table.
     *
     * @type {Object}
     */
    this.statusEmpty = WHITELIST_STATUSES.allUsers;
    /**
     * The text of the search box.
     *
     * @type {String}
     */
    this.search = '';
    /**
     * The selected search criteria.
     *
     * @type {?Object}
     */
    this.selectedSearchCriteria = null;
    /**
     * The selected sort type.
     *
     * @type {?Object}
     */
    this.selectedSortType = null;
    /**
     * The selected status type.
     *
     * @type {?Object}
     */
    this.selectedStatus = null;
    /**
     * Flag to indicate if a strict label search is being made.
     *
     * @type {Boolean}
     */
    this.strictSearch = false;
    /**
     * The map of selected whitelist users in the list/table.
     *
     * @type {Object}
     */
    this.whitelistUsersSelected = {};
    /**
     * The number of selected users in the table.
     *
     * @type {Number}
     */
    this.selectedWhitelistUsersCount = 0;
    /**
     * Flag to indicate the result of the form's submit request.
     *
     * @type {Boolean}
     */
    this.wasTheSubmitSuccessful = false;
    /**
     * Flag to indicate that the single edit user mode is enable.
     *
     * @type {Boolean}
     */
    this.userEditMode = false;
  }
  /**
   * Set the initial searchCriteria and performs the initial load of whitelist users.
   */
  $onInit() {
    [this.selectedSearchCriteria] = this.searchCriteria;
    [this.selectedSortType] = this.sortTypes;
    [this.selectedStatus] = this.statusTypes;

    this._getWhitelistUsers();
  }
  /**
   * Based on the provided `selectAll` we set all users as selected or not.
   *
   * @param {Boolean} selectAll  If we must set or unset all users as selected or not.
   */
  onBulkSelectionToggle(selectAll) {
    this.whitelist.entities.forEach((item) => this.onWhitelistUserSelectedChange(item, selectAll));

    this.selectedWhitelistUsersCount = selectAll ?
      this.whitelist.entities.length :
      0;
  }
  /**
   * Toggles the edit mode and clears/resets the selected list of Users.
   */
  onCancelEditMode() {
    this.selectedWhitelistUsersCount = 0;
    this.whitelistUsersSelected = {};
    this.userEditMode = false;
  }
  /**
   * Based on the current selected users, it triggers the delete request for
   * bulk delete action.
   */
  onDeleteSelectedWhitelistUsers() {
    const usersIds = Object.keys(this.whitelistUsersSelected);

    if (this.selectedWhitelistUsersCount > 1) {
      const texts = {
        content: `Do you want to delete <strong>${this.selectedWhitelistUsersCount} users?</strong><br/>
        You will not lose the media that you already have from those users.`,
        failureMessage: 'User/s could not be deleted. Please try again.',
        successMessage: 'User/s successfully deleted.',
        title: 'Delete Users',
      };

      this._confirmationDelete(usersIds, texts);
    } else {
      const userId = Number([usersIds]);
      const whitelistUser = this.whitelist.entities.find((item) => item.id === userId);

      this.onDeleteWhitelistUser(whitelistUser);
    }
  }
  /**
   * Delete a whitelist user.
   *
   * @param {Object} whitelistUser  The whitelist user to delete.
   */
  onDeleteWhitelistUser(whitelistUser) {
    const network = this.appUtils.capitalize(whitelistUser.source);
    const texts = {
      content: `Do you want to delete the ${network}'s user <strong>${whitelistUser.username}</strong>?<br/>
        You will not lose the media that you already have from this user.`,
      failureMessage: 'User/s could not be deleted. Please try again.',
      successMessage: 'User successfully deleted.',
      title: 'Delete User',
    };

    this._confirmationDelete([whitelistUser.id], texts);
  }
  /**
   * Callback when the pagination `Next` button is clicked.
   * It will get the next whitelist users page.
   */
  onPaginationNextClick() {
    this.onCancelEditMode();
    this.whitelist.getNextPage()
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Callback when the pagination `Previous` button is clicked.
   * It will get the previous whitelist users page.
   */
  onPaginationPreviousClick() {
    this.onCancelEditMode();
    this.whitelist.getPreviousPage()
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Create or update a list of whitelist users.
   *
   * @param {Array<String>} whitelistUsers  The list of whitelist users to create/update.
   * @param {String}        source          The source to set to all whitelist users.
   * @param {String}        labels          Labels assigned to the user or group of users.
   * @param {String}        dateFrom        The from date where the whitelist users are enabled.
   * @param {String}        dateTo          The to date where the whitelist users are enabled.
   * @param {Boolean}       isCreate        If we are creating or editing the users.
   */
  onSaveWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo, isCreate = true) {
    this.wasTheSubmitSuccessful = false;
    let promise = this.$q.resolve({ whitelistUsers, isCreate });

    if (isCreate) {
      promise = promise
      .then(() => this.whitelist.validateWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo))
      .then((response) => this._handleValidationReponse(whitelistUsers, response));
    }

    promise
    .then((response) => (
      response && response.whitelistUsers ?
        this._saveWhitelistUsers(
          response.whitelistUsers,
          source,
          labels,
          dateFrom,
          dateTo,
          response.isCreate,
        ) :
        null
    ))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Search for a whitelist user given a username.
   * Before searching cancel any ongoing request.
   *
   * @param {String}  search    The search for whitelist user.
   * @param {String}  criteria  The search criteria to search.
   * @param {Boolean} force     If we should force the search.
   * @param {Boolean} strict    If the search is strict or not.
   */
  onSearchWhitelistUsers(search, criteria, force = false, strict = false) {
    // Adjust the query to the maxlength allowed.
    const query = search.trim().substring(0, criteria.maxlength);
    const shouldSearch = query || this.search || force;

    if (
      this.search !== query ||
      this.selectedSearchCriteria !== criteria ||
      force
    ) {
      this.search = query;
      this.selectedSearchCriteria = criteria;
      this.strictSearch = strict;

      if (shouldSearch) {
        this._getWhitelistUsers();
      }
    }
  }
  /**
   * Triggers a request to get the users list by a specific sorting.
   *
   * @param {Object} sortType  The sorting type to order the list.
   */
  onSortingChange(sortType) {
    if (this.selectedSortType !== sortType) {
      this.selectedSortType = sortType;

      this._getWhitelistUsers();
    }
  }
  /**
   * Triggers a request to get the users list by a specific status.
   *
   * @param {Object} status  The status type to filter the list.
   */
  onStatusChange(status) {
    if (this.selectedStatus !== status) {
      this.selectedStatus = status;

      this._getWhitelistUsers();
    }
  }
  /**
   * When a user is selected or unselected in the list, update the users selected map and users selected count.
   *
   * @param {Object}  whitelistUser  The user which selection changed.
   * @param {Boolean} isSelected     If the user was selected or unselected.
   * @param {Boolean} isEditing      If the single user edit mode is being enabled.
   */
  onWhitelistUserSelectedChange(whitelistUser, isSelected, isEditing = false) {
    if (isEditing) {
      this.onCancelEditMode();
    } else {
      this.selectedWhitelistUsersCount += isSelected ? 1 : -1;
    }

    if (isSelected) {
      this.whitelistUsersSelected[whitelistUser.id] = true;
    } else {
      delete this.whitelistUsersSelected[whitelistUser.id];
    }

    this.userEditMode = isEditing;
  }
  /**
   * Displays the confirmation modal and fires the delete users action on confirmation,
   * for both "delete multiple" and "single delete user" actions.
   *
   * @param {Array<Number>}  whitelistUsersIds  The list of whitelist user ids to delete.
   * @param {Object}         texts              The texts for confirmation messages and modal title.
   *
   * @access protected
   */
  _confirmationDelete(whitelistUsersIds, texts) {
    this.uiMessages.confirmation(
      texts.title,
      texts.content, {
        confirmText: texts.title,
        destructive: true,
      },
    )
    .then((confirm) => (
      confirm ?
        this.whitelist.deleteWhitelistUsers(whitelistUsersIds) :
        null
    ))
    .then((response) => {
      if (response) {
        this.uiMessages.notification(texts.successMessage);
        /*
         * Because we have the pagination data prior to delete, we check:
         * If it's the last user in the page
         * If there is an active search (because we want to keep the search results visible)
         * If exists a previous page in the pagination pagination (meaning it's not the first page)
         */
        if (
          this.whitelist.entities.length === 1 &&
          !this.search &&
          this.whitelist.pagination.links.prev
        ) {
          this.whitelist.getPreviousPage();
        } else {
          this.whitelist.refreshCurrentPage();
        }
        this.onCancelEditMode();
      }
    })
    .catch((error) => {
      this.uiMessages.notification(texts.failureMessage, { type: 'error' });
      this.appErrorHandler.silent(error);
    });
  }
  /**
   * Get the whitelist users.
   *
   * @access protected
   */
  _getWhitelistUsers() {
    const whitelistUsersSearchParams = {};

    if (this.search && this.selectedSearchCriteria) {
      whitelistUsersSearchParams.search = this.search;
      whitelistUsersSearchParams.criteria = this.selectedSearchCriteria.name;
    }

    if (this.selectedSortType) {
      whitelistUsersSearchParams.sortBy = this.selectedSortType.values.key;
      whitelistUsersSearchParams.sortOrder = this.selectedSortType.values.order;
    }

    if (this.selectedStatus) {
      whitelistUsersSearchParams.status = this.selectedStatus.name;
    }

    whitelistUsersSearchParams.labelPartialMatch = !this.strictSearch;

    this.onCancelEditMode();
    this.whitelist.cancelCurrentRequest()
    .then(() => this.whitelist.getWhitelistUsers(whitelistUsersSearchParams))
    .catch((error) => this.appErrorHandler.handle(
      error,
      'Sorry, there was an error while loading the users in the Automatic Rights List. Please try again.',
    ));
  }
  /**
   * Handle the response of the validate of whitelist users.
   *
   * @param {Array}  whitelistUsers  The list of users that were validated.
   * @param {Object} response        The response of the validation.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _handleValidationReponse(whitelistUsers, response) {
    const blacklistedUsers = response.errors.map((user) => user.username);
    const editedUsers = response.usersToUpdate.map((user) => user.username);
    const filteredWhitelistUsers = whitelistUsers.filter((user) => !blacklistedUsers.includes(user.username));

    return this._showUsersValidationModal(blacklistedUsers, editedUsers, whitelistUsers.length)
    .then((confirm) => (
      confirm && filteredWhitelistUsers.length ?
        {
          whitelistUsers: filteredWhitelistUsers,
          isCreate: editedUsers.length === 0,
        } :
        null
    ));
  }
  /**
   * Create or update a list of whitelist users.
   *
   * @param {Array<String>} whitelistUsers  The list of whitelist users to create/update.
   * @param {String}        source          The source to set to all whitelist users.
   * @param {String}        labels          Labels assigned to the user or group of users.
   * @param {String}        dateFrom        The from date where the whitelist users are enabled.
   * @param {String}        dateTo          The to date where the whitelist users are enabled.
   * @param {Boolean}       isCreate        If we are creating or editing the users.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _saveWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo, isCreate) {
    return this.whitelist.saveWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo)
    .then((response) => {
      if (response.errors) {
        const errorMessages = response.errors.map(({ errors }) => errors).flat();
        errorMessages.forEach((error) => {
          this.uiMessages.notification(
            error,
            { type: 'error' },
          );
        });
      } else {
        const message = isCreate ?
          'User/s successfully added.' :
          'User/s successfully updated.';
        this.uiMessages.notification(message);
        this._getWhitelistUsers();
        this.wasTheSubmitSuccessful = true;
      }
    });
  }
  /**
   * Validate a list of whitelist users.
   *
   * @param {Array<String>} blacklistedUsers      The list of blacklisted users.
   * @param {Array<String>} editedUsers           The list of edited whitelist users.
   * @param {Number}        lengthWhitelistUsers  The total of whitelist users.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _showUsersValidationModal(blacklistedUsers, editedUsers, lengthWhitelistUsers) {
    const newUsersPhrase = lengthWhitelistUsers > 1 ?
      `${lengthWhitelistUsers} users` :
      `${lengthWhitelistUsers} user`;
    /*
     * We are setting 'true' as first value in case there are no blacklist users to validate and we need to
     * chain the second validation (edited users).
     */
    let promiseChain = this.$q.resolve(true);

    /*
     * If there is at least one already blacklisted user or an already existent user, we are going to show
     * modals corresponding to each case. To perform that, we are chaining the Confirmation Modal's promises
     * in order to follow the validation process.
     * If at any point, the user clicks on cancel action (or clicks outside the modal), the chain of promises
     * would stop and nothing will occur.
     * If the user confirms all actions, then it removes from the whitelistUsers all the ones that are in the
     * blacklisted list and the submit continues, by adding new users and/or updating the existent from the list.
     */
    if (blacklistedUsers.length) {
      const title = blacklistedUsers.length > 1 ?
        `${blacklistedUsers.length} Users Can't Be Added To The Automatic Rights List` :
        `${blacklistedUsers.length} User Can't Be Added To The Automatic Rights List`;
      const blacklistedUserPhrase = blacklistedUsers.length > 1 ?
        `${blacklistedUsers.length} users` :
        `${blacklistedUsers.length} user`;
      const users = blacklistedUsers.map((user) => `<li class="whitelist_confirmation_list_item">${user}</li>`);
      const content = `<strong>From the ${newUsersPhrase} you want to add, the following ` +
        `${blacklistedUserPhrase}</strong> can't be added to the Automatic Rights Lists because ` +
        'they\'re already in the Blocked List. Please, remove those users from the Blocked List and try again.' +
        `<ul class="whitelist_confirmation_list">${users.join('')}</ul>`;

      promiseChain = promiseChain
      .then(() => this.uiMessages.confirmation(
        title,
        content,
        {
          confirmText: 'Continue',
          type: 'large',
        },
      ));
    }

    if (editedUsers.length) {
      const title = editedUsers.length > 1 ?
        `${editedUsers.length} Users can't be added to the Automatic Rights List` :
        `${editedUsers.length} User can't be added to the Automatic Rights List`;
      const editedUserPhrase = editedUsers.length > 1 ?
        `${editedUsers.length} users` :
        `${editedUsers.length} user`;
      const users = editedUsers.map((user) => `<li class="whitelist_confirmation_list_item">${user}</li>`);
      const content = `<strong>From the ${newUsersPhrase} you want to add, the following ` +
        `${editedUserPhrase} will be updated</strong> with the new label and date you chose.` +
        `<ul class="whitelist_confirmation_list">${users.join('')}</ul>`;

      promiseChain = promiseChain
      .then((confirm) => (
        confirm ?
          this.uiMessages.confirmation(
            title,
            content,
            {
              confirmText: 'Update All',
              type: 'large',
            },
          ) :
          false
      ));
    }

    return promiseChain;
  }
}

/**
 * @ngdoc component
 * @name whitelistContainer
 * @description
 * The whitelist container.
 *
 * @memberof whitelist
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {WhitelistContainer}
   */
  controller: WhitelistContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      class="odsSmallIndicator -fullScreen"
      ng-if="$ctrl.whitelist.loading"
    ></div>
    <whitelist
      loading="$ctrl.whitelist.loading"
      pagination="$ctrl.whitelist.pagination"
      search="$ctrl.search"
      search-criteria="$ctrl.searchCriteria"
      selected-search-criteria="$ctrl.selectedSearchCriteria"
      selected-sort-type="$ctrl.selectedSortType"
      selected-status="$ctrl.selectedStatus"
      selected-whitelist-users="$ctrl.whitelistUsersSelected"
      selected-whitelist-users-count="$ctrl.selectedWhitelistUsersCount"
      sort-types="$ctrl.sortTypes"
      status-empty="$ctrl.statusEmpty"
      status-types="$ctrl.statusTypes"
      sources="$ctrl.sources"
      user-edit-mode="$ctrl.userEditMode"
      whitelist-users="$ctrl.whitelist.entities"
      was-the-submit-successful="$ctrl.wasTheSubmitSuccessful"
      on-bulk-selection-toggle="$ctrl.onBulkSelectionToggle(selectAll)"
      on-delete-whitelist-user="$ctrl.onDeleteWhitelistUser(whitelistUser)"
      on-delete-selected-users="$ctrl.onDeleteSelectedWhitelistUsers()"
      on-pagination-next-click="$ctrl.onPaginationNextClick()"
      on-pagination-previous-click="$ctrl.onPaginationPreviousClick()"
      on-cancel-edit-mode="$ctrl.onCancelEditMode()"
      on-continue-click="$ctrl.onContinueClick()"
      on-save-whitelist-users="$ctrl.onSaveWhitelistUsers(
        whitelistUsers,
        source,
        labels,
        dateFrom,
        dateTo,
        isCreate
      )"
      on-search-whitelist-users="$ctrl.onSearchWhitelistUsers(
        search,
        criteria,
        force,
        strict
      )"
      on-sorting-change="$ctrl.onSortingChange(sortType)"
      on-status-change="$ctrl.onStatusChange(status)"
      on-whitelist-user-selected-change="$ctrl.onWhitelistUserSelectedChange(whitelistUser, isSelected, isEditing)"
    ></whitelist>
  `,
};
