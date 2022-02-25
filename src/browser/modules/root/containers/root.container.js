/**
 * @ngdoc controller
 * @name RootContainer
 * @description
 * This container renders the root component.
 *
 * @memberof rootModule
 */
class RootContainer {
  /**
   * @param {$location}       $location         To redirect the user when the app needs to be updated.
   * @param {$rootScope}      $rootScope        To detect the route changes.
   * @param {$scope}          $scope            To apply the refresh changes.
   * @param {$window}         $window           To listen to post messages.
   * @param {Object}          appConfiguration  To get the app title.
   * @param {AppErrorHandler} appErrorHandler   To display any error.
   * @param {AppRouting}      appRouting        To validate if the user has permissions for the menu item.
   * @param {AppSession}      appSession        To get the app session.
   * @param {AppTitle}        appTitle          To enable the appTitle service, if this is removed
   *                                            this service won't work.
   * @param {AppUpdates}      appUpdates        To listen for changes that require the app to be updated.
   * @param {Object}          NAVIGATION        To get the menu configuration.
   */
  constructor(
    $location,
    $rootScope,
    $scope,
    $window,
    appConfiguration,
    appErrorHandler,
    appRouting,
    appSession,
    appTitle,
    appUpdates,
    NAVIGATION,
  ) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `$rootScope` object.
     *
     * @type {$rootScope}
     */
    this.$rootScope = $rootScope;
    /**
     * The local reference to the `$scope` object.
     *
     * @type {$scope}
     */
    this.$scope = $scope;
    /**
     * The local reference to the `$window` object.
     *
     * @type {$scope}
     */
    this.$window = $window;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appRouting` service.
     *
     * @type {AppRouting}
     */
    this.appRouting = appRouting;
    /**
     * The local reference to the `appSession` service.
     *
     * @type {AppSession}
     */
    this.appSession = appSession;
    /**
     * The local reference to the `appUpdates` service.
     *
     * @type {AppUpdates}
     */
    this.appUpdates = appUpdates;
    /**
     * The local reference to the `menu` constant.
     *
     * @type {Object}
     */
    this.NAVIGATION = NAVIGATION;
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
     * Flag that indicates if the session was verified or not.
     *
     * @type {Boolean}
     */
    this.sessionVerified = false;
    /**
     * The current route information.
     *
     * @type {Object}
     */
    this.currentRoute = {
      path: '',
      params: {},
    };
    /**
     * The list of events subscriptions functions that need to be called when $onDestroy.
     *
     * @type {Array}
     * @ignore
     */
    this._eventsSubscriptions = [];
    /**
     * Flag to hide menu if an external app is displaying a modal.
     *
     * @type {Boolean}
     */
    this.hideMenu = false;
    /**
     * The app title to display in the menu.
     *
     * @type {String}
     */
    this.appTitle = appConfiguration.appTitle;
    /**
     * @ignore
     */
    this._handleExternalAppMessages = this._handleExternalAppMessages.bind(this);
  }
  /**
   * Initialize variables.
   */
  $onInit() {
    this._refreshAccount();

    if (this.appSession.isTheAccountOutdated()) {
      this.appSession.refreshSession()
      .then(() => {
        this.$scope.$apply(() => {
          this.sessionVerified = true;
        });
      })
      .catch((error) => this.appErrorHandler.silent(error));
    } else {
      this.sessionVerified = true;
    }

    // When the app needs to be updated, reload the page.
    this.appUpdates.onNewUpdate(() => this.$window.location.reload());

    this.$rootScope.$on('$routeChangeSuccess', (event, next) => {
      this.currentRoute.path = this.$location.path();
      this.currentRoute.params = next.params;

      this._checkAllRoutesForActive();
    });

    this._eventsSubscriptions = [
      this.appSession.onSessionAccountChange(() => {
        this.appSession.refreshSession()
        .then(() => this.$window.location.reload());
      }),
      this.appSession.onSessionChange(() => this._refreshAccount()),
    ];

    this.$window.addEventListener('message', this._handleExternalAppMessages);
  }
  /**
   * Clear all listeners.
   */
  $onDestroy() {
    this._eventsSubscriptions.forEach((subscription) => subscription());

    this.$window.removeEventListener('message', this._handleExternalAppMessages);
  }
  /**
   * Check if we need to filter the menu item.
   * We respond true if we want to show the menu item, false otherwise.
   *
   * @param {Object} item  The item to check.
   *
   * @return {Boolean}
   */
  onFilterMenuItem(item) {
    const validation = this.appRouting.validate(item.config || {});
    return !validation.denied;
  }
  /**
   * Check all the routes and look for the active one.
   *
   * @return {Boolean}
   */
  _checkAllRoutesForActive() {
    return [
      this.NAVIGATION.avatarItems,
      this.NAVIGATION.home,
      this.NAVIGATION.mainNav,
      this.NAVIGATION.subNav,
      this.NAVIGATION.unmapped,
    ]
    .some((route) => this._checkRoutes(route));
  }
  /**
   * Check if give item is the active one.
   *
   * @param {Object} item  The item to check if it is the active one.
   *
   * @return {Boolean}
   */
  _checkIfActive(item = { route: '' }) {
    const route = Object.keys(this.currentRoute.params)
    .reduce(
      (result, key) => result.replace(`:${key}`, this.currentRoute.params[key]),
      item.route || '',
    );

    if (route === this.currentRoute.path) {
      this.activeNav = item;
      return true;
    }

    return false;
  }
  /**
   * Check the item or item list and look for the active item, between itself or it descendants.
   *
   * @param {Array|Object} item  The item or item list to look for the active one.
   *
   * @return {Boolean}
   */
  _checkRoutes(item) {
    return angular.isArray(item) ?
      item.some((subItem) => this._checkIfActive(subItem) || this._checkRoutes(subItem.items)) :
      this._checkIfActive(item);
  }
  /**
   * Hides or shows the header menu in case an external app embedded in an iframe sends a message.
   *
   * @param {Object} event       The event to get the message from.
   * @param {Object} event.data  The message to handle.
   *
   * @access protected
   */
  _handleExternalAppMessages({ data }) {
    this.$scope.$apply(() => {
      const hideMenuForStreams = /hideMenuForStreams(\d*)/.exec(data);

      switch (data) {
      case 'hideMenu':
        this.hideMenu = true;
        break;
      case 'showMenu':
        this.hideMenu = false;
        break;
      case 'showMenuForStreams':
        this.hideMenu = false;
        this.$location.hash('');
        break;
      default:
        if (hideMenuForStreams) {
          this.hideMenu = true;
          if (hideMenuForStreams[1]) {
            this.$location.hash(`g${hideMenuForStreams[1]}`);
          }
        }
        break;
      }
    });
  }
  /**
   * Refresh the customer's account data.
   *
   * @access protected
   */
  _refreshAccount() {
    const session = this.appSession.getSession();

    if (session) {
      this.accountAvatar = `${session.account.settings.avatar_url}?t=${new Date().getTime()}`;
      this.accountName = session.account.name;
    }
  }
}

/**
 * @ngdoc component
 * @name rootContainer
 * @description
 * The root container.
 *
 * @memberof rootModule
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {RootContainer}
   */
  controller: RootContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <root
      app-title="{{ ::$ctrl.appTitle }}"
      avatar="{{ $ctrl.accountAvatar }}"
      current-route="{{ $ctrl.currentRoute.path }}"
      customer="{{ $ctrl.accountName }}"
      hide-menu="$ctrl.hideMenu || $ctrl.activeNav.config.hideMenu"
      loading="!$ctrl.sessionVerified"
      menu="$ctrl.NAVIGATION"
      on-filter="$ctrl.onFilterMenuItem(item)"
    ></root>
    <ui-messages-container></ui-messages-container>
  `,
};
