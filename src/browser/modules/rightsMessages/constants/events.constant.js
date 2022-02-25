/**
 * @ngdoc constant
 * @name RIGHTSMESSAGES_EVENTS
 * @description
 * The events for the rights messages section.
 *
 * @type {Object}
 * @property {Object} navigation  The navigation events.
 * @property {Object} form        The form events.
 *
 * @memberof rightsMessages
 */
const rightsMessagesEvents = {
  navigation: {
    addMessage: 'contentengineadmin:rightsmessages:navigation:addmessage:click',
    create: 'contentengineadmin:rightsmessages:navigation:create:click',
    deleteGroup: 'contentengineadmin:rightsmessages:navigation:deletegroup:click',
    deleteMessage: 'contentengineadmin:rightsmessages:navigation:deletemessage:click',
    edit: 'contentengineadmin:rightsmessages:navigation:edit:click',
    expandGroup: 'contentengineadmin:rightsmessages:navigation:expandgroup:click',
  },
  form: {
    addMessage: 'contentengineadmin:rightsmessages:form:addmessage:click',
    back: 'contentengineadmin:rightsmessages:form:back:click',
    next: 'contentengineadmin:rightsmessages:create:next:click',
    save: 'contentengineadmin:rightsmessages:form:save:click',
  },
};

export default rightsMessagesEvents;
