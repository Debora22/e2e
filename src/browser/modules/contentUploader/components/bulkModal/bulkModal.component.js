import template from './bulkModal.html';
import './bulkModal.scss';

/**
 * @ngdoc controller
 * @name BulkModal
 * @description
 * This component renders the bulk modal.
 *
 * @memberof contentUploader
 */
class BulkModal {
  constructor() {
    /**
     * The placeholder to use.
     *
     * @type {String}
     */
    this.placeholder = '';
    /**
     * The username to use.
     *
     * @type {String}
     */
    this.username = '';
    /**
     * The regular expression to match the username.
     *
     * @type {RegExp}
     * @access protected
     */
    this.usernameRegexp = /^@?[\w!#$%&'*+\-\/=?^_`{|}~]+(?:\.[\w!#$%&'*+\-\/=?^_`{|}~]+)*$/;
  }
  /**
   * Each time the user binding changes, update the placeholder.
   *
   * @param {Object} changes       The binding changes.
   * @param {Object} changes.user  The user change object.
   */
  $onChanges({ user }) {
    if (user && user.currentValue && this.user) {
      const symbol = this.user.name.startsWith('@') ? '' : '@';
      this.placeholder = `${symbol}${this.user.name}`;
    }
  }
  /**
   * Check if the form is valid and trigger the onUserSave callback.
   * Then set the form to its pristine state.
   *
   * @param {Object} form  The form to check if valid.
   */
  submit(form) {
    if (form.$valid) {
      this.onUserSave({ username: this.username });
      form.$setPristine();
    }
  }
}
/**
 * @ngdoc component
 * @name bulkModal
 * @description
 * The bulk modal component.
 *
 * @memberof contentUploader
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {BulkModal}
   */
  controller: BulkModal,
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
   * @property {Boolean}  existMoreStreams          If another page of streams can be fetched.
   * @property {Array}    keywords                  The list of keywords to display.
   * @property {Array}    media                     The list of media to be edited.
   * @property {Object}   selectedSection           The selected section.
   * @property {Array}    streams                   The list of streams to be assigned to the media.
   * @property {Object}   user                      The user used to upload the media.
   * @property {Function} onAddKeyword              The callback to add a new keyword to the media. It receives the
   *                                                keyword to add.
   * @property {Function} onChangeStreamsPositions  The callback to change the position of the streams.
   * @property {Function} onError                   The callback when an error occurs.
   * @property {Function} onLoadMoreStreams         The callback to load more searched streams.
   * @property {Function} onRemoveKeyword           The callback to remove a keyword to the media. It receives the
   *                                                keyword to remove.
   * @property {Function} onRemoveStream            The callback to remove a stream.
   * @property {Function} onSearchForKeywords       The callback to search for keywords. It receives the search text.
   * @property {Function} onSearchForStreams        The callback to search for streams.
   * @property {Function} onSectionChange           The callback when the selected section is changed. It receives
   *                                                the selected section.
   * @property {Function} onTagStreams              The callback to save selected streams.
   * @property {Function} onUserSave                The callback to save the changes made on the username.
   */
  bindings: {
    existMoreStreams: '<',
    keywords: '<',
    media: '<',
    selectedSection: '<',
    streams: '<',
    user: '<',
    onAddKeyword: '&',
    onChangeStreamsPositions: '&',
    onError: '&',
    onLoadMoreStreams: '&',
    onRemoveKeyword: '&',
    onRemoveStream: '&',
    onSearchForKeywords: '&',
    onSearchForStreams: '&',
    onSectionChange: '&',
    onTagStreams: '&',
    onUserSave: '&',
  },
};
