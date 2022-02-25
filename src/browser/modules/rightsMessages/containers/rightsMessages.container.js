/**
 * @ngdoc controller
 * @name RightsMessagesContainer
 * @description
 * This container displays the rights messages section.
 *
 * @memberof rightsMessages
 */
class RightsMessagesContainer {
  /**
   * @param {$rootScope}      $rootScope               To emit the events.
   * @param {AppErrorHandler} appErrorHandler          To display any error.
   * @param {Object}          rightsMessagesList       To fecth the rights messages.
   * @param {UIMessages}      uiMessages               To display the delete confirmation message.
   * @param {Object}          RIGHTSMESSAGES_EVENTS    To get the events constant.
   * @param {Object}          RIGHTSMESSAGES_MESSAGE   To get the message constant.
   * @param {Array}           RIGHTSMESSAGES_NETWORKS  To get the networks list.
   */
  constructor(
    $rootScope,
    appErrorHandler,
    rightsMessagesList,
    uiMessages,
    RIGHTSMESSAGES_EVENTS,
    RIGHTSMESSAGES_MESSAGE,
    RIGHTSMESSAGES_NETWORKS,
  ) {
    'ngInject';

    /**
     * The local reference to the `$rootScope` service.
     *
     * @type {$rootScope}
     */
    this.$rootScope = $rootScope;
    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `rightsMessagesList` service.
     *
     * @type {RightsMessagesList}
     */
    this.rightsMessagesList = rightsMessagesList.getNewInstance();
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `events` constant.
     *
     * @type {Object}
     */
    this.events = RIGHTSMESSAGES_EVENTS;
    /**
     * The local reference to the `message` constant.
     *
     * @type {Object}
     */
    this.message = RIGHTSMESSAGES_MESSAGE;
    /**
     * The local reference to the `networks` constant.
     *
     * @type {Array}
     */
    this.networks = RIGHTSMESSAGES_NETWORKS;
    /**
     * Flag to know if the rights messages form is visible or not.
     *
     * @type {Boolean}
     */
    this.isFormVisible = false;
  }
  /**
   * Perform the initial load of rights messages.
   */
  $onInit() {
    this.rightsMessagesList.getRightsMessages()
    .catch((error) => this.appErrorHandler.handle(
      error,
      'Sorry, there was a problem while loading your rights messages. Please try again later.',
    ));
  }
  /**
   * Check if we should display the loading indicator.
   *
   * @return {Boolean}
   */
  isLoading() {
    return this.rightsMessagesList.loading;
  }
  /**
   * Add a template to the message of the rights message that is being created or edited.
   */
  onAddTemplateToMessage() {
    this.rightsMessagesList.addTemplateToMessage();
    this.$rootScope.$emit(this.events.form.addMessage);
  }
  /**
   * Close the rights messages form.
   */
  onCloseForm() {
    this.isFormVisible = false;
  }
  /**
   * Delete a rights message or template.
   *
   * @param {Object} rightsMessage  The rights message to delete.
   * @param {Object} template       The template of the rights message to delete.
   */
  onDelete(rightsMessage, template) {
    if (template) {
      this._deleteRightsTemplate(rightsMessage, template);
    } else {
      this._deleteRightsMessage(rightsMessage);
    }
  }
  /**
   * Open the rights messages form with the provided rights message and template Id.
   *
   * @param {Object?} rightsMessage  The rights message to show in the form.
   * @param {Number?} templateIndex  The index of the rights message template to show in the form.
   * @param {String}  event          The event name to emit.
   */
  onOpenForm(rightsMessage, templateIndex, event) {
    this.rightsMessagesList.prepareRightsMessageForEdit(rightsMessage, templateIndex);
    this.isFormVisible = true;

    this.$rootScope.$emit(event);
  }
  /**
   * Show the success message when a tag is copied to the clipboard.
   */
  onShowMessageAfterCopy() {
    this.uiMessages.notification('Copied to the clipboard!');
  }
  /**
   * Perform the save of the rights messages.
   * After the save is done, close the form or move to the next rights message.
   *
   * @param {Boolean} exitOnSave  If we have to close the form or not after saving.
   */
  onSubmit(exitOnSave) {
    this.rightsMessagesList.saveRightsMessages()
    .then(() => {
      if (exitOnSave) {
        this.onCloseForm();
      } else {
        this.rightsMessagesList.changeRightsMessage(this.rightsMessagesList.rightsMessageIndex + 1);
      }
    })
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Ask for confirmation to delete a rights message.
   *
   * @param {Object} rightsMessage  The rights message to delete.
   */
  _deleteRightsMessage(rightsMessage) {
    this.$rootScope.$emit(this.events.navigation.deleteGroup);

    this.uiMessages.confirmation(
      'Delete Rights Group',
      `Are you sure you want to delete <strong>${rightsMessage.name}</strong> Rights Group?`,
      {
        confirmText: 'Delete',
        destructive: true,
      },
    )
    .then((confirm) => (
      confirm ?
        this.rightsMessagesList.deleteRightsMessage(rightsMessage.id) :
        null
    ))
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Ask for confirmation to delete a rights message template.
   *
   * @param {Object} rightsMessage  The rights message to delete.
   * @param {Object} template       The template of the rights message to delete.
   */
  _deleteRightsTemplate(rightsMessage, template) {
    this.$rootScope.$emit(this.events.navigation.deleteMessage);

    this.uiMessages.confirmation(
      'Delete Rights Message',
      `Are you sure you want to delete <strong>${template.name}</strong> Rights Message?`,
      {
        confirmText: 'Delete',
        destructive: true,
      },
    )
    .then((confirm) => (
      confirm ?
        this.rightsMessagesList.deleteRightsTemplate(rightsMessage.id, template.id) :
        null
    ))
    .catch((error) => this.appErrorHandler.handle(error));
  }
}

/**
 * @ngdoc component
 * @name rightsMessagesContainer
 * @description
 * The rightsMessages container.
 *
 * @memberof rightsMessages
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {RightsMessagesContainer}
   */
  controller: RightsMessagesContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      class="odsSmallIndicator -fullScreen"
      ng-if="$ctrl.isLoading()"
    ></div>
    <rights-messages
      events="$ctrl.events"
      is-form-visible="$ctrl.isFormVisible"
      loading="$ctrl.isLoading()"
      message="$ctrl.message"
      networks="$ctrl.networks"
      rights-message="$ctrl.rightsMessagesList.rightsMessage"
      rights-message-index="$ctrl.rightsMessagesList.rightsMessageIndex"
      rights-messages="$ctrl.rightsMessagesList.entities"
      on-add-template-to-message="$ctrl.onAddTemplateToMessage()"
      on-change-rights-message="$ctrl.rightsMessagesList.changeRightsMessage(index)"
      on-close-form="$ctrl.onCloseForm()"
      on-delete="$ctrl.onDelete(rightsMessage, template)"
      on-open-form="$ctrl.onOpenForm(rightsMessage, templateIndex, event)"
      on-show-message-after-copy="$ctrl.onShowMessageAfterCopy()"
      on-submit="$ctrl.onSubmit(exitOnSave)"
      on-validate-template-length="$ctrl.rightsMessagesList.validateTemplateLength(template)"
      on-validate-tos-url="$ctrl.rightsMessagesList.isTosUrlValid(tosUrl)"
    ></rights-messages>
  `,
};
