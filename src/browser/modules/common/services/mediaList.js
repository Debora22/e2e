import statuses from 'statuses';
import EntitiesList from '../abstracts/entitiesList';

/**
 * @ngdoc service
 * @name MediaList
 * @description
 * This service is used to search media, pagination over it and
 * perform several different actions over the media list.
 *
 * @memberof common
 */
class MediaList extends EntitiesList {
  /**
   * @param {$q}            $q                To reject error responses.
   * @param {AppAPI}        appAPI            To make the API requests.
   * @param {AppUtils}      appUtils          To get the query params from the pagination links.
   * @param {Object}        appConfiguration  To get the ES sync time.
   * @param {ActivationMap} ACTIVATION_MAP    To get the activation upload status.
   */
  constructor(
    $q,
    appAPI,
    appUtils,
    appConfiguration,
    ACTIVATION_MAP,
  ) {
    'ngInject';

    super($q);

    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppUtils}
     */
    this.appUtils = appUtils;
    /**
     * The local reference to the `esSyncTime` constant.
     *
     * @type {Number}
     */
    this.esSyncTime = appConfiguration.esSyncTime;
    /**
     * The local reference to the `approveNextStatus` constant.
     *
     * @type {Object}
     */
    this.approveNextStatus = appConfiguration.approveNextStatus;
    /**
     * The local reference to the `activationMap` constant.
     *
     * @type {ActivationMap}
     */
    this.activationMap = ACTIVATION_MAP;
    /**
     * The number of selected media.
     *
     * @type {Boolean}
     */
    this.selectedMedia = 0;
    /**
     * The map of the available approval types.
     *
     * @type {Object}
     * @property {String} withRights           We will approve the media without asking for rights.
     * @property {String} contentEngine        We approve the media asking for rights using the Content Engine.
     * @property {String} chromeExtension      We approve the media asking for rights using the Chrome Extension.
     * @property {String} unavailableMentions  We cannot approve the media cause we are missing some mentions account.
     * @property {String} canNotApprove        We cannot approve the media since we cannot ask for rights on it.
     * @access protected
     */
    this._approvalTypes = {
      withRights: 'withRights',
      contentEngine: 'contentEngine',
      chromeExtension: 'chromeExtension',
      unavailableMentions: 'unavailableMentions',
      canNotApprove: 'canNotApprove',
    };
    /**
     * The map of the available rights reason.
     *
     * @type {Object}
     * @property {String} csv_importer       Given rights because a CSV file was used.
     * @property {String} content_app        Given rights because the Content Creator App was used.
     * @property {String} content_uploader   Given rights because the Content Uploader was used.
     * @property {String} dropbox            Given rights because Dropbox was used.
     * @property {String} extended_uploader  Given rights because the Uploader was used.
     * @property {String} follow_collector   Given rights because was uploaded by the follow collection.
     * @property {String} harddrive          Given rights because a widget with an Uploader was used.
     * @property {String} mavrck             Given rights because a influencer network (mavrck) was used.
     * @property {String} tidal              Given rights because a influencer network (tidal) was used.
     * @property {String} uploader           Given rights because a widget with an Uploader was used.
     * @property {String} whitelist          Given rights the user is the Rights Management Whitelist.
     * @access protected
     */
    this._rightsReason = {
      csv_importer: 'because it was uploaded through the Uploader.',
      content_app: 'because it was uploaded through the Content Creator App.',
      content_uploader: 'because it was uploaded through the Content Uploader.',
      dropbox: 'because it was uploaded through Dropbox.',
      extended_uploader: 'because it was uploaded through the Uploader.',
      follow_collector: 'because it\'s from your own profiles.',
      harddrive: 'because it was uploaded through the Uploader.',
      manually_granted: 'through manual process.',
      mavrck: 'because it\'s from your influencer network.',
      tidal: 'because it\'s from your influencer network.',
      uploader: 'because it was uploaded through the Uploader.',
      whitelist: 'because the user is on your Automatic Rights List.',
    };

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Based on the provided `selectAll` we set all media as selected or not,
   * and then we set the number of selected media.
   *
   * @param {Boolean} selectAll  If we must set all media as selected or not.
   */
  changeAllMediaSelection(selectAll) {
    this.entities.forEach((item) => {
      item.selected = selectAll;
    });
    this.selectedMedia = selectAll ?
      this.entities.length :
      0;
  }
  /**
   * Perform one or several media change requests.
   * For each media change request:
   * - Count the amount of media changes with errors and success.
   * - Remove the successfully changed media from the entities list.
   * Merge all the media change requests together and refresh the number of selected media.
   * If the entities list is empty, then we must fetch another media page.
   *
   * @param {Array}       mediaChangeRequests  The list of {@link MediaChangeRequest} to perform.
   * @param {QuerySearch} query                The query search to make, in case we need to fetch another media page.
   *
   * @return {Promise}
   */
  changeMediaStatus(mediaChangeRequests, query) {
    this.loading = true;
    const promises = [];

    mediaChangeRequests.forEach((request) => {
      const result = this.appAPI.changeMediaStatus(request.media, request.status)
      .then((response) => {
        const results = {
          status: request.status,
          success: 0,
          successMedia: [],
          error: 0,
        };

        Object.keys(response).forEach((key) => {
          const mediaId = Number(key);

          if (response[mediaId].status === statuses.ok) {
            this._removeMedia(mediaId);
            results.success++;
            results.successMedia.push(mediaId);
          } else {
            results.error++;
          }
        });

        return results;
      });

      promises.push(result);
    });

    return this.$q.all(promises)
    .then((responses) => responses.reduce((result, response) => {
      result.success += response.success;
      result.error += response.error;
      result.successMedia = response.successMedia.concat(response.successMedia);
      result.byStatus[response.status] = response;

      return result;
    }, {
      success: 0,
      successMedia: [],
      error: 0,
      byStatus: {},
    }))
    .then((results) => {
      this.refreshSelectedMedia();

      let result;
      if (this.entities.length) {
        this.loading = false;
        result = this.$q.resolve(results);
      } else {
        result = this._fetchAnotherPage(query).then(() => results);
      }

      return result;
    })
    .catch((error) => {
      this.loading = false;
      return this.$q.reject(error);
    });
  }
  /**
   * Perform a request to download several media in a zip file.
   *
   * @param {Array} media  The media to download.
   *
   * @return {Promise}
   */
  downloadMedia(media) {
    return this._requestWithLoading(() => this.appAPI.downloadMedia(media));
  }
  /**
   * Genereate the approval information for all the media entities.
   *
   * @param {Array} socialMentionsAccounts  The list of social mentions accounts to be check with the media mentions.
   */
  generateApprovalInfo(socialMentionsAccounts) {
    const approveStatuses = ['GIVEN', 'REQUESTED', 'RIGHTS-REQUEST-EXPIRED'];

    this.entities.forEach((media) => {
      const approvalInfo = {};

      if (approveStatuses.includes(media.rights_data.status)) {
        approvalInfo.type = this._approvalTypes.withRights;
        approvalInfo.rightsReason = this._rightsReason[media.rights_data.source];
      } else if (media.rights_data.is_request_programmatic) {
        const unavailableAccounts = [];
        media.user_mentions.forEach((mention) => {
          const userMention = `@${mention.mentioned_account.username}`;

          if (!unavailableAccounts.includes(userMention)) {
            const exist = socialMentionsAccounts
            .some((socialMentionsAccount) => mention.mentioned_account.username === socialMentionsAccount.username);
            if (!exist) {
              unavailableAccounts.push(userMention);
            }
          }
        });

        if (unavailableAccounts.length) {
          approvalInfo.type = this._approvalTypes.unavailableMentions;
          approvalInfo.unavailableMentions = unavailableAccounts;
        } else {
          approvalInfo.type = this._approvalTypes.contentEngine;
        }
      } else if (
        !media.rights_data.is_request_programmatic &&
        media.source.name === 'instagram' &&
        media.source.data.url &&
        media.source.data.url.match(/^.*\/\/(www\.)?(instagram|instagr\.am)(\.com)?(\/[\w.]{1,30})?\/p\/.*$/)
      ) {
        approvalInfo.type = this._approvalTypes.chromeExtension;
      } else {
        approvalInfo.type = this._approvalTypes.canNotApprove;
      }

      media.approvalInfo = approvalInfo;
    });
  }
  /**
   * Genereate the approve next status information for all the media entities.
   * If the customer has the for review flow and the media is in Pending status,
   * then the next status is the status of the forReviewFlow.
   * Else, if the customer has the manual streams flow, the media has a manual stream and is in Pending status,
   * then the next status is the status of the manualStreamsFlow.
   * If not, it is the status of the normalFlow.
   *
   * @param {Boolean} hasForReviewFlow      If the customer has for review flow or not.
   * @param {Boolean} hasManualStreamsFlow  If the customer has manual streams flow or not.
   */
  generateApproveNextStatus(hasForReviewFlow, hasManualStreamsFlow) {
    this.entities.forEach((media) => {
      if (
        hasForReviewFlow &&
        media.status === 'PENDING'
      ) {
        media.approveNextStatus = this.approveNextStatus.forReviewFlow;
      } else if (
        hasManualStreamsFlow &&
        media.streams.some((stream) => stream.type === 'COLLECTION') &&
        media.status === 'PENDING'
      ) {
        media.approveNextStatus = this.approveNextStatus.manualStreamsFlow;
      } else {
        media.approveNextStatus = this.approveNextStatus.normalFlow;
      }
    });
  }
  /**
   * Get the map of approve next status of a list of media.
   *
   * @param {Array} media  The list of media to get the map of approve next status.
   *
   * @return {Object}
   */
  getApproveNextStatusMapOfMedia(media) {
    const map = {};

    media.forEach((entity) => {
      const status = entity.approveNextStatus;
      const statusId = status.id;

      if (!map[statusId]) {
        map[statusId] = {
          status,
          list: [],
        };
      }

      map[statusId].list.push(entity);
    });

    return map;
  }
  /**
   * Get the next page of media using the pagination next link.
   *
   * @param {QuerySearch} query  The query search to make.
   *
   * @return {Promise}
   */
  getNextPage(query) {
    if (!this.pagination.next) {
      return this.$q.reject(new Error('Unable to fetch the next page'));
    }

    const mediaSearchParams = this.appUtils.getQueryParams(this.pagination.next);
    this._clearBeforeRequest();

    return this._loadNextPage(query, mediaSearchParams);
  }
  /**
   * Get the previous page of media using the pagination prev link.
   *
   * @param {QuerySearch} query  The query search to make.
   *
   * @return {Promise}
   */
  getPreviousPage(query) {
    if (!this.pagination.prev) {
      return this.$q.reject(new Error('Unable to fetch the previous page'));
    }

    const mediaSearchParams = this.appUtils.getQueryParams(this.pagination.prev);
    this._clearBeforeRequest();

    return this._loadPreviousPage(query, mediaSearchParams);
  }
  /**
   * Returns a list with all the selected media.
   *
   * @return {Array}
   */
  getSelectedMedia() {
    return this.entities.filter((item) => item.selected);
  }
  /**
   * Assign metadata to several media.
   *
   * @param {Array}  media  The list of media to assign the metadata.
   * @param {String} name   The metadata name.
   * @param {String} type   The metadata type.
   * @param {String} value  The metadata value.
   *
   * @return {Promise}
   */
  putMetadataToMedia(media, name, type, value) {
    const mediaIds = media.map((item) => item.id);

    return this.appAPI.putMetadataToMedia(
      mediaIds,
      {
        name,
        type,
        value,
      },
    );
  }
  /**
   * Refresh the number of selected media.
   */
  refreshSelectedMedia() {
    this.selectedMedia = this.getSelectedMedia().length;
  }
  /**
   * Remove a media from the list.
   * If the entities list is empty, then we must fetch another media page.
   *
   * @param {Number}      mediaId  The id of the media to remove.
   * @param {QuerySearch} query    The query search to make, in case we need to fetch another media page.
   *
   * @return {Promise}
   */
  removeMedia(mediaId, query) {
    this._removeMedia(mediaId);
    this.refreshSelectedMedia();

    return this.entities.length ?
      this.$q.resolve() :
      this._fetchAnotherPage(query);
  }
  /**
   * Perform a request to ask for rights on media.
   * Remove the successfully asked for rights media from the entities list, and refresh the number of selected media.
   * If the entities list is empty, then we must fetch another media page.
   *
   * @param {Array}       media          The media to ask for rights.
   * @param {Object}      rightsRequest  The rights request to perform.
   * @param {QuerySearch} query          The query search to make, in case we need to fetch another media page.
   *
   * @return {Promise}
   */
  requestRights(media, rightsRequest, query) {
    this.loading = true;
    let promise;

    if (rightsRequest.type === 'single') {
      const [firstMedia] = media;

      promise = this.appAPI.requestRightsSingle(
        rightsRequest.socialConnectionId,
        rightsRequest.hashtag,
        rightsRequest.message,
        media,
        firstMedia.approveNextStatus.name,
      );
    } else {
      const promises = [];
      const approveNextStatusMap = this.getApproveNextStatusMapOfMedia(media);
      const statusKeys = Object.keys(approveNextStatusMap);

      if (statusKeys.length > 1) {
        // If there is more than 1 approveNextStatus perform each of the rights request for each status.
        statusKeys.forEach((statusKey) => {
          const map = approveNextStatusMap[statusKey];

          if (rightsRequest.instagram) {
            promises.push(this.appAPI.requestRightsBulk(
              rightsRequest.instagram.groupId,
              rightsRequest.instagram.socialConnectionId,
              map.list.filter((item) => item.source.name === 'instagram'),
              map.status.name,
            ));
          }

          if (rightsRequest.twitter) {
            promises.push(this.appAPI.requestRightsBulk(
              rightsRequest.twitter.groupId,
              rightsRequest.twitter.socialConnectionId,
              map.list.filter((item) => item.source.name === 'twitter'),
              map.status.name,
            ));
          }
        });
      } else if (statusKeys.length === 1) {
        // If there is only 1 approveNextStatus perform the rights request for each source.
        const [statusKey] = statusKeys;
        const map = approveNextStatusMap[statusKey];

        if (rightsRequest.instagram) {
          promises.push(this.appAPI.requestRightsBulk(
            rightsRequest.instagram.groupId,
            rightsRequest.instagram.socialConnectionId,
            map.list.filter((item) => item.source.name === 'instagram'),
            map.status.name,
          ));
        }

        if (rightsRequest.twitter) {
          promises.push(this.appAPI.requestRightsBulk(
            rightsRequest.twitter.groupId,
            rightsRequest.twitter.socialConnectionId,
            map.list.filter((item) => item.source.name === 'twitter'),
            map.status.name,
          ));
        }
      }

      promise = this.$q.all(promises)
      .then((responses) => responses.reduce((result, response) => {
        result.failed += response.failed;
        result.successful += response.successful;

        Object.keys(response.processed).forEach((key) => {
          result.processed[key] = response.processed[key];
        });

        return result;
      }, {
        failed: 0,
        processed: {},
        successful: 0,
      }));
    }

    return promise
    .then((response) => {
      const results = {
        success: response.successful,
        successMedia: [],
        error: response.failed,
      };

      Object.keys(response.processed).forEach((key) => {
        const mediaId = Number(key);

        if (response.processed[mediaId].status === 'created') {
          this._removeMedia(mediaId);
          results.successMedia.push(mediaId);
        }
      });

      this.refreshSelectedMedia();

      let result;
      if (this.entities.length) {
        this.loading = false;
        result = this.$q.resolve(results);
      } else {
        result = this._fetchAnotherPage(query).then(() => results);
      }

      return result;
    })
    .catch((error) => {
      this.loading = false;
      return this.$q.reject(error);
    });
  }
  /**
   * Perform a request to crop/restore the given media.
   *
   * @param {Number}  mediaId   The media id to update.
   * @param {Object}  editData  The crop data to crop the media.
   * @param {Boolean} isEdited  If we are cropping or restoring a media.
   *
   * @return {Promise}
   */
  saveEditedMedia(mediaId, editData, isEdited) {
    return this._requestWithLoading(() => this.appAPI.saveEditedMedia(
      mediaId,
      editData,
      isEdited,
    ));
  }
  /**
   * Perform a request to add/remove a keyword to the given media.
   *
   * @param {Object}  media     The media to update.
   * @param {Object}  keyword   The keyword to add or remove.
   * @param {Boolean} isAdding  If we are adding or removing a keyword.
   *
   * @return {Promise}
   */
  saveMediaKeyword(media, keyword, isAdding) {
    return this._requestWithLoading(() => this.appAPI.saveMediaKeyword(
      media.id,
      keyword,
      isAdding,
    )
    .then(() => {
      const index = media.keywords_with_providers.findIndex((item) => (item.name || item.value) === keyword);

      if (isAdding && index < 0) {
        media.keywords_with_providers.push({
          name: keyword,
        });
      } else if (!isAdding && index > -1) {
        media.keywords_with_providers.splice(index, 1);
      }
    }));
  }
  /**
   * Perform a request to schedule the selected media to Instagram.
   *
   * @param {Object} media            The media to schedule.
   * @param {String} caption          The caption to schedule.
   * @param {Moment} scheduleTime     The time to schedule.
   * @param {Object} selectedAccount  The account to share to.
   *
   * @return {Promise}
   */
  scheduleMediaToInstagram(media, caption, scheduleTime, selectedAccount) {
    return this._requestWithLoading(() => this.appAPI.scheduleMediaToInstagram(
      media,
      caption,
      scheduleTime,
      selectedAccount,
    ));
  }
  /**
   * Perform a request to schedule the selected media to Tapshop.
   *
   * @param {Object} media            The media to schedule.
   * @param {String} caption          The caption to schedule.
   * @param {String} scheduleTime     The time to schedule.
   * @param {Object} selectedAccount  The account to share to.
   * @param {String} shoppableLink    The shoppable link for the media.
   *
   * @return {Promise}
   */
  scheduleMediaToTapshop(media, caption, scheduleTime, selectedAccount, shoppableLink) {
    return this._requestWithLoading(() => this.appAPI.scheduleMediaToTapshop(
      media,
      caption,
      scheduleTime,
      selectedAccount,
      shoppableLink,
    ));
  }
  /**
   * Call the API to make the first media request.
   *
   * @param {QuerySearch} query  The query search to make.
   *
   * @return {Promise}
   */
  searchMedia(query) {
    this._clearBeforeRequest();

    return this._getEntities(query);
  }
  /**
   * Call the API to send media to Facebook Ads Manager.
   *
   * @param {Object} mediaToShare         The media to share to Facebook Ads Manager.
   * @param {Number} selectedAdAccountId  The selected Ad Account Id to share media to.
   *
   * @return {Promise}
   */
  sendMediaToFacebook(mediaToShare, selectedAdAccountId) {
    return this._requestWithLoading(() => this.appAPI.sendMediaToFacebook(
      mediaToShare,
      selectedAdAccountId,
    ));
  }
  /**
   * Call the API to send media to Pinterest.
   *
   * @param {Object} mediaToShare     The media to share to Pinterest.
   * @param {Number} socialAccountId  The social account Id to send the media to.
   * @param {String} selectedBoard    The selected pinterest board to share media to.
   * @param {Object} pin              The pin to create in Pinterest.
   *
   * @return {Promise}
   */
  sendMediaToPinterest(mediaToShare, socialAccountId, selectedBoard, pin) {
    return this._requestWithLoading(() => this.appAPI.sendMediaToPinterest(
      mediaToShare,
      socialAccountId,
      selectedBoard,
      pin,
    ));
  }
  /**
   * Update media tagged streams to reflect new changes.
   *
   * @param {Object} response   Tagging endpoint response, it contains the result of linking or unlinking streams.
   */
  updateTaggedStreams(response) {
    let finalStreams;

    // We loop over processed media
    Object.keys(response.stream_positions).forEach((mediaId) => {
      mediaId = Number(mediaId);

      finalStreams = [];
      // For each media processed we got the final stream ids (after been added or removed)
      response.stream_positions[mediaId].streams.forEach((finalStreamId) => {
        // We get the full stream entity
        finalStreams.push(response.streams.find((streamEntity) => streamEntity.id === finalStreamId));
      });

      // Now, we find the media to apply the stream changes
      const mediaIndex = this.entities.findIndex((entity) => entity.id === mediaId);
      this.entities[mediaIndex].streams = finalStreams;
    });
  }
  /**
   * Perform a request to upload media.
   *
   * @param {Array}   media            The list of media to upload.
   * @param {Array}   streamIds        The list of ids of the streams to be attached to the media.
   * @param {Array}   keywords         The list of keywords to be assigned to the media.
   * @param {Number}  userId           The user id to link to the media.
   * @param {Boolean} skipsModeration  If the media is going through moderation services or not.
   *
   * @return {Promise}
   */
  uploadMedia(media, streamIds, keywords, userId, skipsModeration) {
    return this._requestWithLoading(() => this.appAPI.uploadMedia(
      media,
      streamIds,
      keywords,
      userId,
      skipsModeration,
    ));
  }
  /**
   * Clear the number of selected media and the entities list so the UI get
   * cleared before performing an API request.
   *
   * @access protected
   */
  _clearBeforeRequest() {
    this.selectedMedia = 0;
    this.entities = [];
  }
  /**
   * Whenever the media page gets cleared, we must wait some time for ES to finish indexing,
   * then we must fetch another page (which page is given by the pagination status).
   *
   * @param {QuerySearch} query  The query search to make.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _fetchAnotherPage(query) {
    return this.appUtils.delayedPromise(this.esSyncTime)
    .then(() => {
      this.loading = false;
      let promise;

      if (!this.pagination.prev) {
        promise = this.searchMedia(query);
      } else if (this.pagination.next) {
        promise = this.getNextPage(query);
      } else {
        promise = this.getPreviousPage(query);
      }

      return promise;
    });
  }
  /**
   * Format an API response in order to the get the media list and the pagination object.
   *
   * @param {Object} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    this.pagination = response.metadata.pagination;

    if (this.pagination.from < 1) {
      this.pagination.from = 1;
    }

    return response.data.map((media) => ({
      ...media,
      activations: this._getActivationList(media),
    }));
  }
  /**
   * Provides the list of activations available on the given media base on the {@link ActivationMap}.
   *
   * @param {Object} media  The media to get the activations.
   *
   * @return {Array}
   *
   * @access protected
   */
  _getActivationList(media) {
    return Object.keys(this.activationMap)
    .reduce((acc, key) => {
      const { mediaKey, statuses: availableStatuses } = this.activationMap[key];

      return [
        ...acc,
        media[mediaKey] && availableStatuses[media[mediaKey]],
      ];
    }, [])
    .filter(Boolean);
  }
  /**
   * Call the API to make the request for a media list first page.
   *
   * @param {QuerySearch} query  The query search to make.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest(query) {
    return this.appAPI.searchMedia(query);
  }
  /**
   * Call the API to make the request for the next media page.
   *
   * @param {QuerySearch}       query              The query search to make.
   * @param {MediaSearchParams} mediaSearchParams  The params to add to the search.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeNextPageRequest(query, mediaSearchParams) {
    return this.appAPI.searchMedia(query, mediaSearchParams);
  }
  /**
   * Call the API to make the request for the previous media page.
   *
   * @param {QuerySearch}       query              The query search to make.
   * @param {MediaSearchParams} mediaSearchParams  The params to add to the search.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makePreviousPageRequest(query, mediaSearchParams) {
    return this.appAPI.searchMedia(query, mediaSearchParams);
  }
  /**
   * Remove a media from the list and update the pagination object.
   *
   * @param {Number} mediaId  The id of the media to remove.
   *
   * @access protected
   */
  _removeMedia(mediaId) {
    const index = this.entities.findIndex((item) => item.id === mediaId);

    if (index > -1) {
      this.entities.splice(index, 1);
      this.pagination.to--;
      this.pagination.total--;
    }
  }
}

/**
 * @ngdoc factory
 * @name mediaList
 * @description
 * This object contains a method to create a new instance of the {@link MediaList}.
 *
 * @param {$q}            $q                To reject error responses.
 * @param {AppAPI}        appAPI            To make the API requests.
 * @param {AppUtils}      appUtils          To get the query params from the pagination links.
 * @param {Object}        appConfiguration  To get the ES sync time.
 * @param {ActivationMap} ACTIVATION_MAP    To get the activation upload status.
 *
 * @return {Function}
 *
 * @memberof common
 */
const mediaList = (
  $q,
  appAPI,
  appUtils,
  appConfiguration,
  ACTIVATION_MAP,
) => {
  'ngInject';

  return {
    getNewInstance: () => new MediaList(
      $q,
      appAPI,
      appUtils,
      appConfiguration,
      ACTIVATION_MAP,
    ),
  };
};

export default mediaList;
