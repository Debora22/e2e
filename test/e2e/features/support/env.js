const {
  setDefaultTimeout, Before,
} = require('cucumber');

const defaultTimeout = 60000;

/**
 * The setDefaultTimeOut function on env.js, is intended to add more time for
 * Scenarios that at verification takes more time than usual, this
 * is generally used because the application takes too long.
 */
setDefaultTimeout(defaultTimeout);

/**
 * This before scenario, is in charge of being called by cucumber
 * to add scenario info.
 */
Before(async () => {
  await browser.driver.manage().deleteAllCookies();
});
