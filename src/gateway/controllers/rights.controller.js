const { controller } = require('jimpex');

/**
 * The controller for the rights resource.
 */
class RightsController {
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
   * Use the Admin API2 to create a rights message.
   *
   * @return {ExpressMiddleware}
   */
  createRightsMessage() {
    return (req, res, next) => {
      const rightsMessage = req.body;

      this.adminAPI2.createRightsMessage(req, rightsMessage)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to create a rights message template.
   *
   * @return {ExpressMiddleware}
   */
  createRightsMessageTemplate() {
    return (req, res, next) => {
      const template = req.body;

      this.adminAPI2.createRightsMessageTemplate(req, template)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to delete a rights message.
   *
   * @return {ExpressMiddleware}
   */
  deleteRightsMessage() {
    return (req, res, next) => {
      const { messageId } = req.params;

      this.adminAPI2.deleteRightsMessage(req, messageId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to delete a rights template.
   *
   * @return {ExpressMiddleware}
   */
  deleteRightsTemplate() {
    return (req, res, next) => {
      const { templateId } = req.params;

      this.adminAPI2.deleteRightsTemplate(req, templateId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to edit a rights message.
   *
   * @return {ExpressMiddleware}
   */
  editRightsMessage() {
    return (req, res, next) => {
      const { messageId } = req.params;
      const rightsMessage = req.body;

      this.adminAPI2.editRightsMessage(req, messageId, rightsMessage)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to edit a rights message template.
   *
   * @return {ExpressMiddleware}
   */
  editRightsMessageTemplate() {
    return (req, res, next) => {
      const { templateId } = req.params;
      const template = req.body;

      this.adminAPI2.editRightsMessageTemplate(req, templateId, template)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to get the customer rights messages.
   *
   * @return {ExpressMiddleware}
   */
  getRightsMessages() {
    return (req, res, next) => {
      this.adminAPI2.getRightsMessages(req)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to obtain rights for several media.
   *
   * @return {ExpressMiddleware}
   */
  requestRightsBulk() {
    return (req, res, next) => {
      const rightsRequest = req.body;

      this.adminAPI2.requestRightsBulk(req, rightsRequest)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to obtain rights for a single media.
   *
   * @return {ExpressMiddleware}
   */
  requestRightsSingle() {
    return (req, res, next) => {
      const rightsRequest = req.body;

      this.adminAPI2.requestRightsSingle(req, rightsRequest)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for the rights resource.
 *
 * @type {Controller}
 */
const rightsController = controller((app) => {
  const router = app.get('router');

  const ctrl = new RightsController(
    app.get('adminAPI2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/messages', ctrl.getRightsMessages())
  .post('/messages', ctrl.createRightsMessage())
  .put('/messages/:messageId', ctrl.editRightsMessage())
  .delete('/messages/:messageId', ctrl.deleteRightsMessage())
  .post('/request/bulk', ctrl.requestRightsBulk())
  .post('/request/single', ctrl.requestRightsSingle())
  .post('/templates', ctrl.createRightsMessageTemplate())
  .put('/templates/:templateId', ctrl.editRightsMessageTemplate())
  .delete('/templates/:templateId', ctrl.deleteRightsTemplate());
});

module.exports = {
  RightsController,
  rightsController,
};
