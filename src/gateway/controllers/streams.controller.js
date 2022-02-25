const { controller } = require('jimpex');
const statuses = require('statuses');

/**
 * The controller for the streams resource.
 */
class StreamsController {
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
   * Use the Admin API2 to get search for streams.
   *
   * @return {ExpressMiddleware}
   */
  getStreams() {
    return (req, res, next) => {
      const streamSearchParams = req.query;

      this.adminAPI2.getStreams(req, streamSearchParams)
      .then((response) => this.responsesBuilder.json(
        res,
        response.streams,
        statuses.ok,
        { pagination: response.pagination },
      ))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to link or unlink streams.
   *
   * @return {ExpressMiddleware}
   */
  saveStreams() {
    return (req, res, next) => {
      const { mediaIds } = req.query;
      const streamsChange = req.body;

      this.adminAPI2.saveStreams(req, mediaIds, streamsChange)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for the media resource.
 *
 * @type {Controller}
 */
const streamsController = controller((app) => {
  const router = app.get('router');

  const ctrl = new StreamsController(
    app.get('adminAPI2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/search', ctrl.getStreams())
  .post('/positions', ctrl.saveStreams());
});

module.exports = {
  StreamsController,
  streamsController,
};
