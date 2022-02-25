import { EventsHub } from 'wootils/shared';

/**
 * @ngdoc service
 * @name UIMessages
 * @description
 * This service works as events hub for the display and expiration of ui messages.
 *
 * @memberof common
 */
class UIMessages extends EventsHub {
  /**
   * @param {$compile}   $compile    To compile component templates with context.
   * @param {$q}         $q          To create a instance of deferred.
   * @param {$rootScope} $rootScope  To create new scopes based on the context of templates.
   * @param {$sce}       $sce        To make Strict Contextual Escaping of the messages content.
   * @param {$timeout}   $timeout    To expire the messages after some expiration time.
   */
  constructor(
    $compile,
    $q,
    $rootScope,
    $sce,
    $timeout,
  ) {
    'ngInject';

    super();

    /**
     * The local reference to the `$compile` service.
     *
     * @type {$compile}
     */
    this.$compile = $compile;
    /**
     * The local reference to the `$q` service.
     *
     * @type {$q}
     */
    this.$q = $q;
    /**
     * The local reference to the `$rootScope` service.
     *
     * @type {$rootScope}
     */
    this.$rootScope = $rootScope;
    /**
     * The local reference to the `$sce` service.
     *
     * @type {$sce}
     */
    this.$sce = $sce;
    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * The current notification in display.
     *
     * @type {Number}
     * @access protected
     */
    this._currentNotificationId = 0;
    /**
     * The map of events.
     *
     * @type {Object}
     * @access protected
     */
    this._eventsNames = {
      confirmation: {
        new: 'app/services/uimessages/confirmation/new',
      },
      notifications: {
        expired: 'app/services/uimessages/notifications/expired',
        new: 'app/services/uimessages/notifications/new',
      },
    };
  }
  /**
   * Based on the title, content and options parameters create a new confirmation.
   * The message title is escaped using `$sce`.
   * Then if the template option is true and a context is provided, we compile the provided
   * component template in the content with the context, get the html and escaped it using `$sce`,
   * then we emit the newly created confirmation.
   * If the template option is not true or no context is provided, the message content is
   * escaped using `$sce` and we emit the newly created confirmation.
   *
   * @param {String} title    The title of the confirmation.
   * @param {String} content  The content of the confirmation.
   * @param {Object} options  The options of the confirmation.
   *
   * @return {Promise}
   */
  confirmation(title, content, options = {}) {
    const defer = this.$q.defer();
    const confirmation = Object.assign({
      title,
      content,
      confirmText: 'Accept',
      cancelText: 'Cancel',
      destructive: false,
      type: '',
      deferred: defer,
    }, options);

    confirmation.title = this.$sce.trustAsHtml(confirmation.title);

    if (confirmation.template && confirmation.context) {
      const newScope = this.$rootScope.$new(true);
      newScope.$ctrl = confirmation.context;
      const element = this.$compile(confirmation.content)(newScope);
      /**
       * We need to use the $timeout cause the interpolation of the
       * variables with the scope happens in the next digest cycle.
       */
      this.$timeout(() => {
        confirmation.content = this.$sce.trustAsHtml(element.html());
        this.emit(this._eventsNames.confirmation.new, confirmation);
      });
    } else {
      confirmation.content = this.$sce.trustAsHtml(confirmation.content);
      this.emit(this._eventsNames.confirmation.new, confirmation);
    }

    return defer.promise;
  }
  /**
   * Based on the content and options parameters create a new notification.
   * The messages content is escaped using `$sce` and emit the new created notification.
   * If the notification has expiration, wait that time and then emit the expired notification.
   *
   * @param {String} content  The notification text to display.
   * @param {Object} options  The options of the notification to display.
   */
  notification(content, options = {}) {
    this._currentNotificationId++;

    const notification = Object.assign({
      id: this._currentNotificationId,
      type: 'info',
      expiration: 3000,
      expired: false,
      content,
      visible: false,
    }, options);

    notification.content = this.$sce.trustAsHtml(notification.content);

    this.emit(this._eventsNames.notifications.new, notification);

    if (notification.expiration) {
      this.$timeout(() => {
        this.emit(this._eventsNames.notifications.expired, notification);
      }, notification.expiration);
    }
  }
  /**
   * Subscribe a function to be called when a notification gets expired.
   *
   * @param {Function} fn  The callback to call on a expired notification.
   *
   * @return {Function} The unsubscribe function.
   */
  onExpiredNotification(fn) {
    return this.on(this._eventsNames.notifications.expired, fn);
  }
  /**
   * Subscribe a function to be called when a new confirmation exists.
   *
   * @param {Function} fn  The callback to call on a new confirmation.
   *
   * @return {Function} The unsubscribe function.
   */
  onNewConfirmation(fn) {
    return this.on(this._eventsNames.confirmation.new, fn);
  }
  /**
   * Subscribe a function to be called when a new notification exists.
   *
   * @param {Function} fn  The callback to call on a new notification.
   *
   * @return {Function} The unsubscribe function.
   */
  onNewNotification(fn) {
    return this.on(this._eventsNames.notifications.new, fn);
  }
}

export default UIMessages;
