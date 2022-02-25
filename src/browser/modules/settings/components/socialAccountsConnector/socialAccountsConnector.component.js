import template from './socialAccountsConnector.html';
import './socialAccountsConnector.scss';

/**
 * @ngdoc controller
 * @name SocialAccountsConnector
 * @description
 * This component renders the social accounts connector of the settings page.
 *
 * @memberof settings
 */
class SocialAccountsConnector {
  /**
   * @param {$q}         $q                 To handle promises.
   * @param {$window}    $window            To add the event listener and create the login window.
   * @param {AppUtils}   appUtils           To capitalize the network.
   * @param {UIMessages} uiMessages         To display notification messages.
   * @param {Object}     SETTINGS_MESSAGES  To display modal messages when connecting a Facebook account.
   */
  constructor(
    $q,
    $window,
    appUtils,
    uiMessages,
    SETTINGS_MESSAGES,
  ) {
    'ngInject';

    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `SETTINGS_MESSAGES` constant.
     *
     * @type {Object}
     */
    this.modalMessages = SETTINGS_MESSAGES;
    /**
     * Flag to indicate whether to show welcome messages in a modal or not when connecting an account.
     *
     * @type {Boolean}
     */
    this.showWelcomeMessage = false;
    /**
     * @ignore
     */
    this.onAuthSuccess = this.onAuthSuccess.bind(this);
  }
  /**
   * Initialize event listener for social networks authentication window.
   */
  $onInit() {
    this.$window.addEventListener('message', this.onAuthSuccess);
  }
  /**
   * Remove event listener for social networks authentication window on destroy.
   */
  $onDestroy() {
    this.$window.removeEventListener('message', this.onAuthSuccess);
  }
  /**
   * Open confirmation modal if the user wants to connect a Facebook account.
   *
   * @param {String} network  The social network to connect to open the connection window.
   */
  onAccountConnect(network) {
    let promise = this.$q.resolve(true);

    if (network === 'facebook') {
      this.showWelcomeMessage = true;

      promise = promise.then(() => this.uiMessages.confirmation(
        'Connect Facebook Account',
        this.modalMessages.facebookConfirmation,
        {
          confirmText: 'Start',
          destructive: false,
          type: 'large',
        },
      ));
    }

    promise.then((confirm) => confirm && this._connect(network));
  }
  /**
   * Callback for when the account login process is finished.
   *
   * @param {Object} event  The event to get the message from.
   */
  onAuthSuccess(event) {
    if (event.data === '#auth-success') {
      let promise = this.$q.resolve(true);

      if (this.showWelcomeMessage) {
        promise = promise.then(() => this.uiMessages.confirmation(
          'Connect Facebook Account',
          this.modalMessages.facebookSuccess,
          {
            confirmText: 'Close',
            cancelText: false,
            destructive: false,
            type: 'large',
          },
        ));
      }

      promise.then((confirm) => confirm && this.onSaveSocialAccount())
      .finally(() => {
        this.showWelcomeMessage = false;
      });
    }
  }
  /**
   * Open the auth window.
   *
   * @param {String} network  The social network to connect to open the connection window.
   */
  _connect(network) {
    const halfScreen = 2;
    const width = 450;
    const height = 350;
    const x = (this.$window.screen.width / halfScreen) - (width / halfScreen);
    const y = (this.$window.screen.height / halfScreen) - (height / halfScreen);

    this.$window.open(
      this.authUrl.replace(':network', network),
      `Connect your ${this.appUtils.capitalize(network)} account`,
      `menubar=0,location=0,width=${width},height=${height},left=${x},top=${y}`,
    );
  }
}

/**
 * @ngdoc component
 * @name socialAccountsConnector
 * @description
 * This component renders the social accounts connector of the settings page.
 *
 * @memberof settings
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SocialAccountsConnector}
   */
  controller: SocialAccountsConnector,
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
   * @property {String}   authUrl              The url for social account authentication.
   * @property {Boolean}  hasFacebookAccount   If the customer has a Facebook account connected.
   * @property {Function} onBackButtonClick    Callback for when the back button is clicked.
   * @property {Function} onSaveSocialAccount  Callback to get the social accounts list when there is a new one.
   */
  bindings: {
    authUrl: '<',
    hasFacebookAccount: '<',
    onBackButtonClick: '&',
    onSaveSocialAccount: '&',
  },
};
