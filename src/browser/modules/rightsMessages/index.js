import angular from 'angular';

import rightsMessages from './components/rightsMessages/rightsMessages.component';
import rightsMessagesForm from './components/rightsMessagesForm/rightsMessagesForm.component';

import rightsMessagesContainer from './containers/rightsMessages.container';

import RIGHTSMESSAGES_EVENTS from './constants/events.constant';
import RIGHTSMESSAGES_MESSAGE from './constants/message.constant';
import RIGHTSMESSAGES_NETWORKS from './constants/networks.constant';

import trackingEvents from './eventsSubscribers/trackingEvents';

/**
 * @ngdoc overview
 * @name rightsMessages
 * @description
 * This is the application rights messages module, it displays the rights messages section.
 */
const rightsMessagesModule = angular.module('rightsMessages', [])
.component('rightsMessages', rightsMessages)
.component('rightsMessagesForm', rightsMessagesForm)
.component('rightsMessagesContainer', rightsMessagesContainer)
.constant('RIGHTSMESSAGES_EVENTS', RIGHTSMESSAGES_EVENTS)
.constant('RIGHTSMESSAGES_MESSAGE', RIGHTSMESSAGES_MESSAGE)
.constant('RIGHTSMESSAGES_NETWORKS', RIGHTSMESSAGES_NETWORKS)
.run(trackingEvents);

export default rightsMessagesModule.name;
