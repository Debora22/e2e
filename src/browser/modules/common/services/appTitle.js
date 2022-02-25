/**
 * @ngdoc service
 * @name appTitle
 * @description
 * Allows to control the page title from the AngularJS route system, controllers
 * or any other component through an injectable service.
 *
 * @memberof common
 */
class AppTitle {
  /**
   * @param {$rootScope} $rootScope        To add listener for route change success.
   * @param {$window}    $window           To change the document title.
   * @param {Object}     appConfiguration  To get the app html title.
   */
  constructor(
    $rootScope,
    $window,
    appConfiguration,
  ) {
    'ngInject';

    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The app html title to display in the document title.
     *
     * @type {String}
     */
    this.appHTMLTitle = appConfiguration.appHTMLTitle;

    const removeEvent = $rootScope.$on('$routeChangeSuccess', (event, route) => {
      let _pageTitle;
      /* eslint-disable angular/no-private-call */
      if (route && angular.isDefined(route.$$route)) {
        _pageTitle = route.$$route.pageTitle;
      }
      /* eslint-enable angular/no-private-call */
      this.set(_pageTitle);
    });

    $rootScope.$on('$destroy', () => removeEvent());
  }
  /**
   * Returns the current document title.
   *
   * @return {String}
   */
  get() {
    return this.$window.document.title;
  }
  /**
   * Sets or resets the document title.
   *
   * @param {String} [title]  The new title or a falsy value to reset it.
   */
  set(title) {
    this.$window.document.title = this.appHTMLTitle && title ?
      `${title} - ${this.appHTMLTitle}` :
      title || this.appHTMLTitle;
  }
}

export default AppTitle;
