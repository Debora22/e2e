const { controller } = require('jimpex');

/**
 * The controller for the advocates resource.
 */
class AdvocatesController {
  /**
   * @param {ReportingAPI}     reportingAPI      To make requests to the Reporting API.
   * @param {ResponsesBuilder} responsesBuilder  To format the received responses.
   */
  constructor(
    reportingAPI,
    responsesBuilder,
  ) {
    /**
     * The local reference to the `reportingAPI` service.
     *
     * @type {ReportingAPI}
     */
    this.reportingAPI = reportingAPI;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
  }
  /**
   * Use the Reporting API to get the list of advocates.
   *
   * @return {ExpressMiddleware}
   */
  getAdvocates() {
    return (req, res, next) => {
      this.reportingAPI.getAdvocates(req, { ...req.params, ...req.query })
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}
/**
 * This controller adds the routes for advocates resource.
 *
 * @type {Controller}
 */
const advocatesController = controller((app) => {
  const router = app.get('router');

  const ctrl = new AdvocatesController(
    app.get('reportingAPI'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/:accountType/:customerFocus', ctrl.getAdvocates());
});

module.exports = {
  AdvocatesController,
  advocatesController,
};
