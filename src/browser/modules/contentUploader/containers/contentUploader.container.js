/**
 * @ngdoc controller
 * @name ContentUploaderContainer
 * @description
 * This container displays the content uploader section.
 *
 * @memberof contentUploader
 */
class ContentUploaderContainer {
  /**
   * @param {$q}                   $q                    To wait for several promises with the all method.
   * @param {AppErrorHandler}      appErrorHandler       To display any error.
   * @param {AppSession}           appSession            To get the current account.
   * @param {Object}               keywordsList          To search for keywords suggestions.
   * @param {Object}               mediaList             To upload media.
   * @param {Object}               streamsList           To search for streams.
   * @param {UIMessages}           uiMessages            To display the UI messages.
   * @param {UploaderAPI}          uploaderAPI           To upload media to S3.
   * @param {Object}               usersList             To create users.
   */
  constructor(
    $q,
    appErrorHandler,
    appSession,
    keywordsList,
    mediaList,
    streamsList,
    uiMessages,
    uploaderAPI,
    usersList,
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
     * The local reference to the `appSession` service.
     *
     * @type {appSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `keywordsList` service.
     *
     * @type {KeywordsList}
     */
    this.keywordsList = keywordsList.getNewInstance();
    /**
     * The local reference to the `mediaList` service.
     *
     * @type {MediaList}
     */
    this.mediaList = mediaList.getNewInstance();
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
     * The local reference to the `uploaderAPI` service.
     *
     * @type {UploaderAPI}
     */
    this.uploaderAPI = uploaderAPI;
    /**
     * The local reference to the `usersList` service.
     *
     * @type {UsersList}
     */
    this.usersList = usersList.getNewInstance();
    /**
     * Whether the modal for editing media is visible or not.
     *
     * @type {Boolean}
     */
    this.isEditModalVisible = false;
    /**
     * Whether the modal for bulk editing media is visible or not.
     *
     * @type {Boolean}
     */
    this.isBulkModalVisible = false;
    /**
     * The media to be uploaded.
     *
     * @type {Array}
     */
    this.media = [];
    /**
     * The list of keywords to be assigned to the media.
     *
     * @type {Array}
     */
    this.keywords = [];
    /**
     * The media that the modal is displaying.
     *
     * @type {Object}
     */
    this.modalMedia = {};
    /**
     * The list of accepted media types.
     *
     * @type {Array}
     */
    this.mediaTypes = [
      'image/jpeg',
      'image/png',
    ];
    /**
     * The list of streams to be assigned to the media.
     *
     * @type {Array}
     */
    this.streams = [];
    /**
     * The amount of media that has been uploaded in this session.
     *
     * @type {Object}
     */
    this.uploadedMedia = {
      amount: 0,
      successMessage: '',
    };
    /**
     * The current account that is logged in.
     *
     * @type {Object}
     */
    this.currentAccount = {};
    /**
     * The user used to upload the media.
     *
     * @type {Object}
     */
    this.user = {
      id: 0,
      name: '',
    };
    /**
     * The selected modal section.
     *
     * @type {String}
     */
    this.selectedModalSection = 'edit';
    /**
     * Flag to know if the customer has moderation services active or not.
     *
     * @type {Boolean}
     */
    this.hasModerationServices = false;
    /**
     * Flag to know if the media is going through premoderation.
     *
     * @type {Boolean}
     */
    this.skipModerationServices = true;
  }
  /**
   * Get the current account.
   */
  $onInit() {
    this.currentAccount = this.appSession.getSession().account;
    this.hasModerationServices = this.currentAccount.settings.premoderation;
    this.user.id = this.currentAccount.user_id;
    this.user.name = this.currentAccount.name;
  }
  /**
   * Check if we should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoading() {
    return this.uploaderAPI.loading ||
      this.mediaList.loading ||
      this.usersList.loading;
  }
  /**
   * Close the bulk editing modal.
   */
  onBulkModalClose() {
    this.isBulkModalVisible = false;
  }
  /**
   * Change the position of the streams.
   *
   * @param {Array} streams  The streams to save the position of.
   */
  onChangeStreamsPositions(streams) {
    this.streams = streams;
  }
  /**
   * Close the media editing modal.
   */
  onEditModalClose() {
    this.isEditModalVisible = false;
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
   * Refreshes the array when a new set of media is selected or dropped in the Uploader.
   *
   * @param {Array} media  The list of media to add.
   */
  onMediaAdd(media) {
    const newMedia = this._filter(media);
    this.media = this.media.concat(newMedia);
  }
  /**
   * Removes an element from the array of media to be uploaded.
   *
   * @param {Object} media  The media to delete.
   */
  onMediaDelete(media) {
    this.media = this.media.filter((item) => item.name !== media.name);
  }
  /**
   * Updates the caption of the media shown in the edit modal.
   *
   * @param {String} caption  The media to be updated.
   */
  onMediaEdit(caption) {
    const [mediaToEdit] = this.media.filter((item) => this.modalMedia.name === item.name);

    if (mediaToEdit) {
      mediaToEdit.caption = caption;
    }

    this.onEditModalClose();
  }
  /**
   * Perform a request to upload the media.
   *
   * @return {Promise}
   */
  onMediaUpload() {
    const promises = [
      this.uploaderAPI.uploadFiles(this.media),
      this._getUserId(),
    ];

    return this.$q.all(promises)
    .then(([urlList, userId]) => this._uploadMedia(urlList, userId))
    .then(() => this._showSuccessfulUpload())
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * When a new modal section is selected, set is as selected.
   *
   * @param {String} section  The modal section to set as selected.
   */
  onModalSectionChange(section = 'edit') {
    this.selectedModalSection = section;
  }
  /**
   * Removes an item from the array of streams.
   *
   * @param {Array} streamId  The id of the stream to be removed.
   */
  onRemoveStream(streamId) {
    this.streams = this.streams.filter((item) => item.id !== streamId);
    this.uiMessages.notification('The selected stream was removed.');
  }
  /**
   * Add or remove a keyword to the media.
   *
   * @param {Object}  keyword   The keyword to add or remove.
   * @param {Boolean} isAdding  If we are adding or removing a keyword.
   *
   * @return {Promise}
   */
  onSaveMediaKeyword(keyword, isAdding) {
    const index = this.keywords.findIndex((item) => item.name === keyword);

    if (isAdding && index < 0) {
      this.keywords.push({ name: keyword });
    } else if (!isAdding && index > -1) {
      this.keywords.splice(index, 1);
    }

    const action = isAdding ? 'added' : 'removed';
    this.uiMessages.notification(`The selected keyword was ${action}.`);

    // The component is expecting a promise as a return, so return a resolved one.
    return this.$q.resolve();
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
   * Updates the array of streams to be assigned to the media.
   *
   * @param {Array} newStreams  The streams to be added.
   */
  onTagStreams(newStreams) {
    const streamsToAdd = newStreams.filter((stream) => !this.streams.find((item) => stream.id === item.id));
    this.streams = this.streams.concat(streamsToAdd);
    this.uiMessages.notification('The selected media was tagged.');
  }
  /**
   * Changes the state of the flag that tells if the media is going through premoderation or not.
   */
  onToggleModerationServices() {
    this.skipModerationServices = !this.skipModerationServices;
  }
  /**
   * Updates the username used to upload the media.
   *
   * @param {String} username  The username to be updated.
   */
  onUserEdit(username) {
    this.user.id = 0;
    this.user.name = username;
    this.uiMessages.notification('The username was edited.');
  }
  /**
   * Open the modal with the given media.
   *
   * @param {Array}  media    The media to display in the modal.
   * @param {String} section  The modal section to display.
   */
  openModal(media, section) {
    if (media) {
      this.modalMedia = media;
      this.isEditModalVisible = true;
    } else {
      this.isBulkModalVisible = true;
    }

    this.onModalSectionChange(section);
  }
  /**
   * Compares the new set of media with the current one to check if there is any duplicates and removes any file with an
   * unsupported mimetype.
   *
   * @param {Array} media  The media to be filtered.
   *
   * @return {Array}
   *
   * @access protected
   */
  _filter(media) {
    return media.filter((newMedia) => (
      this.mediaTypes.includes(newMedia.type) &&
      !this.media.find((item) => (newMedia.name === item.name && newMedia.type === item.type))
    ));
  }
  /**
   * Get the user id that we have to use in the upload.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _getUserId() {
    const username = this.user.name.startsWith('@') ?
      this.user.name.substring(1) :
      this.user.name;

    return this.user.id ?
      this.$q.resolve(this.user.id) :
      this.usersList.createUser({
        email: `${username}@contentuploader.com`,
        screenName: username,
      }).then((user) => {
        const userId = user.id;

        this.user.id = userId;
        return userId;
      });
  }
  /**
   * Update the variables to show a successful upload.
   *
   * @access protected
   */
  _showSuccessfulUpload() {
    const connector = this.media.length > 1 ? 'were' : 'was';
    const content = this.skipModerationServices ?
      '. You can find it in New Content by source Hard Drive.' :
      ' and sent to Moderation Services.';
    this.uploadedMedia = {
      amount: this.media.length,
      successMessage: `media ${connector} uploaded${content}`,
    };
    this.media = [];
    this.keywords = [];
  }
  /**
   * Perform a request to upload the media.
   *
   * @param {Array}  urlList  The list of urls to be uploaded.
   * @param {Number} userId   The user id to link to the media.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _uploadMedia(urlList, userId) {
    return this.mediaList.uploadMedia(
      urlList.map((url, index) => ({
        content_url: url,
        caption: this.media[index].caption || '',
        reference_id: null,
        latitude: null,
        longitude: null,
      })),
      this.streams.map((stream) => stream.id),
      this.keywords.map((keyword) => keyword.name),
      userId,
      this.skipModerationServices,
    );
  }
}

/**
 * @ngdoc component
 * @name contentUploaderContainer
 * @description
 * The content uploader container.
 *
 * @memberof contentUploader
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {ContentUploaderContainer}
   */
  controller: ContentUploaderContainer,
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
    <content-uploader
      has-moderation-services="$ctrl.hasModerationServices"
      media="$ctrl.media"
      media-types="$ctrl.mediaTypes"
      skip-moderation-services="$ctrl.skipModerationServices"
      uploaded-media="$ctrl.uploadedMedia"
      user="$ctrl.user"
      on-media-add="$ctrl.onMediaAdd(media)"
      on-media-delete="$ctrl.onMediaDelete(media)"
      on-media-upload="$ctrl.onMediaUpload()"
      on-modal-open="$ctrl.openModal(media, section)"
      on-moderation-checkbox-toggle="$ctrl.onToggleModerationServices()"
    ></content-uploader>
    <ods-modal
      size="medium"
      on-close="$ctrl.onEditModalClose()"
      ng-if="$ctrl.isEditModalVisible"
    >
      <edit-modal
        media="$ctrl.modalMedia"
        on-media-save="$ctrl.onMediaEdit(caption)"
        on-modal-close="$ctrl.onEditModalClose()"
      ></edit-modal>
    </ods-modal>
    <ods-modal
      on-close="$ctrl.onBulkModalClose()"
      ng-if="$ctrl.isBulkModalVisible"
    >
      <bulk-modal
        exist-more-streams="!$ctrl.streamsList.loading && $ctrl.streamsList.pagination.next"
        keywords="$ctrl.keywords"
        media="$ctrl.media"
        selected-section="$ctrl.selectedModalSection"
        streams="$ctrl.streams"
        user="$ctrl.user"
        on-add-keyword="$ctrl.onSaveMediaKeyword(keyword, true)"
        on-change-streams-positions="$ctrl.onChangeStreamsPositions(streams)"
        on-error="$ctrl.appErrorHandler.silent(error)"
        on-load-more-streams="$ctrl.onLoadMoreStreams()"
        on-remove-keyword="$ctrl.onSaveMediaKeyword(keyword, false)"
        on-remove-stream="$ctrl.onRemoveStream(streamId)"
        on-search-for-keywords="$ctrl.onSearchForKeywords(search)"
        on-search-for-streams="$ctrl.onSearchForStreams(text)"
        on-section-change="$ctrl.onModalSectionChange(section)"
        on-tag-streams="$ctrl.onTagStreams(newStreams)"
        on-user-save="$ctrl.onUserEdit(username)"
      ></bulk-modal>
    </ods-modal>
  `,
};
