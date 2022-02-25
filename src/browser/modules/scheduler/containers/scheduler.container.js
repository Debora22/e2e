/**
 * @ngdoc controller
 * @name SchedulerContainer
 * @description
 * This container displays the Scheduler section.
 *
 * @memberof scheduler
 */
class SchedulerContainer {
  /**
   * @param {AppErrorHandler} appErrorHandler  To display any error.
   * @param {AppUtils}        appUtils         To capitalize the task destination.
   * @param {Moment}          moment           To format the current date.
   * @param {TasksList}       tasksList        To get the scheduled tasks list.
   * @param {UIMessages}      uiMessages       To display the confirmation modal.
   */
  constructor(
    appErrorHandler,
    appUtils,
    moment,
    tasksList,
    uiMessages,
  ) {
    'ngInject';

    /**
     * The local reference to the `appErrorHandler` service.
     *
     * @type {AppErrorHandler}
     */
    this.appErrorHandler = appErrorHandler;
    /**
     * The local reference to the `appUtils` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
    /**
     * The local reference to the `tasksList` service.
     *
     * @type {TasksList}
     */
    this.tasksList = tasksList.getNewInstance();
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * Flag to indicate if scheduler modal is open or closed.
     *
     * @type {Boolean}
     */
    this.isSchedulerModalVisible = false;
    /**
     * The selected task.
     *
     * @type {?Object}
     */
    this.selectedTask = null;
  }
  /**
   * Get the scheduled tasks.
   */
  $onInit() {
    this.tasksList.getScheduledTasks()
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * When the cancel button on a task is clicked, it performs a request to do so.
   *
   * @param {Number} taskId  The id of the task to be canceled.
   */
  onCancelTask(taskId) {
    this.uiMessages.confirmation(
      'Cancel Publishing',
      'Are you sure you want to cancel this?<br/>Media won\'t be published at the scheduled time.',
      {
        cancelText: 'No',
        confirmText: 'Yes',
        destructive: true,
      },
    )
    .then((confirm) => (
      confirm ?
        this.tasksList.cancelTask(taskId) :
        null
    ))
    .then((confirm) => confirm && this.tasksList.getScheduledTasks())
    .catch((error) => this.appErrorHandler.handle(error));
  }
  /**
   * Close the scheduler modal.
   */
  onSchedulerModalClose() {
    this.isSchedulerModalVisible = false;
    this.selectedTask = null;
  }
  /**
   * Open the scheduler modal.
   *
   * @param {Object} task  The task to be rescheduled.
   */
  onSchedulerModalOpen(task) {
    this.selectedTask = task;
    this.isSchedulerModalVisible = true;
  }
  /**
   * When the Send Now or Edit date and time buttons on a task are clicked,
   * it performs a request to do so by rescheduling it to selected UTC time.
   *
   * @param {Object} task          The task to be rescheduled.
   * @param {Moment} scheduleTime  The scheduleTime to reschedule the task.
   */
  onSendTask(task, scheduleTime) {
    const destination = this.appUtils.capitalize(task.destination);
    const date = scheduleTime || this.moment().utc();
    const confirmationText = scheduleTime ? 'Reschedule' : 'Send Now';
    const message = scheduleTime ?
      `You are about to schedule this media to be sent to ${destination} ` +
      `on ${scheduleTime.format('MMMM DD, [at] h:mmA')} UTC time.` :
      `You are about to send this media to ${destination} right now, instead of at the scheduled time.`;

    this.uiMessages.confirmation(
      confirmationText,
      message,
      {
        cancelText: 'Cancel',
        confirmText: confirmationText,
      },
    )
    .then((confirm) => (
      confirm ?
        this.tasksList.rescheduleTask(task.id, date) :
        null
    ))
    .then((confirm) => confirm && this.tasksList.getScheduledTasks())
    .catch((error) => this.appErrorHandler.handle(error))
    .finally(() => {
      this.onSchedulerModalClose();
    });
  }
}

/**
 * @ngdoc component
 * @name schedulerContainer
 * @description
 * The scheduler container.
 *
 * @memberof scheduler
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SchedulerContainer}
   */
  controller: SchedulerContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <div
      class="odsSmallIndicator -fullScreen"
      ng-if="$ctrl.tasksList.loading"
    ></div>
    <scheduler
      scheduled-tasks="$ctrl.tasksList.entities"
      on-cancel-task="$ctrl.onCancelTask(taskId)"
      on-scheduler-modal-open="$ctrl.onSchedulerModalOpen(task)"
      on-send-task="$ctrl.onSendTask(task)"
    ></scheduler>
    <ods-modal
      size="small"
      on-close="$ctrl.onSchedulerModalClose()"
      ng-if="$ctrl.isSchedulerModalVisible"
    >
      <scheduler-modal
        media-count="1"
        selected-activation="$ctrl.selectedTask.destination"
        on-cancel="$ctrl.onSchedulerModalClose()"
        on-schedule="$ctrl.onSendTask($ctrl.selectedTask, scheduleTime)"
      ></scheduler-modal>
    </ods-modal>
  `,
};
