/**
 * @ngdoc constant
 * @name WHITELIST_SEARCH_CRITERIA
 * @description
 * The list of search types for the whitelist section.
 *
 * @type {Array<Object>}
 *
 * @memberof whitelist
 */
const whitelistSearchCriteria = [{
  id: 1,
  name: 'username',
  maxlength: 30,
  regex: '^([\\w]+\\.)*[\\w]{0,30}$',
}, {
  id: 2,
  name: 'label',
  maxlength: 50,
  regex: '^(?!-)(@|#)?[\\w-]{0,50}$',
}];

export default whitelistSearchCriteria;
