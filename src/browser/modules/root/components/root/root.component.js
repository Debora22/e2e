import template from './root.html';
import './root.scss';

/**
 * @ngdoc component
 * @name root
 * @description
 * The main wrapper component of the app. It transcludes the router view.
 *
 * @memberof rootModule
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
   * @property {String}   appTitle      The app title.
   * @property {String}   avatar        The avatar url.
   * @property {String}   currentRoute  The current route.
   * @property {String}   customer      The customer name.
   * @property {Boolean}  hideMenu      If we must hide the menu.
   * @property {Boolean}  loading       If we must display the loading indicator or not.
   * @property {Object}   menu          The data to show on the menu.
   * @property {Function} onFilter      Callback to filter the menu items.
   */
  bindings: {
    appTitle: '@',
    avatar: '@',
    currentRoute: '@',
    customer: '@',
    hideMenu: '<',
    loading: '<',
    menu: '<',
    onFilter: '&',
  },
};
