/**
 * @ngdoc constant
 * @name ADVOCATES_DATE_RANGE_OPTIONS
 * @description
 * The list of date range options for advocates.
 *
 * @type {Array}
 * @property {String} id                  The option id.
 * @property {String} name                The option name.
 * @property {Object} range               The option range.
 * @property {Object} range.from          The from date options.
 * @property {Number} range.from.unit     The unit to subtract go generate the from date.
 * @property {String} range.from.value    The value of the unit to subtract go generate the from date.
 * @property {String} range.from.startOf  The value of the unit to set as startOf.
 * @property {Object} range.to            The to date options.
 * @property {Number} range.to.unit       The unit to subtract go generate the to date.
 * @property {String} range.to.value      The value of the unit to subtract go generate the to date.
 * @property {String} range.to.endOf      The value of the unit to set as endOf.
 *
 * @memberof advocates
 */
const dateRangeOptions = [{
  id: 'lastweek',
  name: 'Last week',
  range: {
    from: {
      unit: 1,
      value: 'week',
      startOf: 'week',
    },
    to: {
      unit: 1,
      value: 'week',
      endOf: 'week',
    },
  },
}, {
  id: 'lastmonth',
  name: 'Last month',
  range: {
    from: {
      unit: 1,
      value: 'months',
      startOf: 'month',
    },
    to: {
      unit: 1,
      value: 'month',
      endOf: 'month',
    },
  },
}, {
  id: 'last7days',
  name: 'Last 7 days',
  range: {
    from: {
      unit: 7,
      value: 'days',
    },
  },
}, {
  id: 'last30days',
  name: 'Last 30 days',
  range: {
    from: {
      unit: 30,
      value: 'days',
    },
  },
}, {
  id: 'last90days',
  name: 'Last 3 months',
  range: {
    from: {
      unit: 90,
      value: 'days',
    },
  },
}];

export default dateRangeOptions;
