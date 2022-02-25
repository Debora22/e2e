import ObjectUtils from 'wootils/shared/objectUtils';
import OlapicAPI from '../abstracts/olapicAPI';

/**
 * @ngdoc service
 * @name analyticsExportAPI
 * @description
 * This is the "HTTP client" we use to comunicate with the reportingAPI service which allow us
 * to download a CSV report of Advocates.
 *
 * @memberof common
 */
class AnalyticsExportAPI extends OlapicAPI {
  /**
   * @param {$http}     $http             To make all the requests.
   * @param {$q}        $q                To reject error eesponses.
   * @param {Object}    appConfiguration  To get the api configuration.
   * @param {FileSaver} fileSaver         To prompt the user with the result csv file.
   */
  constructor(
    $http,
    $q,
    appConfiguration,
    fileSaver,
  ) {
    'ngInject';

    super(
      $http,
      $q,
      appConfiguration,
      'reportingAPIServer',
    );

    /**
     * The local reference to the `fileSaver` service.
     *
     * @type {FileSaver}
     */
    this.fileSaver = fileSaver;
    /**
     * Flag that indicates if a request to export is in progress.
     *
     * @type {Boolean}
     */
    this.loading = false;
  }
  /**
   * Makes a request to get the Advocates export CSV file.
   *
   * @param {String}  conversionInterval  The conversion window.
   * @param {String}  currency            The currency code.
   * @param {Moment}  dateFrom            The start date to display the analytics.
   * @param {Moment}  dateTo              The end date to display the analytics.
   * @param {Boolean} isEnterprise        If the account is enterprise.
   * @param {Boolean} isFocusRevenue      If we are displaying revenue focused analytics.
   * @param {String}  csvFileName         The filename for the result `csv` file.
   *
   * @return {Promise}
   */
  downloadCsvFile(
    conversionInterval,
    currency,
    dateFrom,
    dateTo,
    isEnterprise,
    isFocusRevenue,
    csvFileName = 'export.csv',
  ) {
    const params = this._generateAnalyticsQuery(
      conversionInterval,
      currency,
      dateFrom,
      dateTo,
      isEnterprise,
      isFocusRevenue,
    );
    const { accountType } = params;
    delete params.accountType;

    const endpoint = this.endpoint(
      `export.advocates.${accountType}`,
      ObjectUtils.lowerCamelToSnakeKeys(params, ['conversionInterval', 'dateFrom', 'dateTo']),
    );

    this.loading = true;

    return this.get(endpoint).then((response) => {
      const blob = new Blob([response], { type: 'text/csv' });
      this.fileSaver.saveAs(blob, csvFileName);
    })
    .finally(() => {
      this.loading = false;
    });
  }
}

export default AnalyticsExportAPI;
