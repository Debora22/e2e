const { middleware } = require('jimpex');
const raven = require('raven');

/**
 * The middleware for Sentry.
 */
class SentryMiddleware {
  /**
   * @param {Class}  AppError           To class of the AppError.
   * @param {String} configurationName  The current name configuration.
   * @param {Object} sentry             The sentry configuration.
   * @param {String} version            The app version string.
   */
  constructor(AppError, configurationName, sentry, version) {
    /**
     * The local reference to the `AppError` class.
     *
     * @type {Class}
     */
    this.AppError = AppError;
    /**
     * The local reference to the `configurationName` constant.
     *
     * @type {String}
     */
    this.configurationName = configurationName;
    /**
     * The local reference to the `version` constant.
     *
     * @type {String}
     */
    this.version = version;

    // Configure sentry integration with raven.
    raven.config(`https://${sentry.apiKey}@sentry.io/${sentry.projectId}`);
  }
  /**
   * Capture the app errors and track them on Sentry.
   *
   * @return {ExpressMiddleware}
   */
  middleware() {
    return (err, req, res, next) => {
      if (err) {
        if (!(err instanceof this.AppError)) {
          const host = req.get('Host');

          raven.captureException(err, {
            extra: {
              url: `${host}${req.originalUrl}`,
              referer: req.header('Referer'),
              token: (res.locals && res.locals.token) || '',
              configuration: this.configurationName,
              version: this.version,
            },
          });
        }

        return next(err);
      }

      return next();
    };
  }
}

/**
 * This is the middleware for Sentry.
 *
 * @type {Middleware}
 */
const sentryMiddleware = middleware((app) => {
  const appConfiguration = app.get('appConfiguration');
  const {
    features,
    name,
    version,
  } = appConfiguration.get(['features', 'name', 'version']);
  const { sentry } = features;

  return sentry.enabled ?
    (new SentryMiddleware(
      app.get('AppError'),
      name,
      sentry,
      version,
    )).middleware() :
    null;
});

module.exports = {
  SentryMiddleware,
  sentryMiddleware,
};
