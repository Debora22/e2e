import template from './whitelistCalendar.html';
import './whitelistCalendar.scss';

/**
 * @ngdoc controller
 * @name WhitelistCalendar
 * @description
 * This component renders the whitelist's calendar inputs.
 *
 * @memberof whitelist
 */
class WhitelistCalendar {
  /**
   * @param {$timeout} $timeout  To apply the changes made to the dates.
   * @param {Moment}   moment    To perform date manipulation.
   */
  constructor($timeout, moment) {
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
     * The local reference for the Flatpickr's instances provided by the Ods Calendar component.
     * It will manage two instances (one per calendar input: Date From & Date To).
     *
     * @type {Map<Flatpickr>}
     */
    this.flatpickrInstances = {};
    /**
     * The local reference for the 'from' calendar options.
     *
     * @type {Object}
     */
    this.fromCalendarOptions = {};
    /**
     * The local reference for the 'to' calendar options.
     *
     * @type {Object}
     */
    this.toCalendarOptions = {};
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
      dateFormat: 'm/d/Y',
      allowInput: false,
    };
  }
  /**
   * Set the initial calendars options, default dates and the min date.
   */
  $onInit() {
    this.fromCalendarOptions = angular.copy(this._defaultCalendarOptions);
    this.toCalendarOptions = angular.copy(this._defaultCalendarOptions);

    if (angular.isDate(this.dates.dateFrom)) {
      this.fromCalendarOptions.defaultDate = this.dates.dateFrom;
      this.toCalendarOptions.minDate = this._getDateToMinDate(this.dates.dateFrom);
    }

    if (angular.isDate(this.dates.dateTo)) {
      this.toCalendarOptions.defaultDate = this.dates.dateTo;
    }
  }
  /**
   * Each time the dates binding changes, update the flatpickr instances.
   *
   * @param {Object} changes        The binding changes.
   * @param {Object} changes.dates  The dates change object.
   */
  $onChanges({ dates }) {
    if (
      dates &&
      dates.currentValue &&
      this.flatpickrInstances.dateFrom &&
      this.flatpickrInstances.dateTo
    ) {
      this.flatpickrInstances.dateFrom.setDate(this.dates.dateFrom, false);
      this.flatpickrInstances.dateTo.setDate(this.dates.dateTo, false);
    }
  }
  /**
   * Callback for the Ods Calendar's component.
   *
   * @param {Date}      selectedDates  The date Object provided by the plugin.
   * @param {String}    dateStr        The date string provided by the plugin.
   * @param {Flatpickr} instance       The flatpickr's intance returned by the plugin.
   * @param {String}    calendar       The calendar instance identifier.
   */
  onCalendarInstanceReady(selectedDates, dateStr, instance, calendar) {
    this.flatpickrInstances[calendar] = instance;
  }
  /**
   * Callback for clearing a specific calendar instance.
   *
   * @param {String} calendar  The calendar instance identifier.
   */
  onClearDate(calendar) {
    this.flatpickrInstances[calendar].clear();
  }
  /**
   * Callback for when selecting a date in the Calendar.
   *
   * @param {Date}      selectedDates  The date Object provided by the plugin.
   * @param {String}    dateStr        The date string provided by the plugin.
   * @param {Flatpickr} instance       The flatpickr's intance returned by the plugin.
   * @param {String}    calendar       The calendar instance identifier.
   */
  onDateChange(selectedDates, dateStr, instance, calendar) {
    let date = dateStr ? this.moment(selectedDates[0]) : null;
    const isDateFrom = calendar === 'dateFrom';

    if (date) {
      if (isDateFrom) {
        date.startOf('day');

        const minDate = this._getDateToMinDate(date.toDate());
        this.flatpickrInstances.dateTo.set('minDate', minDate);
      } else {
        date.endOf('day');
      }

      date = date.toDate();
    } else if (isDateFrom) {
      this.flatpickrInstances.dateTo.set('minDate', null);
    }

    this.$timeout(() => {
      this.onDateSet({ date: calendar, value: date });
    });
  }
  /**
   * Get the minimum 'dateTo' date to set to the calendar.
   *
   * @param {Date} date  The from date to generate the minimum 'dateTo' date.
   *
   * @return {Date}
   */
  _getDateToMinDate(date) {
    return this.moment(date).add(1, 'day').toDate();
  }
}

/**
 * @ngdoc component
 * @name whitelistCalendar
 * @description
 * The calendar input component.
 *
 * @memberof whitelist
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {WhitelistCalendar}
   */
  controller: WhitelistCalendar,
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
   * @property {Object}   dates      The dates from and to corresponding to whitelist users/s.
   * @property {Function} onDateSet  Callback when the user selects a date from the calendar. It receives
   *                                 the type of date selected and the date value.
   */
  bindings: {
    dates: '<',
    onDateSet: '&',
  },
};
