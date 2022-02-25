import template from './mediaSharingLink.html';
import './mediaSharingLink.scss';

/**
 * @ngdoc controller
 * @name MediaSharingLink
 * @description
 * This component renders the media sharing link.
 *
 * @memberof library
 */
class MediaSharingLink {
  constructor() {
    /**
     * The error message to show when an error occurred.
     *
     * @type {?String}
     */
    this.errorMessage = null;
    /**
     * The map of Instagram Business Accounts errors that can be displayed.
     *
     * @type {Object}
     */
    this.shareLinkErrorsTypes = {
      isVideo: 'isVideo',
      noMediaSelected: 'noMediaSelected',
    };
  }
  /**
   * Each time the selectedMedia bindings changes, check the publishing state in order to
   * generate the correct error message.
   *
   * @param {Object} changes                The binding changes.
   * @param {Object} changes.selectedMedia  The selectedMedia change object.
   */
  $onChanges({ selectedMedia }) {
    if (selectedMedia && selectedMedia.currentValue) {
      if (!this.selectedMediaCount) {
        this.errorMessage = this.shareLinkErrorsTypes.noMediaSelected;
      } else if (this._isSharingVideo()) {
        this.errorMessage = this.shareLinkErrorsTypes.isVideo;
      } else {
        this.errorMessage = null;
      }
    }
  }
  /**
   * Check if any of the selected media to be shared is a video.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _isSharingVideo() {
    return this.media.filter((item) => this.selectedMedia[item.id])
    .some((item) => item.video_url);
  }
}

/**
 * @ngdoc component
 * @name mediaSharingLink
 * @description
 * The media sharing link component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaSharingLink}
   */
  controller: MediaSharingLink,
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
   * @property {String}  helpUrl             The help URL to link the Help button.
   * @property {Array}   media               The list of media.
   * @property {Boolean} isLoadingLink       Flag to indicate if sharing link is loading.
   * @property {Object}  selectedMedia       The map of selected media.
   * @property {Number}  selectedMediaCount  The count of selected media.
   * @property {String}  sharingUrl          The URL to sharing media.
   */
  bindings: {
    helpUrl: '<',
    media: '<',
    isLoadingLink: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    sharingUrl: '<',
  },
};
