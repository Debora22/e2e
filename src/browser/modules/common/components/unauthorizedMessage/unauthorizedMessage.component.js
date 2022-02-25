import template from './unauthorizedMessage.html';
import './unauthorizedMessage.scss';

import noAccess from '../../../../assets/images/noAccess.svg';

/**
 * @ngdoc controller
 * @name UnauthorizedMessage
 * @description
 * This component renders the unauthorized message.
 *
 * @memberof common
 */
class UnauthorizedMessage {
  constructor() {
    /**
     * Reference to the no access image.
     *
     * @type {String}
     */
    this.noAccessImage = noAccess;
  }
}

/**
 * @ngdoc component
 * @name unauthorizedMessage
 * @description
 * The unauthorized message component.
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {UnauthorizedMessage}
   */
  controller: UnauthorizedMessage,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template,
};
