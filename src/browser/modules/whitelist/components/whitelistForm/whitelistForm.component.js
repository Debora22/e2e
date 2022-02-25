import template from './whitelistForm.html';
import './whitelistForm.scss';

/**
 * @ngdoc component
 * @name WhitelistForm
 * @description
 * This component renders the whitlisted users form.
 *
 * @memberof whitelist
 */
class WhitelistForm {
  constructor() {
    /**
     * The dates range for whitelist users.
     *
     * @type {Object}
     */
    this.dates = {};
    /**
     * The whitelist usernames.
     *
     * @type {String}
     */
    this.usernames = '';
    /**
     * The username input's error message.
     *
     * @type {String}
     */
    this.usernamesError = '';
    /**
     * The selected source.
     *
     * @type {?Object}
     */
    this.selectedSource = null;
    /**
     * The whitelist user labels.
     *
     * @type {String}
     */
    this.labels = '';
    /**
     * Flag to know if a request to save the whitelist users is in progress.
     *
     * @type {Boolean}
     */
    this.isSaving = false;
    /**
     * Array that keeps the already parsed/sanitized usernames.
     *
     * @type {Array<String>}
     */
    this.parsedUsernames = [];
    /**
     * Flag to show or hide the Modal.
     *
     * @type {Boolean}
     */
    this.isModalVisible = false;
    /**
     * The map of the availables error messages when validating the usernames.
     *
     * @type {Object}
     * @property {String} invalid    The error message to display when the usernames are invalid.
     * @property {String} maxAmount  The error message to display when the usernames are more than the limit.
     * @access protected
     */
    this._usernamesErrorMessages = {
      invalid: 'Please make sure the usernames only include letters, numbers, periods, and underscores.',
      maxAmount: 'You can\'t add more than 200 users at once.',
    };
    /**
     * The max amount of usernames that the user is able to create.
     *
     * @type {Number}
     * @access protected
     */
    this._usernamesLimit = 200;
  }
  /**
   * Each time the sources binding changes, update the selected source.
   *
   * @param {Object} changes          The binding changes.
   * @param {Object} changes.loading  The loading change object.
   * @param {Object} changes.sources  The sources change object.
   */
  $onChanges({ loading, sources }) {
    if (
      loading &&
      loading.previousValue &&
      !loading.currentValue &&
      this.wasTheSubmitSuccessful &&
      this.isSaving
    ) {
      this.isSaving = false;
      this._clearForm();
    }

    if (
      sources &&
      sources.currentValue &&
      this.sources &&
      this.sources.length
    ) {
      [this.selectedSource] = this.sources;
    }
  }
  /**
   * Set the corresponding date related to the form data.
   *
   * @param {String} date   The type of date.
   * @param {Date}   value  The date value.
   */
  onDateSet(date, value) {
    this.dates[date] = value;
  }
  /**
   * Callback triggered when the label input changes.
   *
   * @param {String} labels  The labels to set.
   */
  onLabelsSet(labels = '') {
    this.labels = labels;
  }
  /**
   * Closes the modal.
   */
  onModalClose() {
    this.isModalVisible = false;
  }
  /**
   * Open the modal.
   */
  onModalOpen() {
    this.isModalVisible = true;
  }
  /**
   * Close the modal and parse the usernames from modal.
   *
   * @param {String} usernames  Contains the string from the modal's input.
   */
  onModalSubmit(usernames) {
    this.usernames = usernames;
    this.onUsernameInputChange();
    this.onModalClose();
  }
  /**
   * When a new source is selected, we set that source as selected.
   *
   * @param {Object} source  The source to set as selected.
   */
  onSourceSelected(source) {
    this.selectedSource = source;
  }
  /**
   * Call the onSaveWhitelistUsers callback with the whitelist users and the selected source.
   */
  onSubmit() {
    this.isSaving = true;

    const whitelistUsers = {
      whitelistUsers: this._sanitizeUsernames(this.usernames),
      source: this.selectedSource.name,
      labels: this.labels ? [this.labels] : [],
    };
    const { dateFrom, dateTo } = this.dates;

    if (dateFrom) {
      whitelistUsers.dateFrom = dateFrom.toISOString();
    }
    if (dateTo) {
      whitelistUsers.dateTo = dateTo.toISOString();
    }

    this.onSaveWhitelistUsers(whitelistUsers);
  }
  /**
   * Called when there is a change in the whitelist form's input
   * or after modal submit.
   */
  onUsernameInputChange() {
    const usernames = this.usernames || '';
    this.parsedUsernames = [];
    this.usernamesError = '';

    if (this._validateInput()) {
      this.usernames = usernames.replace(/(\n| \n)/g, ' ');
      this.parsedUsernames = this._sanitizeUsernames(this.usernames);

      if (this.parsedUsernames.length > this._usernamesLimit) {
        this.usernamesError = this._usernamesErrorMessages.maxAmount;
      }
    } else {
      this.usernamesError = this._usernamesErrorMessages.invalid;
    }
  }
  /**
   * It clears form's data.
   */
  _clearForm() {
    this.dates = {};
    this.labels = '';
    this.parsedUsernames = [];
    this.usernames = '';
  }
  /**
   * Parse a list of usernames in order to fulfill with a username spec.
   *
   * @param {String} usernames  Contains the string with usernames.
   *
   * @return {Array}
   */
  _sanitizeUsernames(usernames) {
    return usernames
    // Remove any comma, with and without spaces around them.
    .replace(/(?: )?,(?: )?/g, ' ')
    // Remove mentions and hashtags chars.
    .replace(/(@|#)/g, '')
    // Split the list using spaces.
    .split(' ')
    // Remove any leading and/or trailing spaces from the names.
    .map((username) => username.trim())
    // Remove empty strings.
    .filter((username) => username.length)
    // Create the whitelist user objects.
    .map((username) => ({ username }));
  }
  /**
   * Validate the user's input in order to set the error message value
   * in case the input is invalid. It Checks:
   * - Only allowed characters (letters, numbers, period and underscore, hash/mentions, comma).
   * - No repetition for mention/hash/comma.
   * - No mention/hash allowed at the end of an username.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _validateInput() {
    const allowedCharsRegExp = new RegExp('^[@#\\w.\\s,]*$');
    const repeteadCharsRegExp = new RegExp('([@#,](@|#|,)\\1)');
    const invalidCharPositionRegExp = new RegExp('([\\w|.][@|#])');

    return allowedCharsRegExp.test(this.usernames) &&
      !repeteadCharsRegExp.test(this.usernames) &&
      !invalidCharPositionRegExp.test(this.usernames);
  }
}

/**
 * @ngdoc component
 * @name whitelistForm
 * @description
 * The whitelist form component.
 *
 * @memberof whitelist
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {WhitelistForm}
   */
  controller: WhitelistForm,
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
   * @property {Boolean}  loading                 If a request for the whitelist is in progress.
   * @property {Array}    sources                 The list of sources to display.
   * @property {Boolean}  wasTheSubmitSuccessful  Flag to indicate the result of the form's submit request.
   * @property {Function} onSaveWhitelistUsers    Callback for when we want to create/update a list of whitelist users.
   *                                              It receives the whitelist users to create/update, the selected source
   *                                              and the labels.
   */
  bindings: {
    loading: '<',
    sources: '<',
    wasTheSubmitSuccessful: '<',
    onSaveWhitelistUsers: '&',
  },
};
