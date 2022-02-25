const { controller } = require('jimpex');

/**
 * The controller for the sharing resource.
 */
class SharingController {
  /**
   * @param {SharingAPI}       sharingAPI        To make requests to the Sharing API.
   * @param {ResponsesBuilder} responsesBuilder  To format the received responses.
   */
  constructor(
    sharingAPI,
    responsesBuilder,
  ) {
    /**
     * The local reference to the `sharingAPI` service.
     *
     * @type {SharingAPI}
     */
    this.sharingAPI = sharingAPI;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
  }
  /**
   * Use the Sharing to create a sharing document.
   *
   * @return {ExpressMiddleware}
   */
  createSharingDocument() {
    return (req, res, next) => {
      const { mediaList } = req.body;

      this.sharingAPI.createSharingDocument(req, mediaList)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}
/**
 * This controller adds the routes for sharing resource.
 *
 * @type {Controller}
 */
const sharingController = controller((app) => {
  const router = app.get('router');

  const ctrl = new SharingController(
    app.get('sharingAPI'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .post('/documents', ctrl.createSharingDocument());
});

module.exports = {
  SharingController,
  sharingController,
};
