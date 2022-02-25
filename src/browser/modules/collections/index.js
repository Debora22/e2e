import angular from 'angular';

import collections from './components/collections/collections.component';
import collectionsForm from './components/collectionsForm/collectionsForm.component';

import collectionsContainer from './containers/collections.container';

import COLLECTIONS_BASE_TYPES from './constants/baseTypes.constant';
import COLLECTIONS_PROFILE from './constants/profile.constant';
import COLLECTIONS_RULE_OPERATORS from './constants/ruleOperators.constant';
import COLLECTIONS_RULE_TYPES from './constants/ruleTypes.constant';
import COLLECTIONS_SORT from './constants/sort.constant';
import COLLECTIONS_STATUS_FILTERS from './constants/statusFilters.constant';

import CollectionsList from './services/collectionsList';

/**
 * @ngdoc overview
 * @name collections
 * @description
 * This is the application collections module, it displays the collections section.
 */
const collectionsModule = angular.module('collections', [])
.component('collections', collections)
.component('collectionsForm', collectionsForm)
.component('collectionsContainer', collectionsContainer)
.constant('COLLECTIONS_BASE_TYPES', COLLECTIONS_BASE_TYPES)
.constant('COLLECTIONS_PROFILE', COLLECTIONS_PROFILE)
.constant('COLLECTIONS_RULE_OPERATORS', COLLECTIONS_RULE_OPERATORS)
.constant('COLLECTIONS_RULE_TYPES', COLLECTIONS_RULE_TYPES)
.constant('COLLECTIONS_SORT', COLLECTIONS_SORT)
.constant('COLLECTIONS_STATUS_FILTERS', COLLECTIONS_STATUS_FILTERS)
.factory('collectionsList', CollectionsList);

export default collectionsModule.name;
