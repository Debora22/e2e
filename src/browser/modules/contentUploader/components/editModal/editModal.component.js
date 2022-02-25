import template from './editModal.html';
import './editModal.scss';

/**
 * @ngdoc controller
 * @name EditModal
 * @description
 * This component renders the edit modal.
 *
 * @memberof contentUploader
 */
class EditModal {
  constructor() {
    /**
     * The caption to be saved.
     *
     * @type {String}
     */
    this.mediaCaption = '';
    /**
     * The file extension of the shown media.
     *
     * @type {String}
     */
    this.mediaExtension = '';
    /**
     * The size in MB of the media shown.
     *
     * @type {Number}
     */
    this.mediaSizeInMB = 0;
  }
  /**
   * Each time the media binding changes, update the sizeInMB variable.
   *
   * @param {Object} changes        The binding changes.
   * @param {Object} changes.media  The media change object.
   */
  $onChanges({ media }) {
    if (media && media.currentValue && this.media) {
      const bytesInKB = 1024;
      this.mediaSizeInMB = (this.media.size / (bytesInKB * bytesInKB)).toFixed(0);
      this.mediaExtension = this.media.type.split('/').pop();
      this.mediaCaption = this.media.caption;
    }
  }
}
/**
 * @ngdoc component
 * @name editModal
 * @description
 * The edit modal component.
 *
 * @memberof contentUploader
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {EditModal}
   */
  controller: EditModal,
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
   * @property {Object}   media         The media to be edited.
   * @property {Function} onMediaSave   The callback to save changes made in the modal.
   * @property {Function} onModalClose  The callback for closing the modal.
   */
  bindings: {
    media: '<',
    onMediaSave: '&',
    onModalClose: '&',
  },
};
