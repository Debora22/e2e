/**
 * @ngdoc filter
 * @name capitalize
 * @description
 * A filter to capitalize text.
 *
 * @return {Function} The filter function.
 *
 * @memberof common
 */
const capitalize = () => (
  (text) => (text ?
    String(text).charAt(0).toUpperCase() + String(text).substr(1).toLowerCase() :
    ''
  )
);

export default capitalize;
