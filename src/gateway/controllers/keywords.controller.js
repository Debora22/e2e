const { controller } = require('jimpex');

/**
 * The controller for the keywords resource.
 */
class KeywordsController {
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
   * Use the Admin API2 to get the keywords suggestions.
   *
   * @return {ExpressMiddleware}
   */
  getKeywordsSuggestions() {
    return (req, res, next) => {
      const { phrase } = req.params;

      this.adminAPI2.getKeywordsSuggestions(req, phrase)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for the keywords resource.
 *
 * @type {Controller}
 */
const keywordsController = controller((app) => {
  const router = app.get('router');

  const ctrl = new KeywordsController(
    app.get('adminAPI2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/:phrase', ctrl.getKeywordsSuggestions());
});

module.exports = {
  KeywordsController,
  keywordsController,
};
