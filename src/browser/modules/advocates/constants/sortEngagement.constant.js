/**
 * @ngdoc constant
 * @name ADVOCATES_SORT_ENGAGEMENT
 * @description
 * The sorts for the advocates page with engagement focus.
 *
 * @type {Object}
 * @property {Sort} CTRDesc             The descendant CTR sort.
 * @property {Sort} CTRAsc              The ascendant CTR sort.
 * @property {Sort} shoppingClicksDesc  The descendant Shopping Click sort.
 * @property {Sort} shoppingClicksAsc   The ascendant Shopping Click sort.
 * @property {Sort} lightBoxDesc        The descendant Lightbox Views sort.
 * @property {Sort} lightBoxAsc         The ascendant Lightbox Views sort.
 *
 * @memberof advocates
 */
const sortEngagement = {
  CTRDesc: {
    id: 0,
    name: 'CTR (Descending)',
    field: 'totals.ctr',
    asc: false,
  },
  CTRAsc: {
    id: 1,
    name: 'CTR (Ascending)',
    field: 'totals.ctr',
    asc: true,
  },
  shoppingClicksDesc: {
    id: 2,
    name: 'Shopping Clicks (Descending)',
    field: 'totals.clicks',
    asc: false,
  },
  shoppingClicksAsc: {
    id: 3,
    name: 'Shopping Clicks (Ascending)',
    field: 'totals.clicks',
    asc: true,
  },
  lightBoxDesc: {
    id: 4,
    name: 'Lightbox Views (Descending)',
    field: 'totals.views',
    asc: false,
  },
  lightBoxAsc: {
    id: 5,
    name: 'Lightbox Views (Ascending)',
    field: 'totals.views',
    asc: true,
  },
};

export default sortEngagement;
