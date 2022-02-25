/**
 * @ngdoc controller
 * @name CollectionsContainer
 * @description
 * This container displays the collections section.
 *
 * @memberof collections
 */
class CollectionsContainer {
  /**
   * @param {$q}              $q                          To wait for several promises with the all method.
   * @param {$location}       $location                   To redirect the user.
   * @param {AppErrorHandler} appErrorHandler             To display any error.
   * @param {AppSession}      appSession                  To get the app session.
   * @param {Object}          collectionsList             To fecth the whitelist users.
   * @param {Object}          socialMentionsAccountsList  To get the customer social mentions accounts.
   * @param {Object}          streamsList                 To search for streams.
   * @param {UIMessages}      uiMessages                  To display the delete confirmation message.
   * @param {Object}          COLLECTIONS_BASE_TYPES      To get the base types configuration.
   * @param {Object}          COLLECTIONS_RULE_OPERATORS  To get the rule operators configuration.
   * @param {Object}          COLLECTIONS_RULE_TYPES      To get the rule types configuration.
   * @param {Object}          COLLECTIONS_SORT            To get the sort configuration.
   * @param {Object}          COLLECTIONS_STATUS_FILTERS  To get the status filters configuration.
   */
  constructor(
    $q,
    $location,
    appErrorHandler,
    appSession,
    collectionsList,
    socialMentionsAccountsList,
    streamsList,
    uiMessages,
    COLLECTIONS_BASE_TYPES,
    COLLECTIONS_RULE_OPERATORS,
    COLLECTIONS_RULE_TYPES,
    COLLECTIONS_SORT,
    COLLECTIONS_STATUS_FILTERS,
  ) {
    'ngInject';

    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appSession` service.
     *
     * @type {AppSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `whitelist` service.
     *
     * @type {CollectionsList}
     */
    this.collectionsList = collectionsList.getNewInstance();
    /**
     * The local reference to the `socialMentionsAccountsList` service.
     *
     * @type {SocialMentionsAccountsList}
     */
    this.socialMentionsAccountsList = socialMentionsAccountsList.getNewInstance();
    /**
     * The local reference to the `streamsList` service.
     *
     * @type {StreamsList}
     */
    this.streamsList = streamsList.getNewInstance();
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `baseTypeList` constant.
     *
     * @type {Array}
     */
    this.baseTypeList = [
      COLLECTIONS_BASE_TYPES.mention,
      COLLECTIONS_BASE_TYPES.hashtag,
      COLLECTIONS_BASE_TYPES.handler,
    ];
    /**
     * The local reference to the `ruleOperatorList` constant.
     *
     * @type {Array}
     */
    this.ruleOperatorList = [
      COLLECTIONS_RULE_OPERATORS.with,
      COLLECTIONS_RULE_OPERATORS.without,
    ];
    /**
     * The local reference to the `ruleTypeList` constant.
     *
     * @type {Array}
     */
    this.ruleTypeList = [
      COLLECTIONS_RULE_TYPES.mention,
      COLLECTIONS_RULE_TYPES.hashtag,
      COLLECTIONS_RULE_TYPES.handler,
    ];
    /**
     * The local reference to the `sortList` constant.
     *
     * @type {Array}
     */
    this.sortList = [
      COLLECTIONS_SORT.collectionNameAsc,
      COLLECTIONS_SORT.collectionNameDesc,
      COLLECTIONS_SORT.collectionUpdatedDesc,
      COLLECTIONS_SORT.collectionUpdatedAsc,
    ];
    /**
     * The local reference to the `statusFilterList` constant.
     *
     * @type {Array}
     */
    this.statusFilterList = [
      COLLECTIONS_STATUS_FILTERS.allCollections,
      COLLECTIONS_STATUS_FILTERS.activeCollections,
      COLLECTIONS_STATUS_FILTERS.inactiveCollections,
    ];
    /**
     * Flag to know if the collection form is visible or not.
     *
     * @type {Boolean}
     */
    this.isFormVisible = false;
    /**
     * Flag to know if the customer has moderation services active or not.
     *
     * @type {Boolean}
     */
    this.hasModerationServices = false;
    /**
     * Flag to know if the customer has video collection active or not.
     *
     * @type {Boolean}
     */
    this.hasVideoCollection = false;
    /**
     * Flag to know if the customer has video moderation services active or not.
     *
     * @type {Boolean}
     */
    this.hasVideoModerationServices = false;

    // Set the collection updated desc as the selected sort.
    this.collectionsList.selectedSort = COLLECTIONS_SORT.collectionUpdatedDesc;
    // Set the active collections as the selected status filter.
    this.collectionsList.selectedStatusFilter = COLLECTIONS_STATUS_FILTERS.allCollections;
  }
  /**
   * Perform the initial load of collections and social mentions accounts.
   */
  $onInit() {
    this.$q.all([
      this.collectionsList.getCollections(),
      this.socialMentionsAccountsList.getSocialMentionsAccounts(),
    ])
    .catch((error) => this.appErrorHandler.handle(
      error,
      'Sorry, there was a problem while loading your collections. Please try again later.',
    ));

    const { account } = this.appSession.getSession();

    this.hasModerationServices = account.settings.premoderation;
    this.hasVideoCollection = account.settings.video_mention_collection;
    this.hasVideoModerationServices = account.settings.video_mention_moderation;
  }
  /**
   * Check if we should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoading() {
    return this.collectionsList.loading ||
      this.socialMentionsAccountsList.loading ||
      this.streamsList.loading;
  }
  /**
   * Change the status of a collection.
   *
   * @param {Object} collection  The collection to change the status.
   */
  onChangeCollectionStatus(collection) {
    const status = collection.status === 'active' ? 'inactive' : 'active';

    if (collection.base.type === 'profile') {
      this._changeProfileCollection(collection, status);
    } else {
      this.collectionsList.changeCollectionStatus(collection.filter.id, status)
      .catch((error) => this.appErrorHandler.handle(error));
    }
  }
  /**
   * Close the collection form.
   */
  onCloseForm() {
    this.isFormVisible = false;
  }
  /**
   * Ask for confirmation to delete a collection.
   *
   * @param {Object} collection  The collection to delete.
   */
  onDeleteCollection(collection) {
    const content = 'Are you sure you want to delete ' +
      `<strong>${collection.name}</strong> collection?`;

    this.uiMessages.confirmation(
      'Delete Collection',
      content,
      {
        confirmText: 'Delete',
        destructive: true,
      },
    )
    .then((confirm) => {
      let nextStep;

      if (confirm) {
        const collectionId = collection.filter ?
          collection.filter.id :
          collection.id;
        nextStep = this.collectionsList.deleteCollection(collectionId);
      }

      return nextStep;
    })
    .then(() => {
      if (this.isFormVisible) {
        this.onCloseForm();
      }
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Go to social accounts page.
   */
  onGoToSocialAccounts() {
    this.$location.url('/settings#socialAccounts');
  }
  /**
   * Open the collection form.
   *
   * @param {Object} collection  The collection to show in the form.
   */
  onOpenForm(collection) {
    this.collectionsList.prepareCollectionForEdit(collection);
    this.isFormVisible = true;
  }
  /**
   * Callback when the pagination `Next` button is clicked.
   * It will get the next media page.
   */
  onPaginationNextClick() {
    this.collectionsList.getNextPage();
  }
  /**
   * Callback when the pagination `Previous` button is clicked.
   * It will get the previous media page.
   */
  onPaginationPreviousClick() {
    this.collectionsList.getPreviousPage();
  }
  /**
   * Save a collection.
   *
   * @param {Object} collection  The collection to save.
   */
  onSaveCollection(collection) {
    this.collectionsList.saveCollection(collection)
    .then((savedCollection) => {
      this.onCloseForm();

      if (
        savedCollection &&
        savedCollection.status_message
      ) {
        // Replace the message mails with a mailto link.
        const confirmationContent = savedCollection.status_message.replace(
          /\S+@\S+/g,
          '<a class="odsButton -link -inline" href="mailto:$&">$&</a>',
        );

        this.uiMessages.confirmation(
          'Collection Created',
          confirmationContent,
          {
            cancelText: '',
            confirmText: 'Continue',
          },
        );
      }
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Perform a request to search for streams.
   *
   * @param {String} text  The text to search for.
   *
   * @return {Promise}
   */
  onSearchForStreams(text) {
    return this.streamsList.cancelCurrentRequest()
    .then(() => this.streamsList.getStreams(text))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Whenever the text in the search box changes, update the search and refresh the collections list.
   *
   * @param {String} search  The text to search collections for.
   */
  onSearchTextChange(search) {
    this.collectionsList.search = search;
    this.collectionsList.refreshCollectionsList();
  }
  /**
   * When a new sort is selected, update the selected sort and refresh the collections list.
   *
   * @param {Object} sort  The sort to set as selected.
   */
  onSortSelected(sort) {
    this.collectionsList.selectedSort = sort;
    this.collectionsList.refreshCollectionsList();
  }
  /**
   * When a new status filter is selected, update the selected status filter and refresh the collections list.
   *
   * @param {Object} statusFilter  The status filter to set as selected.
   */
  onStatusFilterSelected(statusFilter) {
    this.collectionsList.selectedStatusFilter = statusFilter;
    this.collectionsList.refreshCollectionsList();
  }
  /**
   * Delete or save a profile collection.
   *
   * @param {Object} collection  The profile collection to change.
   * @param {String} status      The status to set to the collection.
   *
   * @access protected
   */
  _changeProfileCollection(collection, status) {
    const collectionToChange = angular.copy(collection);
    // Change to the status before changing.
    collectionToChange.status = status;

    if (collectionToChange.filter.id) {
      this._deleteProfileCollection(collectionToChange);
    } else {
      this._saveProfileCollection(collectionToChange);
    }
  }
  /**
   * Ask for confirmation to delete a profile collection.
   *
   * @param {Object} collection  The profile collection to delete.
   *
   * @access protected
   */
  _deleteProfileCollection(collection) {
    this.uiMessages.confirmation(
      'Collect from your Accounts',
      'Are you sure you want to <strong>turn off</strong> the ability to collect from your connected Instagram ' +
        'Accounts?<br/>You can turn it on at any time.',
      {
        confirmText: 'Turn off',
        destructive: true,
      },
    )
    .then((confirm) => (
      confirm ?
        this.collectionsList.deleteProfileCollection(collection.filter.id) :
        null
    ))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Ask for confirmation to save a profile collection.
   *
   * @param {Object} collection  The profile collection to save.
   *
   * @access protected
   */
  _saveProfileCollection(collection) {
    this.uiMessages.confirmation(
      'Collect from your Accounts',
      'You are about to start collecting content from all your Instagram accounts connected to your Facebook ' +
        'account. The collection will start from now.<br/>All the content collected will be rights approved.',
      { confirmText: 'Turn on' },
    )
    .then((confirm) => (
      confirm ?
        this.collectionsList.saveProfileCollection(collection) :
        null
    ))
    .catch((error) => this.appErrorHandler.handle(error));
  }
}

/**
 * @ngdoc component
 * @name collectionsContainer
 * @description
 * The collections container.
 *
 * @memberof collections
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {CollectionsContainer}
   */
  controller: CollectionsContainer,
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
    <collections
      all-collections="$ctrl.collectionsList.entities"
      base-type-list="$ctrl.baseTypeList"
      collection="$ctrl.collectionsList.collection"
      collections="$ctrl.collectionsList.collections"
      has-moderation-services="$ctrl.hasModerationServices"
      has-video-collection="$ctrl.hasVideoCollection"
      has-video-moderation-services="$ctrl.hasVideoModerationServices"
      is-form-visible="$ctrl.isFormVisible"
      loading="$ctrl.isLoading()"
      pagination="$ctrl.collectionsList.pagination"
      rule-operator-list="$ctrl.ruleOperatorList"
      rule-type-list="$ctrl.ruleTypeList"
      search="$ctrl.collectionsList.search"
      selected-sort="$ctrl.collectionsList.selectedSort"
      selected-status-filter="$ctrl.collectionsList.selectedStatusFilter"
      social-mentions-accounts="$ctrl.socialMentionsAccountsList.entities"
      sort-list="$ctrl.sortList"
      status-filter-list="$ctrl.statusFilterList"
      streams-loading="$ctrl.streamsList.loading"
      on-change-collection-status="$ctrl.onChangeCollectionStatus(collection)"
      on-close-form="$ctrl.onCloseForm()"
      on-delete-collection="$ctrl.onDeleteCollection(collection)"
      on-generate-phrase="$ctrl.collectionsList.generatePhrase()"
      on-go-to-social-accounts="$ctrl.onGoToSocialAccounts()"
      on-open-form="$ctrl.onOpenForm(collection)"
      on-pagination-next-click="$ctrl.onPaginationNextClick()"
      on-pagination-previous-click="$ctrl.onPaginationPreviousClick()"
      on-save-collection="$ctrl.onSaveCollection(collection)"
      on-search-for-streams="$ctrl.onSearchForStreams(text)"
      on-search-text-change="$ctrl.onSearchTextChange(search)"
      on-sort-selected="$ctrl.onSortSelected(item)"
      on-status-filter-selected="$ctrl.onStatusFilterSelected(item)"
      on-validate-collection-name="$ctrl.collectionsList.validateCollectionName(collection)"
      on-validate-hashtag-limit="$ctrl.collectionsList.validateHashtagLimit(collection)"
    ></collections>
  `,
};
