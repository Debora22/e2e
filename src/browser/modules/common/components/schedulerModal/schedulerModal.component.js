import template from './schedulerModal.html';
import './schedulerModal.scss';

/**
 * @ngdoc controller
 * @name SchedulerModal
 * @description
 * This component renders the scheduler modal.
 *
 * @memberof common
 */
class SchedulerModal {
  /**
   * @param {$timeout} $timeout  To apply the changes made to the list of hours.
   * @param {Moment}   moment    To perform date manipulation.
   */
  constructor(
    $timeout,
    moment,
  ) {
    'ngInject';

    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
    /**
     * The local reference for the calendar options.
     *
     * @type {Object}
     */
    this.calendarOptions = {};
    /**
     * The maximum allowed months to select a date to schedule.
     *
     * @type {Number}
     */
    this.maxMonthsAllowed = 2;
    /**
     * The selected date to schedule media.
     *
     * @type {?Date}
     */
    this.selectedScheduleDate = null;
    /**
     * The selected time to schedule media.
     *
     * @type {?Object}
     */
    this.selectedScheduleTime = null;
    /**
     * The list of hours to display in the dropdown.
     *
     * @type {Array}
     */
    this.hoursList = [];
    /**
     * The map for the time intervals to set the hours options.
     *
     * @type {Object}
     */
    this.timeIntervalMap = {
      zero: 0,
      half: 30,
    };
    /**
     * The local reference for the base calendar options.
     *
     * @type {Object}
     * @access protected
     */
    this._defaultCalendarOptions = {
      showMonths: 1,
      mode: 'single',
      enableTime: false,
      dateFormat: 'l, F j, Y',
      allowInput: false,
    };
  }
  /**
   * Set the calendar initial options.
   */
  $onInit() {
    const minDate = this.moment().toDate();
    const maxDate = this.moment().add(this.maxMonthsAllowed, 'M').endOf('month').toDate();

    this.selectedScheduleDate = minDate;
    this.calendarOptions = {
      ...this._defaultCalendarOptions,
      minDate,
      maxDate,
      defaultDate: this.selectedScheduleDate,
    };

    this._generateHoursList();
  }
  /**
   * Callback for when selecting a date in the Calendar.
   *
   * @param {Date} selectedDate  The selected date Object.
   */
  onDateChange([selectedDate]) {
    this.selectedScheduleDate = selectedDate;
    this._generateHoursList();
  }
  /**
   * Callback for when selecting the schedule time.
   *
   * @param {Object} selectedTime  The selected schedule time object.
   */
  onScheduleTimeSelected(selectedTime) {
    this.selectedScheduleTime = selectedTime;
  }
  /**
   * Generate the List of hours to show in the dropdown and set the first as selected.
   *
   * @access protected
   */
  _generateHoursList() {
    const selectedDate = this.moment(this.selectedScheduleDate).utc().endOf('day');
    const now = this.moment().utc();
    const isToday = !selectedDate.diff(now.clone().endOf('day'), 'days');
    const startHour = isToday ? now.hour() + 1 : this.timeIntervalMap.zero;
    const lastHour = selectedDate.hour() + 1;

    const hoursArray = [];
    let id = 0;
    for (let i = startHour; i < lastHour; i++) {
      const hour = this.moment()
      .hour(i)
      .minute(this.timeIntervalMap.zero);
      const halfHour = this.moment()
      .hour(i)
      .minute(this.timeIntervalMap.half);

      hoursArray.push({
        id: id++,
        value: hour.format('h:mmA'),
        time: hour,
      });
      hoursArray.push({
        id: id++,
        value: halfHour.format('h:mmA'),
        time: halfHour,
      });
    }

    // Make a double $timeout so the hoursList get refreshed from scratch.
    this.$timeout(() => {
      this.hoursList = [];
      this.$timeout(() => {
        this.hoursList = hoursArray;
        [this.selectedScheduleTime] = this.hoursList;
      });
    });
  }
  /**
   * When Schedule button is clicked, get the scheduleTime based on the selectedScheduleTime and
   * selectedScheduleDate, and call the callback to schedule the media.
   *
   * @access protected
   */
  _onSchedule() {
    const { time } = this.selectedScheduleTime;
    const scheduleTime = this.moment(this.selectedScheduleDate)
    .hour(time.hour())
    .minute(time.minute())
    .seconds(0);

    this.onSchedule({ scheduleTime });
  }
}

/**
 * @ngdoc component
 * @name schedulerModal
 * @description
 * The scheduler modal.
 *
 * @memberof common
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {SchedulerModal}
   */
  controller: SchedulerModal,
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
   * @property {Number}   mediaCount          The amount of media to share.
   * @property {String}   selectedActivation  The selected activation to schedule media.
   * @property {Function} onCancel            Callback for when the cancel button is clicked.
   * @property {Function} onSchedule          Callback for when the schedule button is clicked.
   */
  bindings: {
    mediaCount: '<',
    selectedActivation: '<',
    onCancel: '&',
    onSchedule: '&',
  },
};
