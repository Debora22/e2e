import LIBRARY_MEDIA_STATUS from './mediaStatus.constant';

/**
 * @ngdoc constant
 * @name LIBRARY_AGGREGATIONS
 * @description
 * The aggregations base list, configuration map and filter of aggregations for the library.
 *
 * @type {Object}
 * @property {Array}  baseList        The base list of {@link Aggregation} to fecth from the BE.
 * @property {Array}  extraList       The list of extra {@link Aggregation} to add to the aggregations.
 * @property {Object} filter          The map of how to filter the values of the aggregations. The property
 *                                    key name is the key of an aggregation.
 * @property {Array}  filter.include  The list of values to include of an aggregation.
 * @property {Array}  filter.ignore   The list of values to ignore of an aggregation.
 * @property {Object} map             The map of {@link AggregationMap}. The property key name is the
 *                                    key of an aggregation.
 *
 * @memberof library
 */
const libraryAggregations = {
  baseList: [
    { key: 'rights_programmatic' },
    { key: 'deleted_by' },
    { key: 'rights' },
    { key: 'mentioned_username' },
    { key: 'hashtag' },
    { key: 'user' },
    { key: 'stream' },
    { key: 'with_labels' },
    { key: 'detected_languages' },
    { key: 'keywords_raw' },
    { key: 'source' },
    { key: 'media_type' },
    { key: 'favorite' },
    { key: 'activations' },
  ],
  extraList: [{
    key: 'rights_whitelisted',
    values: [{
      name: true,
      label: 'all',
    }],
  }],
  filter: {
    with_labels: {
      ignore: [
        'kissing',
        'looks like alcohol',
        'middle finger',
        'piercing',
        'smoking',
        'tattoo',
      ],
    },
    detected_languages: {
      include: [
        'abkhazian',
        'afar',
        'afrikaans',
        'akan',
        'albanian',
        'amharic',
        'arabic',
        'armenian',
        'assamese',
        'aymara',
        'azerbaijani',
        'bashkir',
        'basque',
        'belarusian',
        'bengali',
        'bihari',
        'bislama',
        'bosnian',
        'breton',
        'bulgarian',
        'burmese',
        'catalan',
        'cebuano',
        'cherokee',
        'corsican',
        'czech',
        'chinese',
        'chinese (traditional)',
        'chineset',
        'danish',
        'dhivehi',
        'dutch',
        'dzongkha',
        'english',
        'esperanto',
        'estonian',
        'ewe',
        'faroese',
        'fijian',
        'finnish',
        'french',
        'frisian',
        'ga',
        'galician',
        'ganda',
        'georgian',
        'german',
        'greek',
        'greenlandic',
        'guarani',
        'gujarati',
        'haitian creole',
        'hausa',
        'hawaiian',
        'hebrew',
        'hindi',
        'hmong',
        'hungarian',
        'icelandic',
        'igbo',
        'indonesian',
        'interlingua',
        'inuktitut',
        'inupiak',
        'irish',
        'italian',
        'ignore',
        'javanese',
        'japanese',
        'kannada',
        'kashmiri',
        'kazakh',
        'khasi',
        'khmer',
        'kinyarwanda',
        'krio',
        'kurdish',
        'kyrgyz',
        'korean',
        'laothian',
        'latin',
        'latvian',
        'limbu',
        'lingala',
        'lithuanian',
        'lozi',
        'luba lulua',
        'luo kenya and tanzania',
        'luxembourgish',
        'macedonian',
        'malagasy',
        'malay',
        'malayalam',
        'maltese',
        'manx',
        'maori',
        'marathi',
        'mauritian creole',
        'mongolian',
        'montenegrin',
        'nauru',
        'ndebele',
        'nepali',
        'newari',
        'norwegian',
        'nyanja',
        'occitan',
        'oriya',
        'oromo',
        'ossetian',
        'pampanga',
        'pashto',
        'pedi',
        'persian',
        'polish',
        'portuguese',
        'punjabi',
        'quechua',
        'rajasthani',
        'rhaeto romance',
        'romanian',
        'rundi',
        'russian',
        'samoan',
        'sango',
        'sanskrit',
        'scots',
        'scots gaelic',
        'serbian',
        'seselwa',
        'sesotho',
        'shona',
        'sindhi',
        'sinhalese',
        'siswant',
        'slovak',
        'slovenian',
        'somali',
        'spanish',
        'sundanese',
        'swahili',
        'swedish',
        'syriac',
        'tagalog',
        'tajik',
        'tamil',
        'tatar',
        'telugu',
        'thai',
        'tibetan',
        'tigrinya',
        'tonga',
        'tsonga',
        'tswana',
        'tumbuka',
        'turkish',
        'turkmen',
        'twi',
        'uighur',
        'ukrainian',
        'urdu',
        'uzbek',
        'venda',
        'vietnamese',
        'volapuk',
        'waray philippines',
        'welsh',
        'wolof',
        'xhosa',
        'yiddish',
        'yoruba',
        'zhuang',
        'zulu',
      ],
    },
  },
  map: {
    rights_programmatic: {
      label: 'Collection Method',
      order: 1,
      requiresFilterBy: [{
        status_id: {
          values: [LIBRARY_MEDIA_STATUS.pending],
        },
        actionable_rights_status: { values: true },
      }, {
        status_id: {
          values: [LIBRARY_MEDIA_STATUS.savedForLater],
        },
        actionable_rights_status: { values: true },
      }],
      phrase: {
        connector: 'from',
      },
      expanded: true,
      unCapitalize: true,
      tooltip: {
        direction: 'bottom',
        label: 'You can use this filter to see how content was collected.',
      },
      keyMap: {
        true: 'is_programmatic',
        false: 'is_not_programmatic',
      },
    },
    'rights_programmatic.is_programmatic': {
      label: '@mentions and Twitter',
      description: 'rights requests in platform',
    },
    'rights_programmatic.is_not_programmatic': {
      label: 'Hashtags and Tags',
      description: 'rights requests using Chrome Extension',
    },
    deleted_by: {
      label: 'Discarded By',
      order: 1,
      requiresFilterBy: [{
        discarded: {
          values: true,
        },
      }],
      phrase: {
        connector: 'discarded by',
      },
      expanded: true,
    },
    'deleted_by.olapic': { label: 'Olapic Moderation Team' },
    'deleted_by.spam_and_modspam': { label: 'Photosafe' },
    rights: {
      label: 'Rights Status',
      order: 2,
      requiresFilterBy: [{
        status_id: {
          values: [LIBRARY_MEDIA_STATUS.pending],
        },
      }, {
        status_id: {
          values: [LIBRARY_MEDIA_STATUS.savedForLater],
        },
      }, {
        status_id: {
          values: [LIBRARY_MEDIA_STATUS.reported],
        },
      }],
      phrase: {
        connector: 'with',
      },
      icon: 'dot',
      expanded: true,
    },
    'rights.NOT-REQUESTED': {
      label: 'No Rights',
      icon: '-noRights',
    },
    'rights.REQUESTED': {
      label: 'Rights Pending',
      icon: '-rightsPending',
    },
    'rights.GIVEN': {
      label: 'Rights Approved',
      icon: '-rightsApproved',
    },
    'rights.RIGHTS-REQUEST-EXPIRED': {
      label: 'Request Expired',
      icon: '-rightsExpired',
    },
    mentioned_username: {
      label: 'Mentions',
      order: 3,
      phrase: {
        connector: 'with mention',
        symbol: '@',
      },
      unCapitalize: true,
    },
    hashtag: {
      order: 4,
      phrase: {
        connector: 'with',
        symbol: '#',
      },
      unCapitalize: true,
    },
    rights_whitelisted: {
      label: 'Automatic Rights List',
      order: 5,
      phrase: {
        override: {
          all: 'with users on Automatic Rights List',
        },
      },
      beta: true,
      keyMap: {
        true: 'all',
      },
    },
    user: {
      label: 'Username',
      order: 6,
      phrase: {
        connector: 'from',
        symbol: '@',
      },
      unCapitalize: true,
    },
    stream: {
      label: 'Streams',
      order: 7,
      phrase: {
        connector: 'with stream',
        override: {
          untagged: 'without streams',
        },
        replaceWithResponse: true,
      },
    },
    with_labels: {
      label: 'Image Recognition',
      order: 7,
      phrase: {
        connector: 'with',
        replaceWithResponse: true,
      },
      tooltip: {
        direction: 'bottom',
        label: 'Based on our machine learning technology, you can use this filter' +
          ' to display images within the selected content category.',
      },
      beta: true,
      requiresSettings: [
        'content_discovery_filter_image_recognition',
      ],
      keyMap: {
        babies: 'Babies',
        looks_like_stock: 'Looks like stock',
        motorbikes: 'Motorbikes',
        selfie: 'Selfies',
        photo_with_text: 'Photo with text',
      },
    },
    'with_labels.Babies': { label: 'Baby' },
    'with_labels.Looks like stock': { label: 'Stock Photo' },
    'with_labels.Motorbikes': { label: 'Motor Bike' },
    'with_labels.Selfies': { label: 'Selfie' },
    'with_labels.Photo with text': { label: 'Text in Photo' },
    detected_languages: {
      label: 'Language',
      order: 8,
      phrase: {
        connector: 'with',
        suffix: 'language caption',
        replaceWithResponse: true,
      },
      tooltip: {
        direction: 'bottom',
        label: 'You can use this filter to display photos with captions in the selected language.',
      },
    },
    keywords_raw: {
      label: 'Keywords',
      order: 9,
      phrase: {
        connector: 'with keywords',
      },
    },
    source: {
      label: 'Media Source',
      order: 10,
      phrase: {
        connector: 'from',
      },
    },
    'source.upload': { label: 'Hard Drive' },
    media_type: {
      label: 'Media Type',
      order: 11,
      phrase: {
        override: {
          'High Resolution Photo': '</strong>is a <strong class="filter">High Resolution Photo',
          photo: '</strong>is a <strong class="filter">photo',
          video: '</strong>is a <strong class="filter">video',
          'Edited Media': '</strong>that were <strong class="filter">edited',
        },
      },
    },
    'media_type.high_resolution_photo': { label: 'High Resolution Photo' },
    favorite: {
      order: 12,
      phrase: {
        connector: '',
      },
      unCapitalize: true,
    },
    'favorite.1': { label: 'Marked as Favorite' },
    activations: {
      label: 'Shared Channel',
      order: 13,
      requiresFilterBy: [{
        status_id: {
          values: [LIBRARY_MEDIA_STATUS.approved],
        },
      }],
      phrase: {
        connector: 'shared to',
        replaceWithResponse: true,
      },
    },
  },
};

export default libraryAggregations;
