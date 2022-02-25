import template from './mediaModal.html';
import './mediaModal.scss';

/**
 * @ngdoc controller
 * @name MediaModal
 * @description
 * This component renders the media modal.
 *
 * @memberof library
 */
class MediaModal {
  /**
   * @param {$element} $element  To get the component element.
   */
  constructor($element) {
    'ngInject';

    /**
     * The local reference to the `element` object.
     *
     * @type {Object}
     */
    [this.element] = Array.from($element);
    /**
     * The first media of the list of media to display.
     * This media will be the one being displayed when there is only one media in the list.
     *
     * @type {Object}
     */
    this.firstMedia = {};
    /**
     * The map of media source with contentEngine approval type.
     *
     * @type {Object}
     */
    this.mediaContentEngineBySource = {};
    /**
     * The map of media with unavailableMentions and canNotApprove approval type.
     *
     * @type {Object}
     */
    this.mediaCanNotRequest = { list: [] };
    /**
     * Flag to know if the caption is expanded or collapsed.
     *
     * @type {Boolean}
     */
    this.captionExpanded = true;
    /**
     * The text data to add to the caption container.
     *
     * @type {String}
     */
    this.captionContainerData = 'captionContainer';
  }
  /**
   * Initialize variables.
   */
  $onInit() {
    if (!this.mediaImageSize) {
      this.mediaImageSize = 'normal';
    }
  }
  /**
   * Each time the media binding changes, update the first media.
   * Each time the mediaByApprovalType binding changes, update the map of media source with
   * contentEngine approval type and the map of media with unavailableMentions and canNotApprove approval type.
   *
   * @param {Object} changes                      The binding changes.
   * @param {Object} changes.media                The media change object.
   * @param {Object} changes.mediaByApprovalType  The mediaByApprovalType change object.
   */
  $onChanges({ media, mediaByApprovalType }) {
    if (media && media.currentValue && this.media) {
      [this.firstMedia] = this.media;
    }

    if (
      mediaByApprovalType &&
      mediaByApprovalType.currentValue &&
      this.mediaByApprovalType
    ) {
      this.mediaContentEngineBySource = {};
      this.mediaByApprovalType.contentEngine.list.forEach((item) => {
        const source = item.source.name;

        if (!this.mediaContentEngineBySource[source]) {
          this.mediaContentEngineBySource[source] = [];
        }

        this.mediaContentEngineBySource[source].push(item);
      });

      this.mediaCanNotRequest.list = [];
      this.mediaCanNotRequest.list.push(
        ...this.mediaByApprovalType.unavailableMentions.list,
        ...this.mediaByApprovalType.canNotApprove.list,
      );
    }
  }
  /**
   * Expand or collapse the caption.
   * If we are collpasing the caption we need to reset the scroll top of the container.
   */
  toggleCaptionExpanded() {
    if (this.captionExpanded) {
      const captionContainer = this.element.querySelectorAll(`[data="${this.captionContainerData}"]`)[0] || {};
      captionContainer.scrollTop = 0;
    }

    this.captionExpanded = !this.captionExpanded;
  }
  /**
   * Create a fn to filter the list of actions by using the `onActionVisibilityCheck` callback.
   *
   * @param {String} location  The location of the component from where to check the visibility.
   *
   * @return {Function}
   */
  visibleActionsFilter(location) {
    return (action) => {
      let visible = !action.single || !this.isBulk;

      if (visible) {
        visible = this.onActionVisibilityCheck({
          action,
          location,
        });
      }

      return visible;
    };
  }
}

/**
 * @ngdoc component
 * @name mediaModal
 * @description
 * The media modal component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaModal}
   */
  controller: MediaModal,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template,
  /**
   * Component bindings.
   *
   * @type {Object}
   * @property {String}        mediaImageSize                      The type of media image size we should display.
   * @property {Array}         actions                             The list of actions to display.
   * @property {Object}        approvalType                        The approval type that is on display.
   * @property {Number}        approvalTypeSelectedCount           The number of selected media of the approval type
   *                                                               that is on display.
   * @property {EditStatusMap} editStatusMap                       The object to map the media Edit Status that
   *                                                               indicates the diferent icons and tooltips for the
   *                                                               different states of the media.
   * @property {Boolean}       isBulk                              If the modal is in bulk view.
   * @property {Boolean}       isRightsDataLoaded                  If the rights data was loaded or not.
   * @property {Array}         media                               The list of media to display.
   * @property {Object}        mediaByApprovalType                 The map of media by approval type.
   * @property {Array}         sections                            The list of modal tab sections to display.
   * @property {Object}        selectedMedia                       The map of selected media.
   * @property {Number}        selectedMediaCount                  The count of selected media.
   * @property {Object}        selectedSection                     The selected section.
   * @property {Boolean}       showActions                         If the actions are visible or not.
   * @property {Function}      onActionClick                       Callback for when an action is clicked. It receives
   *                                                               the action that was clicked.
   * @property {Function}      onActionDisableCheck                Callback to check if an action should be disabled
   *                                                               or not. It receives the action to check.
   * @property {Function}      onActionVisibilityCheck             Callback to check if an action should be visible. It
   *                                                               receives the action to check and the location
   *                                                               (primary or secondary) of the component from where
   *                                                               to check the visibility.
   * @property {Function}      onMediaSelectedChange               Callback when the selection of a media is changed. It
   *                                                               receives the media and if it was selected or
   *                                                               unselected.
   * @property {Function}      onRefreshApprovalTypeSelectedCount  Callback when the selection of a media for the
   *                                                               rights section is changed.
   * @property {Function}      onSectionChange                     Callback when the selected section is changed. It
   *                                                               receives the selected section.
   * @property {Function}      onSectionVisibilityCheck            Callback to check if an section should be visible. It
   *                                                               receives the section to check.
   */
  bindings: {
    mediaImageSize: '@',
    actions: '<',
    approvalType: '<',
    approvalTypeSelectedCount: '<',
    editStatusMap: '<',
    isBulk: '<',
    isRightsDataLoaded: '<',
    media: '<',
    mediaByApprovalType: '<',
    sections: '<',
    selectedMedia: '<',
    selectedMediaCount: '<',
    selectedSection: '<',
    showActions: '<',
    onActionClick: '&',
    onActionDisableCheck: '&',
    onActionVisibilityCheck: '&',
    onMediaSelectedChange: '&',
    onRefreshApprovalTypeSelectedCount: '&',
    onSectionChange: '&',
    onSectionVisibilityCheck: '&',
  },
  // We will transclude all the sections information tabs.
  transclude: true,
};
