/**
 * @typedef  {Object}  MediaSearchParams
 * @property {String}  count              The page size of the media serch.
 * @property {?Number} id                 The first (on prev link) or last (on next link)
 *                                        media id of the current media list.
 * @property {?Number} idx                The first (on prev link or last (on next link)
 *                                        media sort property of the current media list.
 * @property {?String} link               The text of the selected pagination link.
 */

/**
 * @typedef  {Object} QueryFilter
 * @property {Array|Boolean} values  The list of filter names or a flag to apply to the query.
 */

/**
 * @typedef  {Object} QuerySearch
 * @property {Object.<String,QueryFilter>} filters               The filters to apply to the query.
 * @property {Array}                       sort                  The sorts to apply to the query.
 * @property {Object}                      staticFilters         The static filters to apply to the query.
 * @property {String}                      staticFilters.phrase  The text search to apply to the query.
 */

/**
 * @typedef  {Object} StreamSearchParams
 * @property {Number} itemsPerPage        The streams to fetch per page.
 * @property {Number} pageNumber          The page number to fetch.
 * @property {String} paginationKey       The pagination key.
 * @property {String} phrase              The phrase to search.
 */

/**
 * @typedef  {Object} WhitelistUsersSearchParams
 * @property {String} criteria                    The criteria to search by.
 * @property {Number} itemsPerPage                The whitelist users to fetch per page.
 * @property {Number} pageNumber                  The page number to fetch.
 * @property {String} search                      The search to apply to the fetch.
 * @property {String} sortBy                      The sort type to apply to the fetch.
 * @property {String} sortOrder                   The sort order to apply to the fetch.
 * @property {String} status                      The status filter to apply to the fetch.
 */
