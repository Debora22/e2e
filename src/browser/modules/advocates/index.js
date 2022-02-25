import angular from 'angular';

import advocates from './components/advocates/advocates.component';
import advocatesMediaCard from './components/advocatesMediaCard/advocatesMediaCard.component';
import advocatesRow from './components/advocatesRow/advocatesRow.component';

import advocatesContainer from './containers/advocates.container';

import ADVOCATES_DATE_RANGE_OPTIONS from './constants/dateRange.constant';
import ADVOCATES_SORT_ENGAGEMENT from './constants/sortEngagement.constant';
import ADVOCATES_SORT_REVENUE from './constants/sortRevenue.constant';
import ADVOCATES_TOOLTIPS from './constants/tooltips.constant';

import AdvocatesList from './services/advocatesList';

/**
 * @ngdoc overview
 * @name advocates
 * @description
 * This is the application advocates module, it displays the advocates section.
 */
const advocatesModule = angular.module('advocates', [])
.component('advocates', advocates)
.component('advocatesContainer', advocatesContainer)
.component('advocatesMediaCard', advocatesMediaCard)
.component('advocatesRow', advocatesRow)
.constant('ADVOCATES_DATE_RANGE_OPTIONS', ADVOCATES_DATE_RANGE_OPTIONS)
.constant('ADVOCATES_SORT_ENGAGEMENT', ADVOCATES_SORT_ENGAGEMENT)
.constant('ADVOCATES_SORT_REVENUE', ADVOCATES_SORT_REVENUE)
.constant('ADVOCATES_TOOLTIPS', ADVOCATES_TOOLTIPS)
.factory('advocatesList', AdvocatesList);

export default advocatesModule.name;
