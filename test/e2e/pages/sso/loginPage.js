const BasePage = require('../basePage');

/**
 * @name LoginPage
 * @description
 * This is the page for the login section.
 *
 * @extends BasePage
 */
class LoginPage extends BasePage {
  constructor() {
    super();

    /**
     * The local reference to the `emailInput` object.
     *
     * @type {ElementFinder}
     */
    this.emailInput = element(by.id('login_email'));
    /**
     * The local reference to the `changeButton` object.
     *
     * @type {ElementFinder}
     */
    this.changeButton = element(by.css('.login_fieldActions .odsButton'));
    /**
     * The local reference to the `loginErrorMsg` object.
     *
     * @type {ElementFinder}
     */
    this.loginErrorMsg = element(by.className('ssoAuthBox_error'));
    /**
     * The local reference to the `passwordInput` object.
     *
     * @type {ElementFinder}
     */
    this.passwordInput = element(by.id('login_password'));
    /**
     * The local reference to the `submitButton` object.
     *
     * @type {ElementFinder}
     */
    this.submitButton = element(by.css('input.odsButton'));
  }
  /**
   * Logout from application.
   *
   * @return {Promise}
   */
  logout() {
    return browser.get('/logout');
  }
  /**
   * Login using `email` and `password` credentials.
   *
   * @param {String} email     The email to use to login.
   * @param {String} password  The password to use to login.
   *
   * @return {Promise}
   */
  async login(email, password) {
    const value = await this.emailInput.getAttribute('value');
    if (value !== email) {
      const disabled = await this.emailInput.getAttribute('disabled');

      if (disabled) {
        await this.changeButton.click();
      }

      await this.setInputValue(this.emailInput, email);
      await this.submitButton.click();
    }

    await this.setInputValue(this.passwordInput, password);
    await this.submitButton.click();
  }
}

module.exports = LoginPage;
