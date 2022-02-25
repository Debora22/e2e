/**
 * @ngdoc constant
 * @name LIBRARY_MEDIA_STATUS
 * @description
 * The map of media status for the library.
 *
 * @type {Object}
 * @property {Number} approved          The status id for an approved media.
 * @property {Number} deleted           The status id for a deleted media.
 * @property {Number} discardedOk       The status id for a discarded media to "QA_OK".
 * @property {Number} discardedPending  The status id for a discarded media to "QA_PENDING".
 * @property {Number} pending           The status id for a pending media.
 * @property {Number} reported          The status id for a reported media.
 * @property {Number} savedForLater     The status id for a saved for later media.
 *
 * @memberof library
 */
const libraryMediaStatus = {
  approved: 40,
  deleted: 1,
  discardedOk: 52,
  discardedPending: 53,
  pending: 20,
  reported: 22,
  savedForLater: 23,
};

export default libraryMediaStatus;
