/**
 * @ngdoc overview
 * @name locationOverload
 * @description
 * Monkey patch location service to add the previous route.
 *
 * @param {$location}  $location   To add previousRoute property.
 * @param {$rootScope} $rootScope  To add listener for location changes.
 * @param {$route}     $route      To get the current route.
 *
 * @memberof common
 */
const locationOverload = (
  $location,
  $rootScope,
  $route,
) => {
  'ngInject';

  let previousRoute;

  const removeRouteChangeStart = $rootScope.$on('$routeChangeStart', () => {
    const { current } = $route;
    // eslint-disable-next-line angular/no-private-call
    previousRoute = current && current.$$route && current.$$route.originalPath;
  });
  const removeRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', () => {
    $location.previousRoute = previousRoute;
  });

  $rootScope.$on('$destroy', () => {
    removeRouteChangeStart();
    removeRouteChangeSuccess();
  });
};

export default locationOverload;
