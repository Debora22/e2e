/**
 * @name BasePage
 * @description
 * This is the base page to be used by the rest of pages.
 */
class BasePage {
  constructor() {
    /**
     * The local reference to the `confirmation` object.
     *
     * @type {ElementFinder}
     */
    this.confirmation = element(by.className('odsConfirmation_content'));
    /**
     * The local reference to the `mainMenu` object.
     *
     * @type {ElementFinder}
     */
    this.mainMenu = element(by.className('odsMenu_navWrapper'));
    /**
     * The local reference to the `notification` object.
     *
     * @type {ElementFinder}
     */
    this.notification = element(by.className('odsNotifications_notification'));
    /**
     * The local reference to the `sortTypeEnum` map.
     *
     * @type {Object}
     */
    this.sortTypeEnum = {
      DESCENDING: 'Descending',
      ASCENDING: 'Ascending',
    };
  }
  /**
   * Get the element from a list whose child contains an attribute with the provided text.
   *
   * @param {ElementArrayFinder} list           The list of elements to get from.
   * @param {String}             attributeName  The name of the attribute to search by.
   * @param {String}             attributeText  The text of the attribute to compare.
   *
   * @return {ElementFinder}
   */
  getElementWithChildByAttribute(list, attributeName, attributeText) {
    const filteredList = list.filter(async (item) => {
      const itemAttributeText = await item.getAttribute(attributeName);

      return itemAttributeText === attributeText;
    });

    return filteredList.first();
  }
  /**
   * Get the element from a list whose child contains the provided text.
   *
   * @param {ElementArrayFinder} list          The list of elements to get from.
   * @param {ProtractorBy}       childLocator  The locator for the child.
   * @param {String}             text          The text of the child to search.
   *
   * @return {ElementFinder}
   */
  getElementWithChildByText(list, childLocator, text) {
    const filteredList = list.filter(async (item) => {
      const itemText = await item.element(childLocator).getText();

      return itemText === text;
    });

    return filteredList.first();
  }
  /**
   * Get the error element of a given dropdown.
   *
   * @param {ElementFinder} dropdown  The dropdown to get the error element from.
   *
   * @return {ElementFinder}
   */
  getErrorOfDropdown(dropdown) {
    return dropdown.element(by.className('odsDropdown_message'));
  }
  /**
   * Get the error element of a given input.
   *
   * @param {ElementFinder} input  The input to get the error element from.
   *
   * @return {ElementFinder}
   */
  getErrorOfInput(input) {
    return input.element(by.className('odsInput_message'));
  }
  /**
   * Transform a natural position string to a index number.
   *
   * @param {String} position  The position to get the index from.
   *
   * @return {Number}
   */
  getIndexOfNaturalPosition(position) {
    const index = Number(position);

    return index - 1;
  }
  /**
   * Get count of elements from a list based on child locator.
   *
   * @param {ElementArrayFinder} list          The list of elements to get from.
   * @param {ProtractorBy}       childLocator  The locator for the child.
   *
   * @return {Number}
   */
  getNumberOfChildElementsWithLocator(list, childLocator) {
    const elements = list.all(childLocator);

    return elements.count();
  }
  /**
   * Validate if the list is sorted by option.
   *
   * @param {Array}  list    The list for validating sorting.
   * @param {String} option  The option of sorting.
   *
   * @return {Boolean}
   */
  isListSorted(list, option) {
    switch (option) {
    case this.sortTypeEnum.DESCENDING:
      return !!list.reduce((n, item) => n !== false && item <= n && item);
    case this.sortTypeEnum.ASCENDING:
      return !!list.reduce((n, item) => n !== false && item >= n && item);
    default:
      return false;
    }
  }
  /**
   * Wait for the given url pattern to be present in the browser.
   *
   * @param {RegExp} urlPattern  The url pattern to be present.
   *
   * @return {Promise}
   */
  waitForUrl(urlPattern) {
    return browser.wait(() => (
      browser.getCurrentUrl().then((url) => urlPattern.test(url))
    ));
  }
  /**
   * Accept the current visible Confirmation.
   *
   * @return {Promise}
   */
  async acceptConfirmation() {
    await this.confirmation.element(by.className('-confirmationConfirmAction')).click();
  }
  /**
   * Change a onOffToggle.
   *
   * @param {ElementFinder} onOffToggle  The onOffToggle to change.
   * @param {String}        value        The value to set.
   *
   * @return {Promise}
   */
  async changeOnOffToggle(onOffToggle, value) {
    const currentValue = await onOffToggle.element(by.css('label')).getText();

    if (currentValue !== value) {
      await onOffToggle.element(by.className('odsOnOffToggle_checkbox')).click();
    }
  }
  /**
   * Clear a given searchBox.
   *
   *  @param {ElementFinder} searchBox  The searchBox to select the suggestion.
   *
   * @return {Promise}
   */
  async clearSearchBox(searchBox) {
    await searchBox.element(by.className('odsSearchBox_searchWrapper_clear')).click();
  }
  /**
   * Scroll to element.
   *
   * @param {ElementFinder} element  The element to scroll to.
   *
   * @return {Promise}
   */
  async scrollToElement(element) {
    await browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
  }
  /**
   * Select an option of a given dropdown.
   *
   * @param {ElementFinder} dropdown  The dropdown to select the option.
   * @param {String}        option    The option to select.
   *
   * @return {Promise}
   */
  async selectDropdownOption(dropdown, option) {
    await dropdown.element(by.className('odsDropdown_dropdown')).click();
    await dropdown.element(by.cssContainingText('.odsDropdown_options', option)).click();
  }
  /**
   * Select a suggestion of a given searchBox.
   *
   * @param {ElementFinder} searchBox   The searchBox to select the suggestion.
   * @param {String}        suggestion  The suggestion to select.
   *
   * @return {Promise}
   */
  async selectSearchBoxSuggestion(searchBox, suggestion) {
    const suggestionsWrapper = searchBox.element(by.className('odsSearchBox_suggestionsWrapper'));
    const suggestionsItem = suggestionsWrapper.element(by.cssContainingText(
      '.odsSearchBox_suggestionsWrapper_item',
      suggestion,
    ));

    await suggestionsItem.click();
  }
  /**
   * Set a value to the given input.
   *
   * @param {ElementFinder} input  The input to set the value.
   * @param {String}        value  The value to set.
   *
   * @return {Promise}
   */
  async setInputValue(input, value) {
    await input.clear();
    await input.sendKeys(value);
  }
}

module.exports = BasePage;
