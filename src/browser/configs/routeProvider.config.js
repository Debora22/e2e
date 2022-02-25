/**
 * @ngdoc config
 * @name routeProviderConfig
 * @description
 * Sets the routes.
 *
 * @param {$routeProvider} $routeProvider  The interface for the Angular router.
 * @param {Object}         NAVIGATION      The interface for the Angular router.
 *
 * @memberof contentEngineAdmin
 */
const routeProviderConfig = ($routeProvider, NAVIGATION) => {
  'ngInject';

  // Routes without sub navigation.
  [
    // Home route
    NAVIGATION.home,
  ]
  .forEach((item) => {
    if (item.route) {
      $routeProvider.when(item.route, item.config || {});
    }
  });

  // Routes with sub navigation.
  [
    // Avatar routes
    NAVIGATION.avatarItems,

    // MainNav routes
    NAVIGATION.mainNav,

    // SubNav routes
    NAVIGATION.subNav,

    // Unmapped routes
    NAVIGATION.unmapped,

    // Legacy routes
    NAVIGATION.legacy,
  ]
  .forEach((items) => items.forEach((item) => {
    if (item.route) {
      const routeConfig = { ...item.config, pageTitle: item.title };
      $routeProvider.when(item.route, routeConfig);
    }

    if (angular.isArray(item.items)) {
      item.items.forEach((subItem) => {
        if (subItem.route) {
          const subRouteConfig = { ...subItem.config, pageTitle: subItem.title };
          $routeProvider.when(subItem.route, subRouteConfig);
        }
      });
    }
  }));

  $routeProvider
  .when(
    '/',
    { redirectTo: NAVIGATION.home.route },
  )
  .otherwise({
    redirectTo: NAVIGATION.home.route,
  });
};

export default routeProviderConfig;
