/**
 * @ngdoc decorator
 * @name exceptionHandlerDecorator
 * @description
 * Track when an exception is thrown and create an analytics event for it.
 *
 * @param {$delegate} $delegate  To delegate the error.
 * @param {$injector} $injector  To get the required dependencies because annotations cause circular
 *                               dependencies errors.
 * @return {Function}
 *
 * @memberof rootModule
 */
const exceptionHandlerDecorator = ($delegate, $injector) => {
  'ngInject';

  return (exception, cause) => {
    $injector.get('appErrorHandler').handle(exception, '', true);
    $delegate(exception, cause);
  };
};

export default exceptionHandlerDecorator;
