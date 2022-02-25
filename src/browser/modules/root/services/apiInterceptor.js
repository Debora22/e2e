import statuses from 'statuses';

/**
 * @ngdoc service
 * @name apiInterceptor
 * @description
 * It checks if the API responds with a error.
 *
 * @memberof rootModule
 */
class APIInterceptor {
  /**
   * @param {$location}  $location   To get the current path.
   * @param {$q}         $q          To return an already rejected promise.
   * @param {AppEvents}  appEvents   To emit the app events.
   * @param {AppUpdates} appUpdates  To inform the app of the `409`.
   * @param {Object}     APP_EVENTS  To emit an unauthorized event.
   */
  constructor(
    $location,
    $q,
    appEvents,
    appUpdates,
    APP_EVENTS,
  ) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `appEvents` service.
     *
     * @type {AppEvents}
     */
    this.appEvents = appEvents;
    /**
     * The local reference to the `appUpdates` service.
     *
     * @type {AppUpdates}
     */
    this.appUpdates = appUpdates;
    /**
     * The local reference to the `APP_EVENTS` constant.
     *
     * @type {Object}
     */
    this.APP_EVENTS = APP_EVENTS;
    /**
     * @ignore
     */
    this.responseError = this.responseError.bind(this);
  }
  /**
   * This method gets executed after a failed request, it checks if the response status is
   * unauthorized or conflict and informs the service that handles the update.
   *
   * @param {Object} response  The request response.
   *
   * @return {Promise} An already rejected promise.
   */
  responseError(response) {
    if (
      response.status === statuses.unauthorized &&
      !this.$location.path().includes('login')
    ) {
      this.appEvents.emit(this.APP_EVENTS.session.unauthorized);
    } else if (response.status === statuses.conflict) {
      this.appUpdates.theAppNeedsToBeUpdated();
      /**
       * @todo Since we don't have a way to detect whether the new version is breaking or not,
       * the app will be completely reloaded; the reason we return a promise that "will never
       * be resolved" is to avoid issues with other processes that may run after this.
       */
      return this.$q(() => {});
    }

    return this.$q.reject(response);
  }
}

export default APIInterceptor;
