const { controller } = require('jimpex');

/**
 * The controller for the scheduler resource.
 */
class SchedulerController {
  /**
   * @param {String}           olapicCustomerHeader  The olapic customer header configuration.
   * @param {ResponsesBuilder} responsesBuilder      To format the received responses.
   * @param {SchedulerAPI}     schedulerAPI          To make request to the Scheduler API.
   */
  constructor(
    olapicCustomerHeader,
    responsesBuilder,
    schedulerAPI,
  ) {
    /**
     * The local reference to the `olapicCustomerHeader` service.
     *
     * @type {String}
     */
    this.olapicCustomerHeader = olapicCustomerHeader;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
    /**
     * The local reference to the `schedulerAPI` service.
     *
     * @type {SchedulerAPI}
     */
    this.schedulerAPI = schedulerAPI;
  }
  /**
   * Use the Scheduler API to cancel a task.
   *
   * @return {ExpressMiddleware}
   */
  cancelTask() {
    return (req, res, next) => {
      const customerId = req.headers[this.olapicCustomerHeader];
      const { taskId } = req.params;

      this.schedulerAPI.cancelTask(req, customerId, taskId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Scheduler API to get the scheduled tasks.
   *
   * @return {ExpressMiddleware}
   */
  getScheduledTasks() {
    return (req, res, next) => {
      const { from, to } = req.query;
      const customerId = req.headers[this.olapicCustomerHeader];

      this.schedulerAPI.getScheduledTasks(req, customerId, from, to)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Scheduler API to reschedule a task.
   *
   * @return {ExpressMiddleware}
   */
  rescheduleTask() {
    return (req, res, next) => {
      const customerId = req.headers[this.olapicCustomerHeader];
      const { taskId } = req.params;
      const { date } = req.body;

      this.schedulerAPI.rescheduleTask(req, customerId, taskId, date)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Scheduler API to schedule tasks.
   *
   * @return {ExpressMiddleware}
   */
  scheduleTask() {
    return (req, res, next) => {
      const customerId = req.headers[this.olapicCustomerHeader];
      const { body } = req;

      this.schedulerAPI.scheduleTask(req, customerId, body)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for scheduler resource.
 *
 * @type {Controller}
 */
const schedulerController = controller((app) => {
  const router = app.get('router');
  const appConfiguration = app.get('appConfiguration');

  const ctrl = new SchedulerController(
    appConfiguration.get('olapicCustomerHeader'),
    app.get('responsesBuilder'),
    app.get('schedulerAPI'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .post('/', ctrl.scheduleTask())
  .delete('/:taskId', ctrl.cancelTask())
  .put('/:taskId', ctrl.rescheduleTask())
  .get('/tasks', ctrl.getScheduledTasks());
});

module.exports = {
  SchedulerController,
  schedulerController,
};
