import ObjectUtils from 'wootils/shared/objectUtils';

/**
 * This class contains the basic implementation of an Api Error.
 *
 * @memberof common
 */
class ApiError extends Error {
  /**
   * @param {Object} response      To get the error message.
   * @param {String} genericError  To use as the generic error message.
   */
  constructor(
    response,
    genericError,
  ) {
    super(
      ObjectUtils.get(response, 'data.data.message') ||
      ObjectUtils.get(response, 'data.data.error_long_message') ||
      ObjectUtils.get(response, 'statusText') ||
      genericError,
    );

    /**
     * The local reference to the `status` constant.
     *
     * @type {Number}
     */
    this.status = response.status;
    /**
     * The local reference to the `statusText` constant.
     *
     * @type {String}
     */
    this.statusText = response.statusText;
  }
}

export default ApiError;
