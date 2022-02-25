import template from './imageCard.html';
import './imageCard.scss';

/**
 * @ngdoc component
 * @name imageCard
 * @description
 * The image card component.
 *
 * @memberof contentUploader
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
   *
   * @property {Object}   image          The media to be displayed.
   * @property {Function} onImageDelete  Callback for when images are deleted.
   * @property {Function} onModalOpen    Callback to open the edit modal.
   */
  bindings: {
    image: '<',
    onImageDelete: '&',
    onModalOpen: '&',
  },
};
