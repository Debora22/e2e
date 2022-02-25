/**
 * @ngdoc config
 * @name httpProviderConfig
 * @description
 * Push the `apiInterceptor` service into the list of `$http` interceptors.
 *
 * @param {$httpProvider} $httpProvider  The interface to configure the `$http` service.
 *
 * @memberof rootModule
 */
const httpProviderConfig = ($httpProvider) => {
  'ngInject';

  $httpProvider.interceptors.push('apiInterceptor');
};

export default httpProviderConfig;
