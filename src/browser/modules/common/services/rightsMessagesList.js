import EntitiesList from '../abstracts/entitiesList';

/**
 * @ngdoc service
 * @name RightsMessagesList
 * @description
 * This service is used to get the customer rights messages.
 *
 * @memberof common
 */
class RightsMessagesList extends EntitiesList {
  /**
   * @param {$q}          $q                       To reject error responses.
   * @param {AppAPI}      appAPI                   To make the API requests.
   * @param {Object}      appConfiguration         To get the PII rights messages name.
   * @param {AppUtils}    appUtils                 To escape regular expressions.
   * @param {Extend}      extend                   To merge the contents of two collections.
   * @param {TwitterText} twitterText              To get the message length for Twitter.
   * @param {Object}      RIGHTSMESSAGES_MESSAGE   To get the message configuration.
   * @param {Object}      RIGHTSMESSAGES_NETWORKS  To get the networks configuration.
   */
  constructor(
    $q,
    appAPI,
    appConfiguration,
    appUtils,
    extend,
    twitterText,
    RIGHTSMESSAGES_MESSAGE,
    RIGHTSMESSAGES_NETWORKS,
  ) {
    'ngInject';

    super($q);

    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `appUtils` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `extend` service.
     *
     * @type {Extend}
     */
    this.extend = extend;
    /**
     * The local reference to the `twitterText` service.
     *
     * @type {Object}
     */
    this.twitterText = twitterText;
    /**
     * The local reference to the `MAX_CHARS` constant.
     *
     * @type {Object}
     */
    this.MAX_CHARS = appConfiguration.rights.maxChars;
    /**
     * The local reference to the `MIN_MESSAGES` constant.
     *
     * @type {Number}
     */
    this.MIN_MESSAGES = appConfiguration.rights.minMessages;
    /**
     * The local reference to the `PIIRightsMessagesName` constant.
     *
     * @type {String}
     */
    this.PIIRightsMessagesName = appConfiguration.rights.pii.messagesName;
    /**
     * The local reference to the `RIGHTSMESSAGES_MESSAGE` constant.
     *
     * @type {Object}
     */
    this.RIGHTSMESSAGES_MESSAGE = RIGHTSMESSAGES_MESSAGE;
    /**
     * The local reference to the `RIGHTSMESSAGES_NETWORKS` constant.
     *
     * @type {Array}
     */
    this.RIGHTSMESSAGES_NETWORKS = RIGHTSMESSAGES_NETWORKS;
    /**
     * The rights message used for PII consent.
     *
     * @type {?Object}
     */
    this.PIIRightsMessage = null;
    /**
     * The rights message that is being created or edited.
     *
     * @type {Object}
     */
    this.rightsMessage = {};
    /**
     * The index of the rights message template that is being created or edited.
     *
     * @type {Number}
     */
    this.rightsMessageIndex = -1;
    /**
     * The map of the availables error messages when validating a rights messages.
     *
     * @type {Object}
     * @property {String} missingHastag  The error message to display when the hastag is missing.
     * @property {String} missingTos     The error message to display when the TOS url is missing.
     * @property {String} twoUrls        The error message to display when two urls are present.
     * @property {String} shortlinkUrl   The error message to display when the TOS url is a shortlink url.
     * @access protected
     */
    this._errorMessages = {
      missingHastag: 'Please include {{hastag}} in the message.',
      missingTos: 'Please include Terms of Service URL in the message.',
      twoUrls: 'The message cannot contain more than 1 URL.',
      shortlinkUrl: 'The message can not include shortlinks (like bit.ly).',
    };
    /**
     * The rights message template to use for creation or edition.
     *
     * @type {Object}
     * @access protected
     */
    this._messageGroupTemplate = {
      id: 0,
      name: '',
      hashtag: '',
      tosUrl: '',
      messages: [],
    };
    /**
     * The rights message template to use for creation or edition.
     *
     * @type {Object}
     * @access protected
     */
    this._messageTemplate = {
      id: 0,
      network: null,
      name: '',
      template: '',
      status: '',
      remainingChars: this.MAX_CHARS.instagram,
    };
    /* eslint-disable max-len */
    /**
     * The regular expression to match urls.
     *
     * @type {RegExp}
     * @access protected
     */
    this._urlRegexp = /((?=^|\s|\b|\p{Po}|\()(?:(?:https?|ftps?):\/\/)(?:\S+(?::\S*)?@)?(?:xn--[0-9a-z]+)?(?:(?!10(:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-)*[0-a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/?[^\s]*)?)/gmi;
    /* eslint-enable max-len */

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Add a template to the message of the rights message that is being created or edited.
   */
  addTemplateToMessage() {
    this.rightsMessage.messages.push(angular.copy(this._messageTemplate));
  }
  /**
   * Change the current rights message.
   *
   * @param {Number} index  The index of the message to set as the current one.
   */
  changeRightsMessage(index) {
    if (index === this.rightsMessage.messages.length) {
      this.addTemplateToMessage();
    }

    this.rightsMessageIndex = index;
  }
  /**
   * Delete a rights message.
   *
   * @param {Number} messageId  The id of the rights message to delete.
   *
   * @return {Promise}
   */
  deleteRightsMessage(messageId) {
    return this._requestWithLoading(() => (
      this.appAPI.deleteRightsMessage(messageId)
      .then(() => {
        const index = this._getIndex(messageId).message;

        if (index > -1) {
          this.entities.splice(index, 1);
        }
      })
    ));
  }
  /**
   * Delete a rights template.
   *
   * @param {Number} messageId   The id of the rights message from where to delete the template.
   * @param {Number} templateId  The id of the rights template to delete.
   *
   * @return {Promise}
   */
  deleteRightsTemplate(messageId, templateId) {
    return this._requestWithLoading(() => (
      this.appAPI.deleteRightsTemplate(templateId)
      .then(() => {
        const index = this._getIndex(messageId, templateId);

        if (index.message > -1 && index.template > -1) {
          const rightsMessage = this.entities[index.message];
          const rightsTemplate = rightsMessage.templates[index.template];
          const details = rightsMessage.details[rightsTemplate.social_network];

          // Remove the template and modify the details of the rights message.
          rightsMessage.templates.splice(index.template, 1);
          details.current_templates--;
          details.valid = details.current_templates >= details.required_templates;
        }
      })
    ));
  }
  /**
   * Call the API to make the rights messages request.
   *
   * @return {Promise}
   */
  getRightsMessages() {
    return this._getEntities();
  }
  /**
   * Validate if a TOS URL is valid.
   *
   * @param {String} tosUrl  The tosUrl to validate.
   *
   * @return {Boolean}
   */
  isTosUrlValid(tosUrl) {
    return !tosUrl.match(this.RIGHTSMESSAGES_MESSAGE.shortlinkRegexp);
  }
  /**
   * Parse a rights message and prepare it to be edited in the form.
   *
   * @param {Object?} rightsMessage  The rights message to prepare.
   * @param {Number?} templateIndex  The index of the template to prepare.
   */
  prepareRightsMessageForEdit(rightsMessage, templateIndex) {
    this.rightsMessage = angular.copy(this._messageGroupTemplate);
    this.rightsMessageIndex = -1;

    if (rightsMessage) {
      // Look for the first message to get the hashtag and TOS url for all messages.
      const [firstMessage] = rightsMessage.templates;

      this.rightsMessage.id = rightsMessage.id;
      this.rightsMessage.name = rightsMessage.name;
      this.rightsMessage.hashtag = firstMessage ? firstMessage.message.vars.hashtag : '';
      this.rightsMessage.tosUrl = firstMessage ? firstMessage.message.vars.tos_url : '';

      this.rightsMessage.messages = rightsMessage.templates
      .map((message) => {
        const network = (
          this.RIGHTSMESSAGES_NETWORKS.find((networkType) => networkType.name === message.social_network)
        ) || this.RIGHTSMESSAGES_NETWORKS.networks[0];

        return {
          id: message.id,
          network,
          name: message.name,
          template: message.message.template,
          status: this.RIGHTSMESSAGES_MESSAGE.status.ready,
          remainingChars: this.MAX_CHARS[network.name],
        };
      });

      if (angular.isDefined(templateIndex)) {
        this.rightsMessageIndex = templateIndex;

        if (this.rightsMessageIndex === this.rightsMessage.messages.length) {
          this.addTemplateToMessage();
        }
      }

      // Validate the length of each template.
      this.rightsMessage.messages.forEach((template) => this.validateTemplateLength(template));
    }

    // Create the remaining empty messages.
    const messagesToAdd = this.MIN_MESSAGES - this.rightsMessage.messages.length;
    for (let i = 0; i < messagesToAdd; i++) {
      this.addTemplateToMessage();
    }
  }
  /**
   * First save the rights message.
   * Then save the current message template, and then save all other templates that have an Id.
   * This is to avoid inconsistencies in the Hashtag and TOS URL of the messages.
   *
   * @return {Promise}
   */
  saveRightsMessages() {
    const currentTemplate = this.rightsMessage.messages[this.rightsMessageIndex];

    return this._requestWithLoading(() => (
      this._saveRightsMessage()
      .then(() => this._saveRightsMessageTemplate(currentTemplate))
      .then(() => {
        const promises = this.rightsMessage.messages
        .filter((message) => message.id && message.id !== currentTemplate.id)
        .map((message) => this._saveRightsMessageTemplate(message));

        return this.$q.all(promises);
      })
    ));
  }
  /**
   * Validate if a rights message is valid to be used.
   *
   * @param {RightsMessage} rightsMessage  The rights message to validate.
   */
  validateRightsMessage(rightsMessage) {
    const message = rightsMessage.message.instance;
    const approvalHashtag = rightsMessage.message.vars.hashtag;
    const escapedApprovalHashtag = this.appUtils.escapeRegExp(approvalHashtag);
    const hashtagRegExp = new RegExp(`#?${escapedApprovalHashtag}`);
    const containsHashtag = hashtagRegExp.exec(message);
    const containsUrls = message.match(this._urlRegexp);
    const isInstagram = rightsMessage.social_network === 'instagram';
    const [firstUrl] = containsUrls || '';

    if (!containsHashtag) {
      const errorText = this._errorMessages.missingHastag.replace('{{hastag}}', approvalHashtag);
      throw new Error(errorText);
    } else if (!containsUrls) {
      throw new Error(this._errorMessages.missingTos);
    } else if (
      isInstagram &&
      containsUrls &&
      containsUrls.length > 1
    ) {
      throw new Error(this._errorMessages.twoUrls);
    } else if (
      isInstagram &&
      containsUrls &&
      !this.isTosUrlValid(firstUrl)
    ) {
      throw new Error(this._errorMessages.shortlinkUrl);
    }
  }
  /**
   * Validate the template length of a rights message.
   *
   * @param {RightsMessage} template  The rights message template to validate.
   */
  validateTemplateLength(template) {
    const templateNetwork = (
      template.network ||
      this.RIGHTSMESSAGES_NETWORKS[0]
    ).name;
    const text = template.template || '';
    template.remainingChars = this.MAX_CHARS[templateNetwork] - text.length;

    const hashtagCount = text.match(/{{hashtag}}/ig);
    if (hashtagCount) {
      const { length } = hashtagCount;
      const lengthOfHashtags = this.rightsMessage.hashtag.length * length;
      const lengthOfTags = this.RIGHTSMESSAGES_MESSAGE.tag.hashtag.length * length;
      template.remainingChars -= lengthOfHashtags - lengthOfTags;

      if (this.rightsMessage.hashtag.indexOf('#') === -1) {
        template.remainingChars -= hashtagCount.length;
      }
    }

    const tosUrlCount = text.match(/{{tos_url}}/ig);
    if (tosUrlCount) {
      const tosUrlLength = templateNetwork === 'twitter' ?
        this.twitterText.getTweetLength(this.rightsMessage.tosUrl) :
        this.rightsMessage.tosUrl.length;

      const lengthOfTos = tosUrlLength * tosUrlCount.length;
      const lengthOfTags = this.RIGHTSMESSAGES_MESSAGE.tag.tos.length * tosUrlCount.length;
      template.remainingChars -= lengthOfTos - lengthOfTags;
    }

    // If it had a previous status change it accordingly.
    if (template.status) {
      template.status = template.remainingChars < 0 ?
        this.RIGHTSMESSAGES_MESSAGE.status.error :
        this.RIGHTSMESSAGES_MESSAGE.status.ready;
    }
  }
  /**
   * Format an API response in order to the get the rights messages list.
   *
   * @param {Array} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    const index = response.findIndex((group) => group.name === this.PIIRightsMessagesName);

    if (index > -1) {
      [this.PIIRightsMessage] = response.splice(index, 1);
    }

    return response;
  }
  /**
   * Get the indexes of a rights message and template.
   *
   * @param {Number} messageId   The id of the rights message to get the index of.
   * @param {Number} templateId  The id of the rights template to get the index of.
   *
   * @return {Object}
   */
  _getIndex(messageId, templateId) {
    const index = {
      message: this.entities.findIndex((rightsMessage) => rightsMessage.id === messageId),
      template: -1,
    };

    if (index.message > -1 && templateId) {
      index.template = this.entities[index.message].templates.findIndex((template) => template.id === templateId);
    }

    return index;
  }
  /**
   * Call the API to make the request for the rights messages list.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest() {
    return this.appAPI.getRightsMessages();
  }
  /**
   * Edit or create the rights message.
   * After the process is done update the entities accordingly.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _saveRightsMessage() {
    let result;

    if (this.rightsMessage.id) {
      result = this.appAPI.editRightsMessage(this.rightsMessage)
      .then((editedRightsMessage) => {
        const index = this._getIndex(editedRightsMessage.id).message;

        if (index > -1) {
          // Merge the data of the edited rights message.
          this.extend(true, this.entities[index], editedRightsMessage);
        }
      });
    } else {
      result = this.appAPI.createRightsMessage({ name: this.rightsMessage.name })
      .then((newRightsMessage) => {
        // Assign the new rights message id and add the rights message to the list.
        this.rightsMessage.id = newRightsMessage.id;
        this.entities.push(newRightsMessage);
      });
    }

    return result;
  }
  /**
   * Edit or create the given message template.
   * After the process is done update the entities accordingly.
   *
   * @param {Obejct} message   The message to edit or create.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _saveRightsMessageTemplate(message) {
    const template = {
      id: message.id,
      social_network: message.network.name,
      name: message.name,
      hashtag: this.rightsMessage.hashtag,
      tos_url: this.rightsMessage.tosUrl,
      message: message.template,
      group_id: this.rightsMessage.id,
    };
    let result;

    if (template.id) {
      result = this.appAPI.editRightsMessageTemplate(template)
      .then((editedTemplate) => {
        const index = this._getIndex(this.rightsMessage.id, editedTemplate.id);

        if (index.message > -1 && index.template > -1) {
          const rightsTemplate = this.entities[index.message].templates[index.template];

          // Merge the data of the edited template.
          this.extend(true, rightsTemplate, editedTemplate);
        }
      });
    } else {
      result = this.appAPI.createRightsMessageTemplate(template)
      .then((newTemplate) => {
        const index = this._getIndex(this.rightsMessage.id).message;
        // Assign the new template id and set the status to ready.
        message.id = newTemplate.id;
        message.status = this.RIGHTSMESSAGES_MESSAGE.status.ready;

        if (index > -1) {
          const rightsMessage = this.entities[index];
          const details = rightsMessage.details[newTemplate.social_network];

          // Add the new template and modify the details of the rights message.
          rightsMessage.templates.push(newTemplate);
          details.current_templates++;
          details.valid = details.current_templates >= details.required_templates;
        }
      });
    }

    return result;
  }
}

/**
 * @ngdoc factory
 * @name rightsMessagesList
 * @description
 * This object contains a method to create a new instanece of the {@link RightsMessagesList}.
 *
 * @param {$q}          $q                       To reject error responses.
 * @param {AppAPI}      appAPI                   To make the API requests.
 * @param {Object}      appConfiguration         To get the PII rights messages name.
 * @param {AppUtils}    appUtils                 To escape regular expressions.
 * @param {Extend}      extend                   To merge the contents of two collections.
 * @param {TwitterText} twitterText              To get the message length for Twitter.
 * @param {Object}      RIGHTSMESSAGES_MESSAGE   To get the message configuration.
 * @param {Object}      RIGHTSMESSAGES_NETWORKS  To get the networks configuration.
 *
 * @return {Function}
 *
 * @memberof common
 */
const rightsMessagesList = (
  $q,
  appAPI,
  appConfiguration,
  appUtils,
  extend,
  twitterText,
  RIGHTSMESSAGES_MESSAGE,
  RIGHTSMESSAGES_NETWORKS,
) => {
  'ngInject';

  return {
    getNewInstance: () => new RightsMessagesList(
      $q,
      appAPI,
      appConfiguration,
      appUtils,
      extend,
      twitterText,
      RIGHTSMESSAGES_MESSAGE,
      RIGHTSMESSAGES_NETWORKS,
    ),
  };
};

export default rightsMessagesList;
