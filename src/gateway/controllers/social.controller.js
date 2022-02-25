const { controller } = require('jimpex');

/**
 * The controller for the social resource.
 */
class SocialController {
  /**
   * @param {AdminAPI2}           adminAPI2             To make requests to the Admin API2.
   * @param {String}              olapicCustomerHeader  The olapic customer header configuration.
   * @param {PinterestGatewayAPI} pinterestGatewayAPI   To make requests to the Pinterest Gateway API.
   * @param {ResponsesBuilder}    responsesBuilder      To format the received responses.
   * @param {SocialConnectorAPI}  socialConnectorAPI    To make requests to the SocialConnector API.
   */
  constructor(
    adminAPI2,
    olapicCustomerHeader,
    pinterestGatewayAPI,
    responsesBuilder,
    socialConnectorAPI,
  ) {
    /**
     * The local reference to the `adminAPI2` service.
     *
     * @type {AdminAPI2}
     */
    this.adminAPI2 = adminAPI2;
    /**
     * The local reference to the `olapicCustomerHeader` service.
     *
     * @type {String}
     */
    this.olapicCustomerHeader = olapicCustomerHeader;
    /**
     * The local reference to the `pinterestGatewayAPI` service.
     *
     * @type {PinterestGatewayAPI}
     */
    this.pinterestGatewayAPI = pinterestGatewayAPI;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
    /**
     * The local reference to the `socialConnectorAPI` service.
     *
     * @type {SocialConnectorAPI}
     */
    this.socialConnectorAPI = socialConnectorAPI;
  }
  /**
   * Use the Admin API2 to delete a social account connection.
   *
   * @return {ExpressMiddleware}
   */
  deleteSocialAccount() {
    return (req, res, next) => {
      const { socialConnectionId } = req.params;

      this.adminAPI2.deleteSocialAccount(req, socialConnectionId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Social Connector API to get the Facebook Ads Accounts.
   *
   * @return {ExpressMiddleware}
   */
  getFacebookAdsAccounts() {
    return (req, res, next) => {
      const customerId = req.headers[this.olapicCustomerHeader];

      this.socialConnectorAPI.getFacebookAdsAccounts(req, customerId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Social Connector API to get the Instagram Business Accounts.
   *
   * @return {ExpressMiddleware}
   */
  getInstagramBusinessAccounts() {
    return (req, res, next) => {
      const customerId = req.headers[this.olapicCustomerHeader];

      this.socialConnectorAPI.getInstagramBusinessAccounts(req, customerId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Pinterest Gateway API to get the list of Pinterest boards.
   *
   * @return {ExpressMiddleware}
   */
  getPinterestBoards() {
    return (req, res, next) => {
      const { socialAccountId } = req.body;

      this.pinterestGatewayAPI.getPinterestBoards(req, socialAccountId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Pinterest Gateway API to get the Pinterest pin details.
   *
   * @return {ExpressMiddleware}
   */
  getPinterestPin() {
    return (req, res, next) => {
      const { socialAccountId } = req.body;
      const { pinId } = req.params;

      this.pinterestGatewayAPI.getPinterestPin(req, pinId, socialAccountId)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to get the customer social accounts (Facebook, Instagram and Twitter accounts).
   *
   * @return {ExpressMiddleware}
   */
  getSocialAccounts() {
    return (req, res, next) => {
      this.adminAPI2.getSocialAccounts(req)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to get the customer social mentions accounts (business Instagram accounts
   * connected to the Facebook social account).
   *
   * @return {ExpressMiddleware}
   */
  getSocialMentionsAccounts() {
    return (req, res, next) => {
      this.adminAPI2.getSocialMentionsAccounts(req)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Social Connector API to send media to Facebook Ads Manager.
   *
   * @return {ExpressMiddleware}
   */
  sendMediaToFacebook() {
    return (req, res, next) => {
      const customerId = req.headers[this.olapicCustomerHeader];
      const { adAccountId, data } = req.body;

      this.socialConnectorAPI.sendMediaToFacebook(req, customerId, adAccountId, data)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Social Connector API to send media to Pinterest.
   *
   * @return {ExpressMiddleware}
   */
  sendMediaToPinterest() {
    return (req, res, next) => {
      const { socialAccountId, board, media } = req.body;

      this.pinterestGatewayAPI.sendMediaToPinterest(req, socialAccountId, board, media)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
}

/**
 * This controller adds the routes for the social resource.
 *
 * @type {Controller}
 */
const socialController = controller((app) => {
  const router = app.get('router');
  const appConfiguration = app.get('appConfiguration');

  const ctrl = new SocialController(
    app.get('adminAPI2'),
    appConfiguration.get('olapicCustomerHeader'),
    app.get('pinterestGatewayAPI'),
    app.get('responsesBuilder'),
    app.get('socialConnectorAPI'),
  );

  return router
  .all('*', app.get('ensureBearerToken'))
  .get('/accounts', ctrl.getSocialAccounts())
  .get('/accounts/mentions', ctrl.getSocialMentionsAccounts())
  .delete('/accounts/:socialConnectionId', ctrl.deleteSocialAccount())
  .get('/fb/adsaccounts', ctrl.getFacebookAdsAccounts())
  .post('/fb/adsaccounts/assets', ctrl.sendMediaToFacebook())
  .get('/instagram/accounts', ctrl.getInstagramBusinessAccounts())
  .post('/pinterest/boards', ctrl.getPinterestBoards())
  .post('/pinterest/pins', ctrl.sendMediaToPinterest())
  .post('/pinterest/pins/:pinId', ctrl.getPinterestPin());
});

module.exports = {
  SocialController,
  socialController,
};
