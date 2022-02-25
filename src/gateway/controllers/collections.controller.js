const { controller } = require('jimpex');

/**
 * The controller for the collections resource.
 */
class CollectionsController {
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
   * Use the Admin API2 to change the status of a collection.
   *
   * @return {ExpressMiddleware}
   */
  changeCollectionStatus() {
    return (req, res, next) => {
      const { collectionId } = req.params;
      const collectionChange = req.body;

      this.adminAPI2.changeCollectionStatus(req, collectionId, collectionChange)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to create a collection.
   *
   * @return {ExpressMiddleware}
   */
  createCollection() {
    return (req, res, next) => {
      const collection = req.body;

      this.adminAPI2.createCollection(req, collection)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to delete a collection.
   *
   * @return {ExpressMiddleware}
   */
  deleteCollection() {
    return (req, res, next) => {
      const { collectionId } = req.params;

      this.adminAPI2.deleteCollection(req, collectionId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to edit a collection.
   *
   * @return {ExpressMiddleware}
   */
  editCollection() {
    return (req, res, next) => {
      const { collectionId } = req.params;
      const collection = req.body;

      this.adminAPI2.editCollection(req, collectionId, collection)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to get the list of collections.
   *
   * @return {ExpressMiddleware}
   */
  getCollections() {
    return (req, res, next) => {
      this.adminAPI2.getCollections(req)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}
/**
 * This controller adds the routes for collections resource.
 *
 * @type {Controller}
 */
const collectionsController = controller((app) => {
  const router = app.get('router');

  const ctrl = new CollectionsController(
    app.get('adminAPI2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .delete('/:collectionId', ctrl.deleteCollection())
  .patch('/:collectionId', ctrl.changeCollectionStatus())
  .put('/:collectionId', ctrl.editCollection())
  .get('/', ctrl.getCollections())
  .post('/', ctrl.createCollection());
});

module.exports = {
  CollectionsController,
  collectionsController,
};
