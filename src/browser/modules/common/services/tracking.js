/**
 * @ngdoc service
 * @name tracking
 * @description
 * The service to track events on Google Analytics.
 *
 * @memberof common
 */
class Tracking {
  /**
   * @param {$analytics} $analytics        The `angulartics` service for the tracking.
   * @param {$window}    $window           To get the global GA object.
   * @param {Object}     appConfiguration  To get the Analytics configuration.
   */
  constructor(
    $analytics,
    $window,
    appConfiguration,
  ) {
    'ngInject';

    /**
     * The local reference to the `$analytics` service.
     *
     * @type {Object}
     */
    this.$analytics = $analytics;
    /**
     * The local reference to the `analytics` object.
     *
     * @type {Object}
     */
    this.analytics = appConfiguration.features.analytics;

    if (this.analytics.enabled && $window.ga) {
      $window.ga('create', this.analytics.id, 'auto');
    }
  }
  /**
   * Set an account and user configuration for the `$analytics` service.
   *
   * @param {Object} account  The account to set.
   * @param {Object} user     The user to set.
   */
  setConfig(account, user) {
    if (this.analytics.enabled) {
      this.$analytics.setUserProperties({
        dimension1: account.user_dir,
        dimension6: account.id,
        dimension7: user.id,
      });
    }
  }
  /**
   * Track an event on the `$analytics` service.
   *
   * @param {Object} event           The event to track.
   * @param {String} event.category  The category of the event.
   * @param {String} event.action    The action of the event.
   * @param {String} event.label     The event label data.
   * @param {Number} event.value     The event value data.
   *
   */
  trackEvent(event) {
    if (this.analytics.enabled) {
      this.$analytics.eventTrack(event.action, {
        category: `${this.analytics.eventsPrefix}${event.category}`,
        label: event.label,
        value: event.value || 0,
      });
    }
  }
}

export default Tracking;
