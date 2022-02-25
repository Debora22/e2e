/**
 * @ngdoc config
 * @name locationProviderConfig
 * @description
 * Configure the `$location` service to use the HTML5 History API.
 *
 * @param {$locationProvider} $locationProvider  The interface to configure the `$location` service.
 *
 * @memberof rootModule
 */
const locationProviderConfig = ($locationProvider) => {
  'ngInject';

  $locationProvider.html5Mode(true);
};

export default locationProviderConfig;
