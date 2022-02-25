/**
 * @ngdoc constant
 * @name EXTERNAL_APPS_PATHS
 * @description
 * Object of external apps paths.
 *
 * @type {Object}
 * @property {String} contentPublishing  The content publishing app path.
 * @property {String} lemuramaAnalytics  The lemurama analytics app path.
 * @property {String} photorank          The photorank app path.
 * @property {String} sandbox            The sandbox app path.
 * @property {String} tapshopAdmin       The tapshopAdmin app path.
 *
 * @memberof externalApp
 */
const externalAppsPaths = {
  contentPublishing: '/autologin/:customerId/:token/:userEmail/:route',
  lemuramaAnalytics: 'autologin/:customerId/:token/:route',
  photorank: '/:route',
  sandbox: '/:route',
  tapshopAdmin: '/',
};

export default externalAppsPaths;
