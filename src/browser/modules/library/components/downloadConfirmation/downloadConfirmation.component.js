import template from './downloadConfirmation.html';
import './downloadConfirmation.scss';

/**
 * @ngdoc component
 * @name downloadConfirmation
 * @description
 * The download confirmation component.
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
   * @property {Boolean}  hasMediaFromYoutube    Flag to indicate if we are downloading media from youtube.
   * @property {Boolean}  hasMediaWithoutRights  Flag to indicate if we are downloading media without rights.
   * @property {Boolean}  isMediaFiltered        Flag to indicate if the media was filtered.
   * @property {Number}   mediaToDownload        The count of filtered media to download.
   * @property {Boolean}  showWaitWarning        Flag to indicate if we have to display the wait warning.
   * @property {Number}   totalMedia             The count of total media to download before filtering.
   */
  bindings: {
    hasMediaFromYoutube: '<',
    hasMediaWithoutRights: '<',
    isMediaFiltered: '<',
    mediaToDownload: '<',
    showWaitWarning: '<',
    totalMedia: '<',
  },
};
