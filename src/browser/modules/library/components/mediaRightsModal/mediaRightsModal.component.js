import template from './mediaRightsModal.html';
import './mediaRightsModal.scss';

/**
 * @ngdoc controller
 * @name MediaRightsModal
 * @description
 * This component renders the media rights modal.
 *
 * @memberof library
 */
class MediaRightsModal {
  constructor() {
    /**
     * The first media of the list of media to show the rights information.
     *
     * @type {Object}
     */
    this.firstMedia = {};
    /**
     * Flag that indicates if we have to show the rights request and response.
     *
     * @type {Boolean}
     */
    this.showRequestResponse = false;
    /**
     * Flag that indicates if we have to show the rights request.
     *
     * @type {Boolean}
     */
    this.showRequest = false;
    /**
     * Flag that indicates if we have to show the rights response.
     *
     * @type {Boolean}
     */
    this.showResponse = false;
    /**
     * The list of rights sources for which we should show the request and response.
     *
     * @type {Array}
     * @access protected
     */
    this._rightsSourcesWithRequestResponse = [
      'chrome_extension',
      'instagram',
      'instagram_graph',
      'mention',
      'twitter',
    ];
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
      const { rights_data: rightsData } = this.firstMedia;

      this.showRequestResponse = this._rightsSourcesWithRequestResponse.includes(rightsData.source);

      this.showRequest = ['GIVEN', 'REQUESTED'].includes(rightsData.status) && (
        rightsData.request.user.username ||
        rightsData.request.message.text
      );

      this.showResponse = rightsData.status === 'GIVEN' && (
        rightsData.response.user.username ||
        rightsData.response.message
      );

      if (this.showModalApproveButton) {
        this.onToggleModalActions({ visible: false });
      }
    }
  }
  /**
   * Approve the given media.
   */
  approveMedia() {
    this.onActionClick({
      action: {
        id: 'approveModal',
        permission: {
          name: 'content.action.approve',
          phrase: 'Approve Content',
        },
      },
    });
  }
  /**
   * Get the unavailable mentions from a list of media.
   *
   * @param {Array} media  The media to get the unavailable mentions from.
   *
   * @return {String}
   */
  getUnavailableMentionsFromMedia(media) {
    const unavailableMentions = [];

    media.forEach((item) => {
      item.approvalInfo.unavailableMentions.forEach((mention) => {
        if (!unavailableMentions.includes(mention)) {
          unavailableMentions.push(mention);
        }
      });
    });

    return unavailableMentions.join(', ');
  }
}

/**
 * @ngdoc component
 * @name mediaRightsModal
 * @description
 * The media rights modal component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaRightsModal}
   */
  controller: MediaRightsModal,
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
   * @property {String}   piiConsentStream              The stream that identifies a media for PII consent.
   * @property {String}   rightsExtensionId             The rights extension id.
   * @property {Object}   approvalType                  The approval type that is on display.
   * @property {Object}   approvalTypeSelectedCountMap  The map of the number of media of the approval
   *                                                    type that is on display in the modal.
   * @property {Boolean}  hasApproveActionEnabled       If the customer has the approve action enabled or not.
   * @property {Boolean}  hasForReviewFlow              If the customer has the for review flow or not.
   * @property {Object}   instagramProfile              The connected instagram profile.
   * @property {Boolean}  isBulk                        If the modal is in bulk view.
   * @property {Boolean}  isExtensionInstalled          If the rights extension is installed or not.
   * @property {Boolean}  isExtensionUpToDate           If the rights extension is up to date or not.
   * @property {Boolean}  loading                       If the rights information is being loaded or not.
   * @property {Array}    media                         The list of media to show the rights information.
   * @property {Object}   mediaByApprovalType           The map of media by approval type.
   * @property {Object}   rightsMaxChars                The map of rights max chars configuration.
   * @property {Array}    rightsMessages                The list of rights messages to be used to ask for rights.
   * @property {Object}   rightsStatusCount             The map by approval type of media count used
   *                                                    in the rights process.
   * @property {Object}   selectedSection               The selected section.
   * @property {Boolean}  showModalApproveButton        If the approve button should be displayed or not.
   * @property {Object}   socialAccounts                The map of social accounts by network to be
   *                                                    used to ask for rights.
   * @property {Array}    socialMentionsAccounts        The list of social mentions accounts to be
   *                                                    used to ask for rights.
   * @property {Function} onActionClick                 Callback for when an action is clicked. It receives the
   *                                                    action that was clicked.
   * @property {Function} onGoToRightsMessages          Callback for when we want to go to the rights messages page.
   * @property {Function} onGoToSocialAccounts          Callback for when we want to go to the social accounts page.
   * @property {Function} onOpenRightsExtension         Callback for when we want to open the rights extension. It
   *                                                    receives the media to open and the rights message group.
   * @property {Function} onSendRightsRequest           Callback for when the rights request is sent. It receives
   *                                                    the media and the rights request information.
   * @property {Function} onToggleModalActions          Callback to show/hide main modal actions.
   * @property {Function} onValidateRightsMessage       Callback for when we want to validate the rights message.
   *                                                    It receives the rights message to validate.
   */
  bindings: {
    piiConsentStream: '@',
    rightsExtensionId: '@',
    approvalType: '<',
    approvalTypeSelectedCountMap: '<',
    hasApproveActionEnabled: '<',
    hasForReviewFlow: '<',
    instagramProfile: '<',
    isBulk: '<',
    isExtensionInstalled: '<',
    isExtensionUpToDate: '<',
    loading: '<',
    media: '<',
    mediaByApprovalType: '<',
    rightsMaxChars: '<',
    rightsMessages: '<',
    rightsStatusCount: '<',
    selectedSection: '<',
    showModalApproveButton: '<',
    socialAccounts: '<',
    socialMentionsAccounts: '<',
    onActionClick: '&',
    onGoToRightsMessages: '&',
    onGoToSocialAccounts: '&',
    onOpenRightsExtension: '&',
    onSendRightsRequest: '&',
    onToggleModalActions: '&',
    onValidateRightsMessage: '&',
  },
};
