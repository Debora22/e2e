const { controller } = require('jimpex');

/**
 * The controller for the users resource.
 */
class UsersController {
  /**
   * @param {ApiV2}            apiV2             To make requests to the API V2.
   * @param {ResponsesBuilder} responsesBuilder  To format the received responses.
   */
  constructor(
    apiV2,
    responsesBuilder,
  ) {
    /**
     * The local reference to the `apiV2` service.
     *
     * @type {ApiV2}
     */
    this.apiV2 = apiV2;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
  }
  /**
   * Use the API V2 to create an user.
   *
   * @return {ExpressMiddleware}
   */
  createUser() {
    return (req, res, next) => {
      this.apiV2.createUser(req, req.body)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for the users resource.
 *
 * @type {Controller}
 */
const usersController = controller((app) => {
  const router = app.get('router');

  const ctrl = new UsersController(
    app.get('apiV2'),
    app.get('responsesBuilder'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .post('/', ctrl.createUser());
});

module.exports = {
  UsersController,
  usersController,
};
