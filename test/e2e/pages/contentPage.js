const BasePage = require('./basePage');

/**
 * @name ContentPage
 * @description
 * This is the page for the content section.
 *
 * @extends BasePage
 */
class ContentPage extends BasePage {
  constructor() {
    super();

    /**
     * The local reference to the `MAX_PAGE_COUNT` object.
     *
     * @type {Number}
     */
    this.MAX_PAGE_COUNT = 90;
    /**
     * The local reference to the `mediaId` object.
     *
     * @type {String}
     */
    this.mediaId = '';
    /**
     * The local reference to the `filters` object.
     *
     * @type {ElementArrayFinder}
     */
    this.filters = element.all(by.className('odsFilterBar_filters_item'));
    /**
     * The local reference to the `medias` object.
     *
     * @type {ElementArrayFinder}
     */
    this.medias = element.all(by.className('odsMediaCard'));
    /**
     * The local reference to the `mediaModal` object.
     *
     * @type {ElementFinder}
     */
    this.mediaModal = element(by.className('odsModal'));
    /**
     * The local reference to the `mediaModalCloseButton` object.
     *
     * @type {ElementFinder}
     */
    this.mediaModalId = this.mediaModal.element(by.css('.mediaInfoModal_info_content.-mediaId'));
    /**
     * The local reference to the `mediaModalCloseButton` object.
     *
     * @type {ElementFinder}
     */
    this.mediaModalCloseButton = this.mediaModal.element(by.className('odsModal_content_close'));
    /**
     * The local reference to the `searchButton` object.
     *
     * @type {ElementFinder}
     */
    this.searchButton = element(by.className('odsSearchBox_searchWrapper_button'));
    /**
     * The local reference to the `sortMediaDropdown` object.
     *
     * @type {ElementFinder}
     */
    this.sortMediaDropdown = element(by.className('library_content_toolBar_sort'));
    /**
     * The local reference to the `contentSections` object.
     *
     * @type {ElementFinder}
     */
    this.contentSections = element(by.className('library_content_sections'));
    /**
     * The local reference to the `mediaViewActionLocator` object.
     *
     * @type {ProtractorBy}
     */
    this.mediaViewActionLocator = by.cssContainingText('.odsMediaCard_media_actions_view', 'View');
    /**
     * The local reference to the `searchSummary` object.
     *
     * @type {ElementFinder}
     */
    this.searchSummary = element(by.className('library_content_searchBar_summary_text'));
    /**
     * The local reference to the `paginationBottom` object.
     *
     * @type {ElementArrayFinder}
     */
    this.pagination = element.all(by.className('odsPagination_text'));
    /**
     * The local reference to the `resetAllFilters` object.
     *
     * @type {ElementFinder}
     */
    this.resetAllFilters = element(by.className('library_content_searchBar_summary_clear'));
    /**
     * The local reference to the `searchBox` object.
     *
     * @type {ElementFinder}
     */
    this.searchBox = element(by.className('library_content_searchBar_searchWrapper'))
    .element(by.className('odsSearchBox_searchWrapper'));
    /**
     * The local reference to the `searchBoxInput` object.
     *
     * @type {ElementFinder}
     */
    this.searchBoxInput = this.searchBox.element(by.className('odsSearchBox_searchWrapper_text'));
  }
  /**
   * Get media by position.
   *
   * @param {String} mediaPosition  The position to get the media.
   *
   * @return {ElementFinder}
   */
  getMedia(mediaPosition) {
    const index = this.getIndexOfNaturalPosition(mediaPosition);

    return this.medias.get(index);
  }
  /**
   * Get media with rights status count.
   *
   * @param {String} rightsStatus  The rights status to get media.
   *
   * @return {ElementArrayFinder}
   */
  getMediaRightsStatusCount(rightsStatus) {
    const className = rightsStatus === 'Rights Approved' ? '-rightsApproved' : '-noRights';

    return this.getNumberOfChildElementsWithLocator(this.medias, by.className(className));
  }
  /**
   * Get tagged stream by name from media card.
   *
   * @param {String} streamName  The stream name.
   * @param {String} mediaPosition  The position of the media to get the streams.
   *
   * @return {ElementFinder}
   */
  getTaggedStreamOnMediaByName(streamName, mediaPosition) {
    const media = this.getMedia(mediaPosition);

    return this.getElementWithChildByAttribute(
      media.all(by.className('odsMediaCard_streams_item_button')),
      'data-name',
      streamName,
    );
  }
  /**
   * Go to content page.
   *
   * @return {Promise}
   */
  go() {
    return browser.get('/content');
  }
  /**
   * Check a media id by position with the saved media id.
   *
   * @param {String} mediaPosition  The position of the media id to check.
   *
   * @return {Boolean}
   */
  async checkMediaIdByPosition(mediaPosition) {
    const mediaId = await this.getMediaIdByPosition(mediaPosition);

    return mediaId === this.mediaId;
  }
  /**
   * Clear search box.
   *
   * @return {Promise}
   */
  async clearContentSearch() {
    await this.clearSearchBox(this.searchBox);
  }
  /**
   * Click on a media card main action.
   *
   * @param {String} actionName     The name of the main action to click.
   * @param {String} mediaPosition  The position of the media to click.
   *
   * @return {Promise}
   */
  async clickMediaCardMainActionByPosition(actionName, mediaPosition) {
    const media = this.getMedia(mediaPosition);
    const action = media.element(by.cssContainingText('.odsMediaCard_media_actions_main_item', actionName));

    await action.click();
  }
  /**
   * Click on a media card secondary action.
   *
   * @param {String} actionName     The name of the secondary action to click.
   * @param {String} mediaPosition  The position of the media to click.
   *
   * @return {Promise}
   */
  async clickMediaCardSecondaryActionByPosition(actionName, mediaPosition) {
    const media = this.getMedia(mediaPosition);
    const actionsDropdown = media.element(by.className('odsMediaCard_media_actions_dropdown'));
    const action = media.element(by.cssContainingText(
      '.odsMediaCard_media_actions_dropdown_list_item',
      actionName,
    ));

    await browser.actions().mouseMove(actionsDropdown).perform();
    await action.click();
  }
  /**
   * Get the total of an option filter.
   *
   * @param {String} filter        The filter to get.
   * @param {String} filterOption  The option to get.
   *
   * @return {Integer}
   */
  async getFilterCount(filter, filterOption) {
    const filterOptionElement = await this._getFilterOption(filter, filterOption);
    const filterOptionTotal = await filterOptionElement
    .element(by.className('odsFilterBar_filters_item_values_item_total'));
    const total = await filterOptionTotal.getText();

    return parseInt(total, 10);
  }
  /**
   * Get the tooltip text of a filter.
   *
   * @param {String} filter  The filter to get the tooltip text.
   *
   * @return {String}
   */
  async getFilterTooltipText(filter) {
    const filterElement = await this._getFilter(filter);
    const tooltip = filterElement.element(by.className('odsFilterBar_filters_item_title_icons_tooltip'));
    await browser.actions().mouseMove(tooltip).perform();
    const tooltipText = tooltip.element(by.className('odsTooltip_text')).getText();

    return tooltipText;
  }
  /**
   * Get media id by position.
   *
   * @param {String} mediaPosition  The position of the media to get the id.
   *
   * @return {String}
   */
  async getMediaIdByPosition(mediaPosition) {
    const media = mediaPosition === 'last' ? this.medias.last() : this.getMedia(mediaPosition);
    const viewAction = media.element(this.mediaViewActionLocator);

    await viewAction.click();
    const mediaId = await this.mediaModalId.getText();
    await this.mediaModalCloseButton.click();

    return mediaId;
  }
  /**
   * Get the count of media in the pagination component.
   *
   * @param {Boolean} top  If we need to get the top pagination.
   *
   * @return {Number}
   */
  async getPaginationTotal(top) {
    const paginationElement = this.pagination.get(top ? 0 : 1);
    const text = await paginationElement.getText();
    const [, total] = text.split(' of ');

    return parseInt(total, 10);
  }
  /**
   * Go to a Content main section.
   *
   * @param {String} sectionName  The name of section to go to.
   *
   * @return {Promise}
   */
  async goToContentMainSection(sectionName) {
    const section = this.contentSections.element(by.cssContainingText('.library_content_sections_item', sectionName));

    await section.click();
  }
  /**
   * Go to a Content secondary section.
   *
   * @param {String} sectionName  The name of section to go to.
   *
   * @return {Promise}
   */
  async goToContentSecondarySection(sectionName) {
    const sectionsDropdown = this.contentSections.element(by.className('odsDropdown_dropdown'));
    const section = this.contentSections.element(by.cssContainingText('.odsDropdown_options', sectionName));

    await sectionsDropdown.click();
    await section.click();
  }
  /**
   * Check if an filter option is selected or not.
   *
   * @param {String} filter        The filter to check.
   * @param {String} filterOption  The option to check.
   *
   * @return {Promise}
   */
  async isFilterOptionSelected(filter, filterOption) {
    const filterOptionElement = await this._getFilterOption(filter, filterOption);
    const filterOptionCheckbox = this._getFilterOptionCheckbox(filterOptionElement);

    return filterOptionCheckbox.isSelected();
  }
  /**
   * Save a media id by position for a future check.
   *
   * @param {String} mediaPosition  The position of the media id to save.
   *
   * @return {Promise}
   */
  async saveMediaByPosition(mediaPosition) {
    const media = this.getMedia(mediaPosition);
    const viewAction = media.element(this.mediaViewActionLocator);

    await viewAction.click();
    this.mediaId = await this.mediaModalId.getText();
    await this.mediaModalCloseButton.click();
  }
  /**
   * Select option from filter.
   *
   * @param {String} filter        The filter to apply.
   * @param {String} filterOption  The option to apply.
   *
   * @return {Promise}
   */
  async selectFilterOption(filter, filterOption) {
    const filterOptionElement = await this._getFilterOption(filter, filterOption);
    const filterOptionCheckbox = this._getFilterOptionCheckbox(filterOptionElement);

    await filterOptionCheckbox.click();
  }
  /**
   * Get filter.
   *
   * @param {String} filter  The filter to get.
   *
   * @return {ElementFinder}
   *
   * @access protected
   */
  _getFilter(filter) {
    const filterElement = this.getElementWithChildByText(
      this.filters,
      by.className('odsFilterBar_filters_item_title_cta'),
      filter,
    );

    return filterElement;
  }
  /**
   * Get option checkbox from filter option.
   *
   * @param {ElementFinder} filterOptionElement  The option to get the checkbox.
   *
   * @return {ElementFinder}
   *
   * @access protected
   */
  _getFilterOptionCheckbox(filterOptionElement) {
    const filterOptionCheckbox = filterOptionElement.element(by.className('odsCheckbox_checkbox'));

    return filterOptionCheckbox;
  }
  /**
   * Expand filter.
   *
   * @param {ElementFinder} filterElement  The filter to expand.
   *
   * @return {Promise}
   *
   * @access protected
   */
  async _expandFilter(filterElement) {
    const filterClass = await filterElement.getAttribute('class');
    const isFilterExpanded = filterClass.includes('expanded');

    if (!isFilterExpanded) {
      await filterElement.click();
    }
  }
  /**
   * Get option from filter.
   *
   * @param {String} filter        The filter to apply.
   * @param {String} filterOption  The option to apply.
   *
   * @return {ElementFinder}
   *
   * @access protected
   */
  async _getFilterOption(filter, filterOption) {
    const filterElement = this._getFilter(filter);
    const filterOptions = filterElement.all(by.className('odsFilterBar_filters_item_values_item'));
    const filterOptionElement = this.getElementWithChildByText(
      filterOptions,
      by.className('odsCheckbox_label'),
      filterOption,
    );

    await this._expandFilter(filterElement);

    return filterOptionElement;
  }
}

module.exports = ContentPage;
