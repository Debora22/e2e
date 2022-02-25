const { controller } = require('jimpex');
const moment = require('moment');
const statuses = require('statuses');

/**
 * The controller for the media resource.
 */
class MediaController {
  /**
   * @param {AdminAPI2}        adminAPI2         To make requests to the Admin API2.
   * @param {Class}            AppError          The class of the AppError.
   * @param {Downloader}       downloader        To download media.
   * @param {ResponsesBuilder} responsesBuilder  To format the received responses.
   * @param {UploaderAPI}      uploaderAPI       To make requests to the Uploader API.
   * @param {String}           version           The app version string.
   */
  constructor(
    adminAPI2,
    AppError,
    downloader,
    responsesBuilder,
    uploaderAPI,
    version,
  ) {
    /**
     * The local reference to the `adminAPI2` service.
     *
     * @type {AdminAPI2}
     */
    this.adminAPI2 = adminAPI2;
    /**
     * The local reference to the `AppError` class.
     *
     * @type {Class}
     */
    this.AppError = AppError;
    /**
     * The local reference to the `downloader` service.
     *
     * @type {Downloader}
     */
    this.downloader = downloader;
    /**
     * The local reference to the `responsesBuilder` service.
     *
     * @type {ResponsesBuilder}
     */
    this.responsesBuilder = responsesBuilder;
    /**
     * The local reference to the `uploaderAPI` service.
     *
     * @type {UploaderAPI}
     */
    this.uploaderAPI = uploaderAPI;
    /**
     * The local reference to the `version` constant.
     *
     * @type {String}
     */
    this.version = version;
  }
  /**
   * Use the Admin API2 to change the status of one or several media.
   *
   * @return {ExpressMiddleware}
   */
  changeMediaStatus() {
    return (req, res, next) => {
      const mediaChanges = req.body;

      this.adminAPI2.changeMediaStatus(req, mediaChanges)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to change the position of the streams of a media.
   *
   * @return {ExpressMiddleware}
   */
  changeStreamsPositions() {
    return (req, res, next) => {
      const { mediaId } = req.params;
      const streamsChange = req.body;

      this.adminAPI2.changeStreamsPositions(req, mediaId, streamsChange)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the AdminAPI2 to get several media from URLs and return all of them in a zip file.
   *
   * @return {ExpressMiddleware}
   */
  downloadMedia() {
    return this.downloader.getBulkDownloadMiddleware({
      propertyName: 'media',
    });
  }
  /**
   * Use the AdminAPI2 to get a media from a given URL.
   *
   * @return {ExpressMiddleware}
   */
  getMedia() {
    return this.downloader.getViewImageMiddleware({
      parameterName: 'url',
    });
  }
  /**
   * Use the Admin API2 to get the media filters and return them.
   *
   * @return {ExpressMiddleware}
   */
  getMediaFilters() {
    return (req, res, next) => {
      const query = req.body;

      this.adminAPI2.getMediaFilters(req, query)
      .then((response) => this.responsesBuilder.json(res, response.aggs))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to get the media suggestions and return them.
   *
   * @return {ExpressMiddleware}
   */
  getMediaSuggestions() {
    return (req, res, next) => {
      const { phrase } = req.query;

      this.adminAPI2.getMediaSuggestions(req, phrase)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to assign metadata to media.
   *
   * @return {ExpressMiddleware}
   */
  putMetadataToMedia() {
    return (req, res, next) => {
      const mediaChanges = req.body;

      this.adminAPI2.putMetadataToMedia(req, mediaChanges)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the AdminAPI2 to crop/restore the given media.
   *
   * @return {ExpressMiddleware}
   */
  saveEditedMedia() {
    return (req, res, next) => {
      const { mediaId } = req.params;
      const editData = req.body;

      this.adminAPI2.saveEditedMedia(req, mediaId, editData)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the AdminAPI2 to add/remove keywords to the given media.
   *
   * @return {ExpressMiddleware}
   */
  saveMediaKeywords() {
    return (req, res, next) => {
      const { mediaId } = req.params;
      const keywords = req.body;

      this.adminAPI2.saveMediaKeywords(req, mediaId, keywords)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Admin API2 to search media and return them.
   *
   * @return {ExpressMiddleware}
   */
  searchMedia() {
    return (req, res, next) => {
      const query = req.body;
      const params = req.query;

      this.adminAPI2.searchMedia(req, query, params)
      .then((response) => (
        !response.media.length || (response.stream_positions && response.streams) ?
          /**
           * If we have no media or the stream_positions and streams information are available,
           * just return the response.
           */
          response :
          // If they are not available, go fetch them.
          this.adminAPI2.getMediaStreamsPositions(req, response.media.map((media) => media.id))
          .then((mediaStreamsPositions) => {
            response.streams = mediaStreamsPositions.streams;
            response.stream_positions = mediaStreamsPositions.stream_positions;
            return response;
          })
      ))
      .then((response) => {
        if (response.streams) {
          // Fill the streams information and extra properties in each the media.
          response.media.forEach((media) => {
            const mediaStremas = response.stream_positions[media.id] || { streams: [] };

            media.streams = mediaStremas.streams.map((streamId) => response.streams[streamId]);

            this._addMediaProperties(media);
            this._addMediaRightsProperties(media);
          });
        }

        return this.responsesBuilder.json(
          res,
          response.media,
          statuses.ok,
          { pagination: response.pagination },
        );
      })
      .catch((error) => next(error));
    };
  }
  /**
   * Use the Uploader API to upload media.
   *
   * @return {ExpressMiddleware}
   */
  uploadMedia() {
    return (req, res, next) => {
      this.uploaderAPI.uploadMedia(req, req.body)
      .then((response) => this.responsesBuilder.json(res, response))
      .catch((error) => next(error));
    };
  }
  /**
   * Add necessary properties to the media.
   *  - If the media is from Instagram and has no url, generate an URL with the username data.
   *  - Set the user label.
   *  - Add the isAutomatic property to the keywords.
   *  - Add the proxy url for the original and backup images.
   *
   * @param {Object} media  The media to add the properties to.
   *
   * @access protected
   */
  _addMediaProperties(media) {
    if (
      media.source.name === 'instagram' &&
      !media.source.data.url
    ) {
      media.source.data.url = `//www.instagram.com/${media.user.username}`;
    }

    media.user.label = media.user.username ?
      `@${media.user.username}` :
      media.user.name;

    media.keywords_with_providers = (media.keywords_with_providers || []).map((keyword) => ({
      ...keyword,
      isAutomatic: keyword.provider === 'googlevision',
    }));

    const image = media.images.backup || media.images.original;
    media.images.originalCE = `/api/${this.version}/media?url=${image}`;

    // If the media was successfully edited, add a random hash to the media sizes urls to avoid cache.
    if (media.assets_edit_status === 'PROCESSED') {
      const date = new Date().getTime();

      media.images = Object.keys(media.images).reduce((acc, key) => {
        acc[key] = `${media.images[key]}?t=${date}`;
        return acc;
      }, {});
    }

    if (media.video_url) {
      media.video_orientation = {
        landscape: media.width > media.height,
        portrait: media.width < media.height,
        square: media.width === media.height,
      };
    }
  }
  /**
   * Add necessary rights properties to the media.
   *  - If the media has Rights Requested, then check if the rights has expired. If they have,
   *    set the Rights status as `RIGHTS-REQUEST-EXPIRED`.
   *  - If the media has manually granted rights, set the correct the rights source.
   *
   * @param {Object} media  The media to add the properties to.
   *
   * @access protected
   */
  _addMediaRightsProperties(media) {
    if (
      media.rights_data.status === 'REQUESTED' &&
      media.rights_data.request &&
      media.rights_data.request.date
    ) {
      const expirationDate = moment(media.rights_data.request.date).add(1, 'months');

      if (moment().isAfter(expirationDate)) {
        media.rights_data.status = 'RIGHTS-REQUEST-EXPIRED';
        media.rights_data.expired_date = expirationDate.add(1, 'days').toISOString();
      }
    }

    if (
      media.rights_data.response.message &&
      media.rights_data.response.message.includes('Rights Manually Granted By')
    ) {
      media.rights_data.source = 'manually_granted';
    }
  }
}

/**
 * This controller adds the routes for the media resource.
 *
 * @type {Controller}
 */
const mediaController = controller((app) => {
  const router = app.get('router');
  const appConfiguration = app.get('appConfiguration');
  const { version } = appConfiguration.get(['version']);

  const ctrl = new MediaController(
    app.get('adminAPI2'),
    app.get('AppError'),
    app.get('downloader'),
    app.get('responsesBuilder'),
    app.get('uploaderAPI'),
    version,
  );

  const ensureBearerToken = app.get('ensureBearerToken');
  const { requireAuth } = app.get('authNZUtils');

  return router
  .get('/', ctrl.getMedia())
  .post('/download', [requireAuth(), ctrl.downloadMedia()])
  .post('/filters', [ensureBearerToken, ctrl.getMediaFilters()])
  .put('/metadata', [ensureBearerToken, ctrl.putMetadataToMedia()])
  .post('/search', [ensureBearerToken, ctrl.searchMedia()])
  .put('/status', [ensureBearerToken, ctrl.changeMediaStatus()])
  .get('/suggestions', [ensureBearerToken, ctrl.getMediaSuggestions()])
  .post('/upload', [ensureBearerToken, ctrl.uploadMedia()])
  .post('/:mediaId/edit', [ensureBearerToken, ctrl.saveEditedMedia()])
  .post('/:mediaId/keywords', [ensureBearerToken, ctrl.saveMediaKeywords()])
  .post('/:mediaId/streams/positions', [ensureBearerToken, ctrl.changeStreamsPositions()]);
});

module.exports = {
  MediaController,
  mediaController,
};
