import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name TasksList
 * @description
 * This service is used to search for scheduled tasks.
 *
 * @memberof scheduler
 */
class TasksList extends EntitiesList {
  /**
   * @param {$q}     $q      To reject error responses.
   * @param {AppAPI} appAPI  To make the API requests.
   * @param {Moment} moment  To perform date manipulation.
   */
  constructor(
    $q,
    appAPI,
    moment,
  ) {
    'ngInject';

    super($q);

    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
    /**
     * The amount of months we will fetch tasks from including the current one.
     *
     * @type {Number}
     */
    this.monthsRange = 3;
    /**
     * The format in which day dates will be parsed in order to be proccesed.
     *
     * @type {String}
     */
    this.dateFormatMask = 'MM-DD-YYYY';

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Cancel a task.
   *
   * @param {Number} taskId  The id of the task to be canceled.
   *
   * @return {Promise}
   */
  cancelTask(taskId) {
    return this._requestWithLoading(() => this.appAPI.cancelTask(taskId));
  }
  /**
   * Call the API to make the request for the scheduled tasks.
   * Set the range to the scheduled tasks from the beggining of the current month to the next two months.
   *
   * @return {Promise}
   */
  getScheduledTasks() {
    const dateFrom = this.moment().startOf('month');
    const dateTo = this.moment().add(this.monthsRange - 1, 'M').endOf('month');

    return this._getEntities(dateFrom, dateTo);
  }
  /**
   * Call the API to make the request to reschedule an existing task.
   *
   * @param {String} taskId  The id of the task to be rescheduled.
   * @param {Moment} date    The date to reschedule the task for.
   *
   * @return {Promise}
   */
  rescheduleTask(taskId, date) {
    return this._requestWithLoading(() => this.appAPI.rescheduleTask(taskId, date));
  }
  /**
   * Format an API response in order to the get the tasks list.
   *
   * @param {Array} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    return this._groupTasksByDate(response);
  }
  /**
   * Groups the list of tasks by their month and day.
   *
   * @param {Array} tasks  The tasks to be ordered.
   *
   * @access protected
   *
   * @return {Array}
   */
  _groupTasksByDate(tasks) {
    const months = [];
    const currentDate = this.moment().utc();

    for (let i = 0; i < this.monthsRange; i++) {
      const month = this.moment().utc().add(i, 'M').startOf('month');
      months.push(month);
    }

    tasks.forEach((item) => {
      item.schedule_time = this.moment(item.schedule_time).utc();

      if (item.task_type === 'instagram_publish_task') {
        item.destination = item.extra_data.shoppable_instagram_publish ? 'tapshop' : 'instagram';
      } else {
        item.destination = 'tapshop';
      }
    });

    return months.map((month) => {
      const monthTasks = tasks.filter((item) => item.schedule_time.isSame(month, 'month'));
      const daysWithTasks = [...new Set(monthTasks.map((item) => item.schedule_time.format(this.dateFormatMask)))];

      const tasksByDay = daysWithTasks.map((day) => {
        const date = this.moment.utc(day, this.dateFormatMask);
        const isPast = date.isBefore(currentDate, 'day');
        const isToday = date.isSame(currentDate, 'day');
        const dayTasks = monthTasks.filter((item) => item.schedule_time.isSame(date, 'day'))
        .map((task) => ({
          ...task,
          schedule_time: task.schedule_time.toISOString(),
        }));

        return {
          date: date.toISOString(),
          isPast,
          isToday,
          tasks: dayTasks,
        };
      });

      return {
        date: month.toISOString(),
        days: tasksByDay,
      };
    });
  }
  /**
   * Call the API to make the request for the scheduled tasks.
   *
   * @param {String} dateFrom  The start date to get scheduled tasks.
   * @param {String} dateTo    The end date to get scheduled tasks.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(dateFrom, dateTo) {
    return this.appAPI.getScheduledTasks(dateFrom, dateTo);
  }
}

/**
 * @ngdoc factory
 * @name tasksList
 * @description
 * This object contains a method to create a new instance of the {@link TasksList}.
 *
 * @param {$q}     $q      To reject error responses.
 * @param {AppAPI} appAPI  To make the API requests.
 * @param {Moment} moment  To perform date manipulation.
 *
 * @return {Function}
 *
 * @memberof scheduler
 */
const tasksList = (
  $q,
  appAPI,
  moment,
) => {
  'ngInject';

  return {
    getNewInstance: () => new TasksList(
      $q,
      appAPI,
      moment,
    ),
  };
};

export default tasksList;
