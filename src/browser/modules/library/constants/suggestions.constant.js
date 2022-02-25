/**
 * @ngdoc constant
 * @name LIBRARY_SUGGESTIONS
 * @description
 * The configuration map of suggestions for the library.
 *
 * @type {Object}
 * @property {SuggestionMap} hashtag  The {@link SuggestionMap} for the hashtag suggestion type.
 * @property {SuggestionMap} user     The {@link SuggestionMap} for the user suggestion type.
 * @property {SuggestionMap} stream   The {@link SuggestionMap} for the stream suggestion type.
 * @property {SuggestionMap} place    The {@link SuggestionMap} for the place suggestion type.
 *
 * @memberof library
 */
const librarySuggestions = {
  hashtag: {
    aggregation: 'hashtag',
    id: 'hashtag',
    label: 'Hashtags',
    order: 1,
    symbol: '#',
    unCapitalize: true,
    values: [],
  },
  user: {
    aggregation: 'user',
    id: 'user',
    label: 'Usernames',
    order: 2,
    symbol: '@',
    unCapitalize: true,
    values: [],
  },
  stream: {
    aggregation: 'stream',
    id: 'stream',
    label: 'Streams',
    order: 3,
    values: [],
  },
  place: {
    aggregation: 'place',
    id: 'place',
    label: 'Place',
    order: 4,
    values: [],
  },
};

export default librarySuggestions;
