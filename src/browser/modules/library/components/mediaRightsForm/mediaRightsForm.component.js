import template from './mediaRightsForm.html';
import './mediaRightsForm.scss';

/**
 * @ngdoc controller
 * @name MediaRightsForm
 * @description
 * This component renders the media rights form.
 *
 * @memberof library
 */
class MediaRightsForm {
  /**
   * @param {$localStorage} $localStorage  To store used rights messages information on the browser.
   * @param {TwitterText}   twitterText    To get the message length for Twitter.
   */
  constructor($localStorage, twitterText) {
    'ngInject';

    /**
     * The local reference to the `$localStorage` service.
     *
     * @type {$localStorage}
     */
    this.$localStorage = $localStorage;
    /**
     * The local reference to the `twitterText` service.
     *
     * @type {Object}
     */
    this.twitterText = twitterText;
    /**
     * The first media of the list of media to show the rights information.
     *
     * @type {Object}
     */
    this.firstMedia = {};
    /**
     * The source of the first media.
     *
     * @type {String}
     */
    this.firstMediaSource = '';
    /**
     * The the list of {@link RightsMessagesGroup} to be used to ask for rights in single.
     *
     * @type {Array}
     */
    this.singleRightsMessageGroups = [];
    /**
     * The selected single rights message group.
     *
     * @type {?RightsMessagesGroup}
     */
    this.selectedSingleRightsMessageGroup = null;
    /**
     * The the list of {@link RightsMessage} to be used to ask for rights in single.
     *
     * @type {Array}
     */
    this.singleRightsMessageTemplates = [];
    /**
     * The selected rights message template.
     *
     * @type {?RightsMessage}
     */
    this.selectedSingleRightsMessageTemplate = null;
    /**
     * The hashtag used to ask for rights in sigle.
     *
     * @type {String}
     */
    this.rightsHashtag = '';
    /**
     * The message used to ask for rights in sigle.
     *
     * @type {String}
     */
    this.rightsMessage = '';
    /**
     * The remaining chars to reach the max char in the message.
     *
     * @type {Number}
     */
    this.remainingChars = 0;
    /**
     * The the Facebook social account to be used to ask for rights.
     *
     * @type {?Object}
     */
    this.facebookSocialAccount = null;
    /**
     * The the list of Twitter social accounts to be used to ask for rights.
     *
     * @type {Object}
     */
    this.twitterSocialAccounts = [];
    /**
     * The selected Twitter social account.
     *
     * @type {?Object}
     */
    this.selectedTwitterSocialAccount = null;
    /**
     * The data to add the list of rights messages groups or templates when none exist.
     *
     * @type {Object}
     */
    this.noRightsMessages = {
      id: 0,
      name: 'Create Rights Messages',
      type: 'link',
    };
    /**
     * The error message to display.
     *
     * @type {String}
     */
    this.error = '';
    /**
     * The the list of {@link RightsMessagesGroup} to be used to ask for rights in bulk for Instagram.
     *
     * @type {Array}
     */
    this.instagramRightsMessageGroups = [];
    /**
     * The selected bulk rights message group for Instagram.
     * When the list of rights messages groups for Instagram are available, we will set the first
     * rights messages group as the selected one.
     *
     * @type {?RightsMessagesGroup}
     */
    this.selectedInstagramRightsMessageGroup = null;
    /**
     * The the list of {@link RightsMessagesGroup} to be used to ask for rights in bulk for Twitter.
     *
     * @type {Array}
     */
    this.twitterRightsMessageGroups = [];
    /**
     * The selected bulk rights message group for Twitter.
     * When the list of rights messages groups for Twitter are available, we will set the first
     * rights messages group as the selected one.
     *
     * @type {?RightsMessagesGroup}
     */
    this.selectedTwitterRightsMessageGroup = null;
    /**
     * The key for the storage record that will save the used rights messages information.
     *
     * @type {String}
     */
    this.sessionKey = 'OLAPIC_MEDIA_RIGHTS_RIGHTS_MESSAGES_USED';
  }
  /**
   * Each time the media binding changes, refresh the media data and the rights messages.
   * Each time the rightsMessages binding changes and the media didn't update, refresh the rights messages.
   * Each time the socialAccounts binding changes, refresh the social accounts.
   *
   * @param {Object} changes                 The binding changes.
   * @param {Object} changes.media           The media change object.
   * @param {Object} changes.rightsMessages  The rightsMessages change object.
   * @param {Object} changes.socialAccounts  The socialAccounts change object.
   */
  $onChanges({ media, rightsMessages, socialAccounts }) {
    if (
      media &&
      media.currentValue &&
      this.media
    ) {
      this._refreshMediaData();
      this._refreshRightsMessages();
    } else if (
      rightsMessages &&
      rightsMessages.currentValue
    ) {
      this._refreshRightsMessages();
    }

    if (
      socialAccounts &&
      socialAccounts.currentValue &&
      this.socialAccounts
    ) {
      this._refreshSocialAccounts();
    }
  }
  /**
   * Get the summary text to display in the form.
   *
   * @return {String}
   */
  getSummaryText() {
    const networks = [];

    if (this.selectedCountMap.bySource.instagram) {
      networks.push(`${this.selectedCountMap.bySource.instagram} from Instagram`);
    }

    if (this.selectedCountMap.bySource.twitter) {
      networks.push(`${this.selectedCountMap.bySource.twitter} from Twitter`);
    }

    let text = networks.join(', ');
    if (text) {
      text = `(${text})`;
    }

    return text;
  }
  /**
   * When a new Instagram rights message group is selected, we set that group as selected.
   *
   * @param {RightsMessagesGroup} rightsMessageGroup  The rights message group to set as selected.
   */
  onInstagramRightsMessageGroupSelected(rightsMessageGroup) {
    if (rightsMessageGroup.id) {
      this.selectedInstagramRightsMessageGroup = rightsMessageGroup;
    } else {
      this.onGoToRightsMessages(this.noRightsMessages);
    }
  }
  /**
   * When the rights message changes, we must update the remaining chars to reach the max char in the message.
   */
  onSingleRightsMessageChange() {
    const maxChars = this.rightsMaxChars[this.firstMediaSource];
    if (this.rightsMessage) {
      const messageLength = this.firstMediaSource === 'twitter' ?
        this.twitterText.getTweetLength(this.rightsMessage) :
        this.rightsMessage.length;

      this.remainingChars = maxChars - messageLength;
    } else {
      this.remainingChars = maxChars;
    }
  }
  /**
   * When a new rights message group is selected, we set that group as selected,
   * generate the list of rights messages templates with the templates of the selected group
   * and set the next (according to the localStorage) or first template as the selected one.
   *
   * @param {RightsMessagesGroup} rightsMessageGroup  The rights message group to set as selected.
   */
  onSingleRightsMessageGroupSelected(rightsMessageGroup) {
    if (rightsMessageGroup.id) {
      this.selectedSingleRightsMessageGroup = rightsMessageGroup;

      this.singleRightsMessageTemplates = rightsMessageGroup.templates
      .filter((rightsMessageTemplate) => rightsMessageTemplate.social_network === this.firstMediaSource);

      if (this.singleRightsMessageTemplates.length) {
        const usedRightsMessages = this.$localStorage[this.sessionKey] || {};
        const usedTemplateId = usedRightsMessages[this.selectedSingleRightsMessageGroup.id];
        // Set the selected template as the next (according to the localStorage) or first one.
        let selectedTemplate;
        if (usedTemplateId) {
          const usedTemplateIndex = this.singleRightsMessageTemplates
          .findIndex((rightsMessageTemplate) => rightsMessageTemplate.id === usedTemplateId);
          selectedTemplate = (
            usedTemplateIndex === -1 ||
            this.singleRightsMessageTemplates.length <= usedTemplateIndex + 1
          ) ?
            this.singleRightsMessageTemplates[0] :
            this.singleRightsMessageTemplates[usedTemplateIndex + 1];
        } else {
          [selectedTemplate] = this.singleRightsMessageTemplates;
        }
        this.onSingleRightsMessageTemplateSelected(selectedTemplate);
      } else {
        this.singleRightsMessageTemplates.push(this.noRightsMessages);
      }
    } else {
      this.onGoToRightsMessages();
    }
  }
  /**
   * When a new rights message template is selected, we set that template as selected,
   * and set the template hashtag and message as then current ones.
   *
   * @param {RightsMessage} rightsMessageTemplate  The rights message template to set as selected.
   */
  onSingleRightsMessageTemplateSelected(rightsMessageTemplate) {
    if (rightsMessageTemplate.id) {
      this.selectedSingleRightsMessageTemplate = rightsMessageTemplate;

      this.rightsHashtag = rightsMessageTemplate.message.vars.hashtag;
      this.rightsMessage = rightsMessageTemplate.message.instance;
      this.onSingleRightsMessageChange();
    } else {
      this.onGoToRightsMessages();
    }
  }
  /**
   * When a new Twitter rights message group is selected, we set that group as selected.
   *
   * @param {RightsMessagesGroup} rightsMessageGroup  The rights message group to set as selected.
   */
  onTwitterRightsMessageGroupSelected(rightsMessageGroup) {
    if (rightsMessageGroup.id) {
      this.selectedTwitterRightsMessageGroup = rightsMessageGroup;
    } else {
      this.onGoToRightsMessages(this.noRightsMessages);
    }
  }
  /**
   * When a new Twitter social account is selected, we set that social account as selected.
   *
   * @param {Object} twitterSocialAccount  The Twitter social account to set as selected.
   */
  onTwitterSocialAccountSelected(twitterSocialAccount) {
    if (twitterSocialAccount.id) {
      this.selectedTwitterSocialAccount = twitterSocialAccount;
    } else {
      this.onGoToSocialAccounts();
    }
  }
  /**
   * Call the onSendRightsRequest callback with the media and the rights request information.
   */
  sendBulkRightsRequest() {
    const rightsRequest = { type: 'bulk' };

    if (this.selectedCountMap.bySource.instagram) {
      rightsRequest.instagram = {
        groupId: this.selectedInstagramRightsMessageGroup.id,
        socialConnectionId: this.facebookSocialAccount.connection.id,
      };
    }

    if (this.selectedCountMap.bySource.twitter) {
      rightsRequest.twitter = {
        groupId: this.selectedTwitterRightsMessageGroup.id,
        socialConnectionId: this.selectedTwitterSocialAccount.id,
      };
    }

    this.onSendRightsRequest({
      rightsRequest,
    });
  }
  /**
   * Call the onSendRightsRequest callback with the media and the rights request information.
   */
  sendSingleRightsRequest() {
    const selectedSocialAccount = this.firstMediaSource === 'instagram' ?
      this.facebookSocialAccount :
      this.selectedTwitterSocialAccount.data;
    const rightsMessage = {
      message: {
        instance: this.rightsMessage,
        vars: {
          hashtag: this.rightsHashtag,
        },
      },
      social_network: this.firstMediaSource,
    };

    if (
      selectedSocialAccount &&
      selectedSocialAccount.connection
    ) {
      try {
        this.onValidateRightsMessage({ rightsMessage });

        this.error = '';
        this.onSendRightsRequest({
          rightsRequest: {
            type: 'single',
            socialConnectionId: selectedSocialAccount.connection.id,
            hashtag: this.rightsHashtag,
            message: this.rightsMessage,
          },
        });
        // Save the used template id with the group id.
        this.$localStorage[this.sessionKey] = {
          ...this.$localStorage[this.sessionKey],
          [this.selectedSingleRightsMessageGroup.id]: this.selectedSingleRightsMessageTemplate.id,
        };
      } catch (error) {
        this.error = error.message;
      }
    }
  }
  /**
   * Update the firstMedia and firstMediaSource variables.
   */
  _refreshMediaData() {
    [this.firstMedia] = this.media.list;
    this.firstMediaSource = this.firstMedia ?
      this.firstMedia.source.name :
      '';
  }
  /**
   * Generate the list of rights messages groups based on if the group has any template
   * matching to the media source, then set the first rights messages group as the selected one.
   */
  _refreshRightsMessages() {
    if (this.rightsMessages && this.media) {
      if (!this.isBulk) {
        this.singleRightsMessageGroups = this.rightsMessages.filter((group) => (
          group.details[this.firstMediaSource] &&
          group.details[this.firstMediaSource].current_templates > 0
        ));

        this.singleRightsMessageTemplates = [];

        if (this.singleRightsMessageGroups.length) {
          const [firstSingleRightsMessageGroup] = this.singleRightsMessageGroups;
          this.onSingleRightsMessageGroupSelected(firstSingleRightsMessageGroup);
        } else {
          this.singleRightsMessageGroups.push(this.noRightsMessages);
          this.singleRightsMessageTemplates.push(this.noRightsMessages);
        }
      } else {
        this.instagramRightsMessageGroups = this.rightsMessages.filter((group) => (
          group.details.instagram &&
          group.details.instagram.valid
        ));

        if (this.instagramRightsMessageGroups.length) {
          const [firstInstagramRightsMessageGroup] = this.instagramRightsMessageGroups;
          this.onInstagramRightsMessageGroupSelected(firstInstagramRightsMessageGroup);
        } else {
          this.instagramRightsMessageGroups.push(this.noRightsMessages);
        }

        this.twitterRightsMessageGroups = this.rightsMessages.filter((group) => (
          group.details.twitter &&
          group.details.twitter.valid
        ));

        if (this.twitterRightsMessageGroups.length) {
          const [firstTwitterRightsMessageGroup] = this.twitterRightsMessageGroups;
          this.onTwitterRightsMessageGroupSelected(firstTwitterRightsMessageGroup);
        } else {
          this.twitterRightsMessageGroups.push(this.noRightsMessages);
        }
      }
    }
  }
  /**
   * Get the facebook social account and generate the list of active twitter social accounts.
   * Then set the first twitter social account as the selected one.
   */
  _refreshSocialAccounts() {
    if (angular.isArray(this.socialAccounts.facebook)) {
      [this.facebookSocialAccount] = this.socialAccounts.facebook;
    }

    if (angular.isArray(this.socialAccounts.twitter)) {
      this.twitterSocialAccounts = this.socialAccounts.twitter
      .filter((twitterSocialAccount) => twitterSocialAccount.connection.status === 'active')
      .map((twitterSocialAccount) => ({
        id: twitterSocialAccount.connection.id,
        name: twitterSocialAccount.handle.username,
        data: twitterSocialAccount,
      }));
    } else {
      this.twitterSocialAccounts = [];
    }

    if (this.twitterSocialAccounts.length) {
      const [firstTwitterUserName] = this.twitterSocialAccounts;
      this.onTwitterSocialAccountSelected(firstTwitterUserName);
    } else {
      this.twitterSocialAccounts.push({
        name: 'Connect Account',
        type: 'link',
      });
    }
  }
}

/**
 * @ngdoc component
 * @name mediaRightsForm
 * @description
 * The media rights form.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaRightsForm}
   */
  controller: MediaRightsForm,
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
   * @property {Boolean}  hasApproveActionEnabled  If the customer has the approve action enabled or not.
   * @property {Boolean}  isBulk                   If we have to display the bulk form.
   * @property {Object}   media                    The map of media to show the rights form.
   * @property {Object}   rightsMaxChars           The map of rights max chars configuration.
   * @property {Array}    rightsMessages           The list of rights messages to be used to ask for rights.
   * @property {Object}   selectedCountMap         The map of the number of selected media.
   * @property {Object}   socialAccounts           The map of social accounts by network to be used to ask for rights.
   * @property {Function} onGoToRightsMessages     Callback for when we want to go to the rights messages page.
   * @property {Function} onGoToSocialAccounts     Callback for when we want to go to the social accounts page.
   * @property {Function} onSendRightsRequest      Callback for when the rights request is sent. It receives the media
   *                                               and the rights request information.
   * @property {Function} onValidateRightsMessage  Callback for when we want to validate the rights message.
   *                                               It receives the rights message to validate.
   */
  bindings: {
    hasApproveActionEnabled: '<',
    isBulk: '<',
    media: '<',
    rightsMaxChars: '<',
    rightsMessages: '<',
    selectedCountMap: '<',
    socialAccounts: '<',
    onGoToRightsMessages: '&',
    onGoToSocialAccounts: '&',
    onSendRightsRequest: '&',
    onValidateRightsMessage: '&',
  },
};
