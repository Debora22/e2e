import template from './settings.html';
import './settings.scss';

/**
 * @ngdoc controller
 * @name Settings
 * @description
 * This component renders the settings section.
 *
 * @memberof settings
 */
class Settings {
  /**
   * @param {$location} $location  To get the current hash.
   * @param {$window}   $window    To add the hashchange listener.
   */
  constructor($location, $window) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The section of the settings page that will be displayed.
     *
     * @type {?String}
     */
    this.currentSection = null;
    /**
     * The map of posible sections.
     *
     * @type {Array}
     */
    this.sections = {
      account: 'account',
      socialAccounts: 'socialAccounts',
    };
    /**
     * @ignore
     */
    this.onHashChange = this.onHashChange.bind(this);
  }
  /**
   * Trigger the first onHashChange and add the hashchange listener.
   */
  $onInit() {
    this.onHashChange();

    this.$window.addEventListener('hashchange', this.onHashChange, false);
  }
  /**
   * Remove the hashchange listener on destroy.
   */
  $onDestroy() {
    this.$window.removeEventListener('hashchange', this.onHashChange, false);
  }
  /**
   * Change the section when a hashchange is detected.
   */
  onHashChange() {
    const section = this.sections[this.$location.hash()];

    if (section) {
      this.currentSection = section;
    } else {
      // If no correct section was provided we need to set the default one.
      this.$location.replace().hash(this.sections.account);
    }
  }
  /**
   * Changes the current section.
   *
   * @param {String} section  The section that will be selected.
   */
  onSectionChange(section) {
    this.$location.hash(section);
  }
}

/**
 * @ngdoc component
 * @name settings
 * @description
 * This component renders the settings section.
 *
 * @memberof settings
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Settings}
   */
  controller: Settings,
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
   * @property {String}   authUrl                    The url for social account authentication.
   * @property {String}   checkoutPixel              The checkout pixel snippet code.
   * @property {String}   checkoutPixelInstructions  The checkout pixel instructions.
   * @property {Array}    currencies                 The list of currencies to display.
   * @property {Object}   settings                   The account's settings.
   * @property {Object}   socialAccounts             The social accounts associated with this customer.
   * @property {Boolean}  socialAccountsLoading      If there are social accounts being loaded.
   * @property {Object}   socialMentionsAccounts     The social mentions accounts associated with this customer.
   * @property {Function} onRemoveSocialAccount      Callback to delete a social account from customer.
   * @property {Function} onSaveAvatar               Callback to save the account's avatar.
   * @property {Function} onSaveSettings             Callback to save the account's settings.
   * @property {Function} onSaveSocialAccount        Callback to get the social accounts list when there is a new one.
   */
  bindings: {
    accountApiKey: '<',
    accountAvatar: '<',
    accountName: '<',
    authUrl: '<',
    checkoutPixel: '<',
    checkoutPixelInstructions: '<',
    currencies: '<',
    settings: '<',
    socialAccounts: '<',
    socialAccountsLoading: '<',
    socialMentionsAccounts: '<',
    onRemoveSocialAccount: '&',
    onSaveAvatar: '&',
    onSaveSettings: '&',
    onSaveSocialAccount: '&',
  },
};
