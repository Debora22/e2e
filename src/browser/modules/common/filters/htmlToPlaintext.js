/**
 * @ngdoc filter
 * @name htmlToPlaintext
 * @description
 * A filter to convert html code to plain text.
 *
 * @return {Function} The filter function.
 *
 * @memberof common
 */
const htmlToPlaintext = () => (
  (text) => (text ? String(text).replace(/<[^>]+>/gm, '') : '')
);

export default htmlToPlaintext;
