import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name SuggestionsList
 * @description
 * This service is used to search suggestions.
 *
 * @memberof library
 */
class SuggestionsList extends EntitiesList {
  /**
   * @param {$sce}     $sce                  To make Strict Contextual Escaping of the suggestions name.
   * @param {$q}       $q                    To reject error responses.
   * @param {AppAPI}   appAPI                To make the API requests.
   * @param {AppUtils} appUtils              To escape regular expressions.
   * @param {Object}   LIBRARY_SUGGESTIONS   To get the configuration map of suggestions.
   */
  constructor(
    $sce,
    $q,
    appAPI,
    appUtils,
    LIBRARY_SUGGESTIONS,
  ) {
    'ngInject';

    super($q);

    /**
     * The local reference to the `$sce` service.
     *
     * @type {$sce}
     */
    this.$sce = $sce;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `appUtils` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `suggestionsMap` constant.
     *
     * @type {Object}
     */
    this.suggestionsMap = angular.copy(LIBRARY_SUGGESTIONS);
    /**
     * The reference current request in progress.
     *
     * @type {Promise}
     * @access protected
     */
    this._currentRequest = null;

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * If we are currently doing a request (loading is true), try to cancel the current request.
   * If the cancel method return a success value (true), we must respond with a delayed promise
   * so the loading flag gets changed.
   *
   * @return {Promise}
   */
  cancelCurrentRequest() {
    return this.loading && this.appAPI.cancelRequest(this._currentRequest) ?
      // We are responding with a delayed promise of 0 because we need the cancelRequest to complete.
      this.appUtils.delayedPromise(0) :
      this.$q.resolve();
  }
  /**
   * Call the API to make the suggestions request.
   * If an error is returned by the `EntitiesList`, return the error.
   * If not, it was an abort error, so just return the entities.
   *
   * @param {String} search  The text to search suggestions for.
   *
   * @return {Promise}
   */
  getSuggestions(search) {
    return this._getEntities(search)
    .catch((error) => (error ? this.$q.reject(error) : this.entities));
  }
  /**
   * Format an API response in order to the get the suggestions list.
   * Push each suggestion into a suggestion group and highlight the search text
   * in the suggestion label. Finally sort the suggestions list by the order key.
   *
   * @param {Array}  response  The response to format.
   * @param {String} search    The text that was used to search for suggestions.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response, search) {
    const suggestions = [];
    const escapedSearch = this.appUtils.escapeRegExp(search);
    const searchRegex = new RegExp(`(${escapedSearch})`, 'ig');

    response.forEach((suggestion) => {
      let suggestionGroup = suggestions.find((item) => item.id === suggestion.type);
      // If the group does not exist, get it from the map and push it to the suggestions list
      if (!suggestionGroup) {
        suggestionGroup = angular.copy(this.suggestionsMap[suggestion.type]);
        suggestions.push(suggestionGroup);
      }

      const name = suggestion.name.replace(searchRegex, '<strong>$1</strong>');
      const symbol = suggestionGroup.symbol || '';
      // Set the label and highlight the search text
      suggestion.label = this.$sce.trustAsHtml(`${symbol}${name}`);

      suggestionGroup.values.push(suggestion);
    });

    suggestions.sort((group, otherGroup) => group.order - otherGroup.order);

    return suggestions;
  }
  /**
   * Call the API to make the request for the suggestions list.
   * Save the request as the current one.
   *
   * @param {String} search  The text to search suggestions for.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(search) {
    this._currentRequest = this.appAPI.getMediaSuggestions(search);

    return this._currentRequest;
  }
}

/**
 * @ngdoc factory
 * @name suggestionsList
 * @description
 * This object contains a method to create a new instance of the {@link SuggestionsList}.
 *
 * @param {$sce}     $sce                  To make Strict Contextual Escaping of the suggestions name.
 * @param {$q}       $q                    To reject error responses.
 * @param {AppAPI}   appAPI                To make the API requests.
 * @param {AppUtils} appUtils              To escape regular expressions.
 * @param {Object}   LIBRARY_SUGGESTIONS   To get the configuration map of suggestions.
 *
 * @return {Function}
 *
 * @memberof library
 */
const suggestionsList = (
  $sce,
  $q,
  appAPI,
  appUtils,
  LIBRARY_SUGGESTIONS,
) => {
  'ngInject';

  return {
    getNewInstance: () => new SuggestionsList(
      $sce,
      $q,
      appAPI,
      appUtils,
      LIBRARY_SUGGESTIONS,
    ),
  };
};

export default suggestionsList;
