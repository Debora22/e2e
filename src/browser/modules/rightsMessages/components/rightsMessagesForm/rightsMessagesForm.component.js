import template from './rightsMessagesForm.html';
import './rightsMessagesForm.scss';

/**
 * @ngdoc controller
 * @name RightsMessagesForm
 * @description
 * This component displays the rights messages form.
 *
 * @memberof rightsMessages
 */
class RightsMessagesForm {
  /**
   * @param {$anchorScroll} $anchorScroll  To scroll to the rights message that is being created or edited.
   * @param {$rootScope}    $rootScope     To emit the events.
   * @param {$timeout}      $timeout       To wait the UI to render before scrolling.
   */
  constructor($anchorScroll, $rootScope, $timeout) {
    'ngInject';

    /**
     * The local reference to the `$anchorScroll` service.
     *
     * @type {$anchorScroll}
     */
    this.$anchorScroll = $anchorScroll;
    /**
     * The local reference to the `$rootScope` service.
     *
     * @type {$rootScope}
     */
    this.$rootScope = $rootScope;
    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * If we have to close the form or not on save.
     *
     * @type {$Boolean}
     */
    this.exitOnSave = false;
    /**
     * @ignore
     */
    this.validateTosUrl = this.validateTosUrl.bind(this);
  }
  /**
   * On init scroll to the rights message template that is being created or edited (if any).
   */
  $onInit() {
    if (this.rightsMessageIndex >= 0) {
      this.$timeout(() => {
        this.$anchorScroll(`message${this.rightsMessageIndex}`);
      });
    } else {
      this.onChangeRightsMessage({ index: 0 });
    }
  }
  /**
   * Change the current rights message and reset the previous one.
   *
   * @param {Number} index  The index of the message to set as the current one.
   */
  changeRightsMessage(index) {
    if (this.rightsMessageIndex !== index) {
      this.onChangeRightsMessage({ index });
    }
  }
  /**
   * Close the rights messages form.
   */
  close() {
    this.onClose();
    this.$rootScope.$emit(this.events.form.back);
  }
  /**
   * Check if a field in the form is in error state.
   * The error state is given if the validations fails (field.$invalid) and
   * the formGroup was submitted (formGroup.$submitted) or
   * if the user has already interacted with the field (field.$dirty).
   *
   * @param {Object} formGroup  The form group where the field belongs.
   * @param {String} fieldId    The field Id to check it if is in error.
   *
   * @return {Boolean}
   */
  isFieldInError(formGroup, fieldId) {
    const field = formGroup[fieldId];

    return field &&
      field.$invalid &&
      (formGroup.$submitted || field.$dirty);
  }
  /**
   * Given a row index, check if the field in the form is in error state.
   *
   * @param {Object} form       The form to check.
   * @param {Number} index      The row index to check.
   * @param {String} fieldName  The field name to check.
   *
   * @return {Boolean}
   */
  isFieldInErrorByIndex(form, index, fieldName) {
    const formGroupId = `message${index}`;

    return this.isFieldInError(
      form[formGroupId],
      `message${index}${fieldName}`,
    );
  }
  /**
   * Whenever the Approval Hashtag or the Terms of Service URL of the rights message changes,
   * validate the all the templates of the rights message.
   */
  onGroupChange() {
    this.rightsMessage.messages.forEach((message) => this.validateTemplateLength(message));
  }
  /**
   * Triggered whenever the network selection changes in a message.
   * Assign the new network to the message, and validate the message length.
   *
   * @param {Object} message  The message where the network selection changed.
   * @param {Object} network  The network that was selected.
   */
  onNetworkSelected(message, network) {
    message.network = network;
    this.validateTemplateLength(message);
  }
  /**
   * Triggered whenever the form is submitted. First we check that the form base and template are valid.
   * After that we perform a validation of all the messages remainingChars, if any has negative remainingChars,
   * the user must fix it before proceding.
   * Finally, trigger the onSummit callback.
   *
   * @param {Object} form  The form that was submitted.
   */
  submit(form) {
    const event = this.exitOnSave ?
      this.events.form.save :
      this.events.form.next;
    this.$rootScope.$emit(event);

    const formMessageGroup = form[`message${this.rightsMessageIndex}`];
    if (form.messageBase.$valid && formMessageGroup.$valid) {
      // Check if any message's remainingChars is < 0.
      const indexOfMessageToFix = this.rightsMessage.messages.findIndex((message) => message.remainingChars < 0);
      if (indexOfMessageToFix > -1) {
        // If not currrent message, expand it.
        if (indexOfMessageToFix !== this.rightsMessageIndex) {
          this.onChangeRightsMessage({ index: indexOfMessageToFix });
        }
        // Scroll to it.
        this.$anchorScroll(`message${indexOfMessageToFix}`);
      } else {
        // If no errors then sumbit.
        this.onSubmit({ exitOnSave: this.exitOnSave });
      }
    }
  }
  /**
   * Validate the template length of a rights message.
   *
   * @param {Object} message  The message to validate.
   */
  validateTemplateLength(message) {
    this.onValidateTemplateLength({ template: message });
  }
  /**
   * Trigger the onValidateTosUrl callback to validate the TOS URL.
   *
   * @param {String} tosUrl  The tosUrl to validate.
   *
   * @return {Boolean}
   */
  validateTosUrl(tosUrl) {
    return this.onValidateTosUrl({ tosUrl });
  }
}

/**
 * @ngdoc component
 * @name rightsMessagesForm
 * @description
 * This component renders the rights messages form.
 *
 * @memberof rightsMessages
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {RightsMessagesForm}
   */
  controller: RightsMessagesForm,
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
   * @property {Object}   events                    The events for the rights messages section.
   * @property {Object}   message                   The message constants.
   * @property {Array}    networks                  The list of networks to display.
   * @property {Object}   rightsMessage             The rights message that is being created or edited.
   * @property {Number}   rightsMessageIndex        The index of the template that is being created or edited.
   * @property {Function} onAddTemplateToMessage    Callback for when to add a new template to the group.
   * @property {Function} onChangeRightsMessage     Callback for when the current rights message is changed. It
   *                                                receives the index of the message.
   * @property {Function} onClose                   Callback for when the form needs to be closed.
   * @property {Function} onShowMessageAfterCopy    Callback for when a tag is copied to the clipboard to show
   *                                                a success message.
   * @property {Function} onSubmit                  Callback for when the submit button is clicked. It receives
   *                                                if we have to close the form or not on save.
   * @property {Function} onValidateTemplateLength  Callback for when the rights messages template needs to be
   *                                                validated. It receives the template to validate.
   * @property {Function} onValidateTosUrl          Callback for when the rights messages tos url needs to be
   *                                                validated. It receives the  TOS URL to validate.
   */
  bindings: {
    events: '<',
    message: '<',
    networks: '<',
    rightsMessage: '<',
    rightsMessageIndex: '<',
    onAddTemplateToMessage: '&',
    onChangeRightsMessage: '&',
    onClose: '&',
    onShowMessageAfterCopy: '&',
    onSubmit: '&',
    onValidateTemplateLength: '&',
    onValidateTosUrl: '&',
  },
};
