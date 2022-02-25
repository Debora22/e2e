import EntitiesList from '../../common/abstracts/entitiesList';

/**
 * @ngdoc class
 * @name CollectionsList
 * @description
 * This service is used to get the customer collections.
 *
 * @memberof collections
 */
class CollectionsList extends EntitiesList {
  /**
   * @param {$filter} $filter                     To filter the collections list.
   * @param {$q}      $q                          To reject error responses.
   * @param {AppAPI}  appAPI                      To make the API requests.
   * @param {Object}  appConfiguration            To get the hashtag limit.
   * @param {Extend}  extend                      To merge the contents of two collections.
   * @param {Object}  COLLECTIONS_BASE_TYPES      To get the base types configuration.
   * @param {Object}  COLLECTIONS_PROFILE         To get the profile collection.
   * @param {Object}  COLLECTIONS_RULE_OPERATORS  To get the rule operators configuration.
   * @param {Object}  COLLECTIONS_RULE_TYPES      To get the rule types configuration.
   */
  constructor(
    $filter,
    $q,
    appAPI,
    appConfiguration,
    extend,
    COLLECTIONS_BASE_TYPES,
    COLLECTIONS_PROFILE,
    COLLECTIONS_RULE_OPERATORS,
    COLLECTIONS_RULE_TYPES,
  ) {
    super($q);

    /**
     * The local reference to the `$filter` service.
     *
     * @type {$filter}
     */
    this.$filter = $filter;
    /**
     * The local reference to the `appAPI` service.
     *
     * @type {AppAPI}
     */
    this.appAPI = appAPI;
    /**
     * The local reference to the `extend` service.
     *
     * @type {Extend}
     */
    this.extend = extend;
    /**
     * The local reference to the `COLLECTIONS_BASE_TYPES` constant.
     *
     * @type {Object}
     */
    this.COLLECTIONS_BASE_TYPES = COLLECTIONS_BASE_TYPES;
    /**
     * The local reference to the `COLLECTIONS_PROFILE` constant.
     *
     * @type {Object}
     */
    this.COLLECTIONS_PROFILE = COLLECTIONS_PROFILE;
    /**
     * The local reference to the `COLLECTIONS_RULE_OPERATORS` constant.
     *
     * @type {Object}
     */
    this.COLLECTIONS_RULE_OPERATORS = COLLECTIONS_RULE_OPERATORS;
    /**
     * The local reference to the `COLLECTIONS_RULE_TYPES` constant.
     *
     * @type {Object}
     */
    this.COLLECTIONS_RULE_TYPES = COLLECTIONS_RULE_TYPES;
    /**
     * The local reference to the `hashtagLimit` constant.
     *
     * @type {Number}
     */
    this.hashtagLimit = appConfiguration.collections.hashtagLimit;
    /**
     * The collection list.
     *
     * @type {Array}
     */
    this.collections = [];
    /**
     * The amount of collection per page the list will load and show.
     *
     * @type {Object}
     */
    this.pageSize = 20;
    /**
     * The pagination information.
     *
     * @type {Object}
     */
    this.pagination = {
      from: 0,
      to: 0,
      total: 0,
      next: false,
      prev: false,
    };
    /**
     * The collection template to use when preparing a collection for edit.
     *
     * @type {Object}
     */
    this.collectionTemplate = {
      id: 0,
      name: '',
      phrase: '',
      mediaType: 'photos',
      base: {
        type: null,
        data: {
          value: '',
          mention: null,
        },
      },
      mediaTypes: {
        image: true,
        video: false,
      },
      rules: [],
      streams: [],
      skipModeration: true,
    };
    /**
     * The collection template to use when preparing a collection to save.
     *
     * @type {Object}
     */
    this.collectionSaveTemplate = {
      name: '',
      phrase: '',
      base: {
        type: null,
        data: {},
      },
      filter: {
        id: 0,
        operators: [],
        streams: [],
      },
      actions: [],
    };
    /**
     * The text to search collections for.
     *
     * @type {String}
     */
    this.search = '';
    /**
     * The sort to order the collections with.
     *
     * @type {Object}
     */
    this.selectedSort = {};
    /**
     * The status to filter the collections with.
     *
     * @type {Object}
     */
    this.selectedStatusFilter = {};
    /**
     * The collection that is being created or edited.
     *
     * @type {Object}
     */
    this.collection = {};
    /**
     * The map of available media types.
     *
     * @type {Object}
     */
    this.mediaTypes = {
      image: 'photos',
      video: 'videos',
    };

    // Set the pagination type as `page`.
    this._setPaginationAsPage();
  }
  /**
   * Call the API to change the status of a collection.
   *
   * @param {Number} collectionId  The id of the collection to change the status.
   * @param {String} status        The status to set to the collection.
   *
   * @return {Promise}
   */
  changeCollectionStatus(collectionId, status) {
    return this._requestWithLoading(() => (
      this.appAPI.changeCollectionStatus(collectionId, status)
      .then((editedCollection) => {
        this._mergeEditedCollection(editedCollection);
      })
    ));
  }
  /**
   * Delete a collection.
   *
   * @param {Number} collectionId  The id of the collection to delete.
   *
   * @return {Promise}
   */
  deleteCollection(collectionId) {
    return this._requestWithLoading(() => (
      this.appAPI.deleteCollection(collectionId)
      .then(() => {
        const index = this.entities.findIndex((collection) => collection.filter.id === collectionId);

        if (index > -1) {
          this.entities.splice(index, 1);

          // If the pagination from is bigger than the entities list, move the page one back.
          const from = this.pagination.from > this.entities.length ?
            this.pagination.from - this.pageSize :
            this.pagination.from;

          this.refreshCollectionsList(from);
        }
      })
    ));
  }
  /**
   * Delete a profile collection.
   *
   * @param {Number} collectionId  The id of the profile collection to delete.
   *
   * @return {Promise}
   */
  deleteProfileCollection(collectionId) {
    return this._requestWithLoading(() => (
      this.appAPI.deleteCollection(collectionId)
      .then(() => {
        const index = this.entities.findIndex((entity) => entity.filter.id === collectionId);

        if (index > -1) {
          // Remove the deleted profile collection and add the default one.
          this.entities.splice(index, 1);
          this.entities.push(angular.copy(this.COLLECTIONS_PROFILE));
          this.refreshCollectionsList(this.pagination.from);
        }
      })
    ));
  }
  /**
   * Based on the collection base, rules and streams generate the phrase text.
   * First, we generate the phrase from the collection base.
   * Then, we generate the phrase from the rules.
   * Finally, we generate the phrase from the streams.
   * Example: Collect media from mention and tag @olapicqa2 including #olapic and assign to stream Stream Skipping test.
   */
  generatePhrase() {
    let phrase = '';

    const baseType = this.collection.base.type || {};
    const baseValue = baseType.id === 'mention' ?
      this.collection.base.data.mention && this.collection.base.data.mention.id :
      this.collection.base.data.value;

    // Only add the base if it has a selected type and a value.
    if (baseType.id && baseValue) {
      const parsedValue = this._parseCollectionValue(baseType.symbol, baseValue);

      phrase += `${baseType.phrase} <strong>${parsedValue}</strong>`;
    }

    // Get the rules to add to the phrase.
    const rulesToAdd = this.collection.rules
    .filter((rule) => rule.operator && rule.type && rule.value && !rule.error)
    .map((rule) => {
      const parsedValue = this._parseCollectionValue(rule.type.symbol, rule.value);
      return ` ${rule.operator.name} ${rule.type.phrase}<strong>${parsedValue}</strong>`;
    });
    const rulesCount = rulesToAdd.length;
    phrase += this._getPhraseOfList(rulesToAdd);

    // Get the streams to add to the phrase.
    const streamsToAdd = this.collection.streams
    .filter((stream) => stream.id)
    .map((stream) => ` <strong class="italic">${stream.name}</strong>`);

    if (streamsToAdd.length) {
      // Prepend a ; if two or more rules were appendend.
      if (rulesCount > 1) {
        phrase += ';';
      }

      const streamText = streamsToAdd.length > 1 ? 'streams' : 'stream';
      phrase += ` and assign to ${streamText}`;

      phrase += this._getPhraseOfList(streamsToAdd);
    }

    const types = Object.keys(this.collection.mediaTypes).filter((key) => this.collection.mediaTypes[key]);
    this.collection.mediaType = types.length > 1 ? 'photos and videos' : this.mediaTypes[types[0]];
    this.collection.phrase = phrase ? `Collect ${this.collection.mediaType} ${phrase}` : '';
  }
  /**
   * Call the API to make the collections request.
   *
   * @return {Promise}
   */
  getCollections() {
    this._clearBeforeRequest();

    return this._getEntities()
    .then(() => {
      this.refreshCollectionsList();
    });
  }
  /**
   * Get the next page of collections.
   */
  getNextPage() {
    if (!this.pagination.next) {
      throw new Error('Unable to fetch the next page');
    }

    const from = this.pagination.from + this.pageSize;
    this.refreshCollectionsList(from);
  }
  /**
   * Get the previous page of collections.
   */
  getPreviousPage() {
    if (!this.pagination.prev) {
      throw new Error('Unable to fetch the previous page');
    }

    const from = this.pagination.from - this.pageSize;
    this.refreshCollectionsList(from);
  }
  /**
   * Parse a collection and prepare it to be edited in the form.
   *
   * @param {Object} collection  The collection to prepare.
   */
  prepareCollectionForEdit(collection) {
    this.collection = angular.copy(this.collectionTemplate);

    if (collection) {
      this.collection.id = collection.filter.id;
      this.collection.name = collection.name;
      this.collection.phrase = collection.phrase;

      const baseType = this.COLLECTIONS_BASE_TYPES[collection.base.type];
      this.collection.base.type = baseType;
      this.collection.base.data.value = baseType.symbol + collection.base.data[baseType.data];

      // Set the mention id
      if (this.collection.base.type.id === 'mention') {
        this.collection.base.data.mention = {
          id: this.collection.base.data.value,
        };
      }

      // Adjust the base value to the maxlength allowed
      this.collection.base.data.value = this.collection.base.data.value.substring(0, baseType.maxlength);

      // Process rules
      this.collection.rules = collection.filter.operators
      .filter((rule) => {
        if (rule.type === 'media_type') {
          Object.keys(this.collection.mediaTypes).forEach((type) => {
            this.collection.mediaTypes[type] = rule.data.types.includes(type);
          });
          return false;
        }

        const ruleType = this.COLLECTIONS_RULE_TYPES[rule.type];
        const ruleValue = ruleType.symbol + rule.data[ruleType.data];

        return baseType.id !== rule.type || this.collection.base.data.value !== ruleValue;
      })
      .map((rule) => {
        const ruleOperator = this.COLLECTIONS_RULE_OPERATORS[rule.name];
        const ruleType = this.COLLECTIONS_RULE_TYPES[rule.type];
        let ruleValue = ruleType.symbol + rule.data[ruleType.data];

        // Adjust the value to the maxlength allowed
        ruleValue = ruleValue.substring(0, ruleType.maxlength);

        return {
          operator: ruleOperator,
          type: ruleType,
          value: ruleValue,
        };
      });

      // Process streams
      this.collection.streams = collection.filter.streams
      .filter((stream) => stream.id)
      .map((stream) => ({
        id: stream.id,
        name: stream.name,
        backName: stream.name,
      }));

      // Process destination - If it has any action set the skipModeration in true
      this.collection.skipModeration = collection.actions && collection.actions.length > 0;
    }
  }
  /**
   * Generate the collection list, by first filtering using the search text.
   * Then, we order the list with the selected sort.
   * Then, we generate the pagination object.
   * Finally we filter the list according to the page size and the starting point.
   *
   * @param {Number} from  The starting point to set the pagination to.
   */
  refreshCollectionsList(from = 1) {
    // First filter the collections entities with the search text not using strict comparison.
    let list = this.$filter('filter')(
      this.entities,
      { q: this.search },
    );

    // Then filter the list with the status filter using strict comparison.
    list = this.$filter('filter')(
      list,
      { status: this.selectedStatusFilter.status },
      true,
    );

    this.collections = this.$filter('orderBy')(
      list,
      this.selectedSort.field,
      !this.selectedSort.asc,
    );

    const to = Math.min((from + this.pageSize) - 1, this.collections.length);
    this.pagination = {
      from,
      to,
      total: this.collections.length,
      next: to !== this.collections.length,
      prev: from !== 1,
    };

    this.collections = this.$filter('limitTo')(
      this.collections,
      this.pageSize,
      from - 1,
    );
  }
  /**
   * Call the API to create or edit a collection.
   *
   * @param {Object} collection  The collection to create or edit.
   *
   * @return {Promise}
   */
  saveCollection(collection) {
    return this._requestWithLoading(() => {
      const collectionToSave = this._prepareCollectionToSave(collection);
      let result;

      if (collectionToSave.filter.id) {
        result = this.appAPI.editCollection(collectionToSave)
        .then((editedCollection) => {
          this._mergeEditedCollection(editedCollection);
        });
      } else {
        result = this.appAPI.createCollection(collectionToSave)
        .then((newCollection) => {
          newCollection.q = `${newCollection.name} ${newCollection.phrase}`;
          this.entities.push(newCollection);
          this.refreshCollectionsList(this.pagination.from);

          return newCollection;
        });
      }

      return result;
    });
  }
  /**
   * Call the API to save a profile collection.
   *
   * @param {Object} collection  The profile collection to save.
   *
   * @return {Promise}
   */
  saveProfileCollection(collection) {
    return this._requestWithLoading(() => (
      this.appAPI.createCollection(collection)
      .then((createdCollection) => {
        const collectionSaved = this.entities.find((entity) => entity.filter.id === collection.filter.id);

        if (collectionSaved) {
          this.extend(true, collectionSaved, createdCollection);
          this.refreshCollectionsList(this.pagination.from);
        }
      })
    ));
  }
  /**
   * Validate if the name of a collection already exist in the list of entities.
   *
   * @param {Object} collection  The collection to validate.
   *
   * @return {Boolean}
   */
  validateCollectionName(collection) {
    const existCollectionSameName = this.entities.some((entity) => (
      collection.id !== entity.filter.id &&
      collection.name.toLowerCase() === entity.name.toLowerCase()
    ));

    return !existCollectionSameName;
  }
  /**
   * Validate if we are within the limit of hashtag collections allowed to be created.
   *
   * @param {Object} collection  The collection to validate.
   *
   * @return {Boolean}
   */
  validateHashtagLimit(collection) {
    let withinLimit = true;
    const hashtagType = 'hashtag';

    if (
      !collection.id &&
      collection.base.type &&
      collection.base.type.id === hashtagType
    ) {
      const totalOfHashtags = this.entities.filter((entity) => entity.base.type === hashtagType).length;
      withinLimit = this.hashtagLimit > totalOfHashtags;
    }

    return withinLimit;
  }
  /**
   * Clear the entities list so the UI get cleared before performing an API request.
   *
   * @access protected
   */
  _clearBeforeRequest() {
    this.collections = [];
  }
  /**
   * Format an API response in order to the get the collections list.
   *
   * @param {Array} response  The response to format.
   *
   * @return {Array}
   *
   * @access protected
   */
  _formatResponse(response) {
    let existProfileCollection = false;
    const collections = response.map((collection) => {
      if (collection.base.type !== 'profile') {
        this.prepareCollectionForEdit(collection);
        this.generatePhrase();
        collection.phrase = this.collection.phrase;
      }
      collection.q = `${collection.name} ${collection.phrase}`;

      existProfileCollection = existProfileCollection || collection.base.type === 'profile';

      return collection;
    });

    // If the profile collection does not exist, add the default one.
    if (!existProfileCollection) {
      collections.push(angular.copy(this.COLLECTIONS_PROFILE));
    }

    return collections;
  }
  /**
   * Generate a phrase of a several items on a list.
   *
   * @param {Array} list  The list of items to generate the phrase from.
   *
   * @return {String}
   *
   * @access protected
   */
  _getPhraseOfList(list) {
    // If we have more than 1 item remove the last one to join in the phrase with a 'and'.
    const itemToAddAnd = list.length > 1 ? list.pop() : null;

    // Add the items to the phrase.
    let phrase = list.join(',');
    if (itemToAddAnd) {
      phrase += ` and ${itemToAddAnd}`;
    }

    return phrase;
  }
  /**
   * Call the API to make the request for the collections list.
   *
   * @return {Promise}
   *
   * @access protected
   */
  _makeFirstRequest() {
    return this.appAPI.getCollections();
  }
  /**
   * Merge an edited collection into the list of entities.
   *
   * @param {Object} editedCollection  The collection to merge.
   *
   * @access protected
   */
  _mergeEditedCollection(editedCollection) {
    const collectionToMerge = this.entities.find((collection) => collection.filter.id === editedCollection.filter.id);

    if (collectionToMerge) {
      // Delete the collection arrays.
      delete collectionToMerge.actions;
      delete collectionToMerge.filter.operators;
      delete collectionToMerge.filter.streams;
      this.extend(true, collectionToMerge, editedCollection);
      this.refreshCollectionsList(this.pagination.from);
    }
  }
  /**
   * Parse a collection value.
   *
   * @param {String} symbol  The symbol value.
   * @param {String} value   The collection value.
   *
   * @return {String}
   *
   * @access protected
   */
  _parseCollectionValue(symbol, value) {
    // If the symbol is the first char return only the value
    return value.charAt(0) === symbol ? value : symbol + value;
  }
  /**
   * Parse a collection and prepare it to be saved.
   *
   * @param {Object} collection  The collection to prepare.
   *
   * @return {Object}
   *
   * @access protected
   */
  _prepareCollectionToSave(collection) {
    const collectionToSave = angular.copy(this.collectionSaveTemplate);
    const baseType = collection.base.type;

    collectionToSave.name = collection.name;
    collectionToSave.phrase = collection.phrase;
    collectionToSave.base.type = baseType.id;
    collectionToSave.filter.id = collection.id;

    // Set the base value.
    collectionToSave.base.data[baseType.data] = collection.base.data.value;
    if (baseType.id === 'handler') {
      collectionToSave.base.data.social_networks = ['twitter'];
    }
    if (baseType.id === 'mention') {
      collectionToSave.base.data[collection.base.type.data] = collection.base.data.mention.id;
      collectionToSave.base.data.social_networks = ['instagram'];
    }

    // Set the base as a filter.
    const baseFilter = {
      name: 'with',
      type: baseType.id,
      data: {},
    };
    baseFilter.data[baseType.data] = collectionToSave.base.data[baseType.data];
    collectionToSave.filter.operators.push(baseFilter);

    // Set the media type as a filter.
    const types = Object.keys(collection.mediaTypes).filter((key) => collection.mediaTypes[key]);
    collectionToSave.filter.operators.push({
      name: 'with',
      type: 'media',
      data: { types },
    });

    // Process rules.
    collectionToSave.filter.operators = collectionToSave.filter.operators.concat((
      collection.rules
      .filter((rule) => rule.operator && rule.type && rule.value && !rule.error)
      .map((rule) => {
        const filter = {
          name: rule.operator.id,
          type: rule.type.id,
          data: {},
        };
        filter.data[rule.type.data] = rule.value;

        return filter;
      })
    ));

    // Process streams.
    collectionToSave.filter.streams = collection.streams
    .filter((stream) => stream.id)
    .map((stream) => stream.id);

    // Process destination.
    if (collection.skipModeration) {
      collectionToSave.actions.push({
        name: 'skipSteps',
        inputs: { steps: ['pre_moderation'] },
      });
    }

    // Remove the base when editing a collection.
    if (collection.id) {
      delete collectionToSave.base;
    }

    return collectionToSave;
  }
}

/**
 * @ngdoc factory
 * @name collectionsList
 * @description
 * This object contains a method to create a new instance of the {@link CollectionsList}.
 *
 * @param {$filter} $filter                     To filter the collections list.
 * @param {$q}      $q                          To reject error responses.
 * @param {AppAPI}  appAPI                      To make the API requests.
 * @param {Object}  appConfiguration            To get the hashtag limit.
 * @param {Extend}  extend                      To merge the contents of two collections.
 * @param {Object}  COLLECTIONS_BASE_TYPES      To get the base types configuration.
 * @param {Object}  COLLECTIONS_PROFILE         To get the profile collection.
 * @param {Object}  COLLECTIONS_RULE_OPERATORS  To get the rule operators configuration.
 * @param {Object}  COLLECTIONS_RULE_TYPES      To get the rule types configuration.
 *
 * @return {Function}
 *
 * @memberof collections
 */
const collectionsList = (
  $filter,
  $q,
  appAPI,
  appConfiguration,
  extend,
  COLLECTIONS_BASE_TYPES,
  COLLECTIONS_PROFILE,
  COLLECTIONS_RULE_OPERATORS,
  COLLECTIONS_RULE_TYPES,
) => {
  'ngInject';

  return {
    getNewInstance: () => new CollectionsList(
      $filter,
      $q,
      appAPI,
      appConfiguration,
      extend,
      COLLECTIONS_BASE_TYPES,
      COLLECTIONS_PROFILE,
      COLLECTIONS_RULE_OPERATORS,
      COLLECTIONS_RULE_TYPES,
    ),
  };
};

export default collectionsList;
