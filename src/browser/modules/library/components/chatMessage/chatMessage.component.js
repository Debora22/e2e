import template from './chatMessage.html';
import './chatMessage.scss';

/**
 * @ngdoc component
 * @name chatMessage
 * @description
 * The chat message component.
 */
export default {
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template,
  /**
   * Component bindings.
   *
   * @type {Object}
   * @property {String}  message     The message to be displayed.
   * @property {Boolean} onRight     Whether the message should be aligned to the right or not.
   * @property {String}  userAvatar  The picture to be shown.
   * @property {String}  userName    The username to display next to the avatar.
   */
  bindings: {
    message: '<',
    onRight: '<',
    userAvatar: '<',
    userName: '<',
  },
};
