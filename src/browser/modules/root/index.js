import angular from 'angular';

import rootComponent from './components/root/root.component';

import rootContainer from './containers/root.container';

import httpProviderConfig from './configs/httpProvider.config';
import locationProviderConfig from './configs/locationProvider.config';

import APP_EVENTS from './constants/appEvents.constant';

import exceptionHandlerDecorator from './decorators/exceptionHandler.decorator';

import APIInterceptor from './services/apiInterceptor';
import AppUpdates from './services/appUpdates';

/**
 * @ngdoc overview
 * @name rootModule
 * @description
 * This is the application main module, it implements the `<root>` component, which shows the
 * `ng-view` for the Angular router, making it the main container for all the "sub modules".
 */
const rootModule = angular.module('rootModule', [])
.component('root', rootComponent)
.component('rootContainer', rootContainer)
.config(httpProviderConfig)
.config(locationProviderConfig)
.constant('APP_EVENTS', APP_EVENTS)
.decorator('$exceptionHandler', exceptionHandlerDecorator)
.service('appUpdates', AppUpdates)
.service('apiInterceptor', APIInterceptor);

export default rootModule.name;
