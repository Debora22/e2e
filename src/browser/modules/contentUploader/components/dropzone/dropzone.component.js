import template from './dropzone.html';
import './dropzone.scss';

/**
 * @ngdoc component
 * @name dropzone
 * @description
 * The dropzone component.
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
   * @property {Array}    mediaTypes       The list of accepted media types.
   * @property {Function} onFilesSelected  Callback for when files are dropped or selected.
   */
  bindings: {
    mediaTypes: '<',
    onFilesSelected: '&',
  },
};
