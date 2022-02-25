import template from './mediaSharingPinterest.html';
import './mediaSharingPinterest.scss';

/**
 * @ngdoc controller
 * @name MediaSharingPinterest
 * @description
 * This component renders the media sharing Pinterest.
 *
 * @memberof library
 */
class MediaSharingPinterest {
  constructor() {
    /**
     * The the list of Pinterest social accounts to be used to share.
     *
     * @type {Object}
     */
    this.pinterestSocialAccounts = [];
    /**
     * The selected Pinterest social account.
     *
     * @type {?Object}
     */
    this.selectedPinterestSocialAccount = null;
    /**
     * The the list of Pinterest boards to be used to share.
     *
     * @type {Object}
     */
    this.pinterestBoardsToUse = [];
    /**
     * The selected Pinterest board.
     *
     * @type {?Object}
     */
    this.selectedPinterestBoard = null;
    /**
     * Flag for when the new Pinterest board input should be shown or not.
     *
     * @type {Boolean}
     */
    this.showPinterestNewBoardInput = false;
    /**
     * If the new Pinterest board should be secret or not.
     *
     * @type {Boolean}
     */
    this.isNewBoardSecret = false;
    /**
     * The new Pinterest board name.
     *
     * @type {String}
     */
    this.newPinterestBoardName = '';
    /**
     * The board name maxlength.
     *
     * @type {Number}
     */
    this.boardNameMaxlength = 50;
    /**
     * The new Pinterest board description.
     *
     * @type {String}
     */
    this.newPinterestBoardDescription = '';
    /**
     * The Pinterest pin title.
     *
     * @type {String}
     */
    this.pinTitle = '';
    /**
     * The Pinterest pin description.
     *
     * @type {String}
     */
    this.pinDescription = '';
    /**
     * The description maxlength.
     *
     * @type {Number}
     */
    this.descriptionMaxlength = 500;
    /**
     * The title maxlength.
     *
     * @type {Number}
     */
    this.titleMaxlength = 100;
    /**
     * The error message to show when an error occurred.
     *
     * @type {?String}
     */
    this.errorMessage = null;
    /**
     * The map of Pinterest errors that can be displayed.
     *
     * @type {Object}
     */
    this.sharePinterestErrorsTypes = {
      empty: 'empty',
      isVideo: 'isVideo',
      noMediaSelected: 'noMediaSelected',
    };
  }
  /**
   * Each time the selectedMedia bindings changes, check the publishing state in order to
   * generate the correct error message.
   * Each time the pinterestAccounts binding changes, update the list of active pinterest social accounts.
   * Each time the pinterestBoards binding changes, refresh the pinterest boards list.
   * Each time the pinterestPin binding changes, update the pin title and description with the
   * already shared pinterest pin.
   *
   * @param {Object} changes                    The binding changes.
   * @param {Object} changes.selectedMedia      The selectedMedia change object.
   * @param {Object} changes.pinterestAccounts  The pinterestAccounts change object.
   * @param {Object} changes.pinterestBoards    The pinterestBoards change object.
   * @param {Object} changes.pinterestPin       The pinterestPin change object.
   */
  $onChanges({
    selectedMedia,
    pinterestAccounts,
    pinterestBoards,
    pinterestPin,
  }) {
    if (selectedMedia && selectedMedia.currentValue) {
      this._checkPublishingState();
    }

    if (pinterestAccounts && pinterestAccounts.currentValue) {
      this._refreshSocialAccounts();
      this._checkPublishingState();
    }

    if (pinterestBoards) {
      this._refreshPinterestBoards();
    }

    if (pinterestPin) {
      if (pinterestPin.currentValue) {
        this.pinDescription = pinterestPin.currentValue.description;
        this.pinTitle = pinterestPin.currentValue.title;
      } else {
        this.pinDescription = '';
        this.pinTitle = '';
      }
    }
  }
  /**
   * When a new Pinterest board is selected, we set that board as selected.
   *
   * @param {Object} pinterestBoard  The Pinterest board to set as selected.
   */
  onPinterestBoardSelected(pinterestBoard) {
    this.showPinterestNewBoardInput = !pinterestBoard.id;
    this.selectedPinterestBoard = pinterestBoard;
  }
  /**
   * When a new Pinterest social account is selected, we set that social account as selected.
   *
   * @param {Object} pinterestSocialAccount  The Pinterest social account to set as selected.
   */
  onPinterestSocialAccountSelected(pinterestSocialAccount) {
    this.selectedPinterestSocialAccount = pinterestSocialAccount;
    this.onGetPinterestData({
      socialAccountId: pinterestSocialAccount.id,
      pinterestAccount: pinterestSocialAccount.name,
    });
  }
  /**
   * Check if the publishing is enabled or not depending on business restrictions.
   *
   * @access protected
   */
  _checkPublishingState() {
    if (!this.pinterestSocialAccounts.length) {
      this.errorMessage = this.sharePinterestErrorsTypes.empty;
    } else if (!this.selectedMediaCount) {
      this.errorMessage = this.sharePinterestErrorsTypes.noMediaSelected;
    } else if (this._isSharingVideo()) {
      this.errorMessage = this.sharePinterestErrorsTypes.isVideo;
    } else {
      this.errorMessage = null;
    }
  }
  /**
   * Check if any of the selected media to be shared is a video.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _isSharingVideo() {
    return this.media.filter((item) => this.selectedMedia[item.id])
    .some((item) => item.video_url);
  }
  /**
   * Prepare the data and execute the callback to send the selected media to Pinterest.
   *
   * @access protected
   */
  _onShare() {
    const board = this.showPinterestNewBoardInput ?
      {
        name: this.newPinterestBoardName,
        description: this.newPinterestBoardDescription,
        privacy: this.isNewBoardSecret ? 'secret' : 'public',
      } : this.selectedPinterestBoard;
    const pin = {
      title: this.pinTitle,
      description: this.pinDescription,
    };

    this.onShare({
      selectedAccount: this.selectedPinterestSocialAccount,
      extras: { board, pin },
    });
  }
  /**
   * Generate the list of pinterest boards.
   * Then set the first board as the selected one.
   *
   * @access protected
   */
  _refreshPinterestBoards() {
    if (angular.isArray(this.pinterestBoards)) {
      const formatedBoards = this.pinterestBoards.map((board) => ({
        ...board,
        icon: board.privacy !== 'public' && 'fa fa-lock',
      }));

      this.pinterestBoardsToUse = [
        ...formatedBoards,
        {
          name: 'Create new board',
          type: 'link',
        },
      ];
    } else {
      this.pinterestBoardsToUse = [];
    }
  }
  /**
   * Generate the list of active pinterest social accounts.
   *
   * @access protected
   */
  _refreshSocialAccounts() {
    if (angular.isArray(this.pinterestAccounts)) {
      this.pinterestSocialAccounts = this.pinterestAccounts
      .filter((pinterestSocialAccount) => pinterestSocialAccount.connection.status === 'active')
      .map((pinterestSocialAccount) => ({
        id: pinterestSocialAccount.connection.id,
        name: pinterestSocialAccount.handle.username,
        data: pinterestSocialAccount,
      }));
    } else {
      this.pinterestSocialAccounts = [];
    }
  }
}

/**
 * @ngdoc component
 * @name mediaSharingPinterest
 * @description
 * The media sharing Pinterest component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaSharingPinterest}
   */
  controller: MediaSharingPinterest,
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
   * @property {String}   helpUrl                 The help URL to link the Help button.
   * @property {Boolean}  isLoadingPinterestData  Flag to indicate if Pinterest boards/pin are loading.
   * @property {Array}    media                   The list of media.
   * @property {Array }   pinterestAccounts       The list of user Pinterest accounts.
   * @property {Array}    pinterestBoards         The list of Pinterest boards to be used to share.
   * @property {Array}    pinterestPin            The details of the Pinterest pin if already shared.
   * @property {Object}   selectedMedia           The map of selected media.
   * @property {Number}   selectedMediaCount      The count of selected media.
   * @property {Function} onGetPinterestData      Callback for when we want to get boards/pin details from Pinterest.
   * @property {Function} onShare                 Callback for when the Share is done.
   */
  bindings: {
    helpUrl: '<',
    isLoadingPinterestData: '<',
    media: '<',
    pinterestAccounts: '<',
    pinterestBoards: '<',
    pinterestPin: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    onGetPinterestData: '&',
    onShare: '&',
  },
};
