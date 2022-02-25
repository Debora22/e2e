/**
 * @ngdoc constant
 * @name RIGHTSMESSAGES_MESSAGE
 * @description
 * The message constant for the rights messages section.
 *
 * @type {Object}
 * @property {String} placeholder         The message placeholder.
 * @property {Object} status              The message status object.
 * @property {Object} status.ready        The message ready status.
 * @property {String} status.ready.icon   The icon of the ready status.
 * @property {String} status.ready.title  The title of the ready status.
 * @property {Object} status.error        The message error status.
 * @property {String} status.error.icon   The icon of the error status.
 * @property {String} status.error.title  The title of the error status.
 * @property {Object} tag                 The message tag object.
 * @property {String} tag.hashtag         The message hashtag tag.
 * @property {String} tag.tos             The message TOS tag.
 * @property {RegExp} shortlinkRegexp     The regular expression to match short links.
 *
 * @memberof rightsMessages
 */
const rightsMessage = {
  placeholder: 'Hello, we love this picture and would like to use it in our Olapic website and other marketing ' +
    'materials or ads. If we may feature your photo please reply {{hashtag}} and visit our TOS here: {{tos_url}}',
  status: {
    ready: {
      icon: 'check',
      title: 'ready',
    },
    error: {
      icon: 'exclamation',
      title: 'error',
    },
  },
  tag: {
    hashtag: '{{hashtag}}',
    tos: '{{tos_url}}',
  },
  shortlinkRegexp: /(?:http|https):\/\/(linkd\.in|t\.co|bitly\.co|bit\.ly|tcrn\.ch|goo\.gl)/,
};

export default rightsMessage;
