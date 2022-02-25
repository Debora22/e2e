const { Before, Given, Then } = require('cucumber');

const BasePage = require('../../pages/basePage');

let basePage;

const NOTIFICATION_TIMEOUT = 5000;

Before(() => {
  basePage = new BasePage();
});

// GIVEN
Given(/^user is in the Content Engine admin$/, async () => {
  await basePage.mainMenu.isPresent();
});

// THEN
Then(/^user should see the notification is displayed with text "([^"].*)"$/, async (notificationText) => {
  await browser.wait(basePage.notification.isPresent(), NOTIFICATION_TIMEOUT, 'Notification not displayed.');
  const text = await basePage.notification.getText();
  expect(text).to.be.equal(notificationText, 'Notification text was not correct.');
});
