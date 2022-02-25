import OlapicAPI from '../abstracts/olapicAPI';

/**
 * @ngdoc service
 * @name uploaderAPI
 * @description
 * This is the "HTTP client" we use to comunicate with the uploaderAPI service which allow us
 * to upload media to S3.
 *
 * @memberof common
 */
class UploaderAPI extends OlapicAPI {
  /**
   * @param {$http}  $http             To make all the requests.
   * @param {$q}     $q                To reject error eesponses.
   * @param {Object} appConfiguration  To get the api configuration.
   */
  constructor(
    $http,
    $q,
    appConfiguration,
  ) {
    'ngInject';

    super(
      $http,
      $q,
      appConfiguration,
      'uploaderPreviewerAPIServer',
    );

    /**
     * Flag that indicates if a request to export is in progress.
     *
     * @type {Boolean}
     */
    this.loading = false;
  }
  /**
   * Makes a request to upload a list of files to S3.
   *
   * @param {FileList} fileList  The list of files to upload.
   *
   * @return {Promise}
   */
  uploadFiles(fileList) {
    this.loading = true;

    const promises = [...fileList].map((file) => this._upload(file));

    return this.$q.all(promises)
    .finally(() => {
      this.loading = false;
    });
  }
  /**
   * Makes a request to upload a single file to S3.
   *
   * @param {File} file  The file to upload.
   *
   * @return {Promise}
   */
  _upload(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.post(
      this.endpoint('upload'),
      formData,
      { headers: { 'Content-Type': undefined } },
    ).then((response) => response.url);
  }
}

export default UploaderAPI;
