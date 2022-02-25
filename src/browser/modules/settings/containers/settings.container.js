/**
 * @ngdoc controller
 * @name SettingsContainer
 * @description
 * This container displays the Settings section.
 *
 * @memberof settings
 */
class SettingsContainer {
  /**
   * @param {$q}                     $q                          To wait for several promises with the all method.
   * @param {AppAPI}                 appAPI                      To make the API requests.
   * @param {AppErrorHandler}        appConfiguration            To get the API configuration.
   * @param {AppErrorHandler}        appErrorHandler             To display any error.
   * @param {AppSession}             appSession                  To get the app session.
   * @param {AppUtils}               appUtils                    To capitalize the social network text.
   * @param {CustomerAvatarUploader} customerAvatarUploader      To handle the customer avatar uploader.
   * @param {Object}                 socialAccountsList          To get the customer social accounts.
   * @param {Object}                 socialMentionsAccountsList  To get the customer social mentions accounts.
   * @param {UIMessages}             uiMessages                  To display notification messages.
   * @param {String}                 SETTINGS_CHECKOUT_PIXEL     To get the template string for the checkout pixel.
   * @param {Array}                  SETTINGS_CURRENCY           To get the currencies list.
   * @param {String}                 SETTINGS_INSTRUCTIONS       To get the checkout pixel instructions.
   */
  constructor(
    $q,
    appAPI,
    appConfiguration,
    appErrorHandler,
    appSession,
    appUtils,
    customerAvatarUploader,
    socialAccountsList,
    socialMentionsAccountsList,
    uiMessages,
    SETTINGS_CHECKOUT_PIXEL,
    SETTINGS_CURRENCY,
    SETTINGS_INSTRUCTIONS,
  ) {
    'ngInject';

    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `appConfiguration` service.
     *
     * @type {Object}
     */
    this.appConfiguration = appConfiguration;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appSession` service.
     *
     * @type {AppSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `appUtils` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `customerAvatarUploader` service.
     *
     * @type {CustomerAvatarUploader}
     */
    this.customerAvatarUploader = customerAvatarUploader;
    /**
     * The local reference to the `socialAccountsList` service.
     *
     * @type {SocialAccountsList}
     */
    this.socialAccountsList = socialAccountsList.getNewInstance();
    /**
     * The local reference to the `socialMentionsAccountsList` service.
     *
     * @type {SocialMentionsAccountsList}
     */
    this.socialMentionsAccountsList = socialMentionsAccountsList.getNewInstance();
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `baseCheckoutPixel` constant.
     *
     * @type {String}
     */
    this.baseCheckoutPixel = SETTINGS_CHECKOUT_PIXEL;
    /**
     * The local reference to the `currencies` constant.
     *
     * @type {Array}
     */
    this.currencies = SETTINGS_CURRENCY;
    /**
     * The local reference to the `checkoutPixelInstructions` constant.
     *
     * @type {String}
     */
    this.checkoutPixelInstructions = SETTINGS_INSTRUCTIONS;
    /**
     * Flag that indicates if a request to change the settings is in progress.
     *
     * @type {Boolean}
     */
    this.loading = false;
    /**
     * The customer's api key.
     *
     * @type {?String}
     */
    this.accountApiKey = null;
    /**
     * The customer's account avatar.
     *
     * @type {?String}
     */
    this.accountAvatar = null;
    /**
     * The customer's account name.
     *
     * @type {?String}
     */
    this.accountName = null;
    /**
     * The Checkout Pixel snippet code.
     *
     * @type {?String}
     */
    this.checkoutPixel = null;
    /**
     * The account's settings.
     *
     * @type {?Object}
     */
    this.settings = null;
    /**
     * The url for social account authentication.
     *
     * @type {String}
     */
    this.authUrl = '';
  }
  /**
   * Set the account's data and setting configurations.
   */
  $onInit() {
    this.authUrl = `${this.appConfiguration.moe.url}/${this.appConfiguration.moe.endpoints.auth}`;
    this._refreshAccount();
    this._getSocialAccounts();
  }
  /**
   * Check if we should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoading() {
    return this.loading ||
      this.socialAccountsList.loading ||
      this.socialMentionsAccountsList.loading;
  }
  /**
   * Ask for confirmation to remove a social account.
   *
   * @param {Number} socialAccount  The social account connection to be deleted.
   */
  onRemoveSocialAccount(socialAccount) {
    const socialConnectionId = socialAccount.connection.id;
    const network = this.appUtils.capitalize(socialAccount.connection.social_network);

    this.uiMessages.confirmation(
      'Remove Social Account',
      `Are you sure you want to remove this ${network} account connection?`,
      {
        confirmText: 'Remove',
        destructive: true,
      },
    )
    .then((confirm) => confirm && this.socialAccountsList.deleteSocialAccount(socialConnectionId))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Save the customer avatar.
   *
   * @param {Object} avatar  The avatar image file.
   *
   * @return {Promise}
   */
  onSaveAvatar(avatar) {
    return this._handleRequest(
      this.customerAvatarUploader.uploadAvatarImage(avatar),
      'Avatar sucessfully saved',
      'Sorry, there was a problem while saving the avatar. Please try again later.',
    );
  }
  /**
   * Save the customer settings.
   *
   * @param {Object} settings  The settings from the form.
   *
   * @return {Promise}
   */
  onSaveSettings(settings) {
    return this._handleRequest(
      this.appAPI.saveAnalyticsSettings(settings),
      'Settings sucessfully saved',
      'Sorry, there was a problem while saving the settings. Please try again later.',
    );
  }
  /**
   * Refresh the social accounts list when a new one is added.
   */
  onSaveSocialAccount() {
    this._getSocialAccounts();
  }
  /**
   * Get the social accounts list.
   *
   * @access protected
   */
  _getSocialAccounts() {
    this.$q.all([
      this.socialAccountsList.getSocialAccounts(),
      this.socialMentionsAccountsList.getSocialMentionsAccounts(),
    ])
    .catch((error) => this.appErrorHandler.handle(
      error,
      'Sorry, there was an error while loading the social accounts users. Please try again.',
    ));
  }
  /**
   * Handle a request to change the customer settings.
   *
   * @param {Promise} promise         The promise result of the request.
   * @param {String}  successMessage  The success message to display.
   * @param {String}  errorMessage    The error message to display.
   *
   * @return {Promise}
   */
  _handleRequest(promise, successMessage, errorMessage) {
    this.loading = true;
    return promise
    .then(() => {
      this.uiMessages.notification(successMessage);
      return this.appSession.refreshSession();
    })
    .then(() => this._refreshAccount())
    .catch((error) => this.appErrorHandler.handle(error, errorMessage))
    .finally(() => {
      this.loading = false;
    });
  }
  /**
   * Refresh the customer's account data.
   *
   * @access protected
   */
  _refreshAccount() {
    const session = this.appSession.getSession();
    const { account, token } = session;
    const { settings } = account;

    this.accountApiKey = settings.api_key;
    this.accountAvatar = `${settings.avatar_url}?t=${new Date().getTime()}`;
    this.accountName = account.name;
    this.checkoutPixel = this.baseCheckoutPixel.replace(':customerApiKey', this.accountApiKey);
    this.authUrl = this.authUrl
    .replace(':token', token)
    .replace(':customerId', account.id);

    this.settings = {
      currencyInfo: this.currencies.find((currency) => currency.code === settings.currency_info.code),
      customQueryString: settings.custom_query_string || '',
      socialTrackingVarsFacebook: settings.social_tracking_vars_facebook || '',
      socialTrackingVarsTwitter: settings.social_tracking_vars_twitter || '',
      socialTrackingVarsPinterest: settings.social_tracking_vars_pinterest || '',
    };
  }
}

/**
 * @ngdoc component
 * @name settingsContainer
 * @description
 * The settings container.
 *
 * @memberof settings
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SettingsContainer}
   */
  controller: SettingsContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      class="odsSmallIndicator -fullScreen"
      ng-if="$ctrl.isLoading()"
    ></div>
    <settings
      account-api-key="$ctrl.accountApiKey"
      account-avatar="$ctrl.accountAvatar"
      account-name="$ctrl.accountName"
      auth-url="$ctrl.authUrl"
      checkout-pixel="$ctrl.checkoutPixel"
      checkout-pixel-instructions="$ctrl.checkoutPixelInstructions"
      currencies="$ctrl.currencies"
      settings="$ctrl.settings"
      social-accounts="$ctrl.socialAccountsList.socialAccountsByNetwork"
      social-accounts-loading="$ctrl.socialAccountsList.loading"
      social-mentions-accounts="$ctrl.socialMentionsAccountsList.entities"
      on-remove-social-account="$ctrl.onRemoveSocialAccount(socialAccount)"
      on-save-avatar="$ctrl.onSaveAvatar(avatar)"
      on-save-settings="$ctrl.onSaveSettings(settings)"
      on-save-social-account="$ctrl.onSaveSocialAccount()"
    ></settings>
  `,
};
