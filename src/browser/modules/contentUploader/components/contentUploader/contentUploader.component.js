import template from './contentUploader.html';
import './contentUploader.scss';

/**
 * @ngdoc component
 * @name contentUploader
 * @description
 * This component displays the content uploader section.
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
   * @property {Boolean}  hasModerationServices       Whether the customer has moderation services active or not.
   * @property {Array}    media                       The media to be uploaded.
   * @property {Array}    mediaTypes                  The list of accepted media types.
   * @property {Boolean}  skipModerationServices      Whether the media is going through premoderation or not.
   * @property {Object}   uploadedMedia               The media uploaded in this session and its success message.
   * @property {Object}   user                        The user used to upload the media.
   * @property {Function} onMediaAdd                  Callback to add more media to the list.
   * @property {Function} onMediaDelete               Callback to delete a media from the list.
   * @property {Function} onMediaUpload               Callback to upload the list of media.
   * @property {Function} onModalOpen                 Callback to open the edit modal.
   * @property {Function} onModerationCheckboxToggle  Callback to switch between skipping premoderation or not.
   */
  bindings: {
    hasModerationServices: '<',
    media: '<',
    mediaTypes: '<',
    skipModerationServices: '<',
    uploadedMedia: '<',
    user: '<',
    onMediaAdd: '&',
    onMediaDelete: '&',
    onMediaUpload: '&',
    onModalOpen: '&',
    onModerationCheckboxToggle: '&',
  },
};
