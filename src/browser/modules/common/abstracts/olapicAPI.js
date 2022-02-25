import NgAppAPI from './ngAppAPI';
import ApiError from '../classes/apiError';

/**
 * This abstract class contains the basic implementation of an Olapic API.
 *
 * @abstract
 *
 * @memberof common
 */
class OlapicAPI extends NgAppAPI {
  /**
   * @param {$http}  $http             To make all the requests.
   * @param {$q}     $q                To reject error eesponses.
   * @param {Object} appConfiguration  To get the header and error configuration.
   * @param {String} configurationKey  The key of the configuration to get the url and endpoints.
   *
   * @abstract
   */
  constructor(
    $http,
    $q,
    appConfiguration,
    configurationKey,
  ) {
    if (new.target === OlapicAPI) {
      throw new TypeError('OlapicAPI is an abstract class, it can\'t be instantiated directly');
    }

    super(
      $http,
      $q,
      appConfiguration[configurationKey].url,
      appConfiguration[configurationKey].endpoints,
      (url, options) => this._makeRequest(url, options),
    );

    /**
     * The local reference to the `appConfiguration` constant.
     *
     * @type {Object}
     */
    this.appConfiguration = appConfiguration;
    /**
     * An authorization customer to include on the requests.
     *
     * @type {Number}
     */
    this.authorizationCustomerId = 0;
    /**
     * The mask to use when formating dates when only the date is needed.
     *
     * @type {String}
     */
    this.formatMaskDate = 'YYYY-MM-DD';
    /**
     * The mask to use when formating dates using the ISO8601 format.
     *
     * @type {String}
     */
    this.formatMaskISO = 'YYYY-MM-DDTHH:mm:ss';
  }
  /**
   * Formats an error response into a proper Error object.
   *
   * @param {Object} response  A received response from a request.
   *
   * @return {Error}
   *
   * @access protected
   */
  error(response) {
    return new ApiError(response, this.appConfiguration.genericError);
  }
  /**
   * Sets the authorization customer Id for the requests.
   *
   * @param {Number} customerId  The new authorization customer Id.
   */
  setAuthorizationCustomerId(customerId) {
    this.authorizationCustomerId = customerId;
  }
  /**
   * Since some methods need to get the `data` porperty of the response and some doesn't,
   * the methods that need it shall just call this method.
   *
   * @param {Object} response  The response to get the data from.
   *
   * @return {Object}
   *
   * @access protected
   */
  _fetchResponseData(response) {
    return response.data || response;
  }
  /**
   * Generate a query object for an analytics request.
   *
   * @param {String}  conversionInterval  The conversion window.
   * @param {String}  currency            The currency code.
   * @param {Moment}  dateFrom            The start date to display the analytics.
   * @param {Moment}  dateTo              The end date to display the analytics.
   * @param {Boolean} isEnterprise        If the account is enterprise.
   * @param {Boolean} isFocusRevenue      If we are displaying revenue focused analytics.
   *
   * @return {Object}
   *
   * @access protected
   */
  _generateAnalyticsQuery(conversionInterval, currency, dateFrom, dateTo, isEnterprise, isFocusRevenue) {
    const accountType = isEnterprise ? 'enterprise' : 'child';
    const customerFocus = isFocusRevenue ? 'revenue' : 'engagement';

    const query = {
      accountType,
      conversionInterval,
      currency,
      customerFocus,
    };

    if (dateFrom) {
      query.dateFrom = dateFrom.format(this.formatMaskDate);
    }

    if (dateTo) {
      query.dateTo = dateTo.format(this.formatMaskDate);
    }

    return query;
  }
  /**
   * Add the authorization customer header and make the request using the `_fetch` method.
   *
   * @param {String} url      The url to request.
   * @param {Object} options  The request options.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeRequest(url, options = {}) {
    options.headers = options.headers || {};

    if (this.authorizationCustomerId) {
      options.headers[this.appConfiguration.olapicCustomerHeader] = this.authorizationCustomerId;
    }

    return this._fetch(url, options);
  }
}

export default OlapicAPI;
