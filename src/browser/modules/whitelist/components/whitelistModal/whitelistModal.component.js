import template from './whitelistModal.html';
import './whitelistModal.scss';

/**
 * @ngdoc component
 * @name whitelistModal
 * @description
 * The modal for whitelist users bulk add component.
 *
 * @memberof whitelist
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
   * @property {Array}    usernames  The list of usernames to bind to the modal.
   * @property {Function} onCancel   Callback when closing and canceling any edition to the modal.
   * @property {Function} onSubmit   Callback when saving the changes in modal.
   */
  bindings: {
    usernames: '<',
    onCancel: '&',
    onSubmit: '&',
  },
};
