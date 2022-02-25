const path = require('path');
const BasePage = require('./basePage');

const assetsPath = './node_modules/olapic-qa-automation-dataset/frontend/media/contentengine-admin';

/**
 * @name ContentUploaderPage
 * @description
 * This is the page for the content uploader section.
 *
 * @extends BasePage
 */
class ContentUploaderPage extends BasePage {
  constructor() {
    super();

    /**
     * Get all the keywords added.
     *
     * @type {ElementFinder}
     */
    this.addedKeywords = element.all(by.className('odsKeyword'));
    /**
     * Button 'Add keywords' in bottom bar.
     *
     * @type {ElementFinder}
     */
    this.addKeywordsButtonOnBottomBar = element(by.buttonText('Add keywords'));
    /**
     * Button 'Tag to Stream' in bottom bar.
     *
     * @type {ElementFinder}
     */
    this.addStreamsButtonOnBottomBar = element(by.buttonText('Tag to Stream'));
    /**
     * Modal for media edition.
     *
     * @type {ElementFinder}
     */
    this.bulkModal = element(by.className('bulkModal'));
    /**
     * Placeholder where to write the keyword to be added.
     *
     * @type {ElementFinder}
     */
    this.addKeywordField = this.bulkModal.element(by.className('mediaInfoKeywords_list_item_addField'));
    /**
     * Button '+ Add keyword' in modal.
     *
     * @type {ElementFinder}
     */
    this.addKeywordLinkModal = this.bulkModal.element(by.className('mediaInfoKeywords_list_item_addAction'));
    /**
     * Button 'changeUsernameButton' in modal.
     *
     * @type {ElementFinder}
     */
    this.changeUsernameButton = element(by.buttonText('(change)'));
    /**
     * Button 'closeModalX' in modal.
     *
     * @type {ElementFinder}
     */
    this.closeModalX = element(by.className('odsModal_content_close'));
    /**
     * Delete icon for each stream.
     *
     * @type {ElementFinder}
     */
    this.keywordDeletes = this.bulkModal.element(by.className('mediaInfoKeywords_list')).all(by.className('fa'));
    /**
     * The local reference to the `browseButton` object.
     *
     * @type {ElementFinder}
     */
    this.browseButton = element(by.css('input[type="file"]'));
    /**
     * The local reference to the `editButton` object.
     *
     * @type {ElementFinder}
     */
    this.editButton = element.all(by.className('imageCard_media_edit'));
    /**
     * The local reference to the `deleteButton` object.
     *
     * @type {ElementFinder}
     */
    this.deleteButton = element.all(by.className('imageCard_media_delete'));
    /**
     * The local reference to the `editModal` object.
     *
     * @type {ElementFinder}
     */
    this.editModal = element(by.className('editModal'));
    /**
     * The local reference to the `previewContentMedia` object.
     *
     * @type {ElementFinder}
     */
    this.previewContentMedia = element(by.className('contentUploader_content'));
    /**
     * The local reference to the `contentMediaText` object.
     *
     * @type {ElementFinder}
     */
    this.contentMediaText = this.previewContentMedia.element(by.className('contentUploader_content_media_text'));
    /**
     * The local reference to the `emptyContentMedia` object.
     *
     * @type {ElementFinder}
     */
    this.emptyContentMedia = element(by.className('contentUploader_content_empty'));
    /**
     * The local reference to the `editCaptionBox` object.
     *
     * @type {ElementFinder}
     */
    this.editCaptionBox = this.editModal.element(by.id('caption'));
    /**
     * The local reference to the `modalSaveChanges` object.
     *
     * @type {ElementFinder}
     */
    this.modalSaveChanges = this.editModal.element(by.className('editModal_footer_actions'));
    /**
     * The local reference to the `cancelEdition` object.
     *
     * @type {ElementFinder}
     */
    this.cancelEditionButton = this.editModal.element(by.className('editModal_footer_info'));
    /**
     * The local reference to the `saveUsernameButton` object.
     *
     * @type {ElementFinder}
     */
    this.saveUsernameButton = this.bulkModal.element(by.className('bulkModal_section_main_edit_username_button'));
    /**
     * The local reference to the `usernameField` object.
     *
     * @type {ElementFinder}
     */
    this.usernameField = this.bulkModal.element(by.className('odsInput_input'));
    /**
     * The local reference to the `uploadButton` object.
     *
     * @type {ElementFinder}
     */
    this.uploadButton = element(by.className('contentUploader_footer_actions'));
    /**
     * The local reference to the `usernameMessage` object.
     *
     * @type {ElementFinder}
     */
    this.usernameMessage = this.bulkModal.element(by.className('odsInput_message')).element(by.tagName('p'));
  }
  /**
   * Go to content uploader page.
   *
   * @return {Promise}
   */
  go() {
    return browser.get('/content-uploader');
  }
  /**
   * Button to add a keyword inside the modal.
   *
   * @param {String} keyword  The keyword to be added.
   *
   * @return {Promise}
   */
  async addKeywordAction(keyword) {
    await this.addKeywordLinkModal.click();
    await this.addKeywordField.sendKeys(keyword);
    await this.addKeywordField.sendKeys(protractor.Key.ENTER);
  }
  /**
   * Browse a file.
   *
   * @param {String} fileName  The file name.
   *
   * @return {Promise}
   */
  async browse(fileName) {
    const absolutePath = path.resolve(`${assetsPath}/${fileName}`);
    await this.browseButton.sendKeys(absolutePath);
  }
  /**
   * Cancel changes in edit modal.
   *
   * @return {Promise}
   */
  async cancelEdition() {
    await this.cancelEditionButton.click();
  }
  /**
   * Delete a photo in preview content by index.
   *
   * @param {String} position  The position of media in preview content.
   *
   * @return {Promise}
   */
  async deleteMediaInPreviewByPosition(position) {
    const index = this.getIndexOfNaturalPosition(position);
    await this.deleteButton.get(index).click();
  }
  /**
   * Edit caption of photo in preview content by index.
   *
   * @param {String} caption  The position to be added.
   *
   * @return {Promise}
   */
  async editCaptionForSelectedMedia(caption) {
    await this.editCaptionBox.sendKeys(caption);
  }
  /**
   * Edit a photo in preview content by index.
   *
   * @param {String} position  The index of media in preview content.
   *
   * @return {Promise}
   */
  async editMediaInPreviewByPosition(position) {
    const index = this.getIndexOfNaturalPosition(position);
    await this.editButton.get(index).click();
  }
  /**
   * Deletes a keyword by position in modal.
   *
   * @param {Number} position  The keyword position.
   *
   * @return {Promise}
   */
  async keywordDeletesByPosition(position) {
    const index = this.getIndexOfNaturalPosition(position);
    await this.keywordDeletes.get(index).click();
  }
  /**
   * Upload the media.
   *
   * @return {Promise}
   */
  async upload() {
    await this.uploadButton.click();
  }
  /**
   * Set username in modal.
   *
   * @param {String} username  The username to be added in box.
   *
   * @return {Promise}
   */
  async writeUsername(username) {
    await this.usernameField.sendKeys(username);
  }
}

module.exports = ContentUploaderPage;
