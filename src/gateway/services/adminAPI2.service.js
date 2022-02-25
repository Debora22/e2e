const { provider } = require('jimpex');
const ObjectUtils = require('wootils/shared/objectUtils');
const statuses = require('statuses');

const { OlapicAPI } = require('../abstracts/olapicAPI.service');

/**
 * The is the service to comunicate with the Admin API2.
 *
 * @extends OlapicAPI
 */
class AdminAPI2 extends OlapicAPI {
  /**
   * @param {Object}             apiConfig            The configuration for the API the client will
   *                                                  make requests to.
   * @param {String}             apiConfig.url        The API entry point.
   * @param {APIClientEndpoints} apiConfig.endpoints  A dictionary of named endpoints relative to
   *                                                  the API entry point.
   * @param {HTTP}               http                 To get the `fetch` function for this service
   *                                                  to use on all the requests.
   * @param {Class}              HTTPError            To format the received errors.
   * @param {String}             genericError         The error to return when no error message can be obtained.
   * @param {Object}             imageServerConfig    The configuration of the ImageServer.
   */
  constructor(
    apiConfig,
    http,
    HTTPError,
    genericError,
    imageServerConfig,
  ) {
    super(apiConfig, http, HTTPError, genericError);

    /**
     * The local reference to the `oneValueFilters` cofig.
     *
     * @type {Array}
     */
    this.oneValueFilters = apiConfig.oneValueFilters;
    /**
     * The local reference to the `imageServerConfig` cofig.
     *
     * @type {Object}
     */
    this.imageServerConfig = imageServerConfig;
    /**
     * The stream base to get the stream image url.
     *
     * @type {Number}
     */
    this.streamBase = 33;
    /**
     * The stream codeset to get the stream image url.
     *
     * @type {String}
     */
    this.streamCodeset = '23456789abcdefghijkmnopqrstuvwxyz';
  }
  /**
   * Makes a request to change the status of a collection.
   *
   * @param {Object} req               The received request.
   * @param {Number} collectionId      The id of the collection to change the status.
   * @param {String} collectionChange  The status change to set to the collection.
   *
   * @return {Promise}
   */
  changeCollectionStatus(req, collectionId, collectionChange) {
    const params = { collectionId };

    return this.patch(
      this.endpoint('collections.byId', params),
      collectionChange,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to change the status of one or several media.
   *
   * @param {Object} req           The received request.
   * @param {Object} mediaChanges  The media changes to make.
   *
   * @return {Promise}
   */
  changeMediaStatus(req, mediaChanges) {
    return this.put(
      this.endpoint('media.status'),
      mediaChanges,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to change the position of the streams of a media.
   *
   * @param {Object} req            The received request.
   * @param {Number} mediaId        The media id to which the streams will be changed.
   * @param {Object} streamsChange  The streams change.
   *
   * @return {Promise}
   */
  changeStreamsPositions(req, mediaId, streamsChange) {
    return this.post(
      this.endpoint('media.streamsPositions.single', { mediaId }),
      streamsChange,
      this._buildRequestOptions(req),
    )
    .then((response) => this._parseStreams(response, true));
  }
  /**
   * Makes a request to create a collection.
   *
   * @param {Object} req         The received request.
   * @param {Object} collection  The collection to be created.
   *
   * @return {Promise}
   */
  createCollection(req, collection) {
    return this.post(
      this.endpoint('collections.getAll'),
      collection,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to create a rights message.
   *
   * @param {Object} req            The received request.
   * @param {Object} rightsMessage  The rights message to be created.
   *
   * @return {Promise}
   */
  createRightsMessage(req, rightsMessage) {
    return this.post(
      this.endpoint('rights.messages'),
      rightsMessage,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to create a rights message template.
   *
   * @param {Object} req       The received request.
   * @param {Object} template  The template to be created.
   *
   * @return {Promise}
   */
  createRightsMessageTemplate(req, template) {
    return this.post(
      this.endpoint('rights.templates'),
      template,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to delete a collection.
   *
   * @param {Object} req           The received request.
   * @param {Number} collectionId  The id of the collection to delete.
   *
   * @return {Promise}
   */
  deleteCollection(req, collectionId) {
    const params = { collectionId };

    return this.delete(
      this.endpoint('collections.byId', params),
      {},
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to delete a rights message.
   *
   * @param {Object} req        The received request.
   * @param {Number} messageId  The id of the rights message to delete.
   *
   * @return {Promise}
   */
  deleteRightsMessage(req, messageId) {
    const params = { messageId };

    return this.delete(
      this.endpoint('rights.messagesById', params),
      {},
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to delete a rights template.
   *
   * @param {Object} req         The received request.
   * @param {Number} templateId  The id of the rights template to delete.
   *
   * @return {Promise}
   */
  deleteRightsTemplate(req, templateId) {
    const params = { templateId };

    return this.delete(
      this.endpoint('rights.templatesById', params),
      {},
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to delete a social account connection.
   *
   * @param {Object} req                 The received request.
   * @param {Number} socialConnectionId  The id of the social connection to delete.
   *
   * @return {Promise}
   */
  deleteSocialAccount(req, socialConnectionId) {
    const params = { socialConnectionId };

    return this.delete(
      this.endpoint('social.accountsById', params),
      {},
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to delete a whitelist user.
   *
   * @param {Object} req              The received request.
   * @param {Number} whitelistUserId  The id of the whitelist user to delete.
   *
   * @return {Promise}
   */
  deleteWhitelistUser(req, whitelistUserId) {
    const params = {
      whitelistUserId,
    };

    return this.delete(
      this.endpoint('whitelist.delete', params),
      {},
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to edit a collection.
   *
   * @param {Object} req           The received request.
   * @param {Number} collectionId  The id of the collection to edit.
   * @param {Object} collection    The collection to be edited.
   *
   * @return {Promise}
   */
  editCollection(req, collectionId, collection) {
    const params = { collectionId };

    return this.put(
      this.endpoint('collections.byId', params),
      collection,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to edit a rights message.
   *
   * @param {Object} req            The received request.
   * @param {Number} messageId      The id of the rights message to edit.
   * @param {Object} rightsMessage  The rights message to be edited.
   *
   * @return {Promise}
   */
  editRightsMessage(req, messageId, rightsMessage) {
    const params = { messageId };

    return this.put(
      this.endpoint('rights.messagesById', params),
      rightsMessage,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to edit a rights message template.
   *
   * @param {Object} req         The received request.
   * @param {Number} templateId  The id of the template to edit.
   * @param {Object} template    The template to be edited.
   *
   * @return {Promise}
   */
  editRightsMessageTemplate(req, templateId, template) {
    const params = { templateId };

    return this.put(
      this.endpoint('rights.templatesById', params),
      template,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the list of collections.
   *
   * @param {Object} req  The received request.
   *
   * @return {Promise}
   */
  getCollections(req) {
    return this.get(
      this.endpoint('collections.getAll'),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the dashboard url.
   *
   * @param {Object} req  The received request.
   *
   * @return {Promise}
   */
  getDashboardUrl(req) {
    return this.get(
      this.endpoint('zendesk.dashboard'),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the keywords suggestions.
   *
   * @param {Object} req     The received request.
   * @param {String} phrase  The phrase to search.
   *
   * @return {Promise}
   */
  getKeywordsSuggestions(req, phrase) {
    const params = { phrase: encodeURIComponent(phrase) };

    return this.get(
      this.endpoint('keywords.search', params),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the media filters.
   *
   * @param {Object}      req    The received request.
   * @param {QuerySearch} query  The query to make.
   *
   * @return {Promise}
   */
  getMediaFilters(req, query) {
    const body = {
      aggs: query.aggregations,
      filters: this._parseFilters(query.filters),
      staticFilters: query.staticFilters,
    };

    // Remove the discarded filter because it is not supported by the BE and it will return an error otherwise.
    if (body.filters.discarded) {
      delete query.filters.discarded;
    }

    return this.post(
      this.endpoint('media.filters'),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the media streams positions.
   *
   * @param {Object} req       The received request.
   * @param {Array}  mediaIds  The list of media ids to get the streams positions.
   *
   * @return {Promise}
   */
  getMediaStreamsPositions(req, mediaIds) {
    const query = {
      media_ids: mediaIds.join(','),
    };

    return this.get(
      this.endpoint('media.streamsPositions.bulk', query),
      this._buildRequestOptions(req),
    )
    .then((response) => this._parseStreams(response));
  }
  /**
   * Makes a request to get the media suggestions.
   *
   * @param {Object} req     The received request.
   * @param {String} phrase  The phrase to search.
   *
   * @return {Promise}
   */
  getMediaSuggestions(req, phrase) {
    const query = { phrase };

    return this.get(
      this.endpoint('media.suggestions', query),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the customer rights messages.
   *
   * @param {Object} req  The received request.
   *
   * @return {Promise}
   */
  getRightsMessages(req) {
    return this.get(
      this.endpoint('rights.get'),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to get the customer social accounts (Facebook, Instagram and Twitter accounts).
   *
   * @param {Object} req  The received request.
   *
   * @return {Promise}
   */
  getSocialAccounts(req) {
    return this.get(
      this.endpoint('social.accounts'),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Use the Admin API2 to get the customer social mentions accounts (business Instagram accounts
   * connected to the Facebook social account).
   *
   * @param {Object} req  The received request.
   *
   * @return {Promise}
   */
  getSocialMentionsAccounts(req) {
    return this.get(
      this.endpoint('social.mentionsAccounts'),
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to search for streams.
   *
   * @param {Object}             req                 The received request.
   * @param {StreamSearchParams} streamSearchParams  The params to add to the search.
   *
   * @return {Promise}
   */
  getStreams(req, streamSearchParams) {
    const query = {
      items_per_page: streamSearchParams.itemsPerPage,
      page_number: streamSearchParams.pageNumber,
      pagination_key: streamSearchParams.paginationKey,
      phrase: streamSearchParams.phrase,
    };

    return this.get(
      this.endpoint('streams.search', query),
      this._buildRequestOptions(req),
    )
    .then((response) => {
      response.pagination = this._proccesPagination(response.pagination);

      return this._parseStreams(response);
    })
    .catch((error) => this._generateNotFoundResponse(
      error,
      { streams: [] },
    ));
  }
  /**
   * Makes a request to get the whitelist Users list.
   *
   * @param {Object}  req                The received request.
   * @param {Number}  itemsPerPage       The amount of items per request.
   * @param {Number}  pageNumber         The page number to fetch.
   * @param {String}  search             The search to apply to the fetch.
   * @param {String}  criteria           The criteria to search by.
   * @param {String}  sortBy             Sorting type of the fetch.
   * @param {String}  sortOrder          The order of the items to fetch.
   * @param {String}  status             The status of the items to fetch.
   * @param {Boolean} labelPartialMatch  If a strict label fetch is being made.
   *
   * @return {Promise}
   */
  getWhitelistUsers(req, itemsPerPage, pageNumber, search, criteria, sortBy, sortOrder, status, labelPartialMatch) {
    const query = {
      items_per_page: itemsPerPage,
      label_partial_match: labelPartialMatch,
      page_number: pageNumber,
      sort_by: sortBy,
      sort_order: sortOrder,
      status,
    };

    if (search && criteria) {
      query[criteria] = search;
    }

    return this.get(
      this.endpoint('whitelist.getAll', query),
      this._buildRequestOptions(req),
    )
    .then((response) => {
      response.users_whitelist = response.users_whitelist
      .map((user) => ObjectUtils.snakeToLowerCamelKeys(user, ['date_from', 'date_to']));

      // Replace the pagination links with camelcase variables; and the criteria and search params.
      response.pagination.links = this._proccesPagination(
        response.pagination.links,
        (link) => decodeURIComponent(link).replace(
          /(username|label)=([#\w]+)/,
          'criteria=$1&search=$2',
        ),
      );

      return response;
    })
    .catch((error) => this._generateNotFoundResponse(
      error,
      { users_whitelist: [] },
    ));
  }
  /**
   * Makes a request to assign metadata to media.
   *
   * @param {Object} req           The received request.
   * @param {Object} mediaChanges  The metadata media changes to make.
   *
   * @return {Promise}
   */
  putMetadataToMedia(req, mediaChanges) {
    return this.put(
      this.endpoint('media.metadata'),
      mediaChanges,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to ask for rights on several media.
   *
   * @param {Object} req                The received request.
   * @param {Object} bulkRightsRequest  The rights request for several media.
   *
   * @return {Promise}
   */
  requestRightsBulk(req, bulkRightsRequest) {
    const body = {
      group_id: bulkRightsRequest.groupId,
      social_connection_id: bulkRightsRequest.socialConnectionId,
      media: bulkRightsRequest.media.map((mediaId) => ({
        id: mediaId,
        next_status: bulkRightsRequest.status,
      })),
    };

    return this.post(
      this.endpoint('rights.requestBulk'),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to ask for rights on a single media.
   *
   * @param {Object} req                  The received request.
   * @param {Object} singleRightsRequest  The rights request for a single media.
   *
   * @return {Promise}
   */
  requestRightsSingle(req, singleRightsRequest) {
    const body = {
      social_connection_id: singleRightsRequest.socialConnectionId,
      hashtag: singleRightsRequest.hashtag,
      message: singleRightsRequest.message,
      media: singleRightsRequest.media.map((mediaId) => ({
        id: mediaId,
        next_status: singleRightsRequest.status,
      })),
    };

    return this.post(
      this.endpoint('rights.requestSingle'),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to save the customer analytics settings.
   *
   * @param {Object} req       The received request.
   * @param {Object} settings  The analytics settings.
   *
   * @return {Promise}
   */
  saveAnalyticsSettings(req, settings) {
    const body = ObjectUtils.lowerCamelToSnakeKeys(
      settings,
      [
        'currencyInfo',
        'customQueryString',
        'socialTrackingVarsFacebook',
        'socialTrackingVarsTwitter',
        'socialTrackingVarsPinterest',
      ],
    );

    return this.put(
      this.endpoint('settings.analytics'),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to crop/restore the given media.
   *
   * @param {Object} req       The received request.
   * @param {Number} mediaId   The media id to update.
   * @param {Object} editData  The crop data to crop the media.
   *
   * @return {Promise}
   */
  saveEditedMedia(req, mediaId, editData) {
    const params = { mediaId };

    return this.put(
      this.endpoint('media.edit', params),
      editData,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to add/remove keywords to the given media.
   *
   * @param {Object} req              The received request.
   * @param {Number} mediaId          The media id to update.
   * @param {Object} keywords         The keywords to update.
   * @param {Array}  keywords.add     The list of keywords to add.
   * @param {Array}  keywords.remove  The list of keywords to remove.
   *
   * @return {Promise}
   */
  saveMediaKeywords(req, mediaId, keywords) {
    const params = { mediaId };
    const body = { keywords };

    return this.post(
      this.endpoint('media.keywords', params),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to link or unlink streams.
   *
   * @param {Object} req            The received request.
   * @param {Array}  mediaIds       The media ids to which the streams will be changed.
   * @param {Object} streamsChange  The streams change.
   *
   * @return {Promise}
   */
  saveStreams(req, mediaIds, streamsChange) {
    return this.post(
      this.endpoint('media.streamsPositions.bulk', { media_ids: mediaIds }),
      streamsChange,
      this._buildRequestOptions(req),
    )
    .then((response) => this._parseStreams(response, true));
  }
  /**
   * Makes a request to search media.
   * If the discarded filter exist in the query filter, then we need to
   * search in the `media.discarded` endpoint (fetching discarder media only).
   * If not then we need to search in the `media.search` endpoint.
   *
   * @param {Object}            req                The received request.
   * @param {QuerySearch}       query              The query to make.
   * @param {MediaSearchParams} mediaSearchParams  The params to add to the search.
   *
   * @return {Promise}
   */
  searchMedia(req, query, mediaSearchParams = {}) {
    let endpoint;
    query.filters = this._parseFilters(query.filters);

    if (query.filters.discarded) {
      endpoint = 'media.discarded';

      // Remove the discarded filter because it is not supported by the BE and it will return an error otherwise.
      delete query.filters.discarded;
    } else {
      endpoint = 'media.search';
    }

    return this.post(
      this.endpoint(endpoint, mediaSearchParams),
      query,
      this._buildRequestOptions(req),
    )
    .then((response) => {
      if (response.streams) {
        this._parseStreams(response, false);
      }

      return response;
    });
  }
  /**
   * Makes a request to create/update or delete a list of whitelist users.
   *
   * @param {Object} req                The received request.
   * @param {Array}  addWhitelistUsers  The list of whitelist users to create/update.
   * @param {Array}  deleteUsersIds     The list of users id to delete.
   *
   * @return {Promise}
   */
  updateWhitelistUsers(req, addWhitelistUsers, deleteUsersIds) {
    const body = {};

    if (addWhitelistUsers) {
      body.users_whitelist_to_add = addWhitelistUsers.map((user) => (
        ObjectUtils.lowerCamelToSnakeKeys(user, ['dateFrom', 'dateTo'])
      ));
    }

    if (deleteUsersIds) {
      body.user_whitelist_ids_to_delete = deleteUsersIds;
    }

    return this.put(
      this.endpoint('whitelist.update'),
      body,
      this._buildRequestOptions(req),
    );
  }
  /**
   * Makes a request to validate a list of whitelist users prior to final submit.
   *
   * @param {Object} req                The received request.
   * @param {Array}  addWhitelistUsers  The list of whitelist users to validate.
   *
   * @return {Promise}
   */
  validateWhitelistUsers(req, addWhitelistUsers) {
    const body = {
      users_whitelist_to_add: addWhitelistUsers.map((user) => (
        ObjectUtils.lowerCamelToSnakeKeys(user, ['dateFrom', 'dateTo'])
      )),
    };

    return this.post(
      this.endpoint('whitelist.validate'),
      body,
      this._buildRequestOptions(req),
    )
    .then((response) => ObjectUtils.snakeToLowerCamelKeys(response, ['users_to_update']));
  }
  /**
   * From a not found error response, generate an empty response object and return it.
   *
   * @param {Error}  error     The response error.
   * @param {Object} response  The empty reponse to return.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _generateNotFoundResponse(error, response = {}) {
    return (
      error instanceof this._HTTPError &&
      error.status === statuses['not found']
    ) ?
      Object.assign({ pagination: { total: 0 } }, response) :
      Promise.reject(error);
  }
  /**
   * Given a stream and the configuration of the ImageServer get the stream image url.
   *
   * @param {Object} stream  The stream to get the image.
   *
   * @return {String}
   *
   * @access protected
   */
  _getStreamImageUrl(stream) {
    let number = Number(stream.base_media.id);
    let key = '';

    while (number > 0) {
      key += this.streamCodeset[number % this.streamBase];
      number = Math.floor(number / this.streamBase);
    }

    return key.length ?
      `${this.imageServerConfig.url}/${key[0]}/${key[1]}/${key[2]}/${key}/normal.jpg` :
      '';
  }
  /**
   * Parse the filters before sending it to the BE.
   *
   * @param {Object} filters  The filters to parse.
   *
   * @return {Object}
   *
   * @access protected
   */
  _parseFilters(filters = {}) {
    Object.keys(filters).forEach((key) => {
      if (this.oneValueFilters.includes(key)) {
        // If the key is rights_whitelisted then the values is a always the same.
        if (key === 'rights_whitelisted') {
          filters[key] = { values: true };
        } else {
          const { values } = filters[key];
          filters[key] = { values: values[0] };
        }
      }
    });

    return filters;
  }
  /**
   * Parse the streams of a BE reponse and add the image url to a list of streams.
   *
   * @param {Object}  response  The response containing the streams.
   * @param {Boolean} toArray   If we should transform the streams into an array.
   *
   * @return {Object}
   *
   * @access protected
   */
  _parseStreams(response, toArray) {
    const streamsArray = [];

    // Generate the image for all the streams.
    Object.keys(response.streams).forEach((streamId) => {
      const stream = response.streams[streamId];
      stream.image = this._getStreamImageUrl(stream);
      streamsArray.push(stream);
    });

    if (toArray) {
      response.streams = streamsArray;
    }

    return response;
  }
  /**
   * Replace the pagination links with camelcase variables.
   *
   * @param {Object}   pagination  The pagination links to procces.
   * @param {Function} fn          Custom fn to execute on each link.
   *
   * @return {Object}
   *
   * @access protected
   */
  _proccesPagination(pagination, fn = (link) => link) {
    ['next', 'prev', 'self'].forEach((key) => {
      const link = pagination[key];

      if (link) {
        pagination[key] = fn(link)
        .replace(
          /_(\w)/g,
          (fullMatch, letter) => letter.toUpperCase(),
        );
      }
    });

    return pagination;
  }
}

/**
 * This is the provider for the Admin API2 service.
 *
 * @type {Provider}
 */
const adminAPI2 = provider((app) => {
  const appConfiguration = app.get('appConfiguration');

  app.set('adminAPI2', () => new AdminAPI2(
    appConfiguration.get('adminAPI2Server'),
    app.get('http'),
    app.get('HTTPError'),
    appConfiguration.get('genericError'),
    appConfiguration.get('imageServer'),
  ));
});

module.exports = {
  AdminAPI2,
  adminAPI2,
};
