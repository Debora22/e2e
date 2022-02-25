const {
  Jimpex,
  controllers,
  services,
  middlewares,
} = require('jimpex');
const authNZUtils = require('olapic-js-utils/node/authNZUtils');
const downloader = require('olapic-js-utils/node/downloader');
const JSZip = require('jszip');

const appControllers = require('../controllers');
const appMiddlewares = require('../middlewares');
const appServices = require('../services');

/**
 * The main class of the gateway, it's in charge of registering all services, middlewares and
 * controllers for the routes that will be available.
 *
 * @extends Jimpex
 */
class App extends Jimpex {
  /**
   * @param {Boolean} [boot=true] Whether or not to automatically call the `boot` method. If `boot`
   *                              gets called from here, there's no place to overwrite services.
   *                              For example: You can instantiate the class with the parameter
   *                              set to `false`, register custom middlewares and/or overwrite
   *                              default services and then call `boot` before starting the app.
   */
  constructor(boot = true) {
    /**
     * Call the parent constructor. The first parameter is also `[boot=true]`, but we are disabling
     * it because it's being handled here, after registering custom services.
     */
    super(false, {
      // Increase the default filesize limit.
      filesizeLimit: '20MB',
      // Enable dynamic configuration for the app.
      configuration: {
        /**
         * This tells Jimpex that the configuration files are named `gateway.config.js` and
         * `gateway.[variant].config.js`.
         */
        name: 'gateway',
        // This tells Jimpex that the configurations are on `/config/gateway/`.
        hasFolder: false,
      },
      statics: {
        /**
         * This tells Jimpex that the statics folder is on an upper level, with the rest of the
         * browser files. We don't want both targets on the same level as we would have to include
         * extra security settings to avoid accessing the node files using the browser.
         * Also, if both targets were on the same level on different folders, or the other target
         * were on a folder inside this one; we would have to know the name of the other target
         * folder on the code. This way is easier: If it's browser related, is on the parent
         * directory.
         */
        folder: '../statics',
      },
    });

    // Serve legacy statics.
    this._addStaticsFolder(
      'static',
      '../static',
      false,
    );
    /**
     * Register the service that reads and writes frontend (browser) related files. The reason
     * we are not accessing the files directly is because we would need to know relative paths
     * for almost everything and, this is the important one, the development app may use a
     * middleware that renders the frontend on memory. This way, the service may be extended or
     * overwriten.
     */
    this.register(services.frontend.frontendFs);
    /**
     * When the app gets started, this service takes an HTML template and injects specific
     * information given by the {@link HTMLValues} service.
     * This is the way the gateway uses to send configuration settings to the frontend.
     */
    this.register(services.html.htmlGenerator({
      // The path to the template file.
      template: '../index.tpl.html',
      // The file that will generate.
      file: '../index.html',
      // A list of settings from the app configuration that will be used as the
      // information to inject on the file.
      configurationKeys: [
        'appTitle',
        'appHTMLTitle',
        'adminAPI2Server',
        'externalApps',
        'features',
        'genericError',
        'moe',
        'olapicCustomerHeader',
        'reportingAPIServer',
        'sso',
        'uploaderPreviewerAPIServer',
        'version',
      ],
    }));

    // Boot the app if needed.
    if (boot) {
      this.boot();
    }
  }
  /**
   * Register all the app custom providers.
   */
  boot() {
    // Set the Zip service
    this.set('zip', () => JSZip);
    // Register all the app services.
    this.register(appServices);
    // Register the authNZUtils service.
    this.register(authNZUtils.service({
      configurationSetting: 'authNZSever',
      endpoints: {
        customerPermissions: 'permissions',
      },
    }));
    // Register the downloader service.
    this.register(downloader.service);
    // This middleware adds an HSTS header on every response, so the app can't be used with plain HTTP.
    this.use(middlewares.common.hsts);
    /**
     * THIS IS IMPORTANT!
     * This middleware prevents the rest of the middlewares and controllers from being executed
     * if the route doesn't match any of the expressions from the second parameter.
     * The idea of this middleware is to prevent unncessary processing if the request will cause
     * a `404`, which will show the user the browser app anyways. This way, if the user attemps
     * to navigate to a route we know will return `404`, we stop the execution and just show the
     * browser app right away.
     *
     * Now, the first parameter will be ignored because we are using the {@link HTMLGenerator},
     * and Jimpex will automatically check if it's registered and try to obtain the name of the HTML
     * file from there. We defined the first parameter because we wanted to customize the
     * second one.
     */
    this.use(middlewares.html.fastHTML());
    /**
     * We tell the app that the `favicon.ico` and `index.html`, served from the root route, are
     * statics files on the parent folder.
     * With the default `statics` middlware we can define a folder, but not single files (on an
     * easy way), but we can't tell it to make the entire parent directory a statics folder, that's
     * where the configuration files and the `package.json` will be located.
     */
    this.mount('/', controllers.common.staticsController({
      files: ['favicon.ico', 'index.html'],
      paths: {
        source: '../',
      },
    }));
    // Mount the health route. This is for the environment to check if the app is running.
    this.mount('/service/health', controllers.common.healthController);
    /**
     * Mount the configuration route.
     * This route will only exists if `debug.configurationController` is set to `true` on the
     * configuration.
     */
    this.mount('/service/config', controllers.common.configurationController);
    /**
     * Mount the middleware that will check if the version on `/api/:version` is the same the
     * app is running with in order to allow access to all the sub routes.
     */
    this.mount('/api', middlewares.utils.versionValidator);
    // Mount all the app controllers.
    this.mount('/api/:version/advocates', appControllers.advocatesController);
    this.mount('/api/:version/collections', appControllers.collectionsController);
    this.mount('/api/:version/keywords', appControllers.keywordsController);
    this.mount('/api/:version/media', appControllers.mediaController);
    this.mount('/api/:version/rights', appControllers.rightsController);
    this.mount('/api/:version/scheduler', appControllers.schedulerController);
    this.mount('/api/:version/settings', appControllers.settingsController);
    this.mount('/api/:version/sharing', appControllers.sharingController);
    this.mount('/api/:version/social', appControllers.socialController);
    this.mount('/api/:version/streams', appControllers.streamsController);
    this.mount('/api/:version/users', appControllers.usersController);
    this.mount('/api/:version/whitelist', appControllers.whitelistController);
    this.mount('/api/:version/zendesk', appControllers.zendeskController);
    // Add sentry middleware
    this.use(appMiddlewares.sentryMiddleware);
    /**
     * Add the error handler middlware. There are two ways the middleware shows the errors:
     * - Unknown errors: These are errors caused by an exception. The middlware will respond with
     *   a `500` and a generic message. But if `debug.showErrors` is set to `true` on the
     *   configuration, it will show the real error message.
     * - Known errors: These are generated by the app using the `AppError` service. They'll show
     *   the real message, not the generic one.
     *
     * For both cases, if `debug.showErrors` is set to `true`, the middleware will also show
     * the stack trace.
     */
    this.use(middlewares.common.errorHandler);
    /**
     * Finally, if no other controller/middleware handled the request, show the browser app.
     * We don't have to configure anything because Jimpex is aware that we used the
     * {@link HTMLGenerator}, and it knows the name of the file.
     */
    this.use(middlewares.html.showHTML);
  }
}

module.exports = App;
