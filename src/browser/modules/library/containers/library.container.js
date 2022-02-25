/* eslint-disable complexity */

/**
 * @ngdoc controller
 * @name LibraryContainer
 * @description
 * This container displays the library section.
 *
 * @memberof library
 */
class LibraryContainer {
  /**
   * @param {$q}              $q                               To wait for several promises with the all method.
   * @param {$location}       $location                        To change url location.
   * @param {$rootScope}      $rootScope                       To emit the events.
   * @param {$window}         $window                          To open a new tab with the post url.
   * @param {Object}          aggregationsList                 To search for aggregations.
   * @param {Object}          appConfiguration                 To get the rights max chars configuration.
   * @param {AppErrorHandler} appErrorHandler                  To display any error.
   * @param {AppSession}      appSession                       To check if the current customer has Moderation QA
   *                                                           flow activated.
   * @param {Object}          facebookAdsAccountsList          To get the Facebook Ads Accounts.
   * @param {Object}          instagramBusinessAccountsList    To get the Instagram Business Accounts.
   * @param {Object}          keywordsList                     To search for keywords suggestions.
   * @param {Object}          mediaList                        To search for media.
   * @param {Object}          pinterestBoardsList              To get the Pinterest boards.
   * @param {RightsExtension} rightsExtension                  To integrate with the rights extension.
   * @param {Object}          rightsMessagesList               To get the customer rights messages.
   * @param {Object}          sharing                          To create sharing urls.
   * @param {Object}          socialAccountsList               To get the customer social accounts.
   * @param {Object}          socialMentionsAccountsList       To get the customer social mentions accounts.
   * @param {Object}          streamsList                      To search for streams.
   * @param {Object}          suggestionsList                  To search for suggestions.
   * @param {UIMessages}      uiMessages                       To display notification messages.
   * @param {Array}           LIBRARY_ACTIONS                  To get the actions list.
   * @param {Object}          LIBRARY_EDIT_STATUS              To get the edit status.
   * @param {Object}          LIBRARY_MEDIA_BY_APPROVAL_TYPE   To get the media by approval type.
   * @param {Object}          LIBRARY_MEDIA_STATUS             To get the media status.
   * @param {Object}          LIBRARY_MODAL_SECTIONS           To get the actions list.
   * @param {Array}           LIBRARY_SECTIONS                 To get the sections list.
   * @param {Object}          LIBRARY_SHARE_MODAL_ACTIVATIONS  To get the share modal activations.
   * @param {Object}          LIBRARY_SORT                     To get the sort configuration.
   */
  constructor(
    $q,
    $location,
    $rootScope,
    $window,
    aggregationsList,
    appConfiguration,
    appErrorHandler,
    appSession,
    facebookAdsAccountsList,
    instagramBusinessAccountsList,
    keywordsList,
    mediaList,
    pinterestBoardsList,
    rightsExtension,
    rightsMessagesList,
    sharing,
    socialAccountsList,
    socialMentionsAccountsList,
    streamsList,
    suggestionsList,
    uiMessages,
    LIBRARY_ACTIONS,
    LIBRARY_EDIT_STATUS,
    LIBRARY_MEDIA_BY_APPROVAL_TYPE,
    LIBRARY_MEDIA_STATUS,
    LIBRARY_MODAL_SECTIONS,
    LIBRARY_SECTIONS,
    LIBRARY_SHARE_MODAL_ACTIVATIONS,
    LIBRARY_SORT,
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
     * The local reference to the `$rootScope` service.
     *
     * @type {$rootScope}
     */
    this.$rootScope = $rootScope;
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The local reference to the `aggregationsList` service.
     *
     * @type {AggregationsList}
     */
    this.aggregationsList = aggregationsList.getNewInstance();
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appSession` service.
     *
     * @type {appSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `facebookAdsAccountsList` service.
     *
     * @type {FacebookAdsAccountsList}
     */
    this.facebookAdsAccountsList = facebookAdsAccountsList.getNewInstance();
    /**
     * The local reference to the `instagramBusinessAccountsList` service.
     *
     * @type {InstagramBusinessAccountsList}
     */
    this.instagramBusinessAccountsList = instagramBusinessAccountsList.getNewInstance();
    /**
     * The local reference to the `keywordsList` instance.
     *
     * @type {keywordsList}
     */
    this.keywordsList = keywordsList.getNewInstance();
    /**
     * The local reference to the `mediaList` service.
     *
     * @type {MediaList}
     */
    this.mediaList = mediaList.getNewInstance();
    /**
     * The local reference to the `pinterestBoardsList` service.
     *
     * @type {PinterestBoardsList}
     */
    this.pinterestBoardsList = pinterestBoardsList.getNewInstance();
    /**
     * The local reference to the `rightsExtension` service.
     *
     * @type {RightsExtension}
     */
    this.rightsExtension = rightsExtension;
    /**
     * The local reference to the `rightsMessagesList` service.
     *
     * @type {RightsMessagesList}
     */
    this.rightsMessagesList = rightsMessagesList.getNewInstance();
    /**
     * The local reference to the `sharing` service.
     *
     * @type {Sharing}
     */
    this.sharing = sharing.getNewInstance();
    /**
     * The local reference to the `socialAccountsList` service.
     *
     * @type {SocialAccountsList}
     */
    this.socialAccountsList = socialAccountsList.getNewInstance();
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
     * The local reference to the `suggestionsList` service.
     *
     * @type {SuggestionsList}
     */
    this.suggestionsList = suggestionsList.getNewInstance();
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `actions` constant.
     *
     * @type {Array}
     */
    this.actions = LIBRARY_ACTIONS;
    /**
     * The local reference to the `editStatusMap` constant.
     *
     * @type {EditStatusMap}
     */
    this.editStatusMap = LIBRARY_EDIT_STATUS;
    /**
     * The local reference to the `LIBRARY_MEDIA_BY_APPROVAL_TYPE` constant.
     *
     * @type {Object}
     */
    this.LIBRARY_MEDIA_BY_APPROVAL_TYPE = LIBRARY_MEDIA_BY_APPROVAL_TYPE;
    /**
     * The local reference to the `actions` constant.
     *
     * @type {Object}
     */
    this.mediaStatus = LIBRARY_MEDIA_STATUS;
    /**
     * The local reference to the `LIBRARY_MODAL_SECTIONS` constant.
     *
     * @type {Object}
     */
    this.LIBRARY_MODAL_SECTIONS = LIBRARY_MODAL_SECTIONS;
    /**
     * The local reference to the `modalSections` constant.
     *
     * @type {Array}
     */
    this.modalSections = [
      LIBRARY_MODAL_SECTIONS.info,
      LIBRARY_MODAL_SECTIONS.tagToStream,
      LIBRARY_MODAL_SECTIONS.rights,
      LIBRARY_MODAL_SECTIONS.share,
    ];
    /**
     * The local reference to the `sections` constant.
     *
     * @type {Array}
     */
    this.sections = LIBRARY_SECTIONS;
    /**
     * The sharing modal activations.
     *
     * @type {Array}
     */
    this.shareModalActivations = [
      LIBRARY_SHARE_MODAL_ACTIVATIONS.facebook,
      LIBRARY_SHARE_MODAL_ACTIVATIONS.shareLink,
      LIBRARY_SHARE_MODAL_ACTIVATIONS.instagram,
      LIBRARY_SHARE_MODAL_ACTIVATIONS.tapshop,
      LIBRARY_SHARE_MODAL_ACTIVATIONS.pinterest,
    ];
    /**
     * The local reference to the `sortList` constant.
     *
     * @type {Array}
     */
    this.sortList = [
      LIBRARY_SORT.dateCollectedDesc,
      LIBRARY_SORT.dateCollectedAsc,
      LIBRARY_SORT.recommendedDesc,
      LIBRARY_SORT.approvedDesc,
      LIBRARY_SORT.approvedAsc,
      LIBRARY_SORT.discardedDesc,
      LIBRARY_SORT.discardedAsc,
    ];
    /**
     * The local reference to the `rightsMaxChars` object.
     *
     * @type {Object}
     */
    this.rightsMaxChars = appConfiguration.rights.maxChars;
    /**
     * Flag that indicates if the modal actions are visible or not.
     *
     * @type {Boolean}
     */
    this.areModalActionsVisible = true;
    /**
     * The query to search media and filters by.
     *
     * @type {Object}
     */
    this.query = {
      filters: {},
      sort: [],
      staticFilters: {
        phrase: '',
        condition: 'and',
      },
    };
    /**
     * The selected section.
     *
     * @type {Object}
     */
    this.selectedSection = {};
    /**
     * Flag that indicates if the modal is being displayed or not.
     *
     * @type {Boolean}
     */
    this.isModalVisible = false;
    /**
     * Flag that indicates if the edit modal is being displayed or not.
     *
     * @type {Boolean}
     */
    this.isEditModalVisible = false;
    /**
     * Flag that indicates if the modal is being displayed in bulk view or not.
     *
     * @type {Boolean}
     */
    this.isModalBulk = false;
    /**
     * The list of media that the modal is displaying.
     *
     * @type {Array}
     */
    this.mediaModal = [];
    /**
     * The URL for the generated sharing document.
     *
     * @type {String}
     */
    this.sharingDocumentUrl = '';
    /**
     * The list of tagged streams that the modal is displaying.
     *
     * @type {Array}
     */
    this.mediaModalStreams = [];
    /**
     * The selected section of the modal.
     *
     * @type {Object}
     */
    this.selectedModalSection = {};
    /**
     * The index of the media opened in the modal.
     *
     * @type {Number}
     */
    this.mediaModalIndex = 0;
    /**
     * The map of selected media in the modal.
     *
     * @type {Object}
     */
    this.mediaModalselected = {};
    /**
     * The number of selected media in the modal.
     *
     * @type {Number}
     */
    this.mediaModalSelectedCount = 0;
    /**
     * Flag that indicates if the rights data was loaded or not.
     *
     * @type {Boolean}
     */
    this.isRightsDataLoaded = false;
    /**
     * The rights extension id.
     *
     * @type {String}
     */
    this.rightsExtensionId = appConfiguration.rights.extension.id;
    /**
     * The the stream that identifies a media for PII consent.
     *
     * @type {String}
     */
    this.rightsPIIConsentStream = appConfiguration.rights.pii.streamName;
    /**
     * The number of media that may not affect the download user experience, we are going to use
     * this value to warning the user before starting the download process if he is trying to
     * download more media.
     *
     * @type {Number}
     */
    this.downloadableMediaWarningMaxValue = 30;
    /**
     * The number of photos that counts for one video when counting towards the warning of max value.
     *
     * @type {Number}
     */
    this.downloadableMediaVideoPhotoRatio = 6;
    /**
     * The map of media by approval type.
     *
     * @type {Object}
     */
    this.mediaByApprovalType = angular.copy(this.LIBRARY_MEDIA_BY_APPROVAL_TYPE);
    /**
     * The approval type that is on display in the modal.
     *
     * @type {?Object}
     */
    this.modalApprovalType = null;
    /**
     * The map of the number of media of the approval type that is on display in the modal.
     *
     * @type {Object}
     * @property {Object} bySource     The count of media by source of the approval type that is on display in
     *                                 the modal.
     * @property {Number} total        The count of media of the approval type that is on display in the modal.
     * @property {String} destination  The sections where the media will end up after being approved.
     */
    this.modalApprovalTypeSelectedCountMap = {
      bySource: {},
      total: 0,
      destination: '',
    };
    /**
     * The map of media count by rights status used in the rights process.
     *
     * @type {Object}
     * @property {Number} approved     The count of media that was approved because they had rights.
     * @property {Number} requested    The count of media that was asked for rights.
     * @property {String} destination  The sections where the media was sent after being approved.
     */
    this.rightsStatusCount = {
      approved: 0,
      requested: 0,
      destination: '',
    };
    /**
     * The current customer that is logged in.
     *
     * @type {Object}
     */
    this.currentAccount = {};
    /**
     * Flag that indicates if the customers has keywords enabled or not.
     *
     * @type {Boolean}
     */
    this.hasKeywordsEnabled = false;
    /**
     * Flag that indicates if the customer has the for review flow or not.
     *
     * @type {Boolean}
     */
    this.hasForReviewFlow = false;
    /**
     * Flag that indicates if the customer has the manual streams flow or not.
     *
     * @type {Boolean}
     */
    this.hasManualStreamsFlow = false;
    /**
     * Flag that indicates if the customer has any Content Granular Permissions enabled or not.
     *
     * @type {Boolean}
     */
    this.hasAnyContentGranularPermissions = false;
    /**
     * Flag that indicates if the customer has the approve action enabled or not.
     *
     * @type {Boolean}
     */
    this.hasApproveActionEnabled = true;
    /**
     * Flag that indicates if the customer has automatic keywords enabled.
     *
     * @type {Boolean}
     */
    this.hasAutomaticKeywords = false;
    /**
     * Flag that indicates if the customer has the keywords action enabled or not.
     *
     * @type {Boolean}
     */
    this.hasKeywordsActionEnabled = true;
    /**
     * Flag that indicates if the customer has the tagging action enabled or not.
     *
     * @type {Boolean}
     */
    this.hasTaggingActionEnabled = true;
    /**
     * This property will be used on the UI in order specify how many "section tabs" will be shown before
     * wrapping the rest into a dropdown. This exists because when the customer has the manual streams flow
     * we need to increase this number to 3.
     *
     * @type {Number}
     */
    this.numberOfSectionsBeforeDropdown = 2;
    /**
     * Flag that indicates if the approve button should be displayed in the modal or not.
     *
     * @type {Boolean}
     */
    this.showModalApproveButton = false;
    /**
     * The map of discarded status to use based on the status of the media.
     *
     * @type {Object}
     * @property {Number} approved  The discarded status for approved media.
     * @property {Number} reported  The discarded status for reported media.
     * @property {Number} other     The discarded status for all the other media.
     */
    this.discardedStatusMap = {
      [this.mediaStatus.approved]: this.mediaStatus.discardedOk,
      [this.mediaStatus.reported]: this.mediaStatus.deleted,
      other: this.mediaStatus.discardedPending,
    };
    /**
     * The list of subscriptions functions that need to be called when $onDestroy.
     *
     * @type {Array}
     * @access protected
     */
    this._subscriptions = [];
    /**
     * @ignore
     */
    this._onUpdateMediaFromRightsExtension = this._onUpdateMediaFromRightsExtension.bind(this);
    /**
     * To handle actions for each activation listed on the share to modal section.
     *
     * @type {Object}
     * @access protected
     */
    this._activationHandlers = {
      facebook: {
        select: this._handleFacebookActivation.bind(this),
        send: this._sendMediaToFacebook.bind(this),
      },
      instagram: {
        select: this._handleInstagramActivation.bind(this),
        send: this._sendMediaToInstagram.bind(this),
      },
      pinterest: {
        select: this._handlePinterestActivation.bind(this),
        send: this._sendMediaToPinterest.bind(this),
      },
      shareLink: {
        select: this._handleShareLinkActivation.bind(this),
      },
      tapshop: {
        select: this._handleTapshopActivation.bind(this),
        send: this._sendMediaToTapshop.bind(this),
      },
    };
  }
  /**
   * Check if the rights extension is installed.
   */
  $onInit() {
    this.currentAccount = this.appSession.getSession().account;

    /**
     * Based on the customer's settings, we're going to evaluate if we should display the
     * keywords section in the modal.
     */
    this.hasKeywordsEnabled = !!(this.currentAccount.settings.manual_keywords);
    this.hasAutomaticKeywords = this.currentAccount.settings.programmatic_keywords_googlevision;

    /**
     * If the customer has the for review flow or the manual streams flow, we need to move the SFL section to
     * the second position and increase the number of sections before the dropdown to 3.
     */
    this.hasForReviewFlow = this.currentAccount.settings.content_discovery_for_review_flow;
    this.hasManualStreamsFlow = this.currentAccount.settings.content_discovery_manual_streams_flow;
    if (
      this.hasForReviewFlow ||
      this.hasManualStreamsFlow
    ) {
      const index = this.sections.findIndex((section) => section.id === 'savedForLater');

      if (index > -1) {
        const [sflSection] = this.sections.splice(index, 1);
        this.sections.splice(1, 0, sflSection);

        this.numberOfSectionsBeforeDropdown = 3;
      }
    }

    // Check if any Content Granular Permission is active.
    const contentGranularPermissionsKeys = Object.keys(this.currentAccount.permissions)
    .filter((key) => key.match(/^content\./));
    this.hasAnyContentGranularPermissions = contentGranularPermissionsKeys.length > 0;

    /**
     * If any Content Granular Permission is active:
     *  - Check if we should enable or disable the approve, keywords and tagging actions.
     *  - Filter the sections by each of its permission name.
     */
    if (this.hasAnyContentGranularPermissions) {
      this.hasApproveActionEnabled = !!this.currentAccount.permissions['content.action.approve'];
      this.hasKeywordsActionEnabled = !!this.currentAccount.permissions['content.action.keywords'];
      this.hasTaggingActionEnabled = !!this.currentAccount.permissions['content.action.tagtostream'];

      this.sections = this.sections.filter((section) => this.currentAccount.permissions[section.permissionName]);
    }

    this.rightsExtension.refreshInstalled();

    this._subscriptions = [
      this.rightsExtension.onMediaUpdate(this._onUpdateMediaFromRightsExtension),
    ];
  }
  /**
   * Clear all listeners.
   */
  $onDestroy() {
    this._subscriptions.forEach((unsubscribeFn) => unsubscribeFn());
  }
  /**
   * Check if the rights modal section should display the loading indicator.
   *
   * @return {Boolean}
   */
  areRightsLoading() {
    return this.rightsMessagesList.loading ||
      this.socialAccountsList.loading ||
      this.socialMentionsAccountsList.loading;
  }
  /**
   * Check if the library should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoading() {
    return this.aggregationsList.loading ||
      this.mediaList.loading ||
      this.streamsList.loading;
  }
  /**
   * Check if the share modal section should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoadingSharingOptions() {
    return this.facebookAdsAccountsList.loading ||
      this.instagramBusinessAccountsList.loading ||
      this.pinterestBoardsList.loading ||
      this.sharing.loading;
  }
  /**
   * Check if the modal should display the navigation.
   *
   * @return {Boolean}
   */
  isNavigationVisible() {
    return !this.isModalBulk &&
      this.mediaList.entities.length > 1 &&
      !this.isEditModalVisible;
  }
  /**
   * Execute an action that was clicked on a media item.
   *
   * @param {Object}        action  The action that was clicked.
   * @param {Object|Array}  item    The media item to execute the action on.
   */
  onActionClick(action, item) {
    // Check it we have the permission to execute that action.
    if (this._hasContentGranularPermission(action.permission)) {
      const media = angular.isArray(item) ? item : [item];
      const [firstMedia] = media;

      switch (action.id) {
      case 'openPost':
        if (firstMedia.source.data.url) {
          this.$window.open(firstMedia.source.data.url, '_blank');
        }
        break;
      case 'discard':
        this._changeMediaStatus(
          [{
            media,
            status: this.discardedStatusMap[firstMedia.status_id] || this.discardedStatusMap.other,
            successMessage: 'The selected media was discarded.',
            errorMessage: 'Sorry, {mediaInError} of {mediaTotal} media could not be discarded. Please try again.',
          }],
          media.length,
        );
        break;
      case 'saveForLater':
      case 'saveForLaterForReview':
        this._changeMediaStatus(
          [{
            media,
            status: this.mediaStatus.savedForLater,
            successMessage: 'The selected media was moved to Saved for Later.',
            errorMessage: 'Sorry, {mediaInError} of {mediaTotal} media could not be moved to Saved for Later. ' +
              'Please try again.',
          }],
          media.length,
        );
        break;
      case 'blockUser':
        break;
      case 'restore':
        this._changeMediaStatus(
          [{
            media,
            status: this.mediaStatus.pending,
            successMessage: 'The selected media was restored.',
            errorMessage: 'Sorry, {mediaInError} of {mediaTotal} media could not be restored. ' +
              'Please try again.',
          }],
          media.length,
        ).then(() => this.mediaList.putMetadataToMedia(
          media,
          'lemurama_qa_finish',
          'boolean',
          true,
        ))
        .catch((error) => this.appErrorHandler.handle(error));
        break;
      case 'download':
        this._startMediaDownload(media);
        break;
      case 'approve':
      case 'approveModal':
      case 'approveForReview':
      case 'saveForReview':
        this._onApproveAction(media);
        break;
      case 'tagToStream':
        this.openModal(media, action.id);
        break;
      case 'share':
        this.openModal(media, action.id);
        break;
      case 'editMedia':
        this.isEditModalVisible = true;
        break;
      default:
        break;
      }
    } else {
      this._showNoContentGranularPermissionEnabled(action.permission.phrase);
    }
  }
  /**
   * Check if an action is disabled by asserting if the associated permission is not enabled.
   *
   * @param {Action} action  The action to check if it should be disabled or not.
   *
   * @return {Boolean}
   */
  onActionDisableCheck(action) {
    return !this._hasContentGranularPermission(action.permission);
  }
  /**
   * Check if an action is visible by:
   *  - Asserting if the list of action sections includes the current section.
   *  - If the action requires a customer setting, check if that setting exist and the value is truthy.
   *  - If the action should not have some customer setting, check if that setting don't exist or the value is falsy.
   *
   * @param {String} component  The angular component from where to check the visibility.
   *                            Possible components are `card`, `library` and `modal`.
   * @param {Action} action     The action to check the visibility.
   * @param {String} location   The location of the component from where to check the visibility.
   *
   * @return {Boolean}
   */
  onActionVisibilityCheck(component, action, location) {
    let result = false;
    if (
      action.visible[component] &&
      action.visible[component][location] &&
      action.visible[component][location].includes(this.selectedSection.name)
    ) {
      const hasSettings = (
        action.requiresSettings &&
        action.requiresSettings.length
      ) ?
        action.requiresSettings.every((setting) => this.currentAccount.settings[setting]) :
        true;
      const dontHaveSettings = (
        action.withoutSettings &&
        action.withoutSettings.length
      ) ?
        action.withoutSettings.every((setting) => !this.currentAccount.settings[setting]) :
        true;

      result = hasSettings && dontHaveSettings;
    }

    return result;
  }
  /**
   * When an activation is selected, execute an action depending on what activation is selected.
   * We use an Object map to evaluate the available activations and execute actions depending on which one is selected.
   *
   * @param {Object} selectedActivation  The selected activation to share media to.
   * @param {Object} selectedAccount     The selected account to share media to.
   * @param {Object} extras              The extras info to use in the share.
   */
  onActivationSelected(selectedActivation, selectedAccount, extras) {
    const activationHandlers = this._activationHandlers[selectedActivation.id];

    if (activationHandlers) {
      const handler = selectedAccount ? activationHandlers.send : activationHandlers.select;

      if (handler) {
        handler(selectedAccount, extras);
      }
    }
  }
  /**
   * Check if an activation is visible by:
   *  - If the share section requires a customer setting, check if that setting exist and the value is truthy.
   *
   * @param {Object} activation  The activation to check the visibility.
   *
   * @return {Boolean}
   */
  onActivationVisibilityCheck(activation) {
    return (
      activation.requiresSettings &&
      activation.requiresSettings.length
    ) ?
      activation.requiresSettings.every((setting) => this.currentAccount.settings[setting]) :
      true;
  }
  /**
   * Generate a filter based on the provided suggestion and group,
   * and apply that filter.
   *
   * @param {Object} suggestion  The suggestion to filter by.
   * @param {Object} group       The group the suggestions belongs to.
   */
  onAddSuggestionFilter(suggestion, group) {
    const appliedAggregation = this.aggregationsList.entities
    .find((aggregation) => aggregation.key === group.aggregation);

    if (appliedAggregation) {
      const appliedFilter = this.aggregationsList.parseFilter(
        appliedAggregation.key,
        {
          name: suggestion.key,
          label: suggestion.name,
        },
        this.query,
      );

      appliedFilter.selected = !appliedFilter.selected;
      this.onFilterChange(appliedAggregation, appliedFilter);
    } else {
      this.uiMessages.notification(
        'Sorry, there was a problem while loading content. Please try refreshing the page.',
        { type: 'error' },
      );
    }
  }
  /**
   * Toggle the media bulk selection.
   *
   * @param {Boolean} selectAll  If we must set all media as selected or not.
   */
  onBulkSelectionToggle(selectAll) {
    this.mediaList.changeAllMediaSelection(selectAll);
  }
  /**
   * Perform a request to change the position of the streams of a media.
   *
   * @param {Array} streams  The streams to save the position of.
   */
  onChangeStreamsPositions(streams) {
    const [firstMedia] = this.mediaModal;
    const positions = streams.map((stream) => stream.id);

    this.streamsList.cancelCurrentRequest()
    .then(() => this.streamsList.changeStreamsPositions(firstMedia.id, positions))
    .then((result) => this.mediaList.updateTaggedStreams(result))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Clear the list of suggestions.
   */
  onClearSuggestions() {
    this.suggestionsList.entities = [];
  }
  /**
   * Close the edit modal.
   */
  onEditModalClose() {
    this.isEditModalVisible = false;
  }
  /**
   * When a filter selection is changed we need to apply the selected filter in the query filters object
   * and in the appliedFilters object. Then we refresh the library.
   *
   * @param {Aggregation} aggregation  The aggregation the filter belongs to.
   * @param {Filter}      filter       The filter which selection was changed.
   */
  onFilterChange(aggregation, filter) {
    const aggregationKey = aggregation.key;
    const isSelected = filter.selected;
    const filterValue = String(filter.name);

    // Update the filters on the query
    this.aggregationsList.toggleFilter(
      this.query.filters,
      aggregationKey,
      isSelected,
      filterValue,
    );
    // Update the applied filters information
    this.aggregationsList.toggleFilter(
      this.aggregationsList.appliedFilters,
      aggregationKey,
      isSelected,
      {
        id: filterValue,
        label: filter.map.label,
      },
    );

    // Update the filters in the query string
    const queryParamValue = this.$location.search()[aggregationKey];
    const currentFilterValues = queryParamValue ?
      String(queryParamValue).split(',') :
      '';
    let newValue;
    if (isSelected) {
      newValue = currentFilterValues.length ?
        `${queryParamValue},${filterValue}` :
        filterValue;
    } else {
      newValue = currentFilterValues.length > 1 ?
        currentFilterValues.filter((value) => value !== filterValue) :
        null;
    }
    this.$location.search(aggregationKey, newValue);

    this._refreshLibrary();
  }
  /**
   * When the user changes the filter date range, update the date filter and refresh the library.
   *
   * @param {Moment} from  The start Date of the range.
   * @param {Moment} to    The end Date of the range.
   */
  onFilterDateRangeChange(from, to) {
    const dateFrom = from.toISOString();
    const dateTo = to.toISOString();

    this.query.staticFilters.date = {
      from: dateFrom,
      to: dateTo,
    };
    this.$location.search('dateFrom', dateFrom);
    this.$location.search('dateTo', dateTo);
    this._refreshLibrary();
  }
  /**
   * Redirect the user to the rights messages page.
   */
  onGoToRightsMessages() {
    this.$location.url('/rights-messages');
  }
  /**
   * Redirect the user to the social accounts page.
   */
  onGoToSocialAccounts() {
    this.$location.url('/settings#socialAccounts');
  }
  /**
   * Perform a request to load more searched streams.
   *
   * @return {Promise}
   */
  onLoadMoreStreams() {
    return this.streamsList.cancelCurrentRequest()
    .then(() => this.streamsList.getNextPage())
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Each time a media selection is changed, refresh the selected media count and the shared streams.
   */
  onMediaSelected() {
    this.mediaList.refreshSelectedMedia();
  }
  /**
   * When an action is clicked in the modal, trigger the `onActionClick` with all the selected media in the modal.
   *
   * @param {Action} action  The action that was clicked.
   */
  onModalActionClick(action) {
    let media;

    if (
      this.selectedModalSection.id === 'rights' &&
      this.isModalBulk
    ) {
      media = this.mediaByApprovalType.withRights.list
      .filter((item) => this.mediaByApprovalType.withRights.selected[item.id]);
    } else {
      media = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);
    }

    this.onActionClick(action, media);
  }
  /**
   * Close the modal and clear the modal media and selected media.
   */
  onModalClose() {
    this.isModalVisible = false;
    this.isEditModalVisible = false;
    this.isModalBulk = false;
    this.mediaModal = [];
    this.mediaModalStreams = [];
    this.selectedModalSection = {};
    this.mediaModalIndex = 0;
    this.mediaModalselected = {};
    this.mediaModalSelectedCount = 0;
    this.areModalActionsVisible = true;
    this.mediaByApprovalType = angular.copy(this.LIBRARY_MEDIA_BY_APPROVAL_TYPE);
    this.modalApprovalType = null;
    this.modalApprovalTypeSelectedCountMap = {
      bySource: {},
      total: 0,
      destination: '',
    };
    this.rightsStatusCount = {
      approved: 0,
      requested: 0,
      destination: '',
    };
  }
  /**
   * When a media is selected or unselected in the modal, update the media selected map and media selected count.
   *
   * @param {Object}  media       The media which selection changed.
   * @param {Boolean} isSelected  If the media was selected or unselected.
   */
  onModalMediaSelectedChange(media, isSelected) {
    this.mediaModalSelectedCount += isSelected ? 1 : -1;

    if (isSelected) {
      this.mediaModalselected[media.id] = true;
    } else {
      delete this.mediaModalselected[media.id];
    }

    // Generate the map again to propagate changes.
    this.mediaModalselected = Object.keys(this.mediaModalselected)
    .reduce((acc, key) => ({ ...acc, [key]: true }), {});
    this._calculateMediaStreams();
  }
  /**
   * Navigate to the next media in the modal.
   */
  onModalNextClick() {
    this._navigateMediaModal(1);
  }
  /**
   * Navigate to the previous media in the modal.
   */
  onModalPreviousClick() {
    this._navigateMediaModal(-1);
  }
  /**
   * When a new modal section is selected, set is as selected.
   * We skip it if the target sections is already selected.
   *
   * @param {Object} modalSection  The modal section to set as selected.
   */
  onModalSectionChange(modalSection) {
    if (this.selectedModalSection !== modalSection) {
      this.selectedModalSection = modalSection;
      this.onToggleModalActions(true);
    }
  }
  /**
   * Check if a modal section is visible by:
   * - Asserting if its list of library sections includes the current section.
   * - Asserting if its list of library sections for single includes the current section and
   *   the modal in single mode.
   *
   * @param {Object} modalSection  The modal section to check the visibility.
   *
   * @return {Boolean}
   */
  onModalSectionVisibilityCheck(modalSection) {
    const librarySectionsSingle = modalSection.librarySectionsSingle || [];

    return modalSection.librarySections.includes(this.selectedSection.name) ||
      (
        !this.isModalBulk &&
        librarySectionsSingle.includes(this.selectedSection.name)
      );
  }
  /**
   * Callback when the pagination `Next` button is clicked.
   * It will get the next media page.
   */
  onPaginationNextClick() {
    this.mediaList.getNextPage(this.query)
    .then(() => {
      this.mediaList.generateApprovalInfo(this.socialMentionsAccountsList.entities);
      this.mediaList.generateApproveNextStatus(
        this.hasForReviewFlow,
        this.hasManualStreamsFlow,
      );
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Callback when the pagination `Previous` button is clicked.
   * It will get the previous media page.
   */
  onPaginationPreviousClick() {
    this.mediaList.getPreviousPage(this.query)
    .then(() => {
      this.mediaList.generateApprovalInfo(this.socialMentionsAccountsList.entities);
      this.mediaList.generateApproveNextStatus(
        this.hasForReviewFlow,
        this.hasManualStreamsFlow,
      );
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * When the query is changed, set is as the new query and refresh the library.
   * It also applies the filters picked up from the url.
   *
   * @param {QuerySearch} query           The changed query.
   * @param {Array}       filtersToApply  The filters to apply.
   */
  onQueryChange(query, filtersToApply) {
    this.query = query;
    /**
     * Based on the customer's settings, we're adding to the filters the query to show images
     * with the Moderation QA Flow.
     */
    if (
      this.currentAccount.settings.modsquad_moderation_qa_flow === true &&
      this.selectedSection.id === 'new'
    ) {
      this.query.filters.lemurama_qa_finish = {
        values: true,
        must_exists: false,
      };
    }

    if (filtersToApply) {
      Object.keys(filtersToApply).forEach((aggregationKey) => {
        filtersToApply[aggregationKey].forEach((value) => {
          const filter = this.aggregationsList.parseFilter(
            aggregationKey,
            { label: value },
            this.query,
          );

          // Only add the filter if it is a known filter.
          if (filter && filter.map.label) {
            this.aggregationsList.toggleFilter(
              this.aggregationsList.appliedFilters,
              aggregationKey,
              true,
              {
                id: value,
                label: filter.map.label,
              },
            );
          }
        });
      });
    }
    this._refreshLibrary();
  }
  /**
   * Reresh the map of the number of media of the approval type that is on display in the modal.
   */
  onRefreshApprovalTypeSelectedCount() {
    this.modalApprovalTypeSelectedCountMap = {
      bySource: {},
      total: 0,
      destination: '',
    };

    if (this.modalApprovalType) {
      const mediaList = this.modalApprovalType.list.filter((media) => this.modalApprovalType.selected[media.id]);

      mediaList.forEach((media) => {
        const source = media.source.name;
        if (!this.modalApprovalTypeSelectedCountMap.bySource[source]) {
          this.modalApprovalTypeSelectedCountMap.bySource[source] = 0;
        }

        this.modalApprovalTypeSelectedCountMap.total++;
        this.modalApprovalTypeSelectedCountMap.bySource[source]++;
      });

      this.modalApprovalTypeSelectedCountMap.destination = this._getDestinationFromMedia(mediaList);
    }
  }
  /**
   * Perform a request to remove a stream.
   *
   * @param {Number} streamId  The stream id to remove.
   */
  onRemoveStream(streamId) {
    const selectedMedia = this._getMediaModalSelectedIds();

    this.streamsList.cancelCurrentRequest()
    .then(() => this.streamsList.saveStreams(selectedMedia, [streamId], false))
    .then((result) => {
      if (result.error) {
        this.uiMessages.notification('Sorry, the selected stream could not be removed.', { type: 'error' });
      } else {
        this.uiMessages.notification('The selected stream was removed.');
      }
      this.mediaList.updateTaggedStreams(result);
      this._calculateMediaStreams();
      this.mediaList.generateApproveNextStatus(
        this.hasForReviewFlow,
        this.hasManualStreamsFlow,
      );
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Perform a request to save the edited Media.
   *
   * @param {Object} editData  The edit data.
   */
  onSaveEditedMedia(editData) {
    const [firstMedia] = this.mediaModal;
    const isEdited = !!editData;

    this.mediaList.saveEditedMedia(firstMedia.id, editData, isEdited)
    .then(() => {
      const action = isEdited ? 'edited' : 'restored';
      this.uiMessages.notification(`The media is being ${action}. Please refresh the page to see the changes.`);
      firstMedia.assets_edit_status = 'PENDING';
      this.onEditModalClose();
    })
    .catch((error) => {
      firstMedia.assets_edit_status = 'FAILED';
      this.appErrorHandler.handle(error, `${this.editStatusMap.FAILED.toolTip}`);
    });
  }
  /**
   * Perform a request to add/remove a keyword to the given media.
   *
   * @param {Object}  media     The media to update.
   * @param {Object}  keyword   The keyword to add or remove.
   * @param {Boolean} isAdding  If we are adding or removing a keyword.
   *
   * @return {Promise}
   */
  onSaveMediaKeyword(media, keyword, isAdding) {
    return this.mediaList.saveMediaKeyword(media, keyword, isAdding)
    .then(() => {
      const action = isAdding ? 'added' : 'removed';
      this.uiMessages.notification(`The selected keyword was ${action}.`);
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Search for keywords given a text.
   * Before searching cancel any ongoing request.
   *
   * @param {String} search  The text to search keywords for.
   *
   * @return {Promise}
   */
  onSearchForKeywords(search) {
    return this.keywordsList.cancelCurrentRequest()
    .then(() => this.keywordsList.getKeywordsSuggestions(search))
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
   * Search for suggestions given a text.
   * Before searching cancel any ongoing request.
   *
   * @param {String} search  The text to search suggestions for.
   */
  onSearchSuggestions(search) {
    this.suggestionsList.cancelCurrentRequest()
    .then(() => this.suggestionsList.getSuggestions(search))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * When a new section is selected, set is as selected;
   * and clear the aggregations and appliedFilters.
   *
   * @param {Object} section  The section to set as selected.
   */
  onSectionChange(section) {
    this.selectedSection = section;
    this.aggregationsList.appliedFilters = {};
    this.aggregationsList.previousAggregations = [];
    this.showModalApproveButton = this.LIBRARY_MODAL_SECTIONS.rights.librarySections.includes(section.name);
  }
  /**
   * Perform a request to ask for rights on media.
   *
   * @param {Object} rightsRequest  The rights request to perform.
   */
  onSendRightsRequest(rightsRequest) {
    if (this._hasContentGranularPermission({ name: 'content.action.approve' })) {
      const media = this.mediaByApprovalType.contentEngine.list
      .filter((item) => this.mediaByApprovalType.contentEngine.selected[item.id]);
      const changingAll = this.mediaList.entities.length === media.length;

      this.mediaList.requestRights(
        media,
        rightsRequest,
        this.query,
      )
      .then((result) => {
        this.rightsStatusCount.requested += result.success;

        return this._handleMediaChange(
          [{
            media,
            successMessage: 'Rights were successfully requested for the selected media. You can find this media ' +
              'in Rights Pending.',
            errorMessage: 'Sorry, {mediaInError} of {mediaTotal} rights request messages could not be sent. ' +
              'Please try again.',
          }],
          result,
          changingAll,
        );
      })
      .catch((error) => this.appErrorHandler.handle(error));
    } else {
      this._showNoContentGranularPermissionEnabled('Approve Content');
    }
  }
  /**
   * Perform a request to save streams.
   *
   * @param {Array} newStreams  List of streams to save.
   */
  onTagStreams(newStreams) {
    const selectedMedia = this._getMediaModalSelectedIds();
    const link = newStreams.map((newStream) => newStream.id);

    // API call to store new streams
    this.streamsList.cancelCurrentRequest()
    .then(() => this.streamsList.saveStreams(selectedMedia, link, true))
    .then((result) => {
      if (result.error) {
        this.uiMessages.notification('Sorry, the selected media could not be tagged.', { type: 'error' });
      } else {
        this.uiMessages.notification('The selected media was tagged.');
      }
      this.mediaList.updateTaggedStreams(result);
      this._calculateMediaStreams();
      this.mediaList.generateApproveNextStatus(
        this.hasForReviewFlow,
        this.hasManualStreamsFlow,
      );
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Show/Hide the modal actions.
   * This function helps to show/hide the main modal actions to show the ones of the modal section.
   * Like for the Tagging section.
   *
   * @param {Boolean} visible  True if you want to show them, false if you want to hide them.
   */
  onToggleModalActions(visible) {
    this.areModalActionsVisible = visible;
  }
  /**
   * Open the modal with the given media and in the given section.
   *
   * @param {Array}  media           The media to display in the modal.
   * @param {Number} modalSectionId  The section to set as selected in the modal.
   */
  openModal(media, modalSectionId) {
    this.isModalVisible = true;
    this.isModalBulk = media.length > 1;
    this.mediaModal = media;
    this.selectedModalSection = this.modalSections.find((modalSection) => modalSection.id === modalSectionId);
    this.mediaModalselected = {};
    this.mediaModal.forEach((item) => {
      this.mediaModalselected[item.id] = true;
    });
    this.mediaModalSelectedCount = this.mediaModal.length;

    const [firstMedia] = media;
    this.mediaModalIndex = this.mediaList.entities.findIndex((item) => item.id === firstMedia.id);

    this.rightsStatusCount = {
      approved: 0,
      requested: 0,
      destination: '',
    };
    this._refreshApprovalType();

    // Calculate streams in common between media selected
    this._calculateMediaStreams();
  }
  /**
   * Open the rights extension with the selected media for the chrome extension and
   * the selected rights message group.
   *
   * @param {Object} selectedRightsMessageGroup  The selected rights message group.
   */
  openRightsExtension(selectedRightsMessageGroup) {
    if (this._hasContentGranularPermission({ name: 'content.action.approve' })) {
      const media = this.mediaByApprovalType.chromeExtension.list
      .filter((item) => this.mediaByApprovalType.chromeExtension.selected[item.id]);

      this.rightsExtension.openRightsExtension(
        media,
        selectedRightsMessageGroup,
        this.rightsMessagesList.PIIRightsMessage,
      );
    } else {
      this._showNoContentGranularPermissionEnabled('Approve Content');
    }
  }
  /**
   * Loops over the selected media and calculates shared streams.
   */
  _calculateMediaStreams() {
    const source = this.mediaModal.filter((medium) => this.mediaModalselected[medium.id]);

    if (source.length) {
      this.mediaModalStreams = source.reduce((mediaA, mediaB) => ({
        streams: mediaA.streams
        .filter((streamA) => mediaB.streams.filter((streamB) => streamA.id === streamB.id).length),
      })).streams;
    }
  }
  /**
   * Change the status to a list of media.
   *
   * @param {Array}   mediaChangeRequests  The list of {@link MediaChangeRequest} to perform.
   * @param {Number}  totalMediaChanged    The total of media being changed.
   * @param {Boolean} areWeApproving       Tf we are approving media.
   *
   * @return {Promise} Response from changing media status.
   *
   * @access protected
   */
  _changeMediaStatus(mediaChangeRequests, totalMediaChanged, areWeApproving = false) {
    const changingAll = this.mediaList.entities.length === totalMediaChanged;

    return this.mediaList.changeMediaStatus(mediaChangeRequests, this.query)
    .then((result) => {
      if (areWeApproving) {
        this.rightsStatusCount.approved += result.success;

        // Get the first media of every request that has at least one success.
        const destinationMedia = mediaChangeRequests
        .filter((request) => result.byStatus[request.status].success)
        .map((request) => request.media[0]);

        this.rightsStatusCount.destination = this._getDestinationFromMedia(destinationMedia);
      }

      return this._handleMediaChange(
        mediaChangeRequests,
        result,
        changingAll,
      );
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Its perform download action, the we're going to call the download service
   * with the downloadbled selected media.
   *
   * @param {Array} mediaToDownload  The list of media to download.
   *
   * @access protected
   */
  _downloadMedia(mediaToDownload) {
    this.mediaList.downloadMedia(mediaToDownload)
    .then(() => {
      this.uiMessages.notification('The selected media was successfully downloaded.');
    })
    .catch((error) => {
      this.uiMessages.notification(
        'Sorry, the selected media could not be downloaded.',
        { type: 'error' },
      );

      this.appErrorHandler.silent(error);
    });
  }
  /**
   * Generate a destination phrase from a list of media.
   *
   * @param {Array} media  The list of media to generate the destination phrase from.
   *
   * @return {String} The destination phrase.
   *
   * @access protected
   */
  _getDestinationFromMedia(media) {
    const destinationsList = [];

    media.forEach((entity) => {
      const destination = entity.approveNextStatus.section;
      if (!destinationsList.includes(destination)) {
        destinationsList.push(destination);
      }
    });

    // Join the list of destinations with commas and replace the last comma with and or.
    const destinations = destinationsList.join(', ').replace(/,(?!.*,)/, ' or');

    return destinations + (
      destinationsList.length > 1 ?
        ' (depending on the stream type)' :
        ''
    );
  }
  /**
   * Loops over the selected media and extract only their id.
   *
   * @return {Array} Array of media ids.
   */
  _getMediaModalSelectedIds() {
    return this.mediaModal
    .filter((medium) => this.mediaModalselected[medium.id])
    .map((medium) => medium.id);
  }
  /**
   * When Facebook Ads Manager is selected as sharing activation, get the Facebook Ads Accounts.
   *
   * @access protected
   */
  _handleFacebookActivation() {
    this.facebookAdsAccountsList.cancelCurrentRequest()
    .then(() => this.facebookAdsAccountsList.getFacebookAdsAccounts())
    .catch((error) => {
      if (error) {
        this.uiMessages.notification(`There was an error: ${error.message}`, { type: 'error' });
      }
    });
  }
  /**
   * When Instagram is selected as sharing activation, get the Instagram Business Accounts.
   *
   * @access protected
   */
  _handleInstagramActivation() {
    this.instagramBusinessAccountsList.cancelCurrentRequest()
    .then(() => this.instagramBusinessAccountsList.getInstagramBusinessAccounts())
    .catch((error) => {
      if (error) {
        this.uiMessages.notification(`There was an error: ${error.message}`, { type: 'error' });
      }
    });
  }
  /**
   * Handle the changes performed to the media in the library.
   * For each media change request:
   * - If any error happened display a notification with the errorMessage.
   * - If not, display a notification with the successMessage.
   *
   * @param {Array}   mediaChangeRequests      The list of {@link MediaChangeRequest} that was changed.
   * @param {Object}  result                   The media change result object.
   * @param {Boolean} changingAll              If we were changing all the media in the library.
   * @param {Boolean} ignoreModalApprovalType  If we have to ignore the map of media by approval type.
   *
   * @access protected
   */
  _handleMediaChange(mediaChangeRequests, result, changingAll, ignoreModalApprovalType = false) {
    mediaChangeRequests.forEach((request) => {
      const requestResult = result.byStatus ?
        result.byStatus[request.status] :
        result;

      if (requestResult.error) {
        const errorMessage = request.errorMessage
        .replace('{mediaInError}', requestResult.error)
        .replace('{mediaTotal}', request.media.length);

        this.uiMessages.notification(
          errorMessage,
          { type: 'error' },
        );
      } else {
        this.uiMessages.notification(request.successMessage);
      }
    });

    // If the media page is empty, clear the list of aggregations.
    if (!this.mediaList.entities.length) {
      this.aggregationsList.entities = [];
    }

    // If we changed all the media, generate the approval info and next status.
    if (changingAll) {
      this.mediaList.generateApprovalInfo(this.socialMentionsAccountsList.entities);
      this.mediaList.generateApproveNextStatus(
        this.hasForReviewFlow,
        this.hasManualStreamsFlow,
      );
    }

    // If this action comes from the modal, process the media of the modal.
    if (this.mediaModal.length) {
      this._handleMediaChangeInModal(
        result,
        changingAll,
        ignoreModalApprovalType,
      );
    }
  }
  /**
   * Handle the changes performed to the media of the modal.
   *
   * @param {Object}  result                   The media change result object.
   * @param {Boolean} changingAll              If we were changing all the media in the library.
   * @param {Boolean} ignoreModalApprovalType  If we have to ignore the map of media by approval type.
   *
   * @access protected
   */
  _handleMediaChangeInModal(
    result,
    changingAll,
    ignoreModalApprovalType = false,
  ) {
    if (this.isModalBulk) {
      // If we are showing a bulk modal, leave the media that is not in the successMedia array.
      this.mediaModal = this.mediaModal.filter((item) => !result.successMedia.includes(item.id));

      // If we are in the Rights section, remove all the media of the current approval type from the modal media.
      if (
        this.selectedModalSection.id === 'rights' &&
        !ignoreModalApprovalType
      ) {
        this.mediaModal = this.mediaModal.filter((mediaInModal) => {
          const exist = this.modalApprovalType.list.some((item) => item.id === mediaInModal.id);
          mediaInModal.selected = !exist;
          return mediaInModal.selected;
        });
        this.mediaList.refreshSelectedMedia();
      }

      // Update the media selected map and media selected count.
      this.mediaModalselected = {};
      this.mediaModal.forEach((item) => {
        this.mediaModalselected[item.id] = true;
      });
      this.mediaModalSelectedCount = this.mediaModal.length;
      this._refreshApprovalType();

      // If no more media is in the modal, close it.
      if (!this.mediaModal.length) {
        this.onModalClose();
      }
    } else if (this.mediaList.entities.length) {
      // If we are in single mode and more media exist, just navigate to the next media.

      // If we removed the last media of the page, make sure the next media is the starting one.
      if (changingAll) {
        this.mediaModalIndex = -1;
      } else {
        // If not, move the modal media index one space back.
        this.mediaModalIndex--;
      }

      this.onModalNextClick();
    } else {
      // Close the modal otherwise.
      this.onModalClose();
    }
  }
  /**
   * When Pinterest is selected as sharing activation, get the list of Pinterest boards.
   *
   * @param {Object} selectedAccount  The selected account to handle.
   * @param {Object} extras           The extras info to use.
   *
   * @access protected
   */
  _handlePinterestActivation(selectedAccount, extras) {
    this.pinterestBoardsList.cancelCurrentRequest()
    .then(() => {
      const promises = [];
      this.pinterestBoardsList.clearEntities();

      if (extras && extras.socialAccountId) {
        promises.push(this.pinterestBoardsList.getPinterestBoards(extras.socialAccountId));

        const [firstMedia] = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);
        if (firstMedia && firstMedia.pinterest_shares) {
          const pin = firstMedia.pinterest_shares
          .find((share) => share.pinterest_handle_id === extras.pinterestAccount);

          if (pin) {
            promises.push(this.pinterestBoardsList.getPinterestPin(pin.pinterest_pin_id, extras.socialAccountId));
          }
        }
      }

      return this.$q.all(promises);
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * When Share Link is selected as sharing activation, get the Sharing URL.
   *
   * @access protected
   */
  _handleShareLinkActivation() {
    const media = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);
    const isSharingVideo = media.some((item) => item.video_url);

    if (media.length && !isSharingVideo) {
      const mediaList = media.map((item) => ({
        media_id: item.id.toString(),
        preview_url: item.images.normal,
      }));

      this.sharing.cancelCurrentRequest()
      .then(() => this.sharing.createSharingDocument(mediaList))
      .then((response) => {
        this.sharingDocumentUrl = response.document_url;
      })
      .catch((error) => {
        this.sharingDocumentUrl = '';
        if (error) {
          this.uiMessages.notification(
            'Sorry, we couldn\'t create the share links. Please, try again.',
            { type: 'error' },
          );
        }
      });
    } else {
      this.sharing.cancelCurrentRequest()
      .then(() => {
        this.sharingDocumentUrl = '';
      });
    }
  }
  /**
   * When Tapshop is selected as sharing activation, get the Tapshop Accounts.
   *
   * @access protected
   */
  _handleTapshopActivation() {
    this.instagramBusinessAccountsList.cancelCurrentRequest()
    .then(() => this.instagramBusinessAccountsList.getInstagramBusinessAccounts())
    .catch((error) => {
      if (error) {
        this.uiMessages.notification(`There was an error: ${error.message}`, { type: 'error' });
      }
    });
  }
  /**
   * Check it the we have the given permission by asserting if the the customer has
   * any Content Granular Permissions enabled and checking if the permission is enabled in the account.
   *
   * @param {Object} permission  The permission to check.
   *
   * @return {Boolean}
   */
  _hasContentGranularPermission(permission) {
    return !this.hasAnyContentGranularPermissions ||
    !permission ||
    !!this.currentAccount.permissions[permission.name];
  }
  /**
   * Navigate to another media in the modal by the provided index change.
   *
   * @param {Number} indexChange  The delta change to move the index.
   *
   * @access protected
   */
  _navigateMediaModal(indexChange) {
    // Move the current index by the delta change.
    this.mediaModalIndex += indexChange;

    // Check if the new index is bigger than the list of entities.
    const sizeDiff = this.mediaModalIndex - this.mediaList.entities.length;
    if (sizeDiff >= 0) {
      // If it is bigger, set the index as the difference.
      this.mediaModalIndex = sizeDiff;
    } else if (this.mediaModalIndex < 0) {
      // If it is not bigger, check if the new index is negative; and if it is, add the size of entities to it.
      this.mediaModalIndex = this.mediaList.entities.length + this.mediaModalIndex;
    }

    // Get the new media for the modal from the index.
    this.mediaModal = [this.mediaList.entities[this.mediaModalIndex]];
    // Update the media selected map.
    this.mediaModalselected = {};
    this.mediaModal.forEach((item) => {
      this.mediaModalselected[item.id] = true;
    });

    this._calculateMediaStreams();
    this._refreshApprovalType();
  }
  /**
   * Execute the approve action on the media.
   * Change the status of media to approve directly if the modal is visible or
   * if there is only 1 media and with rights approved.
   * Else open the modal on the approve section.
   *
   * @param {Array} media  The media to execute the approve action on.
   *
   * @access protected
   */
  _onApproveAction(media) {
    const allMediaWithRights = media.every((entity) => entity.rights_data.status === 'GIVEN');
    const rightsTab = 'rights';

    if (allMediaWithRights) {
      const approveNextStatusMap = this.mediaList.getApproveNextStatusMapOfMedia(media);
      const statusKeys = Object.keys(approveNextStatusMap);
      const mediaChangeRequests = [];

      if (statusKeys.length > 1) {
        // If there is more than 1 approveNextStatus perform each of the moves.
        statusKeys.forEach((statusKey) => {
          const map = approveNextStatusMap[statusKey];

          mediaChangeRequests.push({
            media: map.list,
            status: map.status.id,
            successMessage: `${map.list.length} of the selected media was moved to ${map.status.section}.`,
            errorMessage: `Sorry, {mediaInError} of {mediaTotal} media could not be moved to ${map.status.section}.` +
              ' Please try again.',
          });
        });
      } else if (statusKeys.length === 1) {
        // If there is only 1 approveNextStatus perform the correct move.
        const [statusKey] = statusKeys;
        const map = approveNextStatusMap[statusKey];

        mediaChangeRequests.push({
          media: map.list,
          status: map.status.id,
          successMessage: `The selected media was moved to ${map.status.section}.`,
          errorMessage: `Sorry, {mediaInError} of {mediaTotal} media could not be moved to ${map.status.section}.` +
            ' Please try again.',
        });
      }

      this._changeMediaStatus(
        mediaChangeRequests,
        media.length,
        true,
      );
    } else if (this.isModalVisible) {
      this.selectedModalSection = this.modalSections.find((modalSection) => modalSection.id === rightsTab);
    } else {
      this.openModal(media, rightsTab);
    }
  }
  /**
   * Remove a media from the media list because it was asked for rights using the rights extension.
   *
   * @param {Object} media  The media to remove.
   *
   * @access protected
   */
  _onUpdateMediaFromRightsExtension(media) {
    const mediaId = media.id;
    const changingAll = this.mediaList.entities.length === 1;

    this.rightsStatusCount.requested++;
    this.mediaList.removeMedia(mediaId, this.query)
    .then(() => {
      this._handleMediaChange(
        [{
          media,
          successMessage: 'Rights were successfully requested for the selected media. You can find this media ' +
            'in Rights Pending.',
        }],
        { successMedia: [mediaId] },
        changingAll,
        true,
      );
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Update the map of media by approval type and the approval type that is on display in the modal.
   * We set the first approval type that has any media.
   *
   * @access protected
   */
  _refreshApprovalType() {
    // Reset the map of media by approval type.
    this.mediaByApprovalType = angular.copy(this.LIBRARY_MEDIA_BY_APPROVAL_TYPE);

    // Given each media for the modal, add it to the map by approval type.
    this.mediaModal.forEach((item) => {
      if (item.approvalInfo) {
        const mediaByApprovalType = this.mediaByApprovalType[item.approvalInfo.type];
        mediaByApprovalType.list.push(item);
        mediaByApprovalType.selected[item.id] = true;
      }
    });

    // Sort the map of media by approval type by the order property.
    const keys = Object.keys(this.mediaByApprovalType)
    .sort((oneApprovalType, otherApprovalType) => oneApprovalType.order - otherApprovalType.order);
    // Finally, set the current approval type that will be on display in the modal.
    keys.some((key) => {
      const approvalType = this.mediaByApprovalType[key];
      let found = false;

      if (approvalType.list.length) {
        this.modalApprovalType = approvalType;
        this.onRefreshApprovalTypeSelectedCount();
        found = true;
      }

      return found;
    });
  }
  /**
   * Refresh the library by fetching the aggregations and the media.
   *
   * @access protected
   */
  _refreshLibrary() {
    this.$q.all([
      this.aggregationsList.getAggregations(this.query, this.currentAccount.settings),
      this.mediaList.searchMedia(this.query),
    ])
    .then(() => {
      this.mediaList.generateApproveNextStatus(
        this.hasForReviewFlow,
        this.hasManualStreamsFlow,
      );
    })
    .then(() => (
      this.isRightsDataLoaded ?
        this.$q.resolve(true) :
        this.$q.all([
          this.rightsMessagesList.getRightsMessages(),
          this.socialAccountsList.getSocialAccounts(),
          this.socialMentionsAccountsList.getSocialMentionsAccounts(),
        ])
        .then(() => {
          this.isRightsDataLoaded = true;
          return true;
        })
        .catch((error) => this.appErrorHandler.silent(error))
    ))
    .then((shouldContinue) => {
      if (shouldContinue) {
        this.mediaList.generateApprovalInfo(this.socialMentionsAccountsList.entities);
        this._refreshApprovalType();
      }
    })
    .catch((error) => this.appErrorHandler.handle(
      error,
      'Sorry, there was a problem while loading content. Please try refreshing the page.',
    ));
  }
  /**
   * Make a request to send selected media to Facebook Ads Manager.
   *
   * @param {Object} selectedAdAccount  The selected Facebook Ad Account to share media to.
   *
   * @access protected
   */
  _sendMediaToFacebook(selectedAdAccount) {
    const media = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);

    this.mediaList.sendMediaToFacebook(media, selectedAdAccount.id)
    .then(() => {
      this.uiMessages.notification('Your media was sent to Facebook Ads Manager.', { type: 'info' });
      this.onModalClose();
    })
    .catch((error) => {
      this.uiMessages.notification(
        'Sorry, we couldn\'t send your media to Facebook Ads Manager. Please, try again. ' +
          `Error: ${error.message}`,
        { type: 'error' },
      );
    });
  }
  /**
   * Make a request to send selected media to Instagram.
   *
   * @param {Object} selectedAccount  The selected Instagram Account to share media to.
   * @param {Object} extras           The extras info to use in the share.
   *
   * @access protected
   */
  _sendMediaToInstagram(selectedAccount, extras) {
    const [media] = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);
    const { caption, scheduleTime, isSharingNow } = extras;
    const successMessage = isSharingNow ?
      'Your media will be posted to Instagram' :
      'Your media has been scheduled for posting at the selected date.';

    this.mediaList.scheduleMediaToInstagram(media, caption, scheduleTime, selectedAccount)
    .then(() => {
      this.uiMessages.notification(successMessage, { type: 'info' });
      this.onModalClose();
    })
    .catch((error) => {
      this.uiMessages.notification(
        'Sorry, we couldn\'t send your media to Instagram. Please, try again. ' +
          `Error: ${error.message}`,
        { type: 'error' },
      );
    });
  }
  /**
   * Make a request to send selected media to Pinterest.
   *
   * @param {Object} selectedAccount  The selected pinterest account to share media to.
   * @param {Object} extras           The extras info to use in the share.
   *
   * @access protected
   */
  _sendMediaToPinterest(selectedAccount, extras) {
    const media = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);
    const selectedBoard = extras.board;
    const { pin } = extras;

    this.mediaList.sendMediaToPinterest(media, selectedAccount.id, selectedBoard, pin)
    .then(() => {
      this.uiMessages.notification('Your media was sent to Pinterest.', { type: 'info' });
      this.onModalClose();
    })
    .catch((error) => {
      this.uiMessages.notification(
        'Sorry, we couldn\'t send your media to Pinterest. Please, try again. ' +
          `Error: ${error.message}`,
        { type: 'error' },
      );
    });
  }
  /**
   * Make a request to send selected media to Tapshop.
   *
   * @param {Object} selectedAccount  The selected Tapshop Account to share media to.
   * @param {Object} extras           The extras info to use in the share.
   *
   * @access protected
   */
  _sendMediaToTapshop(selectedAccount, extras) {
    const [media] = this.mediaModal.filter((item) => this.mediaModalselected[item.id]);
    const {
      caption,
      scheduleTime,
      shoppableLink,
      isSharingNow,
    } = extras;

    const successMessage = isSharingNow ?
      'Your media will be posted to Tapshop' :
      'Your media has been scheduled for posting at the selected date.';

    this.mediaList.scheduleMediaToTapshop(media, caption, scheduleTime, selectedAccount, shoppableLink)
    .then(() => {
      this.uiMessages.notification(successMessage, { type: 'info' });
      this.onModalClose();
    })
    .catch((error) => {
      this.uiMessages.notification(
        'Sorry, we couldn\'t send your media to Tapshop. Please, try again. ' +
          `Error: ${error.message}`,
        { type: 'error' },
      );
    });
  }
  /**
   * Show a notification informing the user that he/she does not have permission execute that action.
   *
   * @param {String} action  The action to display.
   */
  _showNoContentGranularPermissionEnabled(action) {
    this.uiMessages.notification(
      `Sorry, you don’t have permission to ${action}. Contact your brand admin or account manager.`,
      { type: 'error' },
    );
  }
  /**
   * It will start the media download action, displaying a confirmation modal if it's required.
   *
   * @param {Array} media  The list of media to download.
   *
   * @access protected
   */
  _startMediaDownload(media) {
    const mediaToDownload = media.filter((item) => (
      item.rights_data.status === 'GIVEN' &&
      item.source.name !== 'youtube'
    ));
    const hasMediaWithoutRights = media.some((item) => item.rights_data.status !== 'GIVEN');

    if (mediaToDownload.length > 0) {
      const isMediaFiltered = media.length > mediaToDownload.length;
      const imageDownloadCount = mediaToDownload.filter((item) => !item.video_url).length;
      const videoDownloadCount = mediaToDownload.length - imageDownloadCount;
      const mediaSizeMaxValue = imageDownloadCount + (videoDownloadCount * this.downloadableMediaVideoPhotoRatio);
      const showWaitWarning = mediaSizeMaxValue >= this.downloadableMediaWarningMaxValue;
      /**
       * We are using a promise to wait for the confirmation response (in case it is displayed).
       * And this promise resolves to true so that if the confirmation is not shown
       * we are calling the downloadMedia method.
       */
      let promise = this.$q.resolve(true);

      if (isMediaFiltered || showWaitWarning) {
        const template = `
          <download-confirmation
            has-media-from-youtube="$ctrl.hasMediaFromYoutube"
            has-media-without-rights="$ctrl.hasMediaWithoutRights"
            is-media-filtered="$ctrl.isMediaFiltered"
            media-to-download="$ctrl.mediaToDownload"
            show-wait-warning="$ctrl.showWaitWarning"
            total-media="$ctrl.totalMedia"
          ></download-confirmation>
        `;
        promise = promise.then(() => this.uiMessages.confirmation(
          'Download Media',
          template,
          {
            confirmText: 'Download',
            template: true,
            context: {
              hasMediaFromYoutube: media.some((item) => item.source.name === 'youtube'),
              hasMediaWithoutRights,
              isMediaFiltered,
              mediaToDownload: mediaToDownload.length,
              showWaitWarning,
              totalMedia: media.length,
            },
          },
        ));
      }

      promise.then((confirm) => confirm && this._downloadMedia(mediaToDownload));
    } else {
      const message = hasMediaWithoutRights ?
        'Sorry, only rights approved media can be downloaded.' :
        'Sorry, YouTube videos can not be downloaded.';
      this.uiMessages.notification(message, { type: 'error' });
    }
  }
}

/**
 * @ngdoc component
 * @name libraryContainer
 * @description
 * The library container.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {LibraryContainer}
   */
  controller: LibraryContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      class="odsSmallIndicator -fullScreen"
      ng-class="{ '-fixed': $ctrl.isModalVisible }"
      ng-if="$ctrl.isLoading()"
    ></div>
    <library
      actions="$ctrl.actions"
      active-filters-exist="$ctrl.aggregationsList.activeFiltersExist"
      aggregations="$ctrl.aggregationsList.entities"
      all-sorts="$ctrl.sortList"
      edit-status-map="$ctrl.editStatusMap"
      filters-loading="$ctrl.aggregationsList.loading"
      filters-phrase="$ctrl.aggregationsList.filtersPhrase"
      loading="$ctrl.mediaList.loading"
      media="$ctrl.mediaList.entities"
      media-count="$ctrl.mediaList.entities.length"
      number-of-sections-before-dropdown="$ctrl.numberOfSectionsBeforeDropdown"
      pagination="$ctrl.mediaList.pagination"
      query="$ctrl.query"
      sections="$ctrl.sections"
      selected-media-count="$ctrl.mediaList.selectedMedia"
      selected-section="$ctrl.selectedSection"
      suggestions="$ctrl.suggestionsList.entities"
      suggestions-loading="$ctrl.suggestionsList.loading"
      on-action-click="$ctrl.onActionClick(action, item || $ctrl.mediaList.getSelectedMedia())"
      on-action-disable-check="$ctrl.onActionDisableCheck(action)"
      on-action-visibility-check="$ctrl.onActionVisibilityCheck(component, action, location)"
      on-add-suggestion-filter="$ctrl.onAddSuggestionFilter(suggestion, group)"
      on-bulk-selection-toggle="$ctrl.onBulkSelectionToggle(selectAll)"
      on-clear-suggestions="$ctrl.onClearSuggestions()"
      on-filter-change="$ctrl.onFilterChange(aggregation, filter)"
      on-filter-date-range-change="$ctrl.onFilterDateRangeChange(from, to)"
      on-media-selected="$ctrl.onMediaSelected()",
      on-open-modal="$ctrl.openModal(media, modalSectionId)"
      on-pagination-next-click="$ctrl.onPaginationNextClick()"
      on-pagination-previous-click="$ctrl.onPaginationPreviousClick()"
      on-query-change="$ctrl.onQueryChange(query, filtersToApply)"
      on-search-suggestions="$ctrl.onSearchSuggestions(search)"
      on-section-change="$ctrl.onSectionChange(section)"
    ></library>
    <ods-modal
      show-navigation="$ctrl.isNavigationVisible()"
      on-close="$ctrl.onModalClose()"
      on-next-click="$ctrl.onModalNextClick()"
      on-previous-click="$ctrl.onModalPreviousClick()"
      ng-if="$ctrl.isModalVisible"
    >
      <media-modal
        media-image-size="normal"
        actions="$ctrl.actions"
        approval-type="$ctrl.modalApprovalType"
        approval-type-selected-count="$ctrl.modalApprovalTypeSelectedCountMap.total"
        edit-status-map="$ctrl.editStatusMap"
        is-bulk="$ctrl.isModalBulk"
        is-rights-data-loaded="$ctrl.isRightsDataLoaded"
        media="$ctrl.mediaModal"
        media-by-approval-type="$ctrl.mediaByApprovalType"
        sections="$ctrl.modalSections"
        selected-media="$ctrl.mediaModalselected"
        selected-media-count="$ctrl.mediaModalSelectedCount"
        selected-section="$ctrl.selectedModalSection"
        show-actions="$ctrl.areModalActionsVisible"
        on-action-click="$ctrl.onModalActionClick(action)"
        on-action-disable-check="$ctrl.onActionDisableCheck(action)"
        on-action-visibility-check="$ctrl.onActionVisibilityCheck('modal', action, location)"
        on-media-selected-change="$ctrl.onModalMediaSelectedChange(media, isSelected)"
        on-refresh-approval-type-selected-count="$ctrl.onRefreshApprovalTypeSelectedCount()"
        on-section-change="$ctrl.onModalSectionChange(section)"
        on-section-visibility-check="$ctrl.onModalSectionVisibilityCheck(section)"
        ng-if="!$ctrl.isEditModalVisible"
        ng-switch="$ctrl.selectedModalSection.id"
      >
        <media-info-modal
          has-automatic-keywords="$ctrl.hasAutomaticKeywords"
          has-keywords-enabled="$ctrl.hasKeywordsEnabled"
          has-keywords-action-enabled="$ctrl.hasKeywordsActionEnabled"
          is-bulk="$ctrl.isModalBulk"
          media="$ctrl.mediaModal"
          on-add-keyword="$ctrl.onSaveMediaKeyword(media, keyword, true)"
          on-remove-keyword="$ctrl.onSaveMediaKeyword(media, keyword, false)"
          on-search-for-keywords="$ctrl.onSearchForKeywords(search)"
          ng-switch-when="info"
        ></media-info-modal>
        <media-tagging-modal
          exist-more-streams="!$ctrl.streamsList.loading && $ctrl.streamsList.pagination.next"
          has-tagging-action-enabled="$ctrl.hasTaggingActionEnabled"
          media="$ctrl.mediaModal"
          media-selected-count="$ctrl.mediaModalSelectedCount"
          streams="$ctrl.mediaModalStreams"
          on-change-streams-positions="$ctrl.onChangeStreamsPositions(streams)"
          on-error="$ctrl.appErrorHandler.silent(error)"
          on-load-more-streams="$ctrl.onLoadMoreStreams()"
          on-remove-stream="$ctrl.onRemoveStream(streamId)"
          on-search-for-streams="$ctrl.onSearchForStreams(text)"
          on-tag-streams="$ctrl.onTagStreams(streams)"
          on-toggle-modal-actions="$ctrl.onToggleModalActions(visible)"
          ng-switch-when="tagToStream"
        ></media-tagging-modal>
        <media-rights-modal
          pii-consent-stream="{{ $ctrl.rightsPIIConsentStream }}"
          rights-extension-id="{{ $ctrl.rightsExtensionId }}"
          approval-type="$ctrl.modalApprovalType"
          approval-type-selected-count-map="$ctrl.modalApprovalTypeSelectedCountMap"
          has-approve-action-enabled="$ctrl.hasApproveActionEnabled"
          has-for-review-flow="$ctrl.hasForReviewFlow"
          instagram-profile="$ctrl.rightsExtension.instagramProfile"
          is-bulk="$ctrl.isModalBulk"
          is-extension-installed="$ctrl.rightsExtension.isInstalled"
          is-extension-up-to-date="$ctrl.rightsExtension.isUpToDate"
          loading="$ctrl.areRightsLoading()"
          media="$ctrl.mediaModal"
          media-by-approval-type="$ctrl.mediaByApprovalType"
          rights-max-chars="$ctrl.rightsMaxChars"
          rights-messages="$ctrl.rightsMessagesList.entities"
          rights-status-count="$ctrl.rightsStatusCount"
          selected-section="$ctrl.selectedSection"
          show-modal-approve-button="$ctrl.showModalApproveButton"
          social-accounts="$ctrl.socialAccountsList.socialAccountsByNetwork"
          social-mentions-accounts="$ctrl.socialMentionsAccountsList.entities"
          on-action-click="$ctrl.onModalActionClick(action)"
          on-go-to-rights-messages="$ctrl.onGoToRightsMessages()"
          on-go-to-social-accounts="$ctrl.onGoToSocialAccounts()"
          on-open-rights-extension="$ctrl.openRightsExtension(selectedRightsMessageGroup)"
          on-send-rights-request="$ctrl.onSendRightsRequest(rightsRequest)"
          on-toggle-modal-actions="$ctrl.onToggleModalActions(visible)"
          on-validate-rights-message="$ctrl.rightsMessagesList.validateRightsMessage(rightsMessage)"
          ng-switch-when="rights"
        ></media-rights-modal>
        <media-sharing-modal
          activations="$ctrl.shareModalActivations"
          facebook-ads-accounts="$ctrl.facebookAdsAccountsList.entities"
          facebook-ads-accounts-error="$ctrl.facebookAdsAccountsList.facebookAdsAccountError"
          instagram-business-accounts="$ctrl.instagramBusinessAccountsList.entities"
          instagram-business-accounts-error="$ctrl.instagramBusinessAccountsList.instagramBusinessAccountsError"
          is-loading-options="$ctrl.isLoadingSharingOptions()"
          media="$ctrl.mediaModal"
          pinterest-boards="$ctrl.pinterestBoardsList.entities"
          pinterest-pin="$ctrl.pinterestBoardsList.pinDetails"
          sharing-url="$ctrl.sharingDocumentUrl"
          selected-media="$ctrl.mediaModalselected"
          selected-media-count="$ctrl.mediaModalSelectedCount"
          social-accounts="$ctrl.socialAccountsList.socialAccountsByNetwork"
          streams="$ctrl.mediaModalStreams"
          tapshop-accounts="$ctrl.instagramBusinessAccountsList.tapshopAccounts"
          on-activation-selected="$ctrl.onActivationSelected(selectedActivation, null, extras)"
          on-activation-visibility-check="$ctrl.onActivationVisibilityCheck(activation)"
          on-share="$ctrl.onActivationSelected(selectedActivation, selectedAccount, extras)"
          on-toggle-modal-actions="$ctrl.onToggleModalActions(visible)"
          ng-switch-when="share"
        ></media-sharing-modal>
      </media-modal>
      <media-editor-modal
        edit-status-map="$ctrl.editStatusMap"
        media-image-size="originalCE"
        media="$ctrl.mediaModal"
        on-save="$ctrl.onSaveEditedMedia(editData)"
        on-cancel="$ctrl.onEditModalClose()"
        ng-if="$ctrl.isEditModalVisible"
      ></media-editor-modal>
    </ods-modal>
  `,
};
