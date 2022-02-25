import template from './settingsAccount.html';
import './settingsAccount.scss';

/**
 * @ngdoc controller
 * @name SettingsAccount
 * @description
 * This component renders the settings account form.
 *
 * @memberof settings
 */
class SettingsAccount {
  constructor() {
    /**
     * Flag to show the instructions modal.
     *
     * @type {Boolean}
     */
    this.isModalInstructionsVisible = false;
  }
  /**
   * When editing the avatar, trigger the onSaveAvatar callback,
   * but only if the file exist. This can happen when the selected
   * file don't pass the size or type validation.
   *
   * @param {File} file  The avatar file.
   */
  onAvatarEdited(file) {
    if (file) {
      this.onSaveAvatar({ avatar: file });
    }
  }
  /**
   * Callback when selecting a new currency from the dropdown.
   *
   * @param {Object} item  The new selected currency.
   * @param {Object} form  The form to set as dirty.
   */
  onCurrencySelected(item, form) {
    if (this.settings.currencyInfo !== item) {
      this.settings.currencyInfo = item;
      form.$setDirty();
    }
  }
  /**
   * Change the Instructions modal visibility.
   */
  onToggleModalVisibility() {
    this.isModalInstructionsVisible = !this.isModalInstructionsVisible;
  }
  /**
   * Trigger the onSaveSettings callback.
   * Then set the form to its pristine state.
   *
   * @param {Object} form  The form to set.
   */
  submit(form) {
    this.onSaveSettings({ settings: this.settings })
    .then(() => form.$setPristine());
  }
}

/**
 * @ngdoc component
 * @name settingsAccount
 * @description
 * This component renders the basic settings Account section.
 *
 * @memberof settings
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SettingsAccount}
   */
  controller: SettingsAccount,
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
   * @property {String}   accountApiKey              The customer's api key.
   * @property {String}   accountAvatar              The customer's account avatar.
   * @property {String}   accountName                The customer's account name.
   * @property {String}   checkoutPixel              The checkout pixel snippet code.
   * @property {String}   checkoutPixelInstructions  The checkout pixel instructions.
   * @property {Array}    currencies                 The list of currencies to display.
   * @property {Object}   settings                   The account's settings.
   * @property {Function} onSaveAvatar               Callback to save the account's avatar.
   * @property {Function} onSaveSettings             Callback to save the account's settings.
   */
  bindings: {
    accountApiKey: '<',
    accountAvatar: '<',
    accountName: '<',
    checkoutPixel: '<',
    checkoutPixelInstructions: '<',
    currencies: '<',
    settings: '<',
    onSaveAvatar: '&',
    onSaveSettings: '&',
  },
};
