import angular from 'angular';
import compareVersions from 'compare-versions';
import { EventsHub } from 'wootils/shared';
import extend from 'extend';
import fileSaver from 'file-saver';
import moment from 'moment';
import twitterText from 'twitter-text';

import mediaKeywords from './components/mediaKeywords/mediaKeywords.component';
import mediaTaggingModal from './components/mediaTaggingModal/mediaTaggingModal.component';
import schedulerModal from './components/schedulerModal/schedulerModal.component';
import unauthorizedMessage from './components/unauthorizedMessage/unauthorizedMessage.component';

import uiMessagesContainer from './containers/uiMessages.container';
import unauthorizedContainer from './containers/unauthorized.container';

import ACTIVATION_MAP from './constants/activationMap.constant';

import clickOutside from './directives/clickOutside';
import copyToClipboard from './directives/copyToClipboard';
import elastic from './directives/elastic';
import focusOn from './directives/focusOn';
import validatorFunctions from './directives/validatorFunctions';

import expireSession from './eventsSubscribers/expireSession';
import locationOverload from './eventsSubscribers/locationOverload';
import rightsExtension from './eventsSubscribers/rightsExtension';
import routesAuthorization from './eventsSubscribers/routesAuthorization';
import setToken from './eventsSubscribers/setToken';

import capitalize from './filters/capitalize';
import htmlToPlaintext from './filters/htmlToPlaintext';

import AnalyticsExportAPI from './services/analyticsExportAPI';
import AppAPI from './services/appAPI';
import AppErrorHandler from './services/appErrorHandler';
import AppRouting from './services/appRouting';
import AppSession from './services/appSession';
import AppSessionCapabilities from './services/appSessionCapabilities';
import AppTitle from './services/appTitle';
import AppUtils from './services/appUtils';
import CustomerAvatarUploader from './services/customerAvatarUploader';
import FullStory from './services/fullStory';
import Heap from './services/heapAnalytics';
import Intercom from './services/intercom';
import KeywordsList from './services/keywordsList';
import MediaList from './services/mediaList';
import RightsExtension from './services/rightsExtension';
import RightsMessagesList from './services/rightsMessagesList';
import SocialAccountsList from './services/socialAccountsList';
import SocialMentionsAccountsList from './services/socialMentionsAccountsList';
import StreamsList from './services/streamsList';
import Tracking from './services/tracking';
import UIMessages from './services/uiMessages';
import UploaderAPI from './services/uploaderAPI';
import WaitForExternalLibrary from './services/waitForExternalLibrary';

/**
 * @ngdoc overview
 * @name common
 * @description
 * This is the application common module.
 */
const commonModule = angular.module('common', [])
.component('mediaKeywords', mediaKeywords)
.component('mediaTaggingModal', mediaTaggingModal)
.component('schedulerModal', schedulerModal)
.component('unauthorizedMessage', unauthorizedMessage)
.component('uiMessagesContainer', uiMessagesContainer)
.component('unauthorizedContainer', unauthorizedContainer)
.constant('ACTIVATION_MAP', ACTIVATION_MAP)
.directive('olapicClickOutside', clickOutside)
.directive('olapicCopyToClipboard', copyToClipboard)
.directive('olapicElastic', elastic)
.directive('olapicFocusOn', focusOn)
.directive('olapicValidatorFunctions', validatorFunctions)
.factory('compareVersions', () => compareVersions)
.factory('extend', () => extend)
.factory('fileSaver', () => fileSaver)
.factory('keywordsList', KeywordsList)
.factory('mediaList', MediaList)
.factory('moment', () => moment)
.factory('rightsMessagesList', RightsMessagesList)
.factory('socialAccountsList', SocialAccountsList)
.factory('socialMentionsAccountsList', SocialMentionsAccountsList)
.factory('streamsList', StreamsList)
.factory('twitterText', () => twitterText)
.filter('capitalize', capitalize)
.filter('htmlToPlaintext', htmlToPlaintext)
.service('analyticsExportAPI', AnalyticsExportAPI)
.service('appAPI', AppAPI)
.service('appErrorHandler', AppErrorHandler)
.service('appEvents', EventsHub)
.service('appRouting', AppRouting)
.service('appSession', AppSession)
.service('appSessionCapabilities', AppSessionCapabilities)
.service('appTitle', AppTitle)
.service('appUtils', AppUtils)
.service('customerAvatarUploader', CustomerAvatarUploader)
.service('fullStory', FullStory)
.service('heap', Heap)
.service('intercom', Intercom)
.service('rightsExtension', RightsExtension)
.service('tracking', Tracking)
.service('uiMessages', UIMessages)
.service('uploaderAPI', UploaderAPI)
.service('waitForExternalLibrary', WaitForExternalLibrary)
.run(expireSession)
.run(locationOverload)
.run(rightsExtension)
.run(routesAuthorization)
.run(setToken);

export default commonModule.name;
