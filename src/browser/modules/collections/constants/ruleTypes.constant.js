/**
 * @ngdoc constant
 * @name COLLECTIONS_RULE_TYPES
 * @description
 * The base types of a collection.
 *
 * @type {Object}
 * @property {CollectionRuleType} handler  The handler rule type.
 * @property {CollectionRuleType} hashtag  The hashtag rule type.
 * @property {CollectionRuleType} mention  The mention rule type.
 *
 * @memberof collections
 */
const collectionsRuleTypes = {
  handler: {
    id: 'handler',
    name: 'user profile',
    data: 'username',
    maxlength: 30,
    placeholder: 'Enter a user profile',
    phrase: '',
    symbol: '@',
    pattern: /^@?[a-z0-9._]+$/i,
  },
  hashtag: {
    id: 'hashtag',
    name: 'hashtag',
    data: 'hashtag',
    maxlength: 128,
    placeholder: 'Enter a hashtag',
    phrase: '',
    symbol: '#',
    pattern: /^#?[^!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^`{|}~¬¨\s]+$/i,
  },
  mention: {
    id: 'mention',
    name: 'user mention',
    data: 'username',
    maxlength: 30,
    placeholder: 'Enter a user mention',
    phrase: 'mention ',
    symbol: '@',
    pattern: /^@?[a-z0-9._]+$/i,
  },
};

export default collectionsRuleTypes;
