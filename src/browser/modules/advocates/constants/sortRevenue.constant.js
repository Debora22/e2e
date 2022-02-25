/**
 * @ngdoc constant
 * @name ADVOCATES_SORT_REVENUE
 * @description
 * The sorts for the advocates page with revenue focus.
 *
 * @type {Object}
 * @property {Sort} revenueDesc      The descendant Revenue sort.
 * @property {Sort} revenueAsc       The ascendant Revenue sort.
 * @property {Sort} conversionsDesc  The descendant Conversions sort.
 * @property {Sort} conversionsAsc   The ascendant Conversions sort.
 * @property {Sort} CVRDesc          The descendant CVR sort.
 * @property {Sort} CVRAsc           The ascendant CVR sort.
 * @property {Sort} lightBoxDesc     The descendant Lightbox Views sort.
 * @property {Sort} lightBoxAsc      The ascendant Lightbox Views sort.
 *
 * @memberof advocates
 */
const sortRevenue = {
  revenueDesc: {
    id: 0,
    name: 'Revenue (Descending)',
    field: 'totals.revenue.amount',
    asc: false,
  },
  revenueAsc: {
    id: 1,
    name: 'Revenue (Ascending)',
    field: 'totals.revenue.amount',
    asc: true,
  },
  conversionsDesc: {
    id: 2,
    name: 'Conversions (Descending)',
    field: 'totals.conversions',
    asc: false,
  },
  conversionsAsc: {
    id: 3,
    name: 'Conversions (Ascending)',
    field: 'totals.conversions',
    asc: true,
  },
  CVRDesc: {
    id: 4,
    name: 'Conversion Rate (Descending)',
    field: 'totals.cvr',
    asc: false,
  },
  CVRAsc: {
    id: 5,
    name: 'Conversion Rate (Ascending)',
    field: 'totals.cvr',
    asc: true,
  },
  lightBoxDesc: {
    id: 6,
    name: 'Lightbox Views (Descending)',
    field: 'totals.views',
    asc: false,
  },
  lightBoxAsc: {
    id: 7,
    name: 'Lightbox Views (Ascending)',
    field: 'totals.views',
    asc: true,
  },
};

export default sortRevenue;
