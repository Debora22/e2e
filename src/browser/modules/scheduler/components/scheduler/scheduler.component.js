import template from './scheduler.html';
import './scheduler.scss';

import sendTaskIcon from '../../../../assets/images/sendTaskIcon.svg';
import sentTaskIcon from '../../../../assets/images/sentTaskIcon.svg';
import failedTaskIcon from '../../../../assets/images/failedTaskIcon.svg';
import tapshopIcon from '../../../../assets/images/smallTapshopIcon.svg';

/**
 * @ngdoc controller
 * @name Scheduler
 * @description
 * This component renders the scheduler section.
 *
 * @memberof scheduler
 */
class Scheduler {
  constructor() {
    /**
     * Reference to the failedTaskIcon image.
     *
     * @type {String}
     */
    this.failedTaskIcon = failedTaskIcon;
    /**
     * Reference to the sendTaskIcon image.
     *
     * @type {String}
     */
    this.sendTaskIcon = sendTaskIcon;
    /**
     * Reference to the sentTaskIcon image.
     *
     * @type {String}
     */
    this.sentTaskIcon = sentTaskIcon;
    /**
     * Reference to the tapshopIcon image.
     *
     * @type {String}
     */
    this.tapshopIcon = tapshopIcon;
    /**
     * The local reference to the today date.
     *
     * @type {Date}
     */
    this.todayDate = new Date();
  }
}

/**
 * @ngdoc component
 * @name scheduler
 * @description
 * This component renders the scheduler section.
 *
 * @memberof scheduler
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Scheduler}
   */
  controller: Scheduler,
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
   * @property {Array}    scheduledTasks        The scheduled tasks to be shown.
   * @property {Function} onCancelTask          Callback for when a task is canceled.
   * @property {Function} onSchedulerModalOpen  Callback for when scheduler modal is opened.
   * @property {Function} onSendTask            Callback for when a task is sent now.
   */
  bindings: {
    scheduledTasks: '<',
    onCancelTask: '&',
    onSchedulerModalOpen: '&',
    onSendTask: '&',
  },
};
