import template from './mediaSharingTapshop.html';
import './mediaSharingTapshop.scss';

/**
 * @ngdoc controller
 * @name MediaSharingTapshop
 * @description
 * This component renders the media sharing tapshop.
 *
 * @memberof library
 */
class MediaSharingTapshop {
  /**
   * @param {Moment} moment  To format the schedule times.
   */
  constructor(moment) {
    'ngInject';

    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
    /**
     * The original media caption.
     *
     * @type {String}
     */
    this.originalCaption = '';
    /**
     * The edited media caption.
     *
     * @type {String}
     */
    this.editedCaption = '';
    /**
     * The shoppable link to share.
     *
     * @type {String}
     */
    this.shoppableLink = '';
    /**
     * The edited custom link to share.
     *
     * @type {String}
     */
    this.customLink = '';
    /**
     * The error message to show when an error occurred getting Tapshop Accounts.
     *
     * @type {?String}
     */
    this.tapshopAccountsErrorMessage = null;
    /**
     * The map of Tapshop Accounts errors that can be displayed.
     *
     * @type {Object}
     * @access protected
     */
    this.tapshopAccountsErrorsTypes = {
      empty: 'empty',
      isBulk: 'isBulk',
      isVideo: 'isVideo',
      noMediaSelected: 'noMediaSelected',
    };
    /**
     * Flag to know if the caption is expanded or collapsed.
     *
     * @type {Boolean}
     */
    this.isCaptionExpanded = false;
    /**
     * The selected Tapshop Account.
     *
     * @type {?Object}
     */
    this.selectedTapshopAccount = null;
    /**
     * Flag that indicates if the scheduler modal is being displayed or not.
     *
     * @type {Boolean}
     */
    this.isSchedulerModalVisible = false;
    /**
     * The caption maxlength.
     *
     * @type {Number}
     */
    this.captionMaxlength = 2200;
  }
  /**
   * Each time the tapshopAccounts or selectedMedia bindings changes,
   * check the publishing state in order to generate the correct error messages.
   * Each time the streams bindings changes, update the shoppableLink with the
   * first existent product_url of the streams.
   *
   * @param {Object} changes                  The binding changes.
   * @param {Object} changes.tapshopAccounts  The tapshopAccounts change object.
   * @param {Object} changes.selectedMedia    The selectedMedia change object.
   * @param {Object} changes.streams          The streams change object.
   */
  $onChanges({
    tapshopAccounts,
    selectedMedia,
    streams,
  }) {
    if (tapshopAccounts) {
      this._checkPublishingState();
    }

    if (selectedMedia && selectedMedia.currentValue) {
      this._checkPublishingState();
      const [firstSelectedMedia] = this._getSelectedMedia();
      this.mediaCaption = firstSelectedMedia ? firstSelectedMedia.caption : '';
    }

    if (streams && streams.currentValue) {
      const [firstStream] = this.streams.filter((item) => item.product_url);
      this.shoppableLink = firstStream ? firstStream.product_url : '';
    }
  }
  /**
   * Check if the publishing is enabled or not depending on business restrictions.
   *
   * @return {Boolean}
   */
  checkPublishConditions() {
    return !this.selectedTapshopAccount ||
      (!this.shoppableLink && !this.customLink);
  }
  /**
   * When cancel is clicked, turn off the Editing Caption mode and set the edited caption as originally.
   */
  onCancelEditCaption() {
    this.onResetCaption();
    this.onToggleEditCaption();
  }
  /**
   * When reset caption button is clicked, reset the caption to one of the first media.
   */
  onResetCaption() {
    const [firstSelectedMedia] = this._getSelectedMedia();
    this.originalCaption = firstSelectedMedia ? firstSelectedMedia.caption : '';
    this.editedCaption = this.originalCaption;
  }
  /**
   * Close the scheduler modal.
   */
  onSchedulerModalClose() {
    this.isSchedulerModalVisible = false;
  }
  /**
   * Open the scheduler modal.
   */
  onSchedulerModalOpen() {
    this.isSchedulerModalVisible = true;
  }
  /**
   * When a Tapshop Account is selected, set it as selected.
   *
   * @param {Object} selectedTapshopAccount  The selected tapshop account.
   */
  onSelectedTapshopAccount(selectedTapshopAccount) {
    this.selectedTapshopAccount = selectedTapshopAccount;
  }
  /**
   * Expand or collapse the caption.
   */
  onToggleCaptionExpanded() {
    this.isCaptionExpanded = !this.isCaptionExpanded;
  }
  /**
   * Toggle between editing caption mode on or off.
   */
  onToggleEditCaption() {
    this.isEditingCaption = !this.isEditingCaption;
  }
  /**
   * Check if the publishing is enabled or not depending on business restrictions.
   *
   * @access protected
   */
  _checkPublishingState() {
    if (!this.tapshopAccounts.length) {
      this.tapshopAccountsErrorMessage = this.tapshopAccountsErrorsTypes.empty;
    } else if (!this.selectedMediaCount) {
      this.tapshopAccountsErrorMessage = this.tapshopAccountsErrorsTypes.noMediaSelected;
    } else if (this.selectedMediaCount > 1) {
      this.tapshopAccountsErrorMessage = this.tapshopAccountsErrorsTypes.isBulk;
    } else if (this._isSharingVideo()) {
      this.tapshopAccountsErrorMessage = this.tapshopAccountsErrorsTypes.isVideo;
    } else {
      this.tapshopAccountsErrorMessage = null;
    }
  }
  /**
   * Get the selected media to be shared.
   *
   * @return {Array}
   *
   * @access protected
   */
  _getSelectedMedia() {
    return this.media.filter((item) => this.selectedMedia[item.id]);
  }
  /**
   * Check if any of the selected media to be shared is a video.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _isSharingVideo() {
    return this._getSelectedMedia().some((item) => item.video_url);
  }
  /**
   * Prepare the data and execute the callback to schedule media to Tapshop.
   *
   * @param {Date} scheduleDate  The selected scheduleDate from the scheduler modal.
   *
   * @access protected
   */
  _onShare(scheduleDate) {
    const caption = this.editedCaption || this.originalCaption;
    const scheduleTime = scheduleDate || this.moment().utc();
    const isSharingNow = !scheduleDate;
    this.shoppableLink = this.customLink ? this.customLink : this.shoppableLink;

    this.onShare({
      selectedAccount: this.selectedTapshopAccount,
      extras: {
        caption,
        scheduleTime,
        shoppableLink: this.shoppableLink,
        isSharingNow,
      },
    });
  }
}

/**
 * @ngdoc component
 * @name mediaSharingTapshop
 * @description
 * The media sharing tapshop component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaSharingTapshop}
   */
  controller: MediaSharingTapshop,
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
   * @property {String}   helpUrl                   The help URL to link the Help button.
   * @property {Boolean}  isLoadingTapshopAccounts  Flag to indicate if Tapshop Accounts are loading.
   * @property {Array}    media                     The list of media.
   * @property {Object}   selectedMedia             The map of selected media.
   * @property {Number}   selectedMediaCount        The count of selected media.
   * @property {Array}    streams                   The list of tagged streams.
   * @property {Array}    tapshopAccounts           The list of tapshop accounts.
   * @property {Function} onShare                   Callback for when the Share is done.
   */
  bindings: {
    helpUrl: '<',
    isLoadingTapshopAccounts: '<',
    media: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    streams: '<',
    tapshopAccounts: '<',
    onShare: '&',
  },
};
