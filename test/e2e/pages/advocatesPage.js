const BasePage = require('./basePage');

/**
 * @name AdvocatesPage
 * @description This is the page for the advocates section.
 *
 * @extends BasePage
 */
class AdvocatesPage extends BasePage {
  constructor() {
    super();
    /**
     * The local reference to the `advocatesSearchBox` object.
     *
     * @type {ElementFinder}
     */
    this.advocatesSearchBox = element(by.className('odsSearchBox_searchWrapper'));
    /**
     * The local reference to the `advocatesSearchBoxInput` object.
     *
     * @type {ElementFinder}
     */
    this.advocatesSearchBoxInput = element(by.className('odsSearchBox_searchWrapper_text'));
    /**
     * The local refernce to the `searchButton` object.
     *
     * @type {ElementFinder}
     */
    this.searchButton = element(by.className('odsSearchBox_searchWrapper_button'));
    /**
     * The local refernce to the `dropDownSort` object.
     *
     * @type {ElementFinder}
     */
    this.dropDownSorting = element.all(by.className('odsDropdown_dropdownContainer')).first();
    /**
     * The local refernce to the `dropDownDateRange` object.
     *
     * @type {ElementFinder}
     */
    this.dropDownDateRange = element.all(by.className('odsDropdown_dropdownContainer')).last();
  }
  /**
   * Go to advocates page.
   *
   * @return {Promise}
   */
  go() {
    return browser.get('/advocates');
  }
  /**
   * Filter advocates by username.
   *
   * @param {String} username  The filter to get.
   *
   * @return {Promise}
   */
  async filterAdvocatesByUsername(username) {
    await this.setInputValue(this.advocatesSearchBoxInput, username);
  }
  /**
   * Validate if an advocate is present in list by userName.
   *
   * @param {String} userName  The advocate userName to validate.
   *
   * @return {Boolean}
   */
  async isAdvocatePersent(userName) {
    const list = element.all(by.className('advocatesRow_header_user_name'));
    const userList = await list.map((item) => item.getText());

    return userList.some((user) => user.includes(userName));
  }
  /**
   * Validates that advocates is correctly sorted by conversions.
   *
   * @param {String} option  The option to sort advocates list.
   *
   * @return {Boolean}
   */
  async isAdvocatesListSortedByConversions(option) {
    const list = element.all(by.className('advocatesRow_header_box_column_value_conversions'));
    const conversionsList = await list.map(async (item) => {
      const conversions = await item.getText();

      return parseInt(conversions, 10);
    });

    return this.isListSorted(conversionsList, option);
  }
  /**
   * Validates that advocates is correctly sorted by conversion rate.
   *
   * @param {String} option  The option to sort advocates list.
   *
   * @return {Boolean}
   */
  async isAdvocatesListSortedByConvertionRate(option) {
    const list = element.all(by.className('advocatesRow_header_box_column_value_cvr'));
    const convertionRateList = await list.map(async (item) => {
      const convertionRate = await item.getText();

      return parseFloat(convertionRate);
    });

    return this.isListSorted(convertionRateList, option);
  }
  /**
   * Validates that advocates is correctly sorted by lightBox views.
   *
   * @param {String} option  The option to sort advocates list.
   *
   * @return {Boolean}
   */
  async isAdvocatesListSortedByLightboxViews(option) {
    const list = element.all(by.className('advocatesRow_header_box_column_value -lightBoxViews'));
    const lightBoxViewsList = await list.map(async (item) => {
      const lightBoxViews = await item.getText();

      return parseInt(lightBoxViews, 10);
    });

    return this.isListSorted(lightBoxViewsList, option);
  }
  /**
   * Validates that advocates is correctly sorted by revenue.
   *
   * @param {String} option  The option to sort advocates list.
   *
   * @return {Boolean}
   */
  async isAdvocatesListSortedByRevenue(option) {
    const list = element.all(by.className('advocatesRow_header_box_column_value_revenue'));
    const revenueList = await list.map(async (item) => {
      const revenue = await item.getText();

      return parseFloat(revenue);
    });

    return this.isListSorted(revenueList, option);
  }
  /**
   * Sort advocates by option.
   *
   * @param {String} option  The sort option to apply.
   *
   * @return {Promise}
   */
  async sortAdvocates(option) {
    await this.selectDropdownOption(this.dropDownSorting, option);
  }
}
module.exports = AdvocatesPage;
