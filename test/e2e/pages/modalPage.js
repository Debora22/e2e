const BasePage = require('./basePage');

/**
 * @name ModalPage
 * @description
 * This is the page for the content modal.
 *
 * @extends BasePage
 */
class ModalPage extends BasePage {
  constructor() {
    super();

    /**
     * The local reference to the `taggedStreamId` object.
     *
     * @type {String}
     */
    this.taggedStreamId = '';
    /**
     * The local reference to the `modal` object.
     *
     * @type {ElementFinder}
     */
    this.modal = element(by.className('odsModal'));
    /**
     * The local reference to the `streams` object.
     *
     * @type {ElementArrayFinder}
     */
    this.streams = this.modal.element(by.className('mediaTaggingModal_streamList'))
    .all(by.className('mediaTaggingModal_streamList_item'));
    /**
     * The local reference to the `addStream` object.
     *
     * @type {ElementFinder}
     */
    this.addStream = this.modal.element(by.className('mediaTaggingModal_single'));
    /**
     * The local reference to the `close` object.
     *
     * @type {ElementFinder}
     */
    this.close = this.modal.element(by.className('odsModal_content_close'));
    /**
     * The local reference to the `searchStreamResults` object.
     *
     * @type {ElementFinder}
     */
    this.searchStreamResults = this.modal.element(by.className('mediaTaggingModal_searchResults'));
    /**
     * The local reference to the `searchBox` object.
     *
     * @type {ElementFinder}
     */
    this.searchBox = this.modal.element(by.className('mediaTaggingModal_searchBox')).element(
      by.className('odsSearchBox_searchWrapper'),
    );
    /**
     * The local reference to the 'Cancel' button on tab Tag to Stream.
     *
     * @type {ElementFinder}
     */
    this.cancelTagToStreamButton = this.modal.element(by.className('mediaTaggingModal_actions_cancel'));
    /**
     * The local reference to the `searchBoxInput` object.
     *
     * @type {ElementFinder}
     */
    this.searchBoxInput = this.searchBox.element(by.className('odsSearchBox_searchWrapper_text'));
  }
  /**
   * Get stream by position.
   *
   * @param {String} streamPosition  The position to get the stream.
   *
   * @return {ElementFinder}
   */
  getStream(streamPosition) {
    const index = this.getIndexOfNaturalPosition(streamPosition);

    return this.streams.get(index);
  }
  /**
   * Get tagged stream by id.
   *
   * @param {String} streamId  The id of the tagged stream.
   *
   * @return {ElementFinder}
   */
  getTaggedStreamById(streamId) {
    return this.getElementWithChildByText(
      this.streams,
      by.className('info'),
      streamId,
    );
  }
  /**
   * Clear search box.
   *
   * @return {Promise}
   */
  async clearTagToStreamSearch() {
    await this.clearSearchBox(this.searchBox);
  }
  /**
   * Click on an action of the modal.
   *
   * @param {String} action  The action to click.
   *
   * @return {Promise}
   */
  async clickModalAction(action) {
    await this.modal.element(by.cssContainingText('.odsButton', action))
    .click();
  }
  /**
   * Click on an action of a stream by position.
   *
   * @param {String} streamPosition  The position of the stream to click.
   * @param {String} action          The action to click.
   *
   * @return {Promise}
   */
  async clickStreamAction(streamPosition, action) {
    const stream = this.getStream(streamPosition);

    await stream.element(by.cssContainingText('.mediaTaggingModal_streamList_item_action', action))
    .click();
  }
  /**
   * Save a tagged stream id by position for a future check.
   *
   * @param {String} streamPosition  The position of the stream id to save.
   *
   * @return {Promise}
   */
  async saveTaggedStreamByPosition(streamPosition) {
    const stream = this.getStream(streamPosition);
    const streamIdElement = stream.element(by.className('mediaTaggingModal_streamList_item_info'))
    .element(by.className('info'));

    this.taggedStreamId = await streamIdElement.getText();
  }
}

module.exports = ModalPage;
