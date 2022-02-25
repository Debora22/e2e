import template from './settingsInstructionsModal.html';
import './settingsInstructionsModal.scss';

/**
 * @ngdoc component
 * @name settingsInstructionsModal
 * @description
 * This component renders the settings instructionss modal.
 *
 * @memberof settings
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
   * @property {String}   instructions  The checkout pixel instructions.
   * @property {Function} onClose       Callback when closing and canceling any edition to the modal.
   */
  bindings: {
    instructions: '<',
    onClose: '&',
  },
};
