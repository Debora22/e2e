import template from './mediaTaggingModal.html';
import './mediaTaggingModal.scss';

import dragdrop from '../../../../assets/images/dragdrop.png';
import magnifier from '../../../../assets/images/magnifier.png';

/**
 * @ngdoc controller
 * @name MediaTaggingModal
 * @description
 * This component renders the media tagging modal.
 *
 * @memberof library
 */
class MediaTaggingModal {
  constructor() {
    /**
     * Current UI state. Posible options: idle, loading, tagging, results.
     *
     * @type {String}
     */
    this.currentState = 'idle';
    /**
     * Flag to show/hide tagging actions.
     *
     * @type {Boolean}
     */
    this.showTaggingActions = false;
    /**
     * Searchbox model.
     *
     * @type {String}
     */
    this.search = '';
    /**
     * Variable to store stream search results.
     *
     * @type {Array}
     */
    this.results = [];
    /**
     * Variable to store streams to be tagged.
     *
     * @type {Array}
     */
    this.selectedStreams = [];
    /**
     * Reference to the dragdrop image.
     *
     * @type {String}
     */
    this.dragdropIcon = dragdrop;
    /**
     * Reference to the magnifier image.
     *
     * @type {String}
     */
    this.magnifierIcon = magnifier;
    /**
     * We use this flag to hide the search results of the search box component,
     * because the results are being shown in another component.
     *
     * @type {Boolean}
     */
    this.hideSearchResults = true;
    /**
     * Flag to enable or disable the drag and drop of streams.
     *
     * @type {Boolean}
     */
    this.canDragStream = false;
  }
  /**
   * Each time the media or streams binding changes, we cleanup the state.
   *
   * @param {Object}  changes          The binding changes.
   * @param {Object?} changes.media    The media change object.
   * @param {Object?} changes.streams  The streams change object.
   */
  $onChanges({ media, streams }) {
    if (media && media.currentValue && this.media) {
      this.backToIdleState();
    }

    if (streams && streams.currentValue && this.streams) {
      this.backToIdleState();
    }
  }
  /**
   * Function to reset the component state.
   */
  backToIdleState() {
    this.search = '';
    this.selectedStreams = [];
    this.currentState = 'idle';
    this.showTaggingActions = false;
    this.canDragStream = this.streams.length > 1 && this.mediaSelectedCount === 1;
    this.onToggleModalActions({ visible: true });
  }
  /**
   * Start the tagging process.
   */
  onAddStreamLink() {
    this.currentState = 'tagging';
    this.showTaggingActions = true;
    this.onToggleModalActions({ visible: false });
  }
  /**
   * After a stream is dragged and dropped, remove it from the old position
   * and insert into a new one.
   *
   * @param {Object} stream  The stream that was dropped.
   * @param {Number} index   The index of where to insert the stream.
   *
   * @return {Boolean}
   */
  onDropStream(stream, index) {
    const srcIndex = this.streams.findIndex((item) => stream.id === item.id);
    const dstIndex = index > srcIndex ? index - 1 : index;
    const dropAllowed = srcIndex !== dstIndex;

    if (dropAllowed) {
      // remove the stream from the current position.
      this.streams.splice(srcIndex, 1);
      // insert the stream into the new position.
      this.streams.splice(dstIndex, 0, stream);

      this.onChangeStreamsPositions({
        streams: this.streams,
      });
    }

    return !dropAllowed;
  }
  /**
   * Remove a stream from the media.
   *
   * @param {Number} streamId  The stream id to remove.
   */
  removeStream(streamId) {
    this.onRemoveStream({ streamId });
  }
  /**
   * Toggle select any stream from search results.
   * Push if not present. Remove if it's already added.
   *
   * @param {Number} index  The result index to be selected.
   */
  toggleSelectResult(index) {
    this.results[index].selected = !this.results[index].selected;
    const alreadyAdded = this.selectedStreams.findIndex((stream) => stream.id === this.results[index].id);

    if (alreadyAdded === -1) {
      this.selectedStreams.push(this.results[index]);
    } else {
      this.selectedStreams.splice(alreadyAdded, 1);
    }
  }
  /**
   * Trigger the load of more streams if any exist.
   */
  triggerLoadMoreStreams() {
    this.onLoadMoreStreams()
    .then((streams) => {
      this.results = this.results.concat(this._processStreams(streams));
    })
    .catch((error) => this.onError({ error }));
  }
  /**
   * Trigger the search handler on every searchbox change.
   * It reset the state, set the loading state and fill the results.
   *
   * @param {String} text  The phrase to search for.
   */
  triggerSearch(text) {
    const minSearchLength = 2;
    this.search = text.trim();

    if (this.search && this.search.length > minSearchLength) {
      this.currentState = 'loading';
      this.onSearchForStreams({ text: this.search })
      .then((streams) => {
        this.results = this._processStreams(streams);
        this.currentState = 'results';
        this.showTaggingActions = true;
        this.onToggleModalActions({ visible: false });
      })
      .catch((error) => this.onError({ error }));
    } else {
      this.currentState = this.streams.length > 0 ? 'tagging' : 'idle';
      this.showTaggingActions = true;
      this.onToggleModalActions({ visible: false });
    }
  }
  /**
   * Tag the selected streams and reset the component state.
   */
  triggerTagging() {
    if (this.selectedStreams.length > 0) {
      this.onTagStreams({
        streams: this.selectedStreams,
      });
    }
  }
  /**
   * Process a list of streams and check if any of them was selected or already exist in the media.
   *
   * @param {Array} streams  The list of streams to process.
   *
   * @return {Array}
   */
  _processStreams(streams) {
    return streams ?
      streams.map((stream) => {
        stream.selected = this.selectedStreams.some((mediaStream) => mediaStream.id === stream.id);
        stream.alreadyAdded = this.streams.some((mediaStream) => mediaStream.id === stream.id);
        return stream;
      }) :
      [];
  }
}

/**
 * @ngdoc component
 * @name mediaTaggingModal
 * @description
 * The media modal tagging component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaTaggingModal}
   */
  controller: MediaTaggingModal,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template,
  /**
   * Component bindings.
   *
   * @type {Object}
   * @property {Boolean}  existMoreStreams          If another page of streams can be fetched.
   * @property {Boolean}  hasTaggingActionEnabled   If the customer has the tagging action enabled or not.
   * @property {Array}    media                     The list of media to tag.
   * @property {Number}   mediaSelectedCount        Count of media selected within the modal.
   * @property {Array}    streams                   The list of tagged streams.
   * @property {Function} onChangeStreamsPositions  Callback to change the position of the streams.
   * @property {Function} onError                   Callback when an error occurs.
   * @property {Function} onLoadMoreStreams         Callback to load more searched streams.
   * @property {Function} onRemoveStream            Callback to remove a stream.
   * @property {Function} onSearchForStreams        Callback to search for streams.
   * @property {Function} onTagStreams              Callback to save selected streams.
   * @property {Function} onToggleModalActions      Callback to show/hide main modal actions.
   */
  bindings: {
    existMoreStreams: '<',
    hasTaggingActionEnabled: '<',
    media: '<',
    mediaSelectedCount: '<',
    streams: '<',
    onChangeStreamsPositions: '&',
    onError: '&',
    onLoadMoreStreams: '&',
    onRemoveStream: '&',
    onSearchForStreams: '&',
    onTagStreams: '&',
    onToggleModalActions: '&',
  },
};
