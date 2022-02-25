import template from './mediaSharingFacebook.html';
import './mediaSharingFacebook.scss';

/**
 * @ngdoc controller
 * @name MediaSharingFacebook
 * @description
 * This component renders the media sharing facebook.
 *
 * @memberof library
 */
class MediaSharingFacebook {
  constructor() {
    /**
     * The Facebook username.
     *
     * @type {?String}
     */
    this.facebookUsername = null;
    /**
     * The error message to show when an error occurred getting Facebook Ads Accounts.
     *
     * @type {?String}
     */
    this.facebookAdsAccountsErrorMessage = null;
    /**
     * The map of Facebook Ads Accounts errors that can be displayed.
     *
     * @type {Object}
     * @access protected
     */
    this.facebookAdsAccountsErrorsTypes = {
      preconditionFailed: 412,
      errorGetting: 'errorGetting',
      empty: 'empty',
      noMediaSelected: 'noMediaSelected',
    };
    /**
     * The selected Facebook Ad Account.
     *
     * @type {?Object}
     */
    this.selectedAdAccount = null;
  }
  /**
   * Each time the facebookAdsAccounts or selectedMedia binding changes,
   * check the publishing state in order to generate the correct error messages.
   * Each time the facebookAccounts binding changes, update the facebookUsername variable.
   *
   * @param {Object} changes                      The binding changes.
   * @param {Object} changes.facebookAdsAccounts  The facebookAdsAccounts change object.
   * @param {Object} changes.facebookAccounts     The socialAccounts change object.
   * @param {Object} changes.selectedMedia        The selectedMedia change object.
   */
  $onChanges({
    facebookAdsAccounts,
    facebookAccounts,
    selectedMedia,
  }) {
    if (
      facebookAdsAccounts ||
      (
        selectedMedia &&
        selectedMedia.currentValue
      )
    ) {
      this._checkPublishingState();
    }

    if (
      facebookAccounts &&
      facebookAccounts.currentValue &&
      this.facebookAccounts.length
    ) {
      this.facebookUsername = this.facebookAccounts[0].handle.username;
    }
  }
  /**
   * When an Ad Account is selected, set it as selected.
   *
   * @param {Object} selectedAdAccount  The selected ad account.
   */
  onSelectedAdAccount(selectedAdAccount) {
    this.selectedAdAccount = selectedAdAccount;
  }
  /**
   * Check if the publishing is enabled or not depending on business restrictions.
   *
   * @access protected
   */
  _checkPublishingState() {
    if (!this.facebookAdsAccounts) {
      if (this.facebookAdsAccountsError.status === this.facebookAdsAccountsErrorsTypes.preconditionFailed) {
        this.facebookAdsAccountsErrorMessage = this.facebookAdsAccountsErrorsTypes.preconditionFailed;
      } else {
        this.facebookAdsAccountsErrorMessage = this.facebookAdsAccountsErrorsTypes.errorGetting;
      }
    } else if (!this.facebookAdsAccounts.length) {
      this.facebookAdsAccountsErrorMessage = this.facebookAdsAccountsErrorsTypes.empty;
    } else if (!this.selectedMediaCount) {
      this.facebookAdsAccountsErrorMessage = this.facebookAdsAccountsErrorsTypes.noMediaSelected;
    } else {
      this.facebookAdsAccountsErrorMessage = null;
    }
  }
}

/**
 * @ngdoc component
 * @name mediaSharingFacebook
 * @description
 * The media sharing facebook component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaSharingFacebook}
   */
  controller: MediaSharingFacebook,
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
   * @property {Array}    facebookAccounts          The list of user Facebook accounts.
   * @property {Array}    facebookAdsAccounts       The Facebook Ads Accounts.
   * @property {Object}   facebookAdsAccountsError  The error if any occurs getting the Facebook Ads Accounts.
   * @property {String}   helpUrl                   The help URL to link the Help button.
   * @property {Boolean}  isLoadingAdsAccounts      Flag to indicate if Ads Accounts are loading.
   * @property {Object}   selectedMedia             The map of selected media.
   * @property {Number}   selectedMediaCount        The count of selected media.
   * @property {Function} onShare                   Callback for when the Share is done.
   */
  bindings: {
    facebookAccounts: '<',
    facebookAdsAccounts: '<',
    facebookAdsAccountsError: '<',
    helpUrl: '<',
    isLoadingAdsAccounts: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    onShare: '&',
  },
};
