import template from './mediaKeywords.html';
import './mediaKeywords.scss';

/**
 * @ngdoc controller
 * @name MediaKeywords
 * @description
 * This component renders the media keywords.
 *
 * @memberof library
 */
class MediaKeywords {
  /**
   * @param {$timeout} $timeout  To wait some time before disable the edition mode.
   */
  constructor($timeout) {
    'ngInject';

    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * Flag to indicate if what the exact search we are doing exist as a keyword.
     *
     * @type {Boolean}
     */
    this.existKeyword = false;
    /**
     * The first media of the list of media to display.
     *
     * @type {Object}
     */
    this.firstMedia = {};
    /**
     * Flag to indicate if the component is in edition mode. This allow the user to type a new
     * keyword.
     *
     * @type {Boolean}
     */
    this.isEditing = false;
    /**
     * Flag to indicate if search is focused or not.
     *
     * @type {Boolean}
     */
    this.isSearchFocused = false;
    /**
     * Keyword events code dictionary, we're going to used this to react when the user press one
     * of the following keys.
     *
     * @type {Object}
     */
    this.keyEvents = {
      tab: 9,
      enter: 13,
      escape: 27,
      comma: 44,
    };
    /**
     * List of keywords that were searched.
     *
     * @type {Array}
     */
    this.results = [];
    /**
     * Flag to know if the keywords are being loaded.
     *
     * @type {Boolean}
     */
    this.loadingKeywords = false;
    /**
     * We're going to use this to search for keywords and save it as a new keyword in the media.
     *
     * @type {String}
     */
    this.search = '';
    /**
     * We're going to use this to search for keywords and save it as a new keyword in the media.
     *
     * @type {String}
     */
    this.searchMinLength = 2;
  }
  /**
   * Each time the media binding changes, update the firstMedia variable.
   *
   * @param {Object} changes        The binding changes.
   * @param {Object} changes.media  The media change object.
   */
  $onChanges({ media }) {
    if (media && media.currentValue && this.media) {
      [this.firstMedia] = this.media;
    }
  }
  /**
   * Fire the `onAddKeyword` to save the a new keyword with the search value.
   */
  addKeyWord() {
    if (this.isKeywordSearchValid()) {
      this.onAddKeyword({ media: this.firstMedia, keyword: this.search.toLowerCase() })
      .then(() => this.disabledEdition());
    }
  }
  /**
   * Disable the edition mode of the component.
   */
  disabledEdition() {
    this.results = [];
    this.isEditing = false;
    this.isSearchFocused = false;
    this.search = '';
  }
  /**
   * Enabled the edition mode of the component.
   * Fired when the user click the add keyword button.
   */
  enableEdition() {
    this.isEditing = true;
    this.isSearchFocused = true;
  }
  /**
   * Check if the search text is valid to valid to be used for search and creation.
   *
   * @return {Boolean}
   */
  isKeywordSearchValid() {
    return this.search &&
      this.search.trim().length > this.searchMinLength;
  }
  /**
   * Add a new keyword when the user clicks on a keyword result.
   *
   * @param {String} keyword  The keyword to add.
   */
  onKeywordClick(keyword) {
    this.search = keyword;
    this.addKeyWord();
  }
  /**
   * Disable the edition mode on blur of the search box.
   * A $timeout is being used to give time for the onKeywordClick click to take effect.
   */
  onSearchBlur() {
    const waitTime = 150;

    this.$timeout(() => {
      this.disabledEdition();
    }, waitTime);
  }
  /**
   * Evaluate the keyCode the user is typing to fire:
   * - An add keyword when the `enter` or `tab` is typed.
   * - A disable edition when the `escape` is typed.
   *
   * @param {Event} event  The key event.
   */
  onSearchKeyDown(event) {
    switch (event.which) {
    case this.keyEvents.enter:
    case this.keyEvents.tab:
      this.addKeyWord();
      break;
    case this.keyEvents.escape:
      this.disabledEdition();
      break;
    default:
      break;
    }
  }
  /**
   * Fire an add keyword when the `comma` is pressed and prevent that key to enter the model.
   *
   * @param {Event} event  The key event.
   */
  onSearchKeyPress(event) {
    if (event.which === this.keyEvents.comma) {
      event.preventDefault();
      this.addKeyWord();
    }
  }
  /**
   * Remove a keyword when the user clicks on a existing keyword.
   *
   * @param {String} keyword  The keyword to remove.
   */
  removeKeyword(keyword) {
    this.onRemoveKeyword({ media: this.firstMedia, keyword });
  }
  /**
   * Fire the `onSearchForKeywords` callback to search for keywords based
   * on the current `search` typed by the user.
   */
  searchForKeywords() {
    this.loadingKeywords = true;
    this.existKeyword = false;

    if (this.isKeywordSearchValid()) {
      this.onSearchForKeywords({ search: this.search })
      .then((keywords = []) => {
        this.results = this.isEditing ? keywords : [];
        this.loadingKeywords = false;
        this.existKeyword = this.results.some((keyword) => keyword.name.toLowerCase() === this.search.toLowerCase());
      });
    }
  }
}

/**
 * @ngdoc component
 * @name mediaKeywords
 * @description
 * The media keywords component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaKeywords}
   */
  controller: MediaKeywords,
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
   * @property {Boolean}  hasAutomaticKeywords      If the customer has automatic keywords enabled.
   * @property {Boolean}  hasKeywordsActionEnabled  If the customer has the tagging action enabled or not.
   * @property {Array}    keywords                  The list of keywords to display.
   * @property {Array}    media                     The list of media to display.
   * @property {Function} onAddKeyword              The callback to add a new keyword to the media. It receives the
   *                                                media and keyword to add.
   * @property {Function} onRemoveKeyword           The callback to remove a keyword to the media. It receives the
   *                                                media and keyword to remove.
   * @property {Function} onSearchForKeywords       The callback to search for keywords. It receives the search text.
   */
  bindings: {
    hasAutomaticKeywords: '<',
    hasKeywordsActionEnabled: '<',
    keywords: '<',
    media: '<',
    onAddKeyword: '&',
    onRemoveKeyword: '&',
    onSearchForKeywords: '&',
  },
};
