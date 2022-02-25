import template from './library.html';
import './library.scss';

/**
 * @ngdoc controller
 * @name Library
 * @description
 * This component renders the library.
 *
 * @memberof library
 */
class Library {
  /**
   * @param {$location} $location  To get the query string.
   * @param {$sanitize} $sanitize  To sanitize the query params.
   */
  constructor(
    $location,
    $sanitize,
  ) {
    'ngInject';

    /**
     * The local reference to the `$location` service.
     *
     * @type {$location}
     */
    this.$location = $location;
    /**
     * The local reference to the `$sanitize` service.
     *
     * @type {$sanitize}
     */
    this.$sanitize = $sanitize;
    /**
     * Array containing "Other" dropdown sections.
     *
     * @type {Array}
     */
    this.dropdownSections = [];
    /**
     * Flag to know if a dropdown section is selected (used to mark it as active).
     *
     * @type {Boolean}
     */
    this.isSectionFromDropdownSelected = false;
    /**
     * The text of the search box.
     *
     * @type {String}
     */
    this.search = '';
    /**
     * The selected sort.
     *
     * @type {Object}
     */
    this.selectedSort = {};
    /**
     * The keys to get static filters from the query string.
     *
     * @type {Array}
     */
    this.staticFilterKeys = [
      'search',
      'dateFrom',
      'dateTo',
    ];
    /**
     * Flag to know if the filter bar date is visible or not.
     *
     * @type {Boolean}
     */
    this.showFilterBarDate = false;
    /**
     * The local reference for the Flatpickr's instance provided by the Ods Calendar component,
     * we're going to use this reference to clean the plugin's when the filters are reset.
     *
     * @type {?Flatpickr}
     */
    this.flatpickrInstance = null;
  }
  /**
   * Trigger the first onQueryStringChange.
   */
  $onInit() {
    // Check if there is least one section (because of Content Granular Permissions).
    if (this.sections.length) {
      // Fill the dropdown sections
      this.dropdownSections = this.sections.slice(this.numberOfSectionsBeforeDropdown);

      this.onQueryStringChange();
    }
  }
  /**
   * Each time the aggregations binding changes, update the showFilterBarDate variable.
   *
   * @param {Object} changes               The binding changes.
   * @param {Object} changes.aggregations  The aggregations change object.
   */
  $onChanges({ aggregations }) {
    if (aggregations && aggregations.currentValue && this.aggregations) {
      this.showFilterBarDate = this.aggregations
      .some((aggregation) => aggregation.values && aggregation.values.length);
    }
  }
  /**
   * Callback for the Ods Calendar's component, we're going to save the Flatpickr reference to
   * clear the plugin on reset filters.
   *
   * @param {Date}      selectedDates  The date Object provided by the plugin.
   * @param {String}    dateStr        The date string provided by the plugin.
   * @param {Flatpickr} instance       The flatpickr's intance returned by the plugin.
   */
  onCalendarInstanceReady(selectedDates, dateStr, instance) {
    this.flatpickrInstance = instance;

    if (
      this.query.staticFilters.date &&
      this.query.staticFilters.date.from &&
      this.query.staticFilters.date.to
    ) {
      this.flatpickrInstance.setDate([
        this.query.staticFilters.date.from,
        this.query.staticFilters.date.to,
      ]);
    }
  }
  /**
   * Pick up the section and filters, if any, from the query string.
   */
  onQueryStringChange() {
    const { section } = this.$location.search();
    let sectionToApply = this.sections.find((item) => item.id === section);

    // If no correct section was provided, we need to set the first one.
    if (!sectionToApply) {
      [sectionToApply] = this.sections;
      this.$location.search('section', sectionToApply.id);
    }

    const sectionFilters = angular.copy(sectionToApply.filters);
    const { filters, staticFilters } = this._getFiltersFromQueryParams(true);

    this.onSectionChange({ section: sectionToApply });
    this.isSectionFromDropdownSelected = this.dropdownSections.includes(sectionToApply);
    this.query.filters = {
      ...filters,
      ...sectionFilters,
    };
    this.query.staticFilters = {
      phrase: staticFilters.search || '',
    };
    if (staticFilters.dateFrom && staticFilters.dateTo) {
      this.query.staticFilters.date = {
        from: staticFilters.dateFrom,
        to: staticFilters.dateTo,
      };

      if (this.flatpickrInstance) {
        this.flatpickrInstance.setDate([
          this.query.staticFilters.date.from,
          this.query.staticFilters.date.to,
        ]);
      }
    }
    this.search = staticFilters.search || '';
    this.sortList = this.allSorts.filter((sort) => (
      !sort.librarySections ||
      sort.librarySections.includes(sectionToApply.name)
    ));
    this.onSortSelected(
      this.allSorts.find((sort) => sort.key === sectionToApply.defaultSort) || this.sortList[0],
      false,
    );
    this.onQueryChange({
      query: this.query,
      filtersToApply: this._getFiltersFromQueryParams().filters,
    });
  }
  /**
   * Callback when the `Reset all filters` button is clicked.
   * This will reset all the applied filters by setting again the current selected section.
   */
  onResetFilters() {
    this.onSelectedSectionChange(this.selectedSection);
  }
  /**
   * Whenever the text in the search box changes, we trigger the suggestions search.
   *
   * @param {String} search  The text to search suggestions for.
   */
  onSearchTextChange(search) {
    const query = search.trim();
    if (this.search !== query) {
      this.search = search;

      const minSearchLength = 2;
      // Trigger the search only if the search length is big enough.
      if (search.length > minSearchLength) {
        this.onSearchSuggestions({ search });
      } else {
        this.onClearSuggestions();
      }
    }
  }
  /**
   * When the text search is triggered, we set the text as the phrase filter,
   * clear the suggestions and inform the query change.
   *
   * @param {String} search  The text to search suggestions for.
   */
  onSearchTrigger(search) {
    this.query.staticFilters.phrase = search;
    this.$location.search('search', search.length ? search : null);
    this.onClearSuggestions();
    this.onQueryChange({ query: this.query });
  }
  /**
   * Changes the current section.
   *
   * @param {Object} section  The section that will be selected.
   */
  onSelectedSectionChange(section) {
    this.$location.search({ section: section.id });
    this.onQueryStringChange();
  }
  /**
   * When a new sort is selected, we set that sort as selected,
   * set it as the query sort and inform the query change.
   *
   * @param {Object}  sort           The sort to set as selected.
   * @param {Boolean} triggerChange  If we have to inform the query change.
   */
  onSortSelected(sort, triggerChange = true) {
    this.selectedSort = sort;
    this.query.sort = sort.values;

    if (triggerChange) {
      this.onQueryChange({ query: this.query });
    }
  }
  /**
   * When a suggestion is clicked, clear the suggestions, the search and
   * trigger the `onSuggestionClick` callback.
   *
   * @param {Object} suggestion  The suggestion to filter by.
   * @param {Object} group       The group the suggestions belongs to.
   */
  onSuggestionClick(suggestion, group) {
    this.onClearSuggestions();
    // Clear the suggestions search only if there is no phrase search in place.
    if (!this.query.staticFilters.phrase) {
      this.search = '';
    }

    this.onClearSuggestions();
    this.onAddSuggestionFilter({ suggestion, group });
  }
  /**
   * Create a fn to filter the list of actions by using the `onActionVisibilityCheck` callback.
   *
   * @param {String} location  The location of the component from where to check the visibility.
   *
   * @return {Function}
   */
  visibleActionsFilter(location) {
    return (action) => this.onActionVisibilityCheck({
      component: 'library',
      action,
      location,
    });
  }
  /**
   * Get the filters from the query params.
   *
   * @param {Boolean} groupValuesProperty  If the function return the values in a values property for each filter.
   *
   * @return {Object}
   *
   * @access protected
   */
  _getFiltersFromQueryParams(groupValuesProperty = false) {
    const filters = {};
    const staticFilters = {};
    const filtersFromUrl = angular.copy(this.$location.search());
    // We don't want to send the current section as a filter.
    delete filtersFromUrl.section;

    Object.keys(filtersFromUrl).forEach((aggregationKey) => {
      const value = String(filtersFromUrl[aggregationKey]);
      const values = value.split(',')
      .map((item) => this.$sanitize(item))
      .filter(Boolean);

      const isStatic = this.staticFilterKeys.includes(aggregationKey);

      if (isStatic) {
        staticFilters[aggregationKey] = this.$sanitize(filtersFromUrl[aggregationKey]);
      } else {
        filters[aggregationKey] = groupValuesProperty ?
          { values } :
          values;
      }
    });

    return { filters, staticFilters };
  }
}

/**
 * @ngdoc component
 * @name library
 * @description
 * The library component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {Library}
   */
  controller: Library,
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
   * @property {Array}          actions                         The list of actions to display.
   * @property {Boolean}        activeFiltersExist              If there is any active filter.
   * @property {Array}          aggregations                    The list of aggregations to displayed.
   * @property {Array}          allSorts                        The list of available sort types to display.
   * @property {EditStatusMap}  editStatusMap                   The object to map the media Edit Status that indicates
   *                                                            the diferent icons and tooltips for the different states
   *                                                            of the media.
   * @property {Boolean}        filtersLoading                  If there are filters being loaded.
   * @property {String}         filtersPhrase                   The filters phrase to display.
   * @property {Boolean}        loading                         If there are media being loaded.
   * @property {Array}          media                           The list of media to display.
   * @property {Number}         mediaCount                      The count of media in the actual page.
   * @property {Number}         numberOfSectionsBeforeDropdown  The number of sections to show before wrap the remaining
   *                                                            ones into the dropdown.
   * @property {Pagination}     pagination                      The pagination information.
   * @property {QuerySearch}    query                           The query to search media and filters by.
   * @property {Array}          sections                        The sections to display.
   * @property {Number}         selectedMediaCount              The count of selected media.
   * @property {Object}         selectedSection                 The selected section.
   * @property {Array}          suggestions                     The list of suggestions to display.
   * @property {Boolean}        suggestionsLoading              If there are suggestions being loaded.
   * @property {Function}       onActionClick                   Callback for when an action is clicked. It receives the
   *                                                            action that was clicked.
   * @property {Function}       onActionDisableCheck            Callback to check if an action should be disabled
   *                                                            or not. It receives the action to check.
   * @property {Function}       onActionVisibilityCheck         Callback to check if an action should be visible. It
   *                                                            receives the action to check, the component and the
   *                                                            location from where to check the visibility.
   * @property {Function}       onAddSuggestionFilter           Callback for when a suggestions will be added as a
   *                                                            filter. It receives the suggestion and the group
   *                                                            that was clicked.
   * @property {Function}       onBulkSelectionToggle           Callback for when the bulk selection it toggled. It
   *                                                            receives a flag indicating if we must set all media as
   *                                                            selected or not.
   * @property {Function}       onClearSuggestions              Callback for when we want to clear list of the
   *                                                            suggestions.
   * @property {Function}       onFilterChange                  Callback for when a filter is changed It receives
   *                                                            the aggregation and filter that changed.
   * @property {Function}       onFilterDateRangeChange         Callback for when the filterBar date filter is changed.
   *                                                            It receives all the parameters passed by Flatpickr.
   * @property {Function}       onMediaSelected                 Callback for when a media gets selected.
   * @property {Function}       onOpenModal                     Callback for when we want to open the modal. It receives
   *                                                            the opened media and the section to set as selected in
   *                                                            the modal.
   * @property {Function}       onPaginationNextClick           Callback for when the pagination next button is clicked.
   * @property {Function}       onPaginationPreviousClick       Callback for when the pagination previous button is
   *                                                            clicked.
   * @property {Function}       onQueryChange                   Callback for when the query is changed. It receives
   *                                                            the changed query.
   * @property {Function}       onSearchSuggestions             Callback for when we want to search for suggestions. It
   *                                                            receives the text to search suggestions for.
   * @property {Function}       onSectionChange                 Callback when the selected section is changed. It
   *                                                            receives the selected section.
   */
  bindings: {
    actions: '<',
    activeFiltersExist: '<',
    aggregations: '<',
    allSorts: '<',
    editStatusMap: '<',
    filtersLoading: '<',
    filtersPhrase: '<',
    loading: '<',
    media: '<',
    mediaCount: '<',
    numberOfSectionsBeforeDropdown: '<',
    pagination: '<',
    query: '<',
    sections: '<',
    selectedMediaCount: '<',
    selectedSection: '<',
    suggestions: '<',
    suggestionsLoading: '<',
    onActionClick: '&',
    onActionDisableCheck: '&',
    onActionVisibilityCheck: '&',
    onAddSuggestionFilter: '&',
    onBulkSelectionToggle: '&',
    onClearSuggestions: '&',
    onFilterChange: '&',
    onFilterDateRangeChange: '&',
    onMediaSelected: '&',
    onOpenModal: '&',
    onPaginationNextClick: '&',
    onPaginationPreviousClick: '&',
    onQueryChange: '&',
    onSearchSuggestions: '&',
    onSectionChange: '&',
  },
};
