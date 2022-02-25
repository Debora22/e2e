const BasePage = require('./basePage');

/**
 * @name ContentPage
 * @description
 * This is the page for the rights messages section.
 *
 * @extends BasePage
 */
class RightsMessagesPage extends BasePage {
  constructor() {
    super();

    /**
     * The local reference to the `createButton` object.
     *
     * @type {ElementFinder}
     */
    this.createButton = element(by.className('rightsMessages_header_button'));
    /**
     * The local reference to the `rightsGroupName` object.
     *
     * @type {ElementFinder}
     */
    this.rightsGroupName = element(by.id('rightsGroupName'));
    /**
     * The local reference to the `rightsApprovalHashtag` object.
     *
     * @type {ElementFinder}
     */
    this.rightsApprovalHashtag = element(by.id('rightsApprovalHashtag'));
    /**
     * The local reference to the `rightsTosUrl` object.
     *
     * @type {ElementFinder}
     */
    this.rightsTosUrl = element(by.id('rightsTOS'));
    /**
     * The local reference to the `groups` object.
     *
     * @type {ElementArrayFinder}
     */
    this.groups = element(by.className('rightsMessages_table_body'))
    .all(by.className('rightsMessages_table_body_row'));
    /**
     * The local reference to the `messages` object.
     *
     * @type {ElementArrayFinder}
     */
    this.messages = element(by.className('rightsMessagesForm_content_body_messages'))
    .all(by.className('rightsMessagesForm_content_body_messages_item'));
    /**
     * The local reference to the `back` object.
     *
     * @type {ElementFinder}
     */
    this.back = element(by.className('rightsMessagesForm_footer')).element(by.buttonText('Back'));
    /**
     * The local reference to the `save` object.
     *
     * @type {ElementFinder}
     */
    this.save = element(by.className('rightsMessagesForm_footer')).element(by.buttonText('Save'));
    /**
     * The local reference to the `emptyGroupPage` object.
     *
     * @type {ElementFinder}
     */
    this.emptyGroupPage = element(by.className('rightsMessages_table_body_empty'));
  }
  /**
   * Get empty group page content.
   *
   * @return {ElementFinder}
   */
  getEmptyGroupContent() {
    return this.emptyGroupPage.element(by.className('rightsMessages_table_body_empty_content'));
  }
  /**
   * Get body input field form rights message form by position.
   *
   * @param {String} rightsMessagePosition  The position to get the rights message from.
   *
   * @return {ElementFinder}
   */
  getMessageBodyInputByPosition(rightsMessagePosition) {
    const index = this.getIndexOfNaturalPosition(rightsMessagePosition);

    return element(by.id(`message${index}Message`));
  }
  /**
   * Get name input field form rights message form by position.
   *
   * @param {String} rightsMessagePosition  The position to get the rights message from.
   *
   * @return {ElementFinder}
   */
  getMessageNameInputByPosition(rightsMessagePosition) {
    const index = this.getIndexOfNaturalPosition(rightsMessagePosition);

    return element(by.id(`message${index}Name`));
  }
  /**
   * Get social network dropdown form rights message form by position.
   *
   * @param {String} rightsMessagePosition  The position to get the rights message from.
   *
   * @return {ElementFinder}
   */
  getMessageSocialNetworkDropdownByPosition(rightsMessagePosition) {
    const rightsMessageFormElement = this.getRightsMessageFormByPosition(rightsMessagePosition);

    return rightsMessageFormElement.element(by.className('odsDropdown_dropdownContainer'));
  }
  /**
   * Get next submit button form rights message form by position.
   *
   * @param {String} rightsMessagePosition  The position to get the rights message from.
   *
   * @return {ElementFinder}
   */
  getNextSubmitButtonByPosition(rightsMessagePosition) {
    const rightsMessageFormElement = this.getRightsMessageFormByPosition(rightsMessagePosition);

    return rightsMessageFormElement.element(by.className('odsButton'));
  }
  /**
   * Get rights group by position.
   *
   * @param {String} rightsGroupPosition  The position to get the rights group.
   *
   * @return {ElementFinder}
   */
  getRightsGroupByPosition(rightsGroupPosition) {
    const index = this.getIndexOfNaturalPosition(rightsGroupPosition);

    return this.groups.get(index);
  }
  /**
   * Get rights group delete by position.
   *
   * @param {String} rightsGroupPosition  The position to get the group name.
   *
   * @return {ElementFinder}
   */
  getRightsGroupDeleteByPosition(rightsGroupPosition) {
    const group = this.getRightsGroupByPosition(rightsGroupPosition);

    return group.element(by.className('rightsMessages_table_body_row_header_tools')).element(by.buttonText('Delete'));
  }
  /**
   * Get rights group name by position.
   *
   * @param {String} rightsGroupPosition  The position to get the group name.
   *
   * @return {ElementFinder}
   */
  getRightsGroupNameByPosition(rightsGroupPosition) {
    const group = this.getRightsGroupByPosition(rightsGroupPosition);

    return group.element(by.className('rightsMessages_table_body_row_header_name'));
  }
  /**
   * Get rights group social network status by position.
   *
   * @param {String} socialNetwork        The social network to get status from.
   * @param {String} rightsGroupPosition  The position to get the group name.
   *
   * @return {ElementFinder}
   */
  getRightsGroupSocialNetworkStatusByPosition(socialNetwork, rightsGroupPosition) {
    const elementIndex = socialNetwork === 'Instagram' ? 0 : 1;
    const group = this.getRightsGroupByPosition(rightsGroupPosition);

    return group.all(by.className('rightsMessages_table_body_row_header_networks_item')).get(elementIndex);
  }
  /**
   * Get rights message social network icon from a group by position.
   *
   * @param {String} rightsMessagePosition  The position of the rights message in the group.
   * @param {String} rightsGroupPosition    The position of the group.
   *
   * @return {ElementFinder}
   */
  getRightsMessageDeleteByPosition(rightsMessagePosition, rightsGroupPosition) {
    const group = this.getRightsGroupByPosition(rightsGroupPosition);
    const message = this._getRightsMessageByPosition(group, rightsMessagePosition);
    const deleteButton = message.element(by.buttonText('Delete'));

    return deleteButton;
  }
  /**
   * Get rights message by position.
   *
   * @param {String} rightsMessagePosition  The position to get the rights message from.
   *
   * @return {ElementFinder}
   */
  getRightsMessageFormByPosition(rightsMessagePosition) {
    const index = this.getIndexOfNaturalPosition(rightsMessagePosition);

    return this.messages.get(index);
  }
  /**
   * Get rights message name from a group by position.
   *
   * @param {String} rightsMessagePosition  The position of the rights message in the group.
   * @param {String} rightsGroupPosition    The position of the group.
   *
   * @return {ElementFinder}
   */
  getRightsMessageNameFromGroupByPosition(rightsMessagePosition, rightsGroupPosition) {
    const group = this.getRightsGroupByPosition(rightsGroupPosition);
    const message = this._getRightsMessageByPosition(group, rightsMessagePosition);

    return message.element(by.className('rightsMessages_table_body_row_messages_row_name'));
  }
  /**
   * Get rights message social network icon from a group by position.
   *
   * @param {String} rightsMessagePosition  The position of the rights message in the group.
   * @param {String} rightsGroupPosition    The position of the group.
   *
   * @return {ElementFinder}
   */
  getRightsMessageSocialNetworkIconClassFromGroupByPosition(rightsMessagePosition, rightsGroupPosition) {
    const group = this.getRightsGroupByPosition(rightsGroupPosition);
    const message = this._getRightsMessageByPosition(group, rightsMessagePosition);
    const socialNetworkIconClass = message
    .element(by.className('rightsMessages_table_body_row_messages_row_name_icon')).getAttribute('class');

    return socialNetworkIconClass;
  }
  /**
   * Go to rights messages page.
   *
   * @return {Promise}
   */
  go() {
    return browser.get('/rights-messages');
  }
  /**
   * Get rights message from a group by position.
   *
   * @param {ElementFinder} groupElement           The group element to get the rights message from.
   * @param {String}        rightsMessagePosition  The position to get the rights message from.
   *
   * @return {ElementFinder}
   *
   * @access protected
   */
  _getRightsMessageByPosition(groupElement, rightsMessagePosition) {
    const index = this.getIndexOfNaturalPosition(rightsMessagePosition);
    const messages = groupElement.all(by.className('rightsMessages_table_body_row_messages_row'));

    return messages.get(index);
  }
}

module.exports = RightsMessagesPage;
