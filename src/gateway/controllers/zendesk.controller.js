const { controller } = require('jimpex');

/**
 * The controller for the zendesk resource.
 */
class ZendeskController {
  /**
   * @param {AdminAPI2}        adminAPI2         To make requests to the Admin API2.
   * @param {ResponsesBuilder} responsesBuilder  To format the received responses.
   */
  constructor(
    adminAPI2,
    responsesBuilder,
  ) {
    /**
     * The local reference to the `adminAPI2` service.
     *
     * @type {AdminAPI2}
     */
    this.adminAPI2 = adminAPI2;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
  }
  /**
   * Use the Admin API2 to get the Dashboard url and return it.
   *
   * @return {ExpressMiddleware}
   */
  getDashboardUrl() {
    return (req, res, next) => {
      this.adminAPI2.getDashboardUrl(req)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for the zendesk resource.
 *
 * @type {Controller}
 */
const zendeskController = controller((app) => {
  const router = app.get('router');

  const ctrl = new ZendeskController(
    app.get('adminAPI2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/dashboard', ctrl.getDashboardUrl());
});

module.exports = {
  ZendeskController,
  zendeskController,
};
