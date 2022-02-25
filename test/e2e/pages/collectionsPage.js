const BasePage = require('./basePage');

/**
 * @name CollectionsPage
 * @description
 * This is the page for the collections section.
 *
 * @extends BasePage
 */
class CollectionsPage extends BasePage {
  constructor() {
    super();

    /**
     * The local reference to the `create` object.
     *
     * @type {ElementFinder}
     */
    this.createButton = element(by.className('collections_header_button'));
    /**
     * The local reference to the `collections` object.
     *
     * @type {ElementArrayFinder}
     */
    this.collections = element.all(by.css('.collections_table_body_row:not(.-profile)'));
    /**
     * The local reference to the `newCollectionForm` object.
     *
     * @type {ElementFinder}
     */
    this.newCollectionForm = element(by.id('collectionsForm'));
    /**
     * The local reference to the `newCollectionName` object.
     *
     * @type {ElementFinder}
     */
    this.newCollectionName = this.newCollectionForm.element(by.id('collectionName'));
    /**
     * The local reference to the `newCollectionNameError` object.
     *
     * @type {ElementFinder}
     */
    this.newCollectionNameError = this.getErrorOfInput(this.newCollectionForm
    .element(by.className('collectionsForm_data_name')));
    /**
     * The local reference to the `newCollectionBase` object.
     *
     * @type {ElementFinder}
     */
    this.newCollectionBase = this.newCollectionForm.element(by.className('collectionsForm_data_row_main'));
    /**
     * The local reference to the `newCollectionBaseValue` object.
     *
     * @type {ElementFinder}
     */
    this.newCollectionBaseValue = this.newCollectionBase.element(by.id('collectionBaseValue'));
    /**
     * The local reference to the `submit` object.
     *
     * @type {ElementFinder}
     */
    this.submitButton = this.newCollectionForm.element(by.className('collectionsForm_footer_submit'));
    /**
     * The local reference to the `rulesContainer` object.
     *
     * @type {ElementFinder}
     */
    this.rulesContainer = this.newCollectionForm.element(by.css('.collectionsForm_data_row.-rules'));
    /**
     * The local reference to the `rules` object.
     *
     * @type {ElementArrayFinder}
     */
    this.rules = this.rulesContainer.all(by.className('collectionsForm_data_row_rule'));
    /**
     * The local reference to the `addRule` object.
     *
     * @type {ElementFinder}
     */
    this.addRule = this.rulesContainer.element(by.className('collectionsForm_data_add_button'));
    /**
     * The local reference to the `streamsContainer` object.
     *
     * @type {ElementFinder}
     */
    this.streamsContainer = this.newCollectionForm.element(by.css('.collectionsForm_data_row.-streams'));
    /**
     * The local reference to the `streams` object.
     *
     * @type {ElementArrayFinder}
     */
    this.streams = this.streamsContainer.all(by.className('collectionsForm_data_row_rule'));
    /**
     * The local reference to the `addStream` object.
     *
     * @type {ElementFinder}
     */
    this.addStream = this.streamsContainer.element(by.className('collectionsForm_data_add_button'));
    /**
     * The local reference to the `photosCheckbox` object.
     *
     * @type {ElementFinder}
     */
    this.photosCheckbox = element(by.id('photosCheckbox'));
    /**
     * The local reference to the `videosCheckbox` object.
     *
     * @type {ElementFinder}
     */
    this.videosCheckbox = element(by.id('videosCheckbox'));
  }
  /**
   * Get collection description by position.
   *
   * @param {String} collectionPosition  The position to get the collection description.
   *
   * @return {ElementFinder}
   */
  getCollectionDescriptionByPosition(collectionPosition) {
    const index = this.getIndexOfNaturalPosition(collectionPosition);

    return this.collections.get(index)
    .element(by.className('collections_table_body_row_data_description'));
  }
  /**
   * Get collection name by position.
   *
   * @param {String} collectionPosition  The position to get the collection name.
   *
   * @return {ElementFinder}
   */
  getCollectionNameByPosition(collectionPosition) {
    const index = this.getIndexOfNaturalPosition(collectionPosition);

    return this.collections.get(index)
    .element(by.className('collections_table_body_row_data_name'));
  }
  /**
   * Get a rule type error by position.
   *
   * @param {String} rulePosition  The position of the rule to get the error of.
   *
   * @return {Promise}
   */
  getRuleTypeError(rulePosition) {
    const index = this.getIndexOfNaturalPosition(rulePosition);
    const rule = this.rules.get(index);
    const dropdown = rule.element(by.className('collectionsForm_data_row_rule_type'));

    return this.getErrorOfDropdown(dropdown);
  }
  /**
   * Get collection status by position.
   *
   * @param {String} collectionPosition  The position to get the collection status.
   *
   * @return {ElementArrayFinder}
   */
  getStatus(collectionPosition) {
    const index = this.getIndexOfNaturalPosition(collectionPosition);

    return this.collections.get(index)
    .element(by.className('collections_table_body_row_tools_toggle'))
    .element(by.css('label'));
  }
  /**
   * Go to collections page.
   *
   * @return {Promise}
   */
  go() {
    return browser.get('/collections');
  }
  /**
   * Apply the status or sort filter.
   *
   * @param {String} filter  The filter to apply.
   * @param {String} option  The option to apply.
   *
   * @return {Promise}
   */
  async applyFilter(filter, option) {
    const cssClass = filter === 'showing' ?
      'collections_table_header_statusFilter' :
      'collections_table_header_sort';

    await this.selectDropdownOption(
      element(by.className(cssClass)),
      option,
    );
  }
  /**
   * Change the status to a collection.
   *
   * @param {String} status              The status to set.
   * @param {String} collectionPosition  The position of the collection.
   *
   * @return {Promise}
   */
  async changeStatus(status, collectionPosition) {
    const index = this.getIndexOfNaturalPosition(collectionPosition);
    const statusToggle = this.collections.get(index)
    .element(by.className('collections_table_body_row_tools_toggle'));

    await this.changeOnOffToggle(statusToggle, status);
  }
  /**
   * Delete all collections.
   *
   * @return {Promise}
   */
  async deleteAll() {
    let collectionsEmpty = await this.isEmpty();
    while (!collectionsEmpty) {
      /* eslint-disable no-await-in-loop */
      await this.deleteCollection(1);
      collectionsEmpty = await this.isEmpty();
      /* eslint-enable no-await-in-loop */
    }
  }
  /**
   * Delete a collection.
   *
   * @param {String} collectionPosition  The position of the collection to delete.
   *
   * @return {Promise}
   */
  async deleteCollection(collectionPosition) {
    const index = this.getIndexOfNaturalPosition(collectionPosition);
    const deleteButton = this.collections.get(index).element(by.buttonText('Delete'));
    await deleteButton.click();
    await this.acceptConfirmation();
  }
  /**
   * Edit collection by position.
   *
   * @param {String} collectionPosition  The position of the collection to edit.
   *
   * @return {Promise}
   */
  async editCollectionByPosition(collectionPosition) {
    const index = this.getIndexOfNaturalPosition(collectionPosition);
    const editButton = this.collections.get(index).element(by.buttonText('Edit'));
    await editButton.click();
  }
  /**
   * Returns true if there are no collections.
   *
   * @return {Boolean}
   */
  async isEmpty() {
    const collectionsCount = await this.collections.count();
    return collectionsCount === 0;
  }
  /**
   * Remove rule from X button.
   *
   * @param {String} rulePosition  The position of the rule to remove.
   *
   * @return {Promise}
   */
  async removeRuleByPosition(rulePosition) {
    const index = this.getIndexOfNaturalPosition(rulePosition);
    const rule = this.rules.get(index);
    const removeButton = rule.element(by.className('collectionsForm_data_row_rule_remove'));

    await removeButton.click();
  }
  /**
   * Remove stream from X button.
   *
   * @param {String} streamPosition  The position of the stream to remove.
   *
   * @return {Promise}
   */
  async removeStreamByPosition(streamPosition) {
    const index = this.getIndexOfNaturalPosition(streamPosition);
    const stream = this.streams.get(index);
    const removeButton = stream.element(by.className('collectionsForm_data_row_rule_remove'));

    await removeButton.click();
  }
  /**
   * Scrolls down to streams container.
   *
   * @return {Promise}
   */
  async scrollToStream() {
    await browser.actions().mouseMove(this.streamsContainer).perform();
  }
  /**
   * Select base collection mention handler.
   *
   * @param {String} mentionHandler  The base collection mention handler to select.
   *
   * @return {Promise}
   */
  async selectMentionHandler(mentionHandler) {
    await this.selectDropdownOption(
      this.newCollectionBase.element(by.id('collectionBaseMention')),
      mentionHandler,
    );
  }
  /**
   * Select the rule operator by position.
   *
   * @param {String} ruleOperator  The rule operator to select.
   * @param {String} rulePosition  The position of the rule.
   *
   * @return {Promise}
   */
  async selectRuleOperator(ruleOperator, rulePosition) {
    const index = this.getIndexOfNaturalPosition(rulePosition);
    const rule = this.rules.get(index);

    await this.selectDropdownOption(
      rule.element(by.className('collectionsForm_data_row_rule_operator')),
      ruleOperator,
    );
  }
  /**
   * Select the rule type by position.
   *
   * @param {String} ruleType      The rule type to select.
   * @param {String} rulePosition  The position of the rule.
   *
   * @return {Promise}
   */
  async selectRuleType(ruleType, rulePosition) {
    const index = this.getIndexOfNaturalPosition(rulePosition);
    const rule = this.rules.get(index);

    await this.selectDropdownOption(
      rule.element(by.className('collectionsForm_data_row_rule_type')),
      ruleType,
    );
  }
  /**
   * Select stream suggestion by position.
   *
   * @param {String} streamName      The stream name to select.
   * @param {String} streamPosition  The position of the stream.
   *
   * @return {Promise}
   */
  async selectStreamSuggestion(streamName, streamPosition) {
    const index = this.getIndexOfNaturalPosition(streamPosition);
    const stream = this.streams.get(index);

    await this.selectSearchBoxSuggestion(
      stream.element(by.className('collectionsForm_data_row_rule_value')),
      streamName,
    );
  }
  /**
   * Select the base collection type.
   *
   * @param {String} collectionType  The base collection type to select.
   *
   * @return {Promise}
   */
  async selectType(collectionType) {
    await this.selectDropdownOption(
      this.newCollectionBase.element(by.id('collectionBaseType')),
      collectionType,
    );
  }
  /**
   * Set the rule value by position.
   *
   * @param {String} ruleValue     The rule value to set.
   * @param {String} rulePosition  The position of the rule.
   *
   * @return {Promise}
   */
  async setRuleValue(ruleValue, rulePosition) {
    const index = this.getIndexOfNaturalPosition(rulePosition);
    const rule = this.rules.get(index);

    await this.setInputValue(
      rule.element(by.className('odsInput_input')),
      ruleValue,
    );
  }
  /**
   * Search stream by position.
   *
   * @param {String} streamName      The stream name to Search.
   * @param {String} streamPosition  The position of the stream.
   *
   * @return {Promise}
   */
  async setStreamSearch(streamName, streamPosition) {
    const index = this.getIndexOfNaturalPosition(streamPosition);
    const stream = this.streams.get(index);

    await this.setInputValue(
      stream.element(by.className('odsSearchBox_searchWrapper_text')),
      streamName,
    );
  }
}

module.exports = CollectionsPage;
