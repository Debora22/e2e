import angular from 'angular';

import externalAppContainer from './containers/externalApp.container';

import EXTERNAL_APPS_PATHS from './constants/externalAppsPaths.constant';

import externalAppLoaded from './directives/externalAppLoaded';

/**
 * @ngdoc overview
 * @name externalAppModule
 * @description
 * This is the application externalApp module, it handles the integration with external apps.
 */
const externalAppModule = angular.module('externalApp', [])
.component('externalAppContainer', externalAppContainer)
.constant('EXTERNAL_APPS_PATHS', EXTERNAL_APPS_PATHS)
.directive('externalAppLoaded', externalAppLoaded);

export default externalAppModule.name;
