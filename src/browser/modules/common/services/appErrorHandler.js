/**
 * @ngdoc service
 * @name appErrorHandler
 * @description
 * A service to handle the app errors.
 *
 * @memberof common
 */
class AppErrorHandler {
  /**
   * @param {$log}       $log              To log every error.
   * @param {UIMessages} uiMessages        To display the error messages.
   * @param {Object}     appConfiguration  To get the generic error text.
   */
  constructor($log, uiMessages, appConfiguration) {
    'ngInject';

    /**
     * The local reference to the `$log` service.
     *
     * @type {$log}
     */
    this.$log = $log;
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The local reference to the `genericError` constant.
     *
     * @type {String}
     */
    this.genericError = appConfiguration.genericError;
  }
  /**
   * Handle an error.
   *
   * @param {Error}   error          The error to handle.
   * @param {String}  customMessage  The custom message to display on the UI.
   * @param {Boolean} silent         If should display the error on the UI or not.
   */
  handle(error, customMessage = '', silent = false) {
    if (error) {
      if (!silent) {
        const message = customMessage || error.message || this.genericError;

        this.uiMessages.notification(message, { type: 'error' });
      }

      if (error instanceof Error) {
        this.$log.error(error);
      }
    }
  }
  /**
   * Handle an error without displaying anything on the UI.
   *
   * @param {Error} error  The error to handle.
   */
  silent(error) {
    this.handle(error, '', true);
  }
}

export default AppErrorHandler;
