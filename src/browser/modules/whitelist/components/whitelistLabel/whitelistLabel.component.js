import template from './whitelistLabel.html';
import './whitelistLabel.scss';

/**
 * @ngdoc controller
 * @name WhitelistLabel
 * @description
 * This component renders the whitelist's label input.
 *
 * @memberof whitelist
 */
class WhitelistLabel {
  constructor() {
    /**
     * Flag to show or hide the Label input component.
     *
     * @type {Boolean}
     */
    this.showLabelInput = false;
  }
  /**
   * Triggered the user press the enter or escape key from the input.
   *
   * @param {Object} $event  The key pressed event.
   */
  onKeydown($event) {
    const enterKeyCode = 13;
    const escapeKeyCode = 27;

    if ($event.keyCode === enterKeyCode || $event.keyCode === escapeKeyCode) {
      this.onToggleLabelVisibility();
    }
  }
  /**
   * Toggles the Label input visibility.
   */
  onToggleLabelVisibility() {
    this.showLabelInput = !this.showLabelInput;
  }
}

/**
 * @ngdoc component
 * @name whitelistLabel
 * @description
 * The label input component.
 *
 * @memberof whitelist
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {WhitelistLabel}
   */
  controller: WhitelistLabel,
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
   * @property {String}   labels              Value for the label input.
   * @property {Function} onLabelsSet         Callback when the user selects a label.
   * @property {Function} onToggleVisibility  Callback to toggle element visibility.
   */
  bindings: {
    labels: '<',
    onLabelsSet: '&',
    onToggleVisibility: '&',
  },
};
