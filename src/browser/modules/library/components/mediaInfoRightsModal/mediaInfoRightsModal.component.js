import template from './mediaInfoRightsModal.html';
import './mediaInfoRightsModal.scss';

/**
 * @ngdoc component
 * @name mediaInfoRightsModal
 * @description
 * The media info rights modal component.
 *
 * @memberof library
 */
export default {
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
   * @property {String}   headline                            The title to display.
   * @property {Object}   approvalType                        The approval type that is on display.
   * @property {Object}   approvalTypeBySource                The approval type by source that is on display.
   * @property {Boolean}  enableSelection                     If we have to allow the media selection or not.
   * @property {Function} onRefreshApprovalTypeSelectedCount  Callback to refresh the number of selected media
   *                                                          of the approval type that is on display.
   */
  bindings: {
    headline: '@',
    approvalType: '<',
    approvalTypeBySource: '<',
    enableSelection: '<',
    onRefreshApprovalTypeSelectedCount: '&',
  },
};
