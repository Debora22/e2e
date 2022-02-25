/**
 * @ngdoc constant
 * @name COLLECTIONS_RULE_OPERATORS
 * @description
 * The rule operators of a collection.
 *
 * @type {Object}
 * @property {Object} with     The with rule operator.
 * @property {Object} without  The without rule operator.
 *
 * @memberof collections
 */
const collectionsRuleOperators = {
  with: {
    id: 'with',
    name: 'including',
  },
  without: {
    id: 'without',
    name: 'excluding',
  },
};

export default collectionsRuleOperators;
