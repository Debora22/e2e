const BasePage = require('../basePage');

/**
 * @name AccountsPage
 * @description
 * This is the page for the accounts section.
 *
 * @extends BasePage
 */
class AccountsPage extends BasePage {
  constructor() {
    super();

    /**
     * The local reference to the `accountsListContainer` object.
     *
     * @type {ElementFinder}
     */
    this.accountsListContainer = element(by.className('ssoAccountSelector_accounts'));
    /**
     * The local reference to the `accountsList` object.
     *
     * @type {ElementArrayFinder}
     */
    this.accountsList = this.accountsListContainer.all(by.className('ssoAccountSelector_accountButton'));
  }
  /**
   * Select customer account by name.
   *
   * @param {String} accountName  The name of the account to select.
   *
   * @return {Promise}
   */
  async selectAccountByName(accountName) {
    await this.waitForUrl(/\/success|\/content/).catch(() => {});

    const isAccountsPage = await this.accountsListContainer.isPresent();

    if (isAccountsPage) {
      const account = this.getElementWithChildByText(
        this.accountsList,
        by.className('ssoAccountSelector_accountText'),
        accountName,
      );

      await account.click();
    }
  }
}

module.exports = AccountsPage;
