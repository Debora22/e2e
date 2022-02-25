const {
  Before, Given, Then, When,
} = require('cucumber');

const LoginPage = require('../../pages/sso/loginPage');

let loginPage;

Before(() => {
  loginPage = new LoginPage();
});

// GIVEN
Given(/^user is on the login page$/, async () => {
  await loginPage.logout();
});

// WHEN
When(/^user sends incorrect access credentials$/, async () => {
  await loginPage.login('invalid@username.com', 'crazy_password');
});

When(/^user sends correct access credentials$/, async () => {
  await loginPage.login('olapiclemur+fe@gmail.com', 'Automationf3');
});

When(/^user logs out$/, async () => {
  await loginPage.logout();
});

// THEN
Then(/^user is not logged in$/, async () => {
  const isDisplayed = await loginPage.loginErrorMsg.isDisplayed();
  expect(isDisplayed).to.be.equal(true, 'Login error not found.');
});

Then(/^user sees an error message "([^"].*)" is shown$/, async (errorMessage) => {
  const text = await loginPage.loginErrorMsg.getText();
  expect(text).to.be.equal(errorMessage);
});

Then(/^user is correctly logged in$/, async () => {
  const isPresent = await loginPage.loginErrorMsg.isPresent();
  expect(isPresent).to.be.equal(false, 'Login error message displayed.');
});
