import template from './mediaInfoModal.html';
import './mediaInfoModal.scss';

import videoAspectRatioLandscapeIcon from '../../../../assets/images/videoAspectRatioLandscape.svg';
import videoAspectRatioPortraitIcon from '../../../../assets/images/videoAspectRatioPortrait.svg';
import videoAspectRatioSquareIcon from '../../../../assets/images/videoAspectRatioSquare.svg';

/**
 * @ngdoc controller
 * @name MediaInfoModal
 * @description
 * This component renders the modal media info.
 *
 * @memberof library
 */
class MediaInfoModal {
  constructor() {
    /**
     * The first media of the list of media to display.
     *
     * @type {Object}
     */
    this.firstMedia = {};
    /**
     * The map of rights status of the media. It is used to display a
     * summarize rights status text of the bulk selected media.
     *
     * @type {Object}
     * @property {Number} NOT-REQUESTED           The number of media with no rights.
     * @property {Number} REQUESTED               The number of media with rights pending.
     * @property {Number} GIVEN                   The number of media with rights approved.
     * @property {Number} RIGHTS-REQUEST-EXPIRED  The number of media with rights expired.
     */
    this.mediaRightsStatusMap = {};
    /**
     * Reference to the video aspect ratio landscape icon.
     *
     * @type {String}
     */
    this.videoAspectRatioLandscapeIcon = videoAspectRatioLandscapeIcon;
    /**
     * Reference to the video aspect ratio portrait icon.
     *
     * @type {String}
     */
    this.videoAspectRatioPortraitIcon = videoAspectRatioPortraitIcon;
    /**
     * Reference to the video aspect ratio square icon.
     *
     * @type {String}
     */
    this.videoAspectRatioSquareIcon = videoAspectRatioSquareIcon;
  }
  /**
   * Each time the media binding changes, update the firstMedia variable.
   *
   * @param {Object} changes        The binding changes.
   * @param {Object} changes.media  The media change object.
   */
  $onChanges({ media }) {
    if (media && media.currentValue && this.media) {
      [this.firstMedia] = this.media;

      this.mediaRightsStatusMap = {};
      this.media.forEach((item) => {
        const rightsStatus = item.rights_data.status;
        const rightsStatusCount = this.mediaRightsStatusMap[rightsStatus];

        this.mediaRightsStatusMap[rightsStatus] = rightsStatusCount ? rightsStatusCount + 1 : 1;
      });
    }
  }
}

/**
 * @ngdoc component
 * @name mediaInfoModal
 * @description
 * The modal media info component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaInfoModal}
   */
  controller: MediaInfoModal,
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
   * @property {Boolean}  hasAutomaticKeywords      If the customer has automatic keywords enabled.
   * @property {Boolean}  hasKeywordsActionEnabled  If the customer has the tagging action enabled or not.
   * @property {Boolean}  hasKeywordsEnabled        If the customers has keywords enabled or not.
   * @property {Boolean}  isBulk                    If the modal is in bulk view.
   * @property {Array}    media                     The list of media to display.
   * @property {Function} onAddKeyword              The callback to add a new keyword to the media. It receives the
   *                                                media and keyword to add.
   * @property {Function} onRemoveKeyword           The callback to remove a keyword to the media. It receives the
   *                                                media and keyword to remove.
   * @property {Function} onSearchForKeywords       The callback to search for suggestions. It receives the
   *                                                search text.
   */
  bindings: {
    hasAutomaticKeywords: '<',
    hasKeywordsActionEnabled: '<',
    hasKeywordsEnabled: '<',
    isBulk: '<',
    media: '<',
    onAddKeyword: '&',
    onRemoveKeyword: '&',
    onSearchForKeywords: '&',
  },
};
