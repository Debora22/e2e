import template from './rightsMessages.html';
import './rightsMessages.scss';

/**
 * @ngdoc controller
 * @name RightsMessages
 * @description
 * This component displays the rights messages section.
 *
 * @memberof rightsMessages
 */
class RightsMessages {
  /**
   * @param {$rootScope} $rootScope  To emit the events.
   */
  constructor($rootScope) {
    'ngInject';

    /**
     * The local reference to the `$rootScope` service.
     *
     * @type {$rootScope}
     */
    this.$rootScope = $rootScope;
    /**
     * The rights messages that are currrently expanded.
     *
     * @type {Object}
     */
    this.expandedRightsMessages = {};
    /**
     * Flag to know if the table message is visible or not.
     *
     * @type {Boolean}
     */
    this.showTableMessage = true;
  }
  /**
   * Close the table message.
   */
  closeTableMessage() {
    this.showTableMessage = false;
  }
  /**
   * Toggle the expansion of a selected rights message.
   *
   * @param {Number} rightsMessageId  The rights message id to toggle the expansion.
   */
  toggleExpandRightsMessages(rightsMessageId) {
    this.expandedRightsMessages[rightsMessageId] = !this.expandedRightsMessages[rightsMessageId];
    this.$rootScope.$emit(this.events.navigation.expandGroup);
  }
}

/**
 * @ngdoc component
 * @name rightsMessages
 * @description
 * This component renders the rights messages section.
 *
 * @memberof rightsMessages
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {RightsMessages}
   */
  controller: RightsMessages,
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
   * @property {Boolean}  isFormVisible             If the rights messages form is visible or not.
   * @property {Boolean}  loading                   If there are rights messages being loaded.
   * @property {Object}   message                   The message constants.
   * @property {Array}    networks                  The list of networks to display.
   * @property {Object}   rightsMessage             The rights message that we are creating or editing.
   * @property {Number}   rightsMessageIndex        The index of the template that is being created or edited.
   * @property {Array}    rightsMessages            The list of rights messages to display.
   * @property {Function} onAddTemplateToMessage    Callback for when to add a new template to the group.
   * @property {Function} onChangeRightsMessage     Callback for when the current rights message is changed. It
   *                                                receives the index of the message.
   * @property {Function} onCloseForm               Callback for when the collection form needs to be closed.
   * @property {Function} onDelete                  Callback for when a rights message or template will be deleted. It
   *                                                receives rights message and/or template to delete.
   * @property {Function} onOpenForm                Callback for when the rights messages form needs to be opened.  It
   *                                                receives the rights message and template index to show in the form.
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
    isFormVisible: '<',
    loading: '<',
    message: '<',
    networks: '<',
    rightsMessage: '<',
    rightsMessageIndex: '<',
    rightsMessages: '<',
    onAddTemplateToMessage: '&',
    onChangeRightsMessage: '&',
    onCloseForm: '&',
    onDelete: '&',
    onOpenForm: '&',
    onShowMessageAfterCopy: '&',
    onSubmit: '&',
    onValidateTemplateLength: '&',
    onValidateTosUrl: '&',
  },
};
