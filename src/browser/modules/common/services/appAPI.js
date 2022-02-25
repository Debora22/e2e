import OlapicAPI from '../abstracts/olapicAPI';

/**
 * @ngdoc service
 * @name AppAPI
 * @description
 * This is the "HTTP client" the App uses in order to comunicate with its API.
 *
 * @memberof common
 */
class AppAPI extends OlapicAPI {
  /**
   * @param {$http}     $http             To make all the requests.
   * @param {$q}        $q                To reject error eesponses.
   * @param {Object}    appConfiguration  To get the api configuration.
   * @param {FileSaver} fileSaver         To prompt the user with downloaded files.
   * @param {Moment}    moment            To format the dates.
   */
  constructor(
    $http,
    $q,
    appConfiguration,
    fileSaver,
    moment,
  ) {
    'ngInject';

    super(
      $http,
      $q,
      appConfiguration,
      'api',
    );

    /**
     * The local reference to the `fileSaver` service.
     *
     * @type {FileSaver}
     */
    this.fileSaver = fileSaver;
    /**
     * The local reference to the `moment` service.
     *
     * @type {Moment}
     */
    this.moment = moment;

    /**
     * Regex to get the file extension in a Olapic's media URL.
     *
     * @type {Regex}
     */
    this.FILE_EXT_REGEX = /(\.[0-9a-z]+)(?:\?|$)/i;
  }
  /**
   * Makes a request to cancel a task.
   *
   * @param {String} taskId  The id of the task to be canceled.
   *
   * @return {Promise}
   */
  cancelTask(taskId) {
    const params = { taskId };

    return this.delete(this.endpoint('scheduler.taskById', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to change the status of a collection.
   *
   * @param {Number} collectionId  The id of the collection to change the status.
   * @param {String} status        The status to set to the collection.
   *
   * @return {Promise}
   */
  changeCollectionStatus(collectionId, status) {
    const params = { collectionId };
    const body = { status };

    return this.patch(this.endpoint('collections.byId', params), body)
    .then(this._fetchResponseData);
  }
  /**
   * Change the status of one or several media.
   *
   * @param {Array}  media     The media to change the status.
   * @param {Number} statusId  The status id to set to all media.
   *
   * @return {Promise}
   */
  changeMediaStatus(media, statusId) {
    const mediaChanges = {};

    media.forEach((item) => {
      mediaChanges[item.id] = { status_id: statusId };
    });

    return this.put(
      this.endpoint('media.status'),
      { media: mediaChanges },
    )
    .then((response) => (response.data && response.data.media ? response.data.media : response));
  }
  /**
   * Makes a request to change the position of the streams of a media.
   *
   * @param {Number} mediaId    The media id to which the streams will be changed.
   * @param {Array}  positions  The new stream positions.
   *
   * @return {Promise}
   */
  changeStreamsPositions(mediaId, positions) {
    const query = { mediaId };
    const body = { positions };

    return this.post(this.endpoint('media.streamsPositions', query), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to create a collection.
   *
   * @param {Object} collection  The collection to be created.
   *
   * @return {Promise}
   */
  createCollection(collection) {
    return this.post(this.endpoint('collections.getAll'), collection)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to create a rights message.
   *
   * @param {Object} rightsMessage  The rights message to be created.
   *
   * @return {Promise}
   */
  createRightsMessage(rightsMessage) {
    return this.post(this.endpoint('rights.messages'), rightsMessage)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to create a rights message template.
   *
   * @param {Object} template  The template to be created.
   *
   * @return {Promise}
   */
  createRightsMessageTemplate(template) {
    return this.post(this.endpoint('rights.templates'), template)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to create a sharing document.
   *
   * @param {Array} media  The media to be shared.
   *
   * @return {Promise}
   */
  createSharingDocument(media) {
    const body = {
      mediaList: media,
    };

    return this.post(this.endpoint('sharing.documents'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to create an user.
   *
   * @param {Object} user  The user to create.
   *
   * @return {Promise}
   */
  createUser(user) {
    return this.post(
      this.endpoint('users.getAll'),
      user,
    )
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to bulk delete whitelist users.
   *
   * @param {Array<Number>} deleteUsersIds  The ids of the whitelist users to delete.
   *
   * @return {Promise}
   */
  deleteBulkWhitelistUsers(deleteUsersIds) {
    const body = { deleteUsersIds };

    return this.put(this.endpoint('whitelist.update'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to delete a collection.
   *
   * @param {Number} collectionId  The id of the collection to delete.
   *
   * @return {Promise}
   */
  deleteCollection(collectionId) {
    const params = { collectionId };

    return this.delete(this.endpoint('collections.byId', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to delete a rights message.
   *
   * @param {Number} messageId  The id of the rights message to delete.
   *
   * @return {Promise}
   */
  deleteRightsMessage(messageId) {
    const params = { messageId };

    return this.delete(this.endpoint('rights.messagesById', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to delete a rights template.
   *
   * @param {Number} templateId  The id of the rights template to delete.
   *
   * @return {Promise}
   */
  deleteRightsTemplate(templateId) {
    const params = { templateId };

    return this.delete(this.endpoint('rights.templatesById', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to delete a social account connection.
   *
   * @param {Number} socialConnectionId  The id of the social connection to delete.
   *
   * @return {Promise}
   */
  deleteSocialAccount(socialConnectionId) {
    const params = { socialConnectionId };

    return this.delete(this.endpoint('social.accountsById', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to delete a whitelist user.
   *
   * @param {Number} whitelistUserId  The id of the whitelist user to delete.
   *
   * @return {Promise}
   */
  deleteWhitelistUser(whitelistUserId) {
    const params = {
      whitelistUserId,
    };

    return this.delete(this.endpoint('whitelist.delete', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to download several media in a zip file.
   *
   * @param {Array}  media        The media to download.
   * @param {String} zipFileName  The filename for the result `zip` file. This is the final
   *                              file the user will save.
   *
   * @return {Promise}
   */
  downloadMedia(media, zipFileName = 'media.zip') {
    const body = {
      media: media.map((item) => {
        const user = item.user.username || item.user.name;
        const date = this.moment(item.date_submitted).format(this.formatMaskDate);
        const url = item.video_url || item.images.original;
        const regexResult = this.FILE_EXT_REGEX.exec(url) ||
          this.FILE_EXT_REGEX.exec(item.images.normal);
        const extension = regexResult ? regexResult[1] : '';

        return {
          url,
          name: `${user}_${date}_${item.id}${extension}`,
        };
      }),
    };

    return this.post(
      this.endpoint('media.download'),
      body,
      { responseType: 'arraybuffer' },
    )
    .then((response) => {
      const blob = new Blob([response], { type: 'application/zip' });
      this.fileSaver.saveAs(blob, zipFileName);
    });
  }
  /**
   * Makes a request to edit a collection.
   *
   * @param {Object} collection  The collection to be edited.
   *
   * @return {Promise}
   */
  editCollection(collection) {
    const params = { collectionId: collection.filter.id };

    return this.put(this.endpoint('collections.byId', params), collection)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to edit a rights message.
   *
   * @param {Object} rightsMessage  The rights message to be edited.
   *
   * @return {Promise}
   */
  editRightsMessage(rightsMessage) {
    const params = { messageId: rightsMessage.id };

    return this.put(this.endpoint('rights.messagesById', params), rightsMessage)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to edit a rights message template.
   *
   * @param {Object} template  The template to be edited.
   *
   * @return {Promise}
   */
  editRightsMessageTemplate(template) {
    const params = { templateId: template.id };

    return this.put(this.endpoint('rights.templatesById', params), template)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the list of advocates.
   *
   * @param {String}  conversionInterval  The conversion window.
   * @param {String}  currency            The currency code.
   * @param {Moment}  dateFrom            The start date to display the analytics.
   * @param {Moment}  dateTo              The end date to display the analytics.
   * @param {Boolean} isEnterprise        If the account is enterprise.
   * @param {Boolean} isFocusRevenue      If we are displaying revenue focused analytics.
   *
   * @return {Promise}
   */
  getAdvocates(conversionInterval, currency, dateFrom, dateTo, isEnterprise, isFocusRevenue) {
    const query = this._generateAnalyticsQuery(
      conversionInterval,
      currency,
      dateFrom,
      dateTo,
      isEnterprise,
      isFocusRevenue,
    );

    return this.get(this.endpoint('advocates.getAll', query))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the list of collections.
   *
   * @return {Promise}
   */
  getCollections() {
    return this.get(this.endpoint('collections.getAll'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the dashboard url.
   *
   * @return {Promise}
   */
  getDashboardUrl() {
    return this.get(this.endpoint('zendesk.dashboard'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the Facebook Ads Accounts.
   *
   * @return {Promise}
   */
  getFacebookAdsAccounts() {
    return this.get(this.endpoint('social.adsAccounts'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the Instagram Business Accounts.
   *
   * @return {Promise}
   */
  getInstagramBusinessAccounts() {
    return this.get(this.endpoint('social.instagramBusinessAccounts'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the keywords suggestions.
   *
   * @param {String} phrase  The phrase to search.
   *
   * @return {Promise}
   */
  getKeywordsSuggestions(phrase) {
    const params = { phrase: encodeURIComponent(phrase) };

    return this.get(this.endpoint('keywords.search', params))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the media filters.
   *
   * @param {Object}      aggregations  The aggregations to fetch.
   * @param {QuerySearch} query         The query to make.
   *
   * @return {Promise}
   */
  getMediaFilters(aggregations, query) {
    const body = {
      aggregations,
      filters: query.filters,
      staticFilters: query.staticFilters,
    };

    return this.post(this.endpoint('media.filters'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the media suggestions.
   *
   * @param {String} phrase  The phrase to search.
   *
   * @return {Promise}
   */
  getMediaSuggestions(phrase) {
    const query = { phrase };

    return this.get(this.endpoint('media.suggestions', query))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the list of Pinterest boards.
   *
   * @param {Number} socialAccountId  The social account Id to get the boards from.
   *
   * @return {Promise}
   */
  getPinterestBoards(socialAccountId) {
    const body = { socialAccountId };

    return this.post(this.endpoint('social.pinterestBoards'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the details of a Pinterest pin.
   *
   * @param {Number} pinId            The Id of the Pinterest pin.
   * @param {Number} socialAccountId  The social account Id to get the boards from.
   *
   * @return {Promise}
   */
  getPinterestPin(pinId, socialAccountId) {
    const params = { pinId };
    const body = { socialAccountId };

    return this.post(this.endpoint('social.pinterestPinById', params), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the customer rights messages.
   *
   * @return {Promise}
   */
  getRightsMessages() {
    return this.get(this.endpoint('rights.messages'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the scheduled tasks.
   *
   * @param {Moment} dateFrom  The starting publish date to get tasks from.
   * @param {Moment} dateTo    The lastest publish date to get tasks from.
   *
   * @return {Promise}
   */
  getScheduledTasks(dateFrom, dateTo) {
    const query = {
      from: dateFrom.format(this.formatMaskDate),
      to: dateTo.format(this.formatMaskDate),
    };

    return this.get(this.endpoint('scheduler.scheduledTasks', query))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the customer social accounts (Facebook, Instagram and Twitter accounts).
   *
   * @return {Promise}
   */
  getSocialAccounts() {
    return this.get(this.endpoint('social.accounts'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to get the customer social mentions accounts (business Instagram accounts
   * connected to the Facebook social account).
   *
   * @return {Promise}
   */
  getSocialMentionsAccounts() {
    return this.get(this.endpoint('social.mentionsAccounts'))
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to search for streams.
   *
   * @param {StreamSearchParams} streamSearchParams  The params to add to the search.
   *
   * @return {Promise}
   */
  getStreams(streamSearchParams = {}) {
    return this.get(this.endpoint('streams.search', streamSearchParams));
  }
  /**
   * Makes a request to get the whitelist users list.
   *
   * @param {WhitelistUsersSearchParams} whitelistUsersSearchParams  The params to add to the fetch.
   *
   * @return {Promise}
   */
  getWhitelistUsers(whitelistUsersSearchParams = {}) {
    return this.get(this.endpoint('whitelist.getAll', whitelistUsersSearchParams));
  }
  /**
   * Makes a request to assign metadata to media.
   *
   * @param {Array}  mediaIds  The list of media ids to assign the metadata.
   * @param {Object} metadata  The metadata object to be assigned.
   *
   * @return {Promise}
   */
  putMetadataToMedia(mediaIds, metadata) {
    const body = Object.assign(
      { media: mediaIds },
      metadata,
    );

    return this.put(this.endpoint('media.metadata'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to ask for rights on several media.
   *
   * @param {Number} groupId             The id of the group to use to ask for rights.
   * @param {Number} socialConnectionId  The id of the social connection to use to ask for rights.
   * @param {Array}  media               The media to ask for rights.
   * @param {String} status              The status to set to all media after the rights are given.
   *
   * @return {Promise}
   */
  requestRightsBulk(groupId, socialConnectionId, media, status) {
    const body = {
      groupId,
      socialConnectionId,
      media: media.map((item) => item.id),
      status,
    };

    return this.post(this.endpoint('rights.requestBulk'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to ask for rights on a single media.
   *
   * @param {Number} socialConnectionId  The id of the social connection to use to ask for rights.
   * @param {String} hashtag             The hashtag to use to ask for rights.
   * @param {String} message             The message to use to ask for rights.
   * @param {Array}  media               The media to ask for rights.
   * @param {String} status              The status to set to the media after the rights are given.
   *
   * @return {Promise}
   */
  requestRightsSingle(socialConnectionId, hashtag, message, media, status) {
    const body = {
      socialConnectionId,
      hashtag,
      message,
      media: media.map((item) => item.id),
      status,
    };

    return this.post(this.endpoint('rights.requestSingle'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to reschedule a task.
   *
   * @param {String} taskId  The id of the task to be rescheduled.
   * @param {Moment} date    The date to reschedule the task for.
   *
   * @return {Promise}
   */
  rescheduleTask(taskId, date) {
    const params = { taskId };
    const body = {
      date: `${date.format(this.formatMaskISO)}+0000`,
    };

    return this.put(this.endpoint('scheduler.taskById', params), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to save the customer analytics settings.
   *
   * @param {Object} settings  The analytics settings.
   *
   * @return {Promise}
   */
  saveAnalyticsSettings(settings) {
    return this.put(this.endpoint('settings.analytics'), settings)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to crop/restore the given media.
   *
   * @param {Number}  mediaId   The media id to update.
   * @param {Object}  editData  The crop data to crop the media.
   * @param {Boolean} isEdited  If we are cropping or restoring a media.
   *
   * @return {Promise}
   */
  saveEditedMedia(mediaId, editData, isEdited) {
    const params = { mediaId };
    const body = isEdited ? editData : {};

    return this.post(this.endpoint('media.edit', params), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to add/remove a keyword to the given media.
   *
   * @param {Number}  mediaId   The media id to update.
   * @param {Object}  keyword   The keyword to add or remove.
   * @param {Boolean} isAdding  If we are adding or removing a keyword.
   *
   * @return {Promise}
   */
  saveMediaKeyword(mediaId, keyword, isAdding) {
    const params = { mediaId };
    const body = {
      add: [],
      remove: [],
    };

    if (isAdding) {
      body.add.push(keyword);
    } else {
      body.remove.push(keyword);
    }

    return this.post(this.endpoint('media.keywords', params), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to link or unlink (save or remove) streams.
   *
   * @param {Array}   mediaIds  The media ids to which the streams will be linked/unlinked.
   * @param {Array}   streams   The streams to link/unlink.
   * @param {Boolean} isAdding  If we are adding or removing streams.
   *
   * @return {Promise}
   */
  saveStreams(mediaIds, streams, isAdding) {
    const query = { mediaIds: mediaIds.join(',') };
    // We leave positions [] to append streams
    const body = {
      positions: [],
    };

    if (isAdding) {
      body.link = streams;
    } else {
      body.unlink = streams;
    }

    return this.post(this.endpoint('streams.positions', query), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to create/update a list of whitelist users.
   *
   * @param {Array<String>} whitelistUsers  The list of whitelist users to create/update.
   * @param {String}        source          The source to set to all whitelist users.
   * @param {Array<String>} labels          The list of labels corresponding to a user or a group of users.
   * @param {String}        dateFrom        The from date where the whitelist users are enabled.
   * @param {String}        dateTo          The to date where the whitelist users are enabled.
   *
   * @return {Promise}
   */
  saveWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo) {
    const addWhitelistUsers = whitelistUsers
    .map((whitelistUser) => Object.assign({}, whitelistUser, {
      source,
      labels,
      dateFrom,
      dateTo,
    }));

    return this.put(this.endpoint('whitelist.update'), { addWhitelistUsers })
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to schedule the selected media to Instagram.
   *
   * @param {Object} media            The media to schedule.
   * @param {String} caption          The caption to schedule.
   * @param {Moment} scheduleTime     The time to schedule.
   * @param {Object} selectedAccount  The account to share to.
   *
   * @return {Promise}
   */
  scheduleMediaToInstagram(media, caption, scheduleTime, selectedAccount) {
    const extraData = {
      shoppable_instagram_publish: false,
    };

    return this._scheduleMedia(
      media,
      caption,
      scheduleTime,
      selectedAccount,
      extraData,
    );
  }
  /**
   * Makes a request to schedule the selected media to tapshop.
   *
   * @param {Object} media            The media to schedule.
   * @param {String} caption          The caption to schedule.
   * @param {Moment} scheduleTime     The time to schedule.
   * @param {Object} selectedAccount  The account to share to.
   * @param {String} shoppableLink    The shoppable link for the media.
   *
   * @return {Promise}
   */
  scheduleMediaToTapshop(media, caption, scheduleTime, selectedAccount, shoppableLink) {
    const extraData = {
      shoppable_custom_link: shoppableLink,
      shoppable_instagram_publish: true,
    };

    return this._scheduleMedia(
      media,
      caption,
      scheduleTime,
      selectedAccount,
      extraData,
    );
  }
  /**
   * Makes a request to search media.
   *
   * @param {QuerySearch}       query              The query to make.
   * @param {MediaSearchParams} mediaSearchParams  The params to add to the search.
   *
   * @return {Promise}
   */
  searchMedia(query, mediaSearchParams = {}) {
    const body = {
      filters: query.filters,
      sort: query.sort,
      staticFilters: query.staticFilters,
    };

    return this.post(this.endpoint('media.search', mediaSearchParams), body);
  }
  /**
   * Makes a request to send media to Facebook Ads Manager.
   *
   * @param {Object} mediaToShare  The media to share to Facebook Ads Manager.
   * @param {Number} adAccountId   The selected Ad Account Id to share media to.
   *
   * @return {Promise}
   */
  sendMediaToFacebook(mediaToShare, adAccountId) {
    const body = {
      adAccountId,
      data: mediaToShare.map((medium) => ({
        id: medium.id,
        filename: `${medium.id}`,
        type: medium.video_url ? 'video' : 'image',
        url: medium.video_url ? medium.video_url : medium.images.original,
      })),
    };

    return this.post(this.endpoint('social.adsAccountsAssets'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to send media to Pinterest.
   *
   * @param {Object} mediaToShare     The media to share to Pinterest.
   * @param {Number} socialAccountId  The social account Id to send the media to.
   * @param {Object} selectedBoard    The selected pinterest board to share media to.
   * @param {Object} pin              The pin to create in Pinterest.
   *
   * @return {Promise}
   */
  sendMediaToPinterest(mediaToShare, socialAccountId, selectedBoard, pin) {
    const body = {
      socialAccountId,
      board: {
        id: selectedBoard.id,
        name: selectedBoard.name,
        description: selectedBoard.description,
        privacy: selectedBoard.privacy,
      },
      media: mediaToShare.map((medium) => ({
        id: medium.id,
        filename: `${medium.id}`,
        type: medium.video_url ? 'video' : 'image',
        url: medium.video_url ? medium.video_url : medium.images.original,
        title: pin.title,
        description: pin.description,
      })),
    };

    return this.post(this.endpoint('social.pinterestPins'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to upload media.
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
    const body = {
      userId,
      images: media,
      rights: {
        given: true,
        message: 'Rights given through content uploader',
      },
      source: 'content_uploader',
      stream_ids: streamIds,
      keywords,
      skip: {
        pre_moderation: skipsModeration,
        moderation: false,
      },
    };

    return this.post(this.endpoint('media.upload'), body)
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to validate one or a list of whitelist users.
   *
   * @param {Array<String>} whitelistUsers  The list of whitelist users to validate.
   * @param {String}        source          The source to set to all whitelist users.
   * @param {Array<String>} labels          The list of labels corresponding to a user or a group of users.
   * @param {String}        dateFrom        The from date where the whitelist users are enabled.
   * @param {String}        dateTo          The to date where the whitelist users are enabled.
   *
   * @return {Promise}
   */
  validateWhitelistUsers(whitelistUsers, source, labels, dateFrom, dateTo) {
    const addWhitelistUsers = whitelistUsers
    .map((whitelistUser) => Object.assign(
      {},
      whitelistUser,
      {
        source,
        labels,
        dateFrom,
        dateTo,
      },
    ));

    return this.post(this.endpoint('whitelist.validate'), { addWhitelistUsers })
    .then(this._fetchResponseData);
  }
  /**
   * Makes a request to schedule the selected media.
   *
   * @param {Object} media            The media to schedule.
   * @param {String} caption          The caption to schedule.
   * @param {Moment} scheduleTime     The time to schedule.
   * @param {Object} selectedAccount  The account to share to.
   * @param {Object} extraData        The extra data to schedule.
   *
   * @access protected
   *
   * @return {Promise}
   */
  _scheduleMedia(media, caption, scheduleTime, selectedAccount, extraData) {
    // Format date to fit ISO8601 backend format. Concatenates the utc timezone to avoid issues with 00:00 times.
    const formatedScheduleTime = `${scheduleTime.format(this.formatMaskISO)}+0000`;

    const body = {
      schedule_time: formatedScheduleTime,
      task_type: 'instagram_publish_task',
      extra_data: {
        ...extraData,
        account_id: selectedAccount.id,
        account_name: selectedAccount.username,
        media_id: media.id,
        media_url: media.images.slideshow,
        type: 'image',
        caption,
      },
    };

    return this.post(this.endpoint('scheduler.task'), body)
    .then(this._fetchResponseData);
  }
}

export default AppAPI;
