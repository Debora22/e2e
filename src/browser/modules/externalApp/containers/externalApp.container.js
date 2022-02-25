/**
 * @ngdoc controller
 * @name ExternalAppContainer
 * @description
 * This container handles the integration with external apps.
 *
 * @memberof externalApp
 */
class ExternalAppContainer {
  /**
   * @param {$location}       $location            To get the hash of the current url.
   * @param {$sce}            $sce                 To access the Strict Contextual Escaping service.
   * @param {$window}         $window              To open a new tab.
   * @param {AppAPI}          appAPI               To get the dashboard url.
   * @param {Object}          appConfiguration     To get the external apps urls configuration.
   * @param {AppErrorHandler} appErrorHandler      To display any error.
   * @param {AppSession}      appSession           To get the app session.
   * @param {Object}          EXTERNAL_APPS_PATHS  To get the external apps paths configuration.
   */
  constructor(
    $location,
    $sce,
    $window,
    appAPI,
    appConfiguration,
    appErrorHandler,
    appSession,
    EXTERNAL_APPS_PATHS,
  ) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `$sce` service.
     *
     * @type {$sce}
     */
    this.$sce = $sce;
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
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
     * The local reference to the `externalAppsUrls` object.
     *
     * @type {Object}
     */
    this.externalAppsUrls = appConfiguration.externalApps;
    /**
     * The local reference to the `EXTERNAL_APPS_PATHS` constant.
     *
     * @type {Object}
     */
    this.EXTERNAL_APPS_PATHS = EXTERNAL_APPS_PATHS;
    /**
     * The local reference to the `loading` flag.
     *
     * @type {Boolean}
     */
    this.loading = true;
  }
  /**
   * Generate the externalApp url based on the current session and provided bindings.
   */
  $onInit() {
    const session = this.appSession.getSession();

    if (this.app === 'zendesk') {
      this._goToZendesk();
    } else {
      const baseUrl = this.externalAppsUrls[this.app];
      const path = this.EXTERNAL_APPS_PATHS[this.app] || '/';
      const hash = this.$location.hash();

      if (baseUrl && path) {
        let formatedPath = path.replace(':token', session.token)
        .replace(':customerId', session.account.id)
        .replace(':route', this.route)
        .replace(':userEmail', session.user.email);

        if (hash) {
          formatedPath += `#${hash}`;
        }

        if (this.redirect) {
          this.$window.location = `${baseUrl}${formatedPath}`;
        } else {
          this.externalAppUrl = this.$sce.trustAsResourceUrl(`${baseUrl}${formatedPath}`);
        }
      }
    }
  }
  /**
   * Callback to be called when the iframe onload event is triggered.
   */
  onLoad() {
    this.loading = false;
  }
  /**
   * Move the user to the Zendesk homepage.
   */
  _goToZendesk() {
    this.appAPI.getDashboardUrl()
    .then((response) => {
      let { url } = response;
      const { return_to: returnTo } = this.$location.search();

      if (this.articleId) {
        url = `${url}&return_to=https://olapic1.zendesk.com/hc/en-us/articles/${this.articleId}`;
      } else if (returnTo) {
        url = `${url}&return_to=${returnTo}`;
      }

      this.$window.location = url;
    })
    .catch((error) => this.appErrorHandler.silent(error));
  }
}

/**
 * @ngdoc component
 * @name externalAppContainer
 * @description
 * The externalApp container.
 *
 * @memberof externalApp
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {ExternalAppContainer}
   */
  controller: ExternalAppContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      ng-if="$ctrl.loading"
      class="odsSmallIndicator -fullScreen"
    ></div>
    <iframe
      ng-src="{{$ctrl.externalAppUrl}}"
      external-app-loaded="$ctrl.onLoad()"
      class="sub_view"
      frameborder="0"
    ></iframe>
  `,
  /**
   * Component bindings.
   *
   * @type {Object}
   * @property {String}  app        The app to display.
   * @property {String}  articleId  The zendesk article id to display.
   * @property {String}  route      The route of the app to display.
   * @property {Boolean} redirect   If we need to redirect to that route.
   */
  bindings: {
    app: '@',
    articleId: '@',
    route: '@',
    redirect: '<',
  },
};
