import template from './mediaSharingModal.html';
import './mediaSharingModal.scss';

/**
 * @ngdoc controller
 * @name MediaSharingModal
 * @description
 * This component renders the media sharing modal.
 *
 * @memberof library
 */
class MediaSharingModal {
  constructor() {
    /**
     * The selected activation to send the media to.
     *
     * @type {?Object}
     */
    this.selectedActivation = null;
  }
  /**
   * Hide the modal actions.
   */
  $onInit() {
    this.onToggleModalActions({ visible: false });
  }
  /**
   * Each time the selectedMedia binding changes, and the selected activation is share link
   * trigger the onActivationSelected callback to update the share link.
   *
   * @param {Object} changes                The binding changes.
   * @param {Object} changes.selectedMedia  The selectedMedia change object.
   */
  $onChanges({ selectedMedia }) {
    if (
      selectedMedia &&
      selectedMedia.currentValue &&
      this.selectedActivation &&
      this.selectedActivation.id === 'shareLink'
    ) {
      this.onActivationSelected({ selectedActivation: this.selectedActivation });
    }
  }
  /**
   * Create a fn to filter the list of activations by using the `onActivationVisibilityCheck` callback.
   *
   * @return {Function}
   */
  visibleActivationsFilter() {
    return (activation) => this.onActivationVisibilityCheck({ activation });
  }
  /**
   * When an activation to send media to is selected, set it as selected.
   *
   * @param {Object} activation  The selected activation.
   *
   * @access protected
   */
  _onActivationSelected(activation) {
    this.selectedActivation = activation;
    this.onActivationSelected({ selectedActivation: this.selectedActivation });
  }
}

/**
 * @ngdoc component
 * @name mediaSharingModal
 * @description
 * The media sharing modal component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaSharingModal}
   */
  controller: MediaSharingModal,
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
   * @property {Array}    activations                     The list of activations settings to share media.
   * @property {Object}   facebookAdsAccounts             The Facebook Ads Accounts.
   * @property {Object}   facebookAdsAccountsError        The error if any occurs getting the Facebook Ads Accounts.
   * @property {Object}   instagramBusinessAccounts       The Instagram business accounts.
   * @property {Object}   instagramBusinessAccountsError  The error if any occurs getting the Instagram
   *                                                      business accounts.
   * @property {Boolean}  isLoadingOptions                Flag to indicate if sharing options are loading.
   * @property {Array}    media                           The list of media.
   * @property {Array}    pinterestBoards                 The list of Pinterest boards to be used to share.
   * @property {Array}    pinterestPin                    The details of the Pinterest pin already shared.
   * @property {String}   sharingUrl                      The URL link to sharing media.
   * @property {Object}   selectedMedia                   The map of selected media.
   * @property {Number}   selectedMediaCount              The count of selected media.
   * @property {Object}   socialAccounts                  The user available social accounts.
   * @property {Array}    streams                         The list of tagged streams.
   * @property {Array}    tapshopAccounts                 The list of tapshop accounts.
   * @property {Function} onActivationSelected            Callback for when an activation is selected.
   *                                                      It receives the selected activation to share media to.
   * @property {Function} onActivationVisibilityCheck     Callback to check if an action should be visible. It
   *                                                      receives the activation to check.
   * @property {Function} onShare                         Callback for when the Share is done.
   * @property {Function} onToggleModalActions            Callback to show/hide main modal actions.
   */
  bindings: {
    activations: '<',
    facebookAdsAccounts: '<',
    facebookAdsAccountsError: '<',
    instagramBusinessAccounts: '<',
    instagramBusinessAccountsError: '<',
    isLoadingOptions: '<',
    media: '<',
    pinterestBoards: '<',
    pinterestPin: '<',
    sharingUrl: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    socialAccounts: '<',
    streams: '<',
    tapshopAccounts: '<',
    onActivationSelected: '&',
    onActivationVisibilityCheck: '&',
    onShare: '&',
    onToggleModalActions: '&',
  },
};
