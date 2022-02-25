/**
 * @ngdoc constant
 * @name APP_EVENTS
 * @description
 * Object of app events.
 *
 * @type {Object}
 * @property {Object} session               The session app events.
 * @property {String} session.unauthorized  The unauthorized session event.
 *
 * @memberof rootModule
 */
const appEvents = {
  session: {
    unauthorized: 'appEvents:sessionUnauthorized',
  },
};

export default appEvents;
