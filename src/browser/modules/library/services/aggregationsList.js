import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc service
 * @name AggregationsList
 * @description
 * This service is used to search aggregations, perform several different actions over
 * the aggregations list and provide some utility methods for aggregations and filters.
 *
 * @memberof library
 */
class AggregationsList extends EntitiesList {
  /**
   * @param {$sce}     $sce                  To make Strict Contextual Escaping of the filters phrase.
   * @param {$q}       $q                    To reject error responses.
   * @param {AppAPI}   appAPI                To make the API requests.
   * @param {AppUtils} appUtils              To capitalize the filters text.
   * @param {Moment}   moment                To format the date range filters.
   * @param {Object}   LIBRARY_AGGREGATIONS  To get the aggregations configuration.
   */
  constructor(
    $sce,
    $q,
    appAPI,
    appUtils,
    moment,
    LIBRARY_AGGREGATIONS,
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
     * The local reference to the `appAPI` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;
    /**
     * The local reference to the `aggregationsBaseList` constant.
     *
     * @type {Array}
     */
    this.aggregationsBaseList = LIBRARY_AGGREGATIONS.baseList;
    /**
     * The local reference to the `aggregationsExtraList` constant.
     *
     * @type {Array}
     */
    this.aggregationsExtraList = LIBRARY_AGGREGATIONS.extraList || [];
    /**
     * The local reference to the `aggregationsMap` constant.
     *
     * @type {Object}
     */
    this.aggregationsMap = angular.copy(LIBRARY_AGGREGATIONS.map);
    /**
     * The local reference to the `aggregationsFilters` constant.
     *
     * @type {Object}
     */
    this.aggregationsFilters = LIBRARY_AGGREGATIONS.filter;
    /**
     * The applied filters. This contains the query filter values to display in the filters phrase.
     *
     * @type {QueryFilter}
     */
    this.appliedFilters = {};
    /**
     * The filters summary text phrase.
     *
     * @type {String}
     */
    this.filtersPhrase = '';
    /**
     * Flag that indicates if any filter is being applied or not.
     *
     * @type {Boolean}
     */
    this.activeFiltersExist = false;
    /**
     * The list of aggregations previous to fetching the new ones.
     * This list is used to get the previous expanded attribute of the aggregations.
     *
     * @type {Array}
     */
    this.previousAggregations = [];

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Call the API to make the aggregations request using the query search and the aggregationsBaseList.
   * We filter the aggregationsBaseList to fetch only the valid agregations.
   *
   * @param {QuerySearch} query     The query search to make.
   * @param {Object}      settings  The current sessions settings.
   *
   *
   * @return {Promise}
   */
  getAggregations(query, settings) {
    const aggregations = this.aggregationsBaseList.filter((aggregation) => {
      const config = this.aggregationsMap[aggregation.key] || {};
      let show = true;

      if (config.requiresFilterBy) {
        show = this._areFiltersInQuery(config.requiresFilterBy, query);
      }

      if (config.requiresSettings) {
        show = this._areSettingsInAccount(config.requiresSettings, settings);
      }

      return show;
    });

    this.filtersPhrase = '';
    this.activeFiltersExist = false;

    return this._getEntities(aggregations, query);
  }
  /**
   * Parse a filter by adding its {@link FilterMap} and if it is selected ir not (from the query search).
   *
   * @param {String}      aggregationKey  The key of the aggregation the filter belongs to.
   * @param {Filter}      filter          The filter to parse.
   * @param {QuerySearch} query           The query search to get if the filter is selected.
   *
   * @return {Filter}
   */
  parseFilter(aggregationKey, filter, query) {
    // If the aggregation does not exist, return a null filter.
    if (!this.aggregationsMap[aggregationKey]) {
      return null;
    }

    const key = filter.label || filter.name;
    let map = this.aggregationsMap[`${aggregationKey}.${key}`];
    if (!map) {
      const keyMap = this.aggregationsMap[aggregationKey].keyMap || [];
      map = this.aggregationsMap[`${aggregationKey}.${keyMap[key]}`] || { label: keyMap[key] };
    }

    const queryFilter = query.filters[aggregationKey];

    map.label = map.label || key;
    filter.map = map;
    filter.selected = queryFilter ?
      queryFilter.values.indexOf(String(filter.name)) > -1 :
      false;

    return filter;
  }
  /**
   * Toggle the selection of a filter in the provided queryFilterContainer.
   *
   * @param {QueryFilter}   queryFilterContainer  The container of queryFilters in where to update the filter.
   * @param {String}        aggregationKey        The key of the aggregation the filter belongs to.
   * @param {Boolean}       isSelected            If the filters is selected or not.
   * @param {Object|String} value                 The filter value, data type can depend whether it is updating the
   *                                              query or the applied filters.
   */
  toggleFilter(queryFilterContainer, aggregationKey, isSelected, value) {
    const aggregation = queryFilterContainer[aggregationKey];

    // First we check if the filter needs to be selected
    if (isSelected) {
      // If the aggregation don't exist, we just create the object with the values array
      if (!aggregation) {
        queryFilterContainer[aggregationKey] = {
          values: [value],
        };
      } else if (this._getFilterIndex(value, aggregation) === -1) {
        // If the aggregation exist and the value is not already in the values array, we just add it
        aggregation.values.push(value);
      }
    } else if (queryFilterContainer) {
      // Get the index of the filter to remove
      const index = this._getFilterIndex(value, aggregation);
      if (index > -1) {
        aggregation.values.splice(index, 1);
      }

      // If the filter values is empty, we just remove the aggregation all together
      if (aggregation.values.length === 0) {
        delete queryFilterContainer[aggregationKey];
      }
    }
  }
  /**
   * Check if at least one entire set of filters {@link QueryFilter} elements exist in the query search.
   *
   * @param {Array}       filters  The list of {@link QueryFilter} to check.
   * @param {QuerySearch} query    The query search to check against.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _areFiltersInQuery(filters, query) {
    return angular.isArray(filters) ?
      filters.some((filterSet) => Object.keys(filterSet).every((filterKey) => {
        const queryFilter = query.filters[filterKey];

        if (!queryFilter) {
          return false;
        }

        return angular.isArray(queryFilter.values) ?
          filterSet[filterKey].values.every((element) => queryFilter.values.includes(element)) :
          filterSet[filterKey].values === queryFilter.values;
      })) :
      false;
  }
  /**
   * Checks if the account has the settings required by an aggregation to be shown.
   *
   * @param {Array}  requiredSettings  The required settings that need to be enabled on the account.
   * @param {Object} accountSettings   The account settings that we will check.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _areSettingsInAccount(requiredSettings, accountSettings) {
    return requiredSettings.every((setting) => !!accountSettings[setting]);
  }
  /**
   * Format an API response in order to the get the aggregations list.
   * We parse each aggregation to add the {@link AggregationMap}
   * and the previous expanded attribute. And we parse each filter of each aggregation.
   *
   * @param {Array}       response      The response to format.
   * @param {Aggregation} aggregations  The aggregations to fetch.
   * @param {QuerySearch} query         The query search used to search the aggregations.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response, aggregations, query) {
    // Only add the extra aggregations when there is at least one filter from the BE.
    const totalFilters = response.reduce((acc, aggregation) => acc + aggregation.values.length, 0);
    if (totalFilters > 0) {
      response = response.concat(this.aggregationsExtraList);
    }

    // Set the map object and the previous expanded attribute.
    response.forEach((aggregation) => {
      const aggregationKey = aggregation.key;
      const aggregationMap = this.aggregationsMap[aggregationKey];
      const previousAggregation = this.previousAggregations.find((item) => item.key === aggregationKey);

      aggregationMap.label = aggregationMap.label || aggregationKey;
      aggregation.map = aggregationMap;
      /**
       * If there is a previousAggregation set the expanded from there.
       * Else check if we are quering for the aggregation or use the aggregation map or false value.
       */
      aggregation.expanded = previousAggregation ?
        previousAggregation.expanded :
        (
          !!query.filters[aggregationKey] ||
            aggregation.map.expanded ||
            false
        );

      if (aggregation.values) {
        let { values } = aggregation;
        const filterAggregations = this.aggregationsFilters[aggregationKey];

        if (filterAggregations) {
          let includeAggregations = filterAggregations.include ||
            values.map((value) => value.label.toLowerCase());
          if (filterAggregations.ignore) {
            includeAggregations = includeAggregations
            .filter((value) => !filterAggregations.ignore.includes(value));
          }

          values = values.filter((filter) => includeAggregations.includes(filter.label.toLowerCase()));
        }

        aggregation.values = values.map((filter) => this.parseFilter(
          aggregation.key,
          filter,
          query,
        ));
      }
    });

    this._generateFiltersPhrase(query, response);

    this.previousAggregations = response;

    return response;
  }
  /**
   * Based on the query search used, generate the filters summary text phrase.
   * First of all, given the list of applied filters and staticFilters, we set the `activeFiltersExist` flag.
   * Then, only if any filter is being applied, we start formatting each filter to add it to the text phrase.
   * Then, we check if we are doing a text search and add it to the text phrase.
   * Then, we check if the users selected a Date Range.
   * Then, we sort the applied filters by the order property of the aggregationsMap and format each filter
   * before adding it to the text phrase.
   * Finally we add a final dot and make Strict Contextual Escaping of the filters text phrase.
   *
   * @param {QuerySearch} query         The query search used to search the aggregations.
   * @param {Array}       aggregations  The fetched aggregations.
   *
   * @access protected
   */
  _generateFiltersPhrase(query, aggregations) {
    const appliedFiltersArray = Object.keys(this.appliedFilters);
    this.filtersPhrase = '';

    // Check if any filter is being applied or not.
    this.activeFiltersExist = !!(
      appliedFiltersArray.length > 0 ||
      query.staticFilters.phrase ||
      query.staticFilters.date
    );

    if (this.activeFiltersExist) {
      // First, we check if we are doing a text search.
      if (query.staticFilters.phrase) {
        this.filtersPhrase += ` with text search <strong>${query.staticFilters.phrase}</strong>`;

        // Add a semicolon only if we need to add more filters.
        if (appliedFiltersArray.length > 0) {
          this.filtersPhrase += ';';
        }
      }
      // include the date range filter.
      if (query.staticFilters.date) {
        const formatedDateFrom = this.moment.utc(query.staticFilters.date.from).format('MM/DD/YYYY');
        const formatedDateTo = this.moment.utc(query.staticFilters.date.to).format('MM/DD/YYYY');

        this.filtersPhrase += ` collected between <strong>${formatedDateFrom}</strong> and ` +
          `<strong>${formatedDateTo}</strong>`;
      }

      appliedFiltersArray
      // Sort the applied filters by the order property of the aggregationsMap.
      .sort((oneAggregationKey, otherAggregationKey) => this.aggregationsMap[oneAggregationKey].order -
          this.aggregationsMap[otherAggregationKey].order)
      .forEach((aggregationKey, aggregationIndex) => {
        const appliedAggregation = this.appliedFilters[aggregationKey];
        const aggregationMap = this.aggregationsMap[aggregationKey];
        const aggregationSymbol = aggregationMap.phrase.symbol || '';
        const textToAddList = [];

        if (angular.isArray(appliedAggregation.values)) {
          // Format each filter of the Aggregation before adding it to the textToAddList.
          appliedAggregation.values.forEach((filter, filterIndex) => {
            let { label } = filter;
            // Check if we need to replace the label with the one from the response.
            if (aggregationMap.phrase.replaceWithResponse) {
              const aggregation = aggregations.find((item) => item.key === aggregationKey) || { values: [] };
              const value = aggregation.values.find((item) => String(item.name) === label);
              if (value) {
                label = value.label || value.name;
              }
            }
            const existOverride = aggregationMap.phrase.override &&
              aggregationMap.phrase.override[label];

            // If it is the first item and no override exist, add the phrase connector.
            if (filterIndex === 0 && !existOverride) {
              this.filtersPhrase += ` ${aggregationMap.phrase.connector} `;
            }

            // If an override exist for the filter label, add the override to the textToAddList.
            if (existOverride) {
              textToAddList.push(` <strong>${aggregationMap.phrase.override[label]}</strong>`);
            } else {
              // Check if we should capitalize filter label by the aggregationMap property.
              if (!aggregationMap.unCapitalize) {
                label = this.appUtils.capitalize(label);
              }

              textToAddList.push(`<strong>${aggregationSymbol}${label}</strong>`);
            }
          });
        }

        const beforeLastDistance = 2;
        // Process each of the text of the textToAddList and add it to the text phrase.
        textToAddList.forEach((text, filterIndex) => {
          if (filterIndex === (textToAddList.length - 1)) {
            // If it is the last text, add only the text.
            this.filtersPhrase += text;
          } else if (filterIndex === (textToAddList.length - beforeLastDistance)) {
            // If it is the before last text, add the text with an `or` connector.
            this.filtersPhrase += `${text} or `;
          } else {
            // Otherwise, add the text with a comma.
            this.filtersPhrase += `${text}, `;
          }
        });

        // If there is a suffix, add the it to the phrase.
        if (aggregationMap.phrase.suffix) {
          this.filtersPhrase += ` ${aggregationMap.phrase.suffix}`;
        }

        if (aggregationIndex === (appliedFiltersArray.length - beforeLastDistance)) {
          // Add a ; and for the before last aggregation.
          this.filtersPhrase += '; and ';
        } else if (aggregationIndex !== (appliedFiltersArray.length - 1)) {
          // Add a ; for all other aggregation except the last one.
          this.filtersPhrase += '; ';
        }
      });
    }

    // Add a final dot.
    this.filtersPhrase += '.';
    // Make Strict Contextual Escaping of the filters phrase.
    this.filtersPhrase = this.$sce.trustAsHtml(this.filtersPhrase);
  }
  /**
   * Gets the index of a filter depending on its data type.
   * The reason we need to do this is because we need different information whether
   * the value is meant to update the query or the applied filters.
   *
   * @param {Object|String} filter       The filter to find the index of.
   * @param {Object}        aggregation  The aggregation where we need to find the filter.
   *
   * @return {Number}
   *
   * @access protected
   */
  _getFilterIndex(filter, aggregation) {
    return angular.isObject(filter) ?
      aggregation.values.findIndex((item) => item.id === filter.id) :
      aggregation.values.indexOf(filter);
  }
  /**
   * Call the API to make the request for a media list first page.
   *
   * @param {Aggregation} aggregations  The aggregations to fetch.
   * @param {QuerySearch} query         The query search to make.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(aggregations, query) {
    return this.appAPI.getMediaFilters(aggregations, query);
  }
}

/**
 * @ngdoc factory
 * @name aggregationsList
 * @description
 * This object contains a method to create a new instanece of the {@link AggregationsList}.
 *
 * @param {$sce}     $sce                  To make Strict Contextual Escaping of the filters phrase.
 * @param {$q}       $q                    To reject error responses.
 * @param {AppAPI}   appAPI                To make the API requests.
 * @param {AppUtils} appUtils              To capitalize the filters text.
 * @param {Moment}   moment                To format the date range filters.
 * @param {Object}   LIBRARY_AGGREGATIONS  To get the aggregations configuration.
 *
 * @return {Function}
 *
 * @memberof library
 */
const aggregationsList = (
  $sce,
  $q,
  appAPI,
  appUtils,
  moment,
  LIBRARY_AGGREGATIONS,
) => {
  'ngInject';

  return {
    getNewInstance: () => new AggregationsList(
      $sce,
      $q,
      appAPI,
      appUtils,
      moment,
      LIBRARY_AGGREGATIONS,
    ),
  };
};

export default aggregationsList;
