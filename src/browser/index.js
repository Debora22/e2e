import angular from 'angular';
import 'angulartics';
import angularticsGA from 'angulartics-google-analytics';
import 'angular-drag-and-drop-lists';
import 'angular-route';
import 'angular-sanitize';
import 'ng-file-upload';
import 'ng-infinite-scroll';
import 'ng-pattern-restrict';
import ngRaven from 'raven-js/plugins/angular';
import 'ngstorage';
import Raven from 'raven-js';

import 'font-awesome/css/font-awesome.min.css';

import browserConfig from '../../config/browser.config';

import advocates from './modules/advocates';
import collections from './modules/collections';
import common from './modules/common';
import contentUploader from './modules/contentUploader';
import externalApp from './modules/externalApp';
import library from './modules/library';
import ods from './modules/ods';
import rightsMessages from './modules/rightsMessages';
import root from './modules/root';
import scheduler from './modules/scheduler';
import settings from './modules/settings';
import user from './modules/user';
import whitelist from './modules/whitelist';

import './assets/scss/base.scss';

import routeProviderConfig from './configs/routeProvider.config';

import NAVIGATION from './constants/navigation.constant';

const appConfiguration = Object.assign({}, browserConfig, (global.appConfiguration || {}));
const featuresModules = [];

const { features: { sentry } } = appConfiguration;
if (sentry.enabled) {
  Raven
  .config(`https://${sentry.apiKey}@sentry.io/${sentry.projectId}`)
  .addPlugin(ngRaven, angular)
  .install();

  featuresModules.push(ngRaven.moduleName);
}

/**
 * @ngdoc overview
 * @name contentEngineAdmin
 * @description
 * This is the app main module, it loads all the other modules and dependencies.
 * If you are looking for the main component, that's on the `root` module.
 */
angular.module('contentEngineAdmin', [
  ...featuresModules,
  'angulartics',
  angularticsGA,
  'dndLists',
  'infinite-scroll',
  'ngFileUpload',
  'ngPatternRestrict',
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  advocates,
  collections,
  common,
  contentUploader,
  externalApp,
  library,
  ods,
  rightsMessages,
  root,
  scheduler,
  settings,
  user,
  whitelist,
])
.config(routeProviderConfig)
.constant('appConfiguration', appConfiguration)
.constant('NAVIGATION', NAVIGATION);
