import template from './advocatesRow.html';
import './advocatesRow.scss';

/**
 * @ngdoc controller
 * @name AdvocatesMediaCard
 * @description
 * This component renders the Advocates Media Card.
 *
 * @memberof advocates
 */
class AdvocatesRow {
  /**
   * @param {$element} $element  To get the component element.
   * @param {$window}  $window   To add the resize listener.
   */
  constructor($element, $window) {
    'ngInject';

    /**
     * The local reference to the `element` object.
     *
     * @type {Object}
     */
    [this.element] = Array.from($element);
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The number of max medias before showing the slider.
     *
     * @type {Number}
     */
    this.maxMediasSlider = 3;
    /**
     * The width the slide has to move to slide one media.
     *
     * @type {Number}
     */
    this.sliderMoveWidth = 294;
    /**
     * The position of the slider.
     *
     * @type {Number}
     */
    this.sliderPosition = 0;
    /**
     * @ignore
     */
    this.onWindowResize = this.onWindowResize.bind(this);
  }
  /**
   * Add the resize listener.
   */
  $onInit() {
    this.onWindowResize();
    this.$window.addEventListener('resize', this.onWindowResize);
  }
  /**
   * Remove the resize listener on destroy.
   */
  $destroy() {
    this.$window.removeEventListener('resize', this.onWindowResize);
  }
  /**
   * Move the slider in the given direction.
   *
   * @param {Boolean} forward  If we are moving forward or not.
   */
  moveSlider(forward) {
    const move = (forward ? 1 : -1) * (this.maxMediasSlider - 1);
    let newPosition = this.sliderPosition + move;

    if (newPosition >= this.advocate.media.length) {
      newPosition = this.sliderPosition;
    } else if (newPosition < 0) {
      newPosition = 0;
    }

    this.sliderPosition = newPosition;
  }
  /**
   * Recalculate the number of max medias before showing the slider on window resize.
   */
  onWindowResize() {
    const container = this.element.querySelector('.advocatesRow_content_container');

    this.maxMediasSlider = Math.floor(container.clientWidth / this.sliderMoveWidth) + 1;
  }
}

/**
 * @ngdoc component
 * @name advocatesRow
 * @description
 * This component displays a advocates row.
 *
 * @memberof advocates
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Advocates}
   */
  controller: AdvocatesRow,
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
   * @property {Object}  advocate        The advocate's data.
   * @property {String}  currencySymbol  The currency symbol.
   * @property {Boolean} isFocusRevenue  If the customer is revenue focused.
   * @property {Object}  tooltips        The list of tooltips to show.
   */
  bindings: {
    advocate: '<',
    currencySymbol: '<',
    isFocusRevenue: '<',
    tooltips: '<',
  },
};
