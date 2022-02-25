const { OlapicAPI, olapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * This is the service to comunicate with the Scheduler API.
 *
 * @extends OlapicAPI
 */
class SchedulerAPI extends OlapicAPI {
  /**
   * Makes a request to cancel a task.
   *
   * @param {Object} req         The received request.
   * @param {Number} customerId  The customer id to schedule tasks.
   * @param {String} taskId      The id of the task to be canceled.
   *
   * @return {Promise}
   */
  cancelTask(req, customerId, taskId) {
    const params = {
      customerId,
      taskId,
    };

    return this.delete(
      this.endpoint('taskById', params),
      {},
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the scheduled tasks.
   *
   * @param {Object} req         The received request.
   * @param {Number} customerId  The customer id to get the scheduled tasks.
   * @param {String} dateFrom    The starting publish date to get tasks from.
   * @param {String} dateTo      The lastest publish date to get tasks from.
   *
   * @return {Promise}
   */
  getScheduledTasks(req, customerId, dateFrom, dateTo) {
    const params = {
      customerId,
      from: dateFrom,
      to: dateTo,
    };

    return this.get(
      this.endpoint('scheduledTasks', params),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to reschedule a task.
   *
   * @param {Object} req         The received request.
   * @param {Number} customerId  The customer id to schedule tasks.
   * @param {String} taskId      The id of the task to reschedule.
   * @param {String} date        The date to reschedule the task for.
   *
   * @return {Promise}
   */
  rescheduleTask(req, customerId, taskId, date) {
    const params = { taskId, customerId };
    const body = {
      schedule_time: date,
    };

    return this.put(
      this.endpoint('taskById', params),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to schedule tasks.
   *
   * @param {Object} req         The received request.
   * @param {Number} customerId  The customer id to schedule tasks.
   * @param {Object} taskData    The task data to schedule.
   *
   * @return {Promise}
   */
  scheduleTask(req, customerId, taskData) {
    const params = { customerId };
    const body = {
      ...taskData,
      source: 'ce',
    };

    return this.post(
      this.endpoint('task', params),
      body,
      this._buildRequestOptions(req),
    );
  }
}

/**
 * This is the provider for the SchedulerAPI service.
 *
 * @type {Provider}
 */
const schedulerAPI = olapicAPI('schedulerAPI', 'schedulerAPIServer', SchedulerAPI);

module.exports = {
  SchedulerAPI,
  schedulerAPI,
};
