import template from './advocatesMediaCard.html';
import './advocatesMediaCard.scss';

/**
 * @ngdoc controller
 * @name AdvocatesMediaCard
 * @description
 * This component renders the Advocates Media Card.
 *
 * @memberof advocates
 */
class AdvocatesMediaCard {
  constructor() {
    /**
     * Flag that indicates if the details are visible.
     *
     * @type {Boolean}
     */
    this.isDetailVisible = false;
  }
  /**
   * Toggle the visibility of the detail mode.
   */
  onToggleDetailVisibility() {
    this.isDetailVisible = !this.isDetailVisible;
  }
}

/**
 * @ngdoc component
 * @name advocatesMediaCard
 * @description
 * The advocatesMediaCard component.
 *
 * @memberof advocates
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Advocates}
   */
  controller: AdvocatesMediaCard,
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
   * @property {Boolean} isFocusRevenue  If the customer is revenue focused.
   * @property {String}  currencySymbol  The currency symbol.
   * @property {Object}  mediaData       The media's data.
   */
  bindings: {
    isFocusRevenue: '<',
    currencySymbol: '<',
    mediaData: '<',
  },
};
