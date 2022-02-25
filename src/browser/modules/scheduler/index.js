import angular from 'angular';

import scheduler from './components/scheduler/scheduler.component';

import schedulerContainer from './containers/scheduler.container';

import tasksList from './services/tasksList';

/**
 * @ngdoc overview
 * @name scheduler
 * @description
 * This is the application scheduler module, it displays the scheduler section.
 */
const schedulerModule = angular.module('scheduler', [])
.component('scheduler', scheduler)
.component('schedulerContainer', schedulerContainer)
.factory('tasksList', tasksList);

export default schedulerModule.name;
