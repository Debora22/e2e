import { EventsHub } from 'wootils/shared';

/**
 * @ngdoc service
 * @name rightsExtension
 * @description
 * The service is used to integrate with the rights extension.
 *
 * @memberof common
 */
class RightsExtension extends EventsHub {
  /**
   * @param {$window}         $window           To send the mesasges to the extension.
   * @param {Object}          appConfiguration  To get the rights extension Id.
   * @param {CompareVersions} compareVersions   To compare the extension versions.
   */
  constructor($window, appConfiguration, compareVersions) {
    'ngInject';

    super();
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The rights extension id.
     *
     * @type {String}
     */
    this.rightsExtensionId = appConfiguration.rights.extension.id;
    /**
     * The rights extension version.
     *
     * @type {String}
     */
    this.rightsExtensionVersion = appConfiguration.rights.extension.version;
    /**
     * The local reference to the `compareVersions` service.
     *
     * @type {compareVersions}
     */
    this.compareVersions = compareVersions;
    /**
     * Flag that indicates if the rights extension is installed or not.
     *
     * @type {Boolean}
     */
    this.isInstalled = false;
    /**
     * Flag that indicates if the rights extension is up to date or not.
     *
     * @type {Boolean}
     */
    this.isUpToDate = false;
    /**
     * The connected instagram profile.
     *
     * @type {?Object}
     */
    this.instagramProfile = null;
    /**
     * The map of events.
     *
     * @type {Object}
     * @access protected
     */
    this._eventsNames = {
      mediaUpdate: 'app/services/rightsExtension/mediaUpdate',
    };
  }
  /**
   * Subscribe a function to be called when a media gets updated.
   *
   * @param {Function} fn  The callback to call on a media update.
   *
   * @return {Function} The unsubscribe function.
   */
  onMediaUpdate(fn) {
    return this.on(this._eventsNames.mediaUpdate, fn);
  }
  /**
   * Open the rights extension with the provided media and selected rights message group.
   *
   * @param {Array}  media                         The list of media to show in the rights extension.
   * @param {Object} selectedRightsMessageGroup    The selected rights message group.
   * @param {Object} rightsMessageGroupPiiConsent  The rights message group for PII Consent.
   */
  openRightsExtension(media, selectedRightsMessageGroup, rightsMessageGroupPiiConsent) {
    if (this.$window.chrome && this.$window.chrome.runtime) {
      this.$window.chrome.runtime.sendMessage(
        this.rightsExtensionId,
        {
          type: 'openRightsExtension',
          data: {
            media,
            rightsMessageGroup: selectedRightsMessageGroup,
            rightsMessageGroupPiiConsent,
          },
        },
      );
    }
  }
  /**
   * Check if the rights extension is installed.
   */
  refreshInstalled() {
    if (this.$window.chrome && this.$window.chrome.runtime) {
      this.$window.chrome.runtime.sendMessage(
        this.rightsExtensionId,
        { type: 'ping' },
        (response) => {
          if (response && response.type === 'pong') {
            this.isInstalled = true;
            this.isUpToDate = this.compareVersions.compare(
              this.rightsExtensionVersion,
              response.data.version,
              '<=',
            );
            this.setInstagramProfile(response.data.profile);
          } else {
            this.isInstalled = false;
          }
        },
      );
    } else {
      this.isInstalled = false;
    }
  }
  /**
   * Sets the connected instagram profile.
   *
   * @param {Object} instagramProfile  The connected instagram profile.
   */
  setInstagramProfile(instagramProfile) {
    this.instagramProfile = instagramProfile;
  }
  /**
   * Set up the Auth data in the rights extension.
   *
   * @param {String} customerId     The ID of the authenticated customer.
   * @param {String} token          The token of the authenticated user.
   * @param {String} customerName   The name of the authenticated customer.
   * @param {String} customerEmail  The email of the authenticated customer.
   */
  setupAuthData(customerId, token, customerName, customerEmail) {
    if (this.$window.chrome && this.$window.chrome.runtime) {
      this.$window.chrome.runtime.sendMessage(
        this.rightsExtensionId,
        {
          type: 'authData',
          data: {
            customerId,
            token,
            customerName,
            customerEmail,
          },
        },
      );
    }
  }
  /**
   * Emit the media update event.
   *
   * @param {Object} media  The updated media.
   */
  triggerMediaUpdate(media) {
    this.emit(this._eventsNames.mediaUpdate, media);
  }
}

export default RightsExtension;
