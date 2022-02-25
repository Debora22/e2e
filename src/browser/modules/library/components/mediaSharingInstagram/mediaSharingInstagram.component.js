import template from './mediaSharingInstagram.html';
import './mediaSharingInstagram.scss';

/**
 * @ngdoc controller
 * @name MediaSharingInstagram
 * @description
 * This component renders the media sharing instagram.
 *
 * @memberof library
 */
class MediaSharingInstagram {
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
     * The error message to show when an error occurred getting Instagram Accounts.
     *
     * @type {?String}
     */
    this.instagramBusinessAccountsErrorMessage = null;
    /**
     * The map of Instagram Business Accounts errors that can be displayed.
     *
     * @type {Object}
     */
    this.instagramBusinessAccountsErrorsTypes = {
      empty: 'empty',
      errorGetting: 'errorGetting',
      isBulk: 'isBulk',
      isVideo: 'isVideo',
      noMediaSelected: 'noMediaSelected',
      preconditionFailed: 412,
    };
    /**
     * Flag to know if the caption is expanded or collapsed.
     *
     * @type {Boolean}
     */
    this.isCaptionExpanded = false;
    /**
     * Flag to evaluate if the media caption is being edited or not.
     *
     * @type {Boolean}
     */
    this.isEditingCaption = false;
    /**
     * The selected Instagram Account.
     *
     * @type {?Object}
     */
    this.selectedInstagramAccount = null;
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
   * Each time the instagramBusinessAccounts or selectedMedia bindings changes,
   * check the publishing state in order to generate the correct error messages.
   *
   * @param {Object} changes                            The binding changes.
   * @param {Object} changes.instagramBusinessAccounts  The instagramBusinessAccounts change object.
   * @param {Object} changes.selectedMedia              The selectedMedia change object.
   */
  $onChanges({
    instagramBusinessAccounts,
    selectedMedia,
  }) {
    if (instagramBusinessAccounts) {
      this._checkPublishingState();
    }

    if (selectedMedia && selectedMedia.currentValue) {
      this.onResetCaption();
      this._checkPublishingState();
    }
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
   * When an Instagram Account is selected, set it as selected.
   *
   * @param {Object} selectedInstagramAccount  The selected ad account.
   */
  onSelectedInstagramAccount(selectedInstagramAccount) {
    this.selectedInstagramAccount = selectedInstagramAccount;
  }
  /**
   * Expand or collapse the caption.
   * If we are collpasing the caption we need to reset the scroll top of the container.
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
    if (!this.instagramBusinessAccounts) {
      if (this.instagramBusinessAccountsError.status === this.instagramBusinessAccountsErrorsTypes.preconditionFailed) {
        this.instagramBusinessAccountsErrorMessage = this.instagramBusinessAccountsErrorsTypes.preconditionFailed;
      } else {
        this.instagramBusinessAccountsErrorMessage = this.instagramBusinessAccountsErrorsTypes.errorGetting;
      }
    } else if (!this.instagramBusinessAccounts.length) {
      this.instagramBusinessAccountsErrorMessage = this.instagramBusinessAccountsErrorsTypes.empty;
    } else if (!this.selectedMediaCount) {
      this.instagramBusinessAccountsErrorMessage = this.instagramBusinessAccountsErrorsTypes.noMediaSelected;
    } else if (this.selectedMediaCount > 1) {
      this.instagramBusinessAccountsErrorMessage = this.instagramBusinessAccountsErrorsTypes.isBulk;
    } else if (this._isSharingVideo()) {
      this.instagramBusinessAccountsErrorMessage = this.instagramBusinessAccountsErrorsTypes.isVideo;
    } else {
      this.instagramBusinessAccountsErrorMessage = null;
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
   * Prepare the data and execute the callback to send media to Instagram.
   *
   * @param {Date} scheduleDate  The selected scheduleDate from the scheduler modal.
   *
   * @access protected
   */
  _onShare(scheduleDate) {
    const caption = this.editedCaption || this.originalCaption;
    const scheduleTime = scheduleDate || this.moment().utc();
    const isSharingNow = !scheduleDate;

    this.onShare({
      selectedAccount: this.selectedInstagramAccount,
      extras: {
        caption,
        scheduleTime,
        isSharingNow,
      },
    });
  }
}

/**
 * @ngdoc component
 * @name mediaSharingInstagram
 * @description
 * The media sharing instagram component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaSharingInstagram}
   */
  controller: MediaSharingInstagram,
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
   * @property {String}   facebookUsername                The Facebook account Username.
   * @property {String}   helpUrl                         The help URL to link the Help button.
   * @property {Boolean}  isLoadingInstagramAccounts      Flag to indicate if Instagram Business Accounts are loading.
   * @property {Array}    instagramBusinessAccounts       The Instagram Business Accounts.
   * @property {Object}   instagramBusinessAccountsError  The error if any occurs getting the Instagram Accounts.
   * @property {Array}    media                           The list of media.
   * @property {Object}   selectedMedia                   The map of selected media.
   * @property {Number}   selectedMediaCount              The count of selected media.
   * @property {Function} onShare                         Callback for when the Share is done.
   */
  bindings: {
    facebookUsername: '<',
    helpUrl: '<',
    isLoadingInstagramAccounts: '<',
    instagramBusinessAccounts: '<',
    instagramBusinessAccountsError: '<',
    media: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    onShare: '&',
  },
};
