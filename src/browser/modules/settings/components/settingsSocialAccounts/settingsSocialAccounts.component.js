import template from './settingsSocialAccounts.html';
import './settingsSocialAccounts.scss';

import socialAccountsImage from '../../../../assets/images/socialAccounts.png';

/**
 * @ngdoc controller
 * @name SettingsSocialAccounts
 * @description
 * This component renders the social accounts section of the settings page.
 *
 * @memberof settings
 */
class SettingsSocialAccounts {
  constructor() {
    /**
     * Reference to the social accounts connection image.
     *
     * @type {String}
     */
    this.socialAccountsImage = socialAccountsImage;
    /**
     * Current section shown in the social accounts settings.
     *
     * @type {String}
     */
    this.currentSection = 'connectionMessage';
    /**
     * If the customer has a Facebook account connected in order to let them connect one or not.
     *
     * @type {Boolean}
     */
    this.hasFacebookAccount = false;
    /**
     * The list of networks of the social accounts to check for existence.
     *
     * @type {Array}
     */
    this.socialAccountsNetworks = [
      'facebook',
      'pinterest',
      'twitter',
    ];
  }
  /**
   * Each time the socialAccounts binding changes, update the current section.
   *
   * @param {Object} changes                 The binding changes.
   * @param {Object} changes.socialAccounts  The socialAccounts change object.
   */
  $onChanges({ socialAccounts }) {
    if (
      socialAccounts &&
      socialAccounts.currentValue &&
      this.socialAccounts
    ) {
      this.currentSection = this._hasSocialAccounts() ? 'socialAccounts' : 'connectionMessage';
      this.hasFacebookAccount = this.socialAccounts.facebook && this.socialAccounts.facebook.length > 0;
    }
  }
  /**
   * Callback for when the back button is clicked.
   */
  onBackButtonClick() {
    this.currentSection = this._hasSocialAccounts() ? 'socialAccounts' : 'connectionMessage';
  }
  /**
   * Callback for when the connect button is clicked.
   */
  onConnect() {
    this.currentSection = 'socialAccountsConnector';
  }
  /**
   * Check if there is any social account connected.
   *
   * @return {Boolean}
   */
  _hasSocialAccounts() {
    return Object.keys(this.socialAccounts).some((key) => (
      this.socialAccountsNetworks.includes(key) &&
      this.socialAccounts[key] &&
      this.socialAccounts[key].length
    ));
  }
}

/**
 * @ngdoc component
 * @name settingsSocialAccounts
 * @description
 * This component renders the social accounts section of the settings page.
 *
 * @memberof settings
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SettingsSocialAccounts}
   */
  controller: SettingsSocialAccounts,
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
   * @property {String}   authUrl                 The url for social account authentication.
   * @property {Object}   socialAccounts          The social accounts associated with this customer.
   * @property {Boolean}  socialAccountsLoading   If there are social accounts being loaded.
   * @property {Object}   socialMentionsAccounts  The social mentions accounts associated with this customer.
   * @property {Function} onRemoveSocialAccount   Callback to delete a social account from customer.
   * @property {Function} onSaveSocialAccount     Callback to get the social accounts list when there is a new one.
   */
  bindings: {
    authUrl: '<',
    socialAccounts: '<',
    socialAccountsLoading: '<',
    socialMentionsAccounts: '<',
    onRemoveSocialAccount: '&',
    onSaveSocialAccount: '&',
  },
};
