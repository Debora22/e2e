/**
 * @ngdoc constant
 * @name COLLECTIONS_BASE_TYPES
 * @description
 * The base types of a collection.
 *
 * @type {Object}
 * @property {CollectionBaseType} handler  The handler base type.
 * @property {CollectionBaseType} hashtag  The hashtag base type.
 * @property {CollectionBaseType} mention  The mention base type.
 *
 * @memberof collections
 */
const collectionsBaseTypes = {
  handler: {
    id: 'handler',
    name: 'from Twitter profile',
    data: 'username',
    maxlength: 30,
    placeholder: 'Enter a Twitter profile',
    phrase: 'from Twitter profile',
    symbol: '@',
    pattern: /^@?[a-z0-9._]+$/i,
  },
  hashtag: {
    id: 'hashtag',
    name: 'from Twitter hashtag',
    data: 'hashtag',
    maxlength: 128,
    placeholder: 'Enter a twitter hashtag',
    phrase: 'from Twitter',
    symbol: '#',
    pattern: /^#?[^!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^`{|}~¬¨\s]+$/i,
  },
  mention: {
    id: 'mention',
    name: 'from mention and tag',
    data: 'username',
    placeholder: 'Select an Instagram account',
    phrase: 'from mention and tag',
    symbol: '@',
  },
};

export default collectionsBaseTypes;
