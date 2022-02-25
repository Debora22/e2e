import template from './socialAccounts.html';
import './socialAccounts.scss';

/**
 * @ngdoc controller
 * @name SocialAccounts
 * @description
 * This component renders the list of connected social accounts.
 *
 * @memberof settings
 */
class SocialAccounts {
  constructor() {
    /**
     * If Instagram accounts are visible or not.
     *
     * @type {Boolean}
     */
    this.areInstagramAccountsVisible = true;
  }
  /**
   * Callback for when accounts with child accounts are collapsed.
   */
  onCollapseAccounts() {
    this.areInstagramAccountsVisible = !this.areInstagramAccountsVisible;
  }
}

/**
 * @ngdoc component
 * @name socialAccounts
 * @description
 * This component renders the social accounts list.
 *
 * @memberof settings
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SocialAccounts}
   */
  controller: SocialAccounts,
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
   * @property {Boolean}  hasFacebookAccount      If the customer has a Facebook account connected.
   * @property {Object}   socialAccounts          The social accounts associated with this customer.
   * @property {Object}   socialMentionsAccounts  The social mentions accounts associated with this customer.
   * @property {Function} onConnect               Callback to open the connection flow.
   * @property {Function} onRemoveSocialAccount   Callback to delete a social account from customer.
   */
  bindings: {
    hasFacebookAccount: '<',
    socialAccounts: '<',
    socialMentionsAccounts: '<',
    onConnect: '&',
    onRemoveSocialAccount: '&',
  },
};
