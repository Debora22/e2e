/* eslint-disable angular/no-private-call */

/**
 * @ngdoc overview
 * @name routesAuthorization
 * @description
 * When a route change starts, we validate if the user has permissions for the route change and
 * if he does not, we prevent the route change and redirect the user to another url.
 *
 * @param {$location}  $location   To redirect the user after validating the route change.
 * @param {$rootScope} $rootScope  To remove the listeners on the $destroy event.
 * @param {AppRouting} appRouting  To validate if the user has permissions for the route change.
 *
 * @memberof common
 */
const routesAuthorization = (
  $location,
  $rootScope,
  appRouting,
) => {
  'ngInject';

  const removeEvent = $rootScope.$on('$routeChangeStart', (event, next) => {
    if (angular.isDefined(next) && angular.isDefined(next.$$route)) {
      const validation = appRouting.validate(
        { ...next.$$route, params: next.params },
        '/unauthorized',
        '/login',
        $location.url(),
      );

      if (validation.denied) {
        event.preventDefault();
        $location.url(validation.redirectTo);
      }
    }
  });

  $rootScope.$on('$destroy', () => {
    removeEvent();
  });
};

export default routesAuthorization;
