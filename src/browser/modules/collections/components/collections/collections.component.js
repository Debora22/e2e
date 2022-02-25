import template from './collections.html';
import './collections.scss';

/**
 * @ngdoc controller
 * @name Collections
 * @description
 * This component displays the collections section.
 *
 * @memberof collections
 */
class Collections {
  constructor() {
    /**
     * We use this flag to hide the search results of the search box component,
     * because the results are being shown in another component.
     *
     * @type {Boolean}
     */
    this.hideSearchResults = true;
  }
  /**
   * Prevent the click event and inform the collection status change.
   *
   * @param {Event}  $event      The click event.
   * @param {Object} collection  The collection to change the status.
   */
  changeCollectionStatus($event, collection) {
    $event.preventDefault();
    this.onChangeCollectionStatus({ collection });
  }
}

/**
 * @ngdoc component
 * @name collections
 * @description
 * This component renders the collections section.
 *
 * @memberof collections
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Collections}
   */
  controller: Collections,
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
   * @property {Array}      allCollections              The list of every existing collection.
   * @property {Array}      baseTypeList                The list of base types to select from.
   * @property {Object}     collection                  The collection that is being created or edited.
   * @property {Array}      collections                 The filtered list of collections.
   * @property {Boolean}    hasModerationServices       If the customer has moderation services active or not.
   * @property {Boolean}    hasVideoCollection          If the customer has video collection active or not.
   * @property {Boolean}    hasVideoModerationServices  If the customer has video moderation services active or not.
   * @property {Boolean}    isFormVisible               If the collection form is visible or not.
   * @property {Boolean}    loading                     If there are collections being loaded.
   * @property {Pagination} pagination                  The pagination information.
   * @property {Array}      ruleOperatorList            The list of rule operators to select from.
   * @property {Array}      ruleTypeList                The list of rule types to select from.
   * @property {String}     search                      The text to search collections for.
   * @property {Object}     selectedSort                The sort to order the collections with.
   * @property {Object}     selectedStatusFilter        The status to filter the collections with.
   * @property {Array}      socialMentionsAccounts      The list of social mentions accounts to validate if we
   *                                                    we are collecting media.
   * @property {Array}      sortList                    The list of available sort types to display.
   * @property {Array}      statusFilterList            The list of available status filters to display.
   * @property {Boolean}    streamsLoading              If there are streams being loaded.
   * @property {Function}   onChangeCollectionStatus    Callback for when the status of a collection is changed. It
   *                                                    receives collection to change.
   * @property {Function}   onGeneratePhrase            Callback for generating the phrase when a collection is edited.
   * @property {Function}   onCloseForm                 Callback for when the collection form needs to be closed.
   * @property {Function}   onDeleteCollection          Callback for when a collection will be deleted. It
   *                                                    receives collection to delete.
   * @property {Function}   onGoToSocialAccounts        Callback for when we want to go to the social accounts page.
   * @property {Function}   onOpenForm                  Callback for when the collection form needs to be opened.  It
   *                                                    receives the collection to show in the form.
   * @property {Function}   onPaginationNextClick       Callback for when the pagination next button is clicked.
   * @property {Function}   onPaginationPreviousClick   Callback for when the pagination previous button is clicked.
   * @property {Function}   onSaveCollection            Callback for when a collection will be deleted. It
   *                                                    receives collection to save.
   * @property {Function}   onSearchForStreams          Callback to search for streams. It receives the text to
   *                                                    search.
   * @property {Function}   onSearchTextChange          Callback for when the text in the search box changes. It
   *                                                    receives the new search text.
   * @property {Function}   onSortSelected              Callback for when a new sort is selected. It receives
   *                                                    the selected sort.
   * @property {Function}   onStatusFilterSelected      Callback for when a new status filter is selected. It receives
   *                                                    the selected status filter.
   * @property {Function}   onValidateCollectionName    Callback for when we want to validate a collection name. It
   *                                                    receives the collection to validate.
   * @property {Function}   onValidateHashtagLimit      Callback to validate the limit of hasthag collections. It
   *                                                    receives the collection to validate.
   */
  bindings: {
    allCollections: '<',
    baseTypeList: '<',
    collection: '<',
    collections: '<',
    hasModerationServices: '<',
    hasVideoCollection: '<',
    hasVideoModerationServices: '<',
    isFormVisible: '<',
    loading: '<',
    pagination: '<',
    ruleOperatorList: '<',
    ruleTypeList: '<',
    search: '<',
    selectedSort: '<',
    selectedStatusFilter: '<',
    socialMentionsAccounts: '<',
    sortList: '<',
    statusFilterList: '<',
    streamsLoading: '<',
    onChangeCollectionStatus: '&',
    onCloseForm: '&',
    onDeleteCollection: '&',
    onGeneratePhrase: '&',
    onGoToSocialAccounts: '&',
    onOpenForm: '&',
    onPaginationNextClick: '&',
    onPaginationPreviousClick: '&',
    onSaveCollection: '&',
    onSearchForStreams: '&',
    onSearchTextChange: '&',
    onSortSelected: '&',
    onStatusFilterSelected: '&',
    onValidateCollectionName: '&',
    onValidateHashtagLimit: '&',
  },
};
