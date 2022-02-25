const { controller } = require('jimpex');
const statuses = require('statuses');

/**
 * The controller for the whitelist resource.
 */
class WhitelistController {
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
   * Use the Admin API2 to delete a whitelist user.
   *
   * @return {ExpressMiddleware}
   */
  deleteWhitelistUser() {
    return (req, res, next) => {
      const { whitelistUserId } = req.params;

      this.adminAPI2.deleteWhitelistUser(req, whitelistUserId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to get the list of whitelist users.
   *
   * @return {ExpressMiddleware}
   */
  getWhitelistUsers() {
    return (req, res, next) => {
      const {
        itemsPerPage,
        pageNumber,
        search,
        criteria,
        sortBy,
        sortOrder,
        status,
        labelPartialMatch,
      } = req.query;

      this.adminAPI2.getWhitelistUsers(
        req,
        itemsPerPage,
        pageNumber,
        search,
        criteria,
        sortBy,
        sortOrder,
        status,
        labelPartialMatch,
      )
      .then((response) => this.responsesBuilder.json(
        res,
        response.users_whitelist,
        statuses.ok,
        { pagination: response.pagination },
      ))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to create/update a list of whitelist users
   * or to delete a list of whitelist users.
   *
   * @return {ExpressMiddleware}
   */
  updateWhitelistUsers() {
    return (req, res, next) => {
      const { addWhitelistUsers } = req.body;
      const { deleteUsersIds } = req.body;

      this.adminAPI2.updateWhitelistUsers(req, addWhitelistUsers, deleteUsersIds)
      .then((response) => {
        let result = {};

        if (!response.error) {
          result = { success: true };
        }

        return this.responsesBuilder.json(
          res,
          response,
          statuses.ok,
          result,
        );
      })
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to validate a list of whitelist users.
   *
   * @return {ExpressMiddleware}
   */
  validateWhitelistUsers() {
    return (req, res, next) => {
      const { addWhitelistUsers } = req.body;

      this.adminAPI2.validateWhitelistUsers(req, addWhitelistUsers)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}
/**
 * This controller adds the routes for whitelist resource.
 *
 * @type {Controller}
 */
const whitelistController = controller((app) => {
  const router = app.get('router');

  const ctrl = new WhitelistController(
    app.get('adminAPI2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/search', ctrl.getWhitelistUsers())
  .put('/bulk', ctrl.updateWhitelistUsers())
  .post('/bulk/validate', ctrl.validateWhitelistUsers())
  .delete('/:whitelistUserId', ctrl.deleteWhitelistUser());
});

module.exports = {
  WhitelistController,
  whitelistController,
};
