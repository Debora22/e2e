/* eslint-disable angular/on-watch */

/**
 * @ngdoc overview
 * @name trackingEvents
 * @description
 * Track the rights messages events on Google Analytics.
 *
 * @param {$rootScope} $rootScope             To subscribe to the rights messages events.
 * @param {Tracking}   tracking               To track events on Google Analytics.
 * @param {Object}     RIGHTSMESSAGES_EVENTS  The name of the events the method needs to listen for.
 *
 * @memberof rightsMessages
 */
const trackingEvents = (
  $rootScope,
  tracking,
  RIGHTSMESSAGES_EVENTS,
) => {
  'ngInject';

  const subscriptions = [
    $rootScope.$on(RIGHTSMESSAGES_EVENTS.navigation.addMessage, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'navigation_addmessage_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.navigation.create, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'navigation_create_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.navigation.deleteGroup, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'navigation_deletegroup_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.navigation.deleteMessage, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'navigation_deletemessage_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.navigation.edit, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'navigation_edit_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.navigation.expandGroup, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'navigation_expandgroup_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.form.addMessage, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'create_addmessage_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.form.back, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'create_back_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.form.next, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'create_next_click',
      });
    }),

    $rootScope.$on(RIGHTSMESSAGES_EVENTS.form.save, () => {
      tracking.trackEvent({
        category: 'rightsmessages',
        action: 'create_save_click',
      });
    }),
  ];

  $rootScope.$on('$destroy', () => {
    subscriptions.forEach((unsubscribeFn) => unsubscribeFn());
  });
};

export default trackingEvents;
