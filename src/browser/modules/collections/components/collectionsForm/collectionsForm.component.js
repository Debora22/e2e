import template from './collectionsForm.html';
import './collectionsForm.scss';

import importantInfoIcon from '../../../../assets/images/importantInfoIcon.svg';

/**
 * @ngdoc controller
 * @name CollectionsForm
 * @description
 * This component displays the collections form section.
 *
 * @memberof collections
 */
class CollectionsForm {
  /**
   * @param {$timeout}   $timeout    To wait some time before clear the stream search.
   * @param {UIMessages} uiMessages  To display the error messages.
   */
  constructor($timeout, uiMessages) {
    'ngInject';

    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the important info icon displayed under `Send to Olapic Moderation Services` option.
     *
     * @type {String}
     */
    this.importantInfoIcon = importantInfoIcon;
    /**
     * The rule template to use when adding a new rule to the collection.
     *
     * @type {Object}
     */
    this.ruleTemplate = {
      operator: null,
      type: null,
      value: '',
      error: '',
    };
    /**
     * The stream template to use when adding a new stream to the collection.
     *
     * @type {Object}
     */
    this.streamTemplate = {
      id: 0,
      name: '',
      backName: '',
    };
    /**
     * Flag to disable the `Send to Olapic Moderation Services` option.
     *
     * @type {Boolean}
     */
    this.disableSendModerationServices = false;
    /**
     * @ignore
     */
    this.validateCollectionName = this.validateCollectionName.bind(this);
    /**
     * @ignore
     */
    this.validateHashtagLimit = this.validateHashtagLimit.bind(this);
  }
  /**
   * Each time the collection binding changes, call the `checkDisableSendModerationServices` method.
   * Each time the socialMentionsAccounts binding changes, map the social mentions accounts.
   *
   * @param {Object} changes                         The binding changes.
   * @param {Object} changes.collection              The collection change object.
   * @param {Object} changes.socialMentionsAccounts  The socialMentionsAccounts change object.
   */
  $onChanges({ collection, socialMentionsAccounts }) {
    if (
      collection &&
      collection.currentValue
    ) {
      this.checkDisableSendModerationServices();
    }

    if (
      socialMentionsAccounts &&
      socialMentionsAccounts.currentValue &&
      this.socialMentionsAccounts
    ) {
      // Format the social mentions accounts because we need them in a certain format for the ods dropdown.
      this.socialMentionsAccounts = this.socialMentionsAccounts
      .map((socialMentionsAccount) => ({
        id: socialMentionsAccount.username,
        name: `@${socialMentionsAccount.username}`,
      }));

      // If there is no social mentions account, add a link to configure them.
      if (!this.socialMentionsAccounts.length) {
        this.socialMentionsAccounts.push({
          name: 'Configure your social accounts',
          type: 'link',
        });
      }
    }
  }
  /**
   * Add a new rule to the collection that is being created or edited.
   */
  addRule() {
    this.collection.rules.push(angular.copy(this.ruleTemplate));
  }
  /**
   * Add a new stream to the collection that is being created or edited.
   */
  addStream() {
    this.collection.streams.push(angular.copy(this.streamTemplate));
  }
  /**
   * Check if we need to disable the `Send to Olapic Moderation Services` option.
   * If we are gonna disable this option, then set to skip moderation.
   */
  checkDisableSendModerationServices() {
    this.disableSendModerationServices = (
      !this.hasModerationServices && !this.hasVideoModerationServices
    ) || (
      !this.hasModerationServices && this.collection.mediaTypes.image && !this.collection.mediaTypes.video
    ) || (
      !this.hasVideoModerationServices && this.collection.mediaTypes.video && !this.collection.mediaTypes.image
    );

    if (this.disableSendModerationServices) {
      this.collection.skipModeration = true;
    }
  }
  /**
   * Check if a control on the form is in error state.
   *
   * @param {Object} form         The form to check.
   * @param {Object} controlName  The name of the control to check.
   *
   * @return {Boolean}
   */
  isInError(form, controlName) {
    const control = form[controlName];

    return control ? (
      form.$submitted ||
      control.$dirty
    ) && control.$invalid :
      false;
  }
  /**
   * When a new base mention is selected, we set that mention as selected and regenerate the phrase.
   *
   * @param {Object} baseMention  The mention to set as selected.
   */
  onBaseMentionSelected(baseMention) {
    if (baseMention.id) {
      this.collection.base.data.mention = baseMention;
      this.onGeneratePhrase();
    } else {
      this.onGoToSocialAccounts();
    }
  }
  /**
   * When a new base type is selected, we set that type as selected and regenerate the phrase.
   *
   * @param {CollectionBaseType} baseType  The base type to set as selected.
   */
  onBaseTypeSelected(baseType) {
    this.collection.base.type = baseType;

    if (this.collection.base.data.value) {
      // Adjust the value to the maxlength allowed
      this.collection.base.data.value = this.collection.base.data.value.substring(0, baseType.maxlength);
    }

    // If the base is not mention, then set only image as media type.
    if (this.collection.base.type.id !== 'mention') {
      this.collection.mediaTypes.image = true;
      this.collection.mediaTypes.video = false;
      this.checkDisableSendModerationServices();
    }

    this.validateCollectionRules();
    this.onGeneratePhrase();
  }
  /**
   * Check that there is always at least one media type selected.
   *
   * @param {String} mediaType  The media type to check.
   */
  onMediaTypeChange(mediaType) {
    if (
      !this.collection.mediaTypes.image &&
      !this.collection.mediaTypes.video
    ) {
      this.collection.mediaTypes[mediaType] = true;
    } else {
      this.checkDisableSendModerationServices();
      this.onGeneratePhrase();
    }
  }
  /**
   * When a new operator is selected, we set that operator as selected and regenerate the phrase.
   *
   * @param {Object} rule      The rule to set the operator to.
   * @param {Object} operator  The operator to set as selected.
   */
  onRuleOperatorSelected(rule, operator) {
    rule.operator = operator;
    this.onGeneratePhrase();
  }
  /**
   * When a new rule type is selected, we set that type as selected and regenerate the phrase.
   *
   * @param {Object}             rule  The rule to set the type to.
   * @param {CollectionBaseType} type  The rule type to set as selected.
   */
  onRuleTypeSelected(rule, type) {
    rule.type = type;

    if (rule.value) {
      // Adjust the value to the maxlength allowed.
      rule.value = rule.value.substring(0, type.maxlength);
    }

    this.validateCollectionRules();
    this.onGeneratePhrase();
  }
  /**
   * Clear the stream search on blur of the search box.
   * A $timeout is being used to give time for the onSuggestionClick click to take effect.
   * If no stream was selected then we clear the input, but if one was selected, return to the previous name.
   *
   * @param {Object} stream  The stream to clear the search.
   */
  onSearchBlur(stream) {
    const waitTime = 150;

    this.$timeout(() => {
      stream.name = !stream.id ? '' : stream.backName;
      delete stream.suggestions;
    }, waitTime);
  }
  /**
   * When a suggestion is selected, we set that suggestion as the current stream.
   *
   * @param {Object} stream      The stream to change.
   * @param {Object} suggestion  The suggestion to set as selected.
   */
  onSuggestionClick(stream, suggestion) {
    // Check if the stream already exists
    const exists = this.collection.streams
    .some((item) => stream !== item && suggestion.id === item.id);

    if (exists) {
      this.uiMessages.notification(
        'Sorry, you\'re already assigning your collected media to this stream.',
        { type: 'error' },
      );
    } else {
      stream.id = suggestion.id;
      stream.name = suggestion.name;
      stream.backName = stream.name;
      this.onGeneratePhrase();
    }
  }
  /**
   * Remove a rule of the collection and regenerate the phrase.
   *
   * @param {Number} index  The index of the rule to remove.
   */
  removeRule(index) {
    this.collection.rules.splice(index, 1);
    this.onGeneratePhrase();
  }
  /**
   * Remove a stream of the collection and regenerate the phrase.
   *
   * @param {Number} index  The index of the stream to remove.
   */
  removeStream(index) {
    this.collection.streams.splice(index, 1);
    this.onGeneratePhrase();
  }
  /**
   * Check if the form is valid and trigger the onSubmit callback.
   *
   * @param {Object} form  The form to check if valid.
   */
  submit(form) {
    if (form.$valid) {
      this.onSubmit({ collection: this.collection });
    }
  }
  /**
   * Trigger the search handler on every searchbox change.
   *
   * @param {Object} stream  The stream on where to show the results.
   * @param {String} text    The phrase to search for.
   */
  triggerSearch(stream, text) {
    const minSearchLength = 2;
    stream.name = text.trim();
    stream.suggestions = [];

    if (stream.name && stream.name.length > minSearchLength) {
      this.onSearchForStreams({ text: stream.name })
      .then((streams) => {
        if (streams) {
          stream.suggestions = streams.map((item) => {
            item.label = item.name;
            return item;
          });
        }
      });
    }
  }
  /**
   * Trigger the onValidateCollectionName callback to validate the collection name.
   *
   * @param {String} collectionName  The collection name to validate.
   *
   * @return {Boolean}
   */
  validateCollectionName(collectionName) {
    this.collection.name = collectionName;
    return this.onValidateCollectionName({ collection: this.collection });
  }
  /**
   * Validate the collection rules.
   * Check that in the the collection base and rules,
   * there is no more than one user profile and no more than one user mention.
   */
  validateCollectionRules() {
    const typeCount = {};
    const baseType = this.collection.base.type ?
      this.collection.base.type.id :
      '';
    typeCount[baseType] = 1;

    this.collection.rules
    .forEach((rule) => {
      const ruleType = rule.type ? rule.type.id : '';

      if (!typeCount[ruleType]) {
        typeCount[ruleType] = 0;
      }
      typeCount[ruleType]++;

      rule.error = (
        ['handler', 'mention'].includes(ruleType) &&
        typeCount[ruleType] > 1
      ) ?
        `Sorry, collections cannot contain more than one ${rule.type.name}.` :
        '';
    });
  }
  /**
   * Trigger the onValidateHashtagLimit callback to validate the hashtag limit.
   *
   * @return {Boolean}
   */
  validateHashtagLimit() {
    return this.onValidateHashtagLimit({ collection: this.collection });
  }
}

/**
 * @ngdoc component
 * @name collectionsForm
 * @description
 * This component renders the collections form section.
 *
 * @memberof collections
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {CollectionsForm}
   */
  controller: CollectionsForm,
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
   * @property {Array}    baseTypeList                The list of base types to select from.
   * @property {Object}   collection                  The collection that is being created or edited.
   * @property {Boolean}  hasModerationServices       If the customer has moderation services active or not.
   * @property {Boolean}  hasVideoCollection          If the customer has video collection active or not.
   * @property {Boolean}  hasVideoModerationServices  If the customer has video moderation services active or not.
   * @property {Array}    ruleOperatorList            The list of rule operators to select from.
   * @property {Array}    ruleTypeList                The list of rule types to select from.
   * @property {Array}    socialMentionsAccounts      The list of social mentions accounts to select from.
   * @property {Boolean}  streamsLoading              If there are streams being loaded.
   * @property {Function} onCancel                    Callback for when the form is canceled.
   * @property {Function} onGeneratePhrase            Callback for generating the phrase when a collection is edited.
   * @property {Function} onDelete                    Callback for when the delete button is clicked. It receives
   *                                                  collection to delete.
   * @property {Function} onGoToSocialAccounts        Callback to go to the social accounts page.
   * @property {Function} onSearchForStreams          Callback to search for streams. It receives the text to search.
   * @property {Function} onSubmit                    Callback for when the submit button is clicked. It receives
   *                                                  collection to save.
   * @property {Function} onValidateCollectionName    Callback to validate a collection name. It receives the
   *                                                  collection to validate.
   * @property {Function} onValidateHashtagLimit      Callback to validate the limit of hasthag collections. It
   *                                                  receives the collection to validate.
   */
  bindings: {
    baseTypeList: '<',
    collection: '<',
    hasModerationServices: '<',
    hasVideoCollection: '<',
    hasVideoModerationServices: '<',
    ruleOperatorList: '<',
    ruleTypeList: '<',
    socialMentionsAccounts: '<',
    streamsLoading: '<',
    onCancel: '&',
    onDelete: '&',
    onGeneratePhrase: '&',
    onGoToSocialAccounts: '&',
    onSearchForStreams: '&',
    onSubmit: '&',
    onValidateCollectionName: '&',
    onValidateHashtagLimit: '&',
  },
};
