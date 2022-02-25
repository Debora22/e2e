import template from './mediaRightsExtension.html';
import './mediaRightsExtension.scss';

/**
 * @ngdoc controller
 * @name mediaRightsExtension
 * @description
 * This component renders the media rights extension.
 *
 * @memberof library
 */
class MediaRightsExtension {
  constructor() {
    /**
     * The the list of rights messages groups to be used to ask for rights.
     *
     * @type {Object}
     */
    this.rightsMessageGroups = [];
    /**
     * The selected rights message group.
     *
     * @type {?Object}
     */
    this.selectedRightsMessageGroup = null;
    /**
     * Flag that indicates if the Instagram profile exist in the social mentions accounts.
     *
     * @type {Boolean}
     */
    this.profileExistInSocialMentionsAccounts = false;
    /**
     * Flag that indicates if we should only use the rights message for PII consent.
     *
     * @type {Boolean}
     */
    this.onlyPIIMessage = false;
  }
  /**
   * Each time the media binding changes, check if we should only use the rights message for PII consent.
   * Each time the instagramProfile or socialMentionsAccounts binding changes, check if the Instagram
   * profile exist in the list of social mentions accounts.
   * Each time the rightsMessages binding changes, refresh the rights messages.
   *
   * @param {Object} changes                         The binding changes.
   * @param {Object} changes.media                   The media change object.
   * @param {Object} changes.instagramProfile        The instagramProfile change object.
   * @param {Object} changes.rightsMessages          The rightsMessages change object.
   * @param {Object} changes.socialMentionsAccounts  The socialMentionsAccounts change object.
   */
  $onChanges({
    media,
    instagramProfile,
    rightsMessages,
    socialMentionsAccounts,
  }) {
    if (
      media &&
      media.currentValue
    ) {
      this._checkIfOnlyPIIMessage();
    }

    if (
      (instagramProfile && instagramProfile.currentValue) ||
      (socialMentionsAccounts && socialMentionsAccounts.currentValue)
    ) {
      this._checkIfProfileExistInSocialMentionsAccounts();
    }

    if (
      rightsMessages &&
      rightsMessages.currentValue
    ) {
      this._refreshRightsMessages();
    }
  }
  /**
   * When a new rights message group is selected, we set that group as selected.
   *
   * @param {Object} rightsMessageGroup  The rights message group to set as selected.
   */
  onRightsMessageGroupSelected(rightsMessageGroup) {
    if (rightsMessageGroup.id) {
      this.selectedRightsMessageGroup = rightsMessageGroup;
    } else {
      this.onGoToRightsMessages();
    }
  }
  /**
   * Check if we should only use the rights message for PII consent.
   */
  _checkIfOnlyPIIMessage() {
    if (this.media.list) {
      this.onlyPIIMessage = !this.media.list.some((entity) => (
        !entity.streams.length ||
        entity.streams.every((stream) => stream.name !== this.piiConsentStream)
      ));
    }
  }
  /**
   * Check if the Instagram profile exist in the list of social mentions accounts.
   */
  _checkIfProfileExistInSocialMentionsAccounts() {
    if (this.instagramProfile && this.socialMentionsAccounts) {
      const index = this.socialMentionsAccounts
      .findIndex((socialMentionsAccounts) => socialMentionsAccounts.username === this.instagramProfile.name);

      this.profileExistInSocialMentionsAccounts = index >= 0;
    } else {
      this.profileExistInSocialMentionsAccounts = false;
    }
  }
  /**
   * Generate the list of valid Instagram rights messages groups.
   * Then set the first rights messages group as the selected one.
   */
  _refreshRightsMessages() {
    if (this.rightsMessages) {
      this.rightsMessageGroups = this.rightsMessages
      .filter((group) => group.details.instagram.valid);

      const [firstRightsMessageGroup] = this.rightsMessageGroups;
      if (firstRightsMessageGroup) {
        this.onRightsMessageGroupSelected(firstRightsMessageGroup);
      }

      if (!this.rightsMessageGroups.length) {
        this.rightsMessageGroups.push({
          id: 0,
          name: 'Create Rights Messages',
          type: 'link',
        });
      }
    }
  }
}

/**
 * @ngdoc component
 * @name MediaRightsExtension
 * @description
 * The media rights extension.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaRightsExtension}
   */
  controller: MediaRightsExtension,
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
   * @property {String}   piiConsentStream         The stream that identifies a media for PII consent.
   * @property {String}   rightsExtensionId        The rights extension id.
   * @property {Boolean}  hasApproveActionEnabled  If the customer has the approve action enabled or not.
   * @property {Object}   instagramProfile         The connected instagram profile.
   * @property {Boolean}  isBulk                   If we have to display in bulk.
   * @property {Boolean}  isExtensionInstalled     If the rights extension is installed or not.
   * @property {Boolean}  isExtensionUpToDate      If the rights extension is up to date or not.
   * @property {Object}   media                    The map of media to show in the rights extension.
   * @property {Array}    rightsMessages           The list of rights messages to be used to ask for rights.
   * @property {Object}   selectedCountMap         The map of the number of selected media.
   * @property {Array}    socialMentionsAccounts   The list of social mentions accounts to be used to ask for rights.
   * @property {Function} onGoToRightsMessages     Callback for when we want to go to the rights messages page.
   * @property {Function} onGoToSocialAccounts     Callback for when we want to go to the social accounts page.
   * @property {Function} onOpenRightsExtension    Callback for when we want to open the rights extension.
   *                                               It receives the media to open and the selected rights message group.
   */
  bindings: {
    piiConsentStream: '@',
    rightsExtensionId: '@',
    hasApproveActionEnabled: '<',
    instagramProfile: '<',
    isBulk: '<',
    isExtensionInstalled: '<',
    isExtensionUpToDate: '<',
    media: '<',
    rightsMessages: '<',
    selectedCountMap: '<',
    socialMentionsAccounts: '<',
    onGoToRightsMessages: '&',
    onGoToSocialAccounts: '&',
    onOpenRightsExtension: '&',
  },
};
