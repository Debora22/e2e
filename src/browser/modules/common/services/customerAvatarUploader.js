import OlapicAPI from '../abstracts/olapicAPI';

/**
 * @ngdoc service
 * @name CustomerAvatarUploader
 * @description
 * This is the "HTTP client" we use to communicate with AdminAPI service
 * to handle the avatar image upload.
 *
 * @memberof common
 */
class CustomerAvatarUploader extends OlapicAPI {
  /**
   * @param {$http}  $http             To make all the requests.
   * @param {$q}     $q                To reject error responses.
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
      'adminAPI2Server',
    );
  }
  /**
   * Makes a POST request to save the avatar from a customer.
   *
   * @param {File} avatar  The avatar to upload.
   *
   * @return {Promise}
   */
  uploadAvatarImage(avatar) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.post(
      this.endpoint('settings.avatar'),
      formData,
      { headers: { 'Content-Type': undefined } },
    );
  }
}

export default CustomerAvatarUploader;
