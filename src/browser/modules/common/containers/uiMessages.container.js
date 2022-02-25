/**
 * @ngdoc controller
 * @name UIMessagesContainer
 * @description
 * This container renders ui messages.
 *
 * @memberof common
 */
class UIMessagesContainer {
  /**
   * @param {$timeout}   $timeout          To wait for the animation time to expire an existing message.
   * @param {Object}     appConfiguration  To get the notification animation time.
   * @param {UIMessages} uiMessages        To subscribe to any ui message event.
   */
  constructor(
    $timeout,
    appConfiguration,
    uiMessages,
  ) {
    'ngInject';

    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * The local reference to the `notificationsConfiguration` constant.
     *
     * @type {Object}
     */
    this.notificationsConfiguration = appConfiguration.notifications;
    /**
     * The local reference to the `uiMessages` service.
     *
     * @type {UIMessages}
     */
    this.uiMessages = uiMessages;
    /**
     * The confirmation to display.
     *
     * @type {Object}
     */
    this.confirmation = {};
    /**
     * Flag that indicates if the Confirmation is visible or not.
     *
     * @type {Boolean}
     */
    this.showConfirmation = false;
    /**
     * The list of notifications.
     *
     * @type {Array}
     */
    this.notifications = [];
    /**
     * The list of subscriptions functions that need to be called when $onDestroy.
     *
     * @type {Array}
     * @access protected
     */
    this._subscriptions = [];

    /**
     * @ignore
     */
    this.addNotification = this.addNotification.bind(this);
    /**
     * @ignore
     */
    this.closeNotification = this.closeNotification.bind(this);
    /**
     * @ignore
     */
    this.openConfirmation = this.openConfirmation.bind(this);
  }
  /**
   * Subscribe to the uiMessages notification events.
   */
  $onInit() {
    this._subscriptions = [
      this.uiMessages.onNewNotification(this.addNotification),
      this.uiMessages.onExpiredNotification(this.closeNotification),
      this.uiMessages.onNewConfirmation(this.openConfirmation),
    ];
  }
  /**
   * Clear all listeners.
   */
  $onDestroy() {
    this._subscriptions.forEach((unsubscribeFn) => unsubscribeFn());
  }
  /**
   * Add a new notification to the list and make it visible, but first check the
   * max amount of notifications in display. If we can't show any more notifications
   * close the first displayed notification (the last visible notification in the list).
   *
   * @param {Notification} notification  The notification to display.
   */
  addNotification(notification) {
    const visibleNotifications = this.notifications.filter((element) => element.visible);
    if (visibleNotifications.length >= this.notificationsConfiguration.maxOnDisplay) {
      const lastVisibleNotification = visibleNotifications[visibleNotifications.length - 1];

      this.closeNotification(lastVisibleNotification);
    }

    // Add the notification first in the list
    this.notifications.unshift(notification);
    // Wait for the notification to be binded and then make it visible
    this.$timeout(() => {
      notification.visible = true;
    });
  }
  /**
   * Check if the given notification exist in the list of notification. If it does, expire the notification,
   * then wait the animation time before removing the notification from the list.
   *
   * @param {Notification} notification  The notification to close.
   */
  closeNotification(notification) {
    const expiredNotification = this.notifications.find((element) => element.id === notification.id);
    if (expiredNotification) {
      expiredNotification.expired = true;

      this.$timeout(() => {
        const index = this.notifications.findIndex((element) => element.id === notification.id);
        this.notifications.splice(index, 1);
      }, this.notificationsConfiguration.animationTime);
    }
  }
  /**
   * Handle the result of the confirmation, clear the confirmation information and hide it.
   *
   *
   * @param {Boolean} isConfirmed  If the confirmation was confirmed or not.
   */
  handleConfirmation(isConfirmed) {
    this.confirmation.deferred.resolve(isConfirmed);
    this.confirmation = {};
    this.showConfirmation = false;
  }
  /**
   * Set a new confirmation as the displayed on and make it visible.
   *
   * @param {Confirmation} confirmation  The confirmation to display.
   */
  openConfirmation(confirmation) {
    this.confirmation = confirmation;
    this.showConfirmation = true;
  }
}

/**
 * @ngdoc component
 * @name uiMessagesContainer
 * @description
 * The uiMessages container.
 *
 * @memberof common
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {UIMessagesContainer}
   */
  controller: UIMessagesContainer,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template: `
    <ods-confirmation
      body="$ctrl.confirmation.content"
      cancel-cta="$ctrl.confirmation.cancelText"
      confirm-cta="$ctrl.confirmation.confirmText"
      destructive="$ctrl.confirmation.destructive"
      header="$ctrl.confirmation.title"
      type="$ctrl.confirmation.type"
      on-close="$ctrl.handleConfirmation()"
      on-confirm="$ctrl.handleConfirmation(true)"
      ng-if="$ctrl.showConfirmation"
    ></ods-confirmation>
    <ods-notifications
      notifications="$ctrl.notifications"
    ></ods-notifications>
  `,
};
