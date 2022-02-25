import angular from 'angular';

import whitelistComponent from './components/whitelist/whitelist.component';
import whitelistCalendarComponent from './components/whitelistCalendar/whitelistCalendar.component';
import whitelistFormComponent from './components/whitelistForm/whitelistForm.component';
import whitelistLabelComponent from './components/whitelistLabel/whitelistLabel.component';
import whitelistModalComponent from './components/whitelistModal/whitelistModal.component';
import whitelistTableComponent from './components/whitelistTable/whitelistTable.component';

import whitelistContainer from './containers/whitelist.container';

import WHITELIST_SEARCH_CRITERIA from './constants/searchCriteria.constant';
import WHITELIST_SORT from './constants/sort.constant';
import WHITELIST_SOURCES from './constants/sources.constant';
import WHITELIST_STATUSES from './constants/statuses.constant';

import Whitelist from './services/whitelist';

/**
 * @ngdoc overview
 * @name whitelist
 * @description
 * This is the application whitelist module, it displays the whitelist section.
 */
const whitelistModule = angular.module('whitelist', [])
.component('whitelist', whitelistComponent)
.component('whitelistCalendar', whitelistCalendarComponent)
.component('whitelistForm', whitelistFormComponent)
.component('whitelistLabel', whitelistLabelComponent)
.component('whitelistModal', whitelistModalComponent)
.component('whitelistTable', whitelistTableComponent)
.component('whitelistContainer', whitelistContainer)
.constant('WHITELIST_SEARCH_CRITERIA', WHITELIST_SEARCH_CRITERIA)
.constant('WHITELIST_SORT', WHITELIST_SORT)
.constant('WHITELIST_SOURCES', WHITELIST_SOURCES)
.constant('WHITELIST_STATUSES', WHITELIST_STATUSES)
.factory('whitelist', Whitelist);

export default whitelistModule.name;
