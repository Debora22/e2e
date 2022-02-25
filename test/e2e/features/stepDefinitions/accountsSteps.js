const { Before, When } = require('cucumber');

const AccountsPage = require('../../pages/sso/accountsPage');

let accountsPage;

Before(() => {
  accountsPage = new AccountsPage();
});

// WHEN
When(/^user selects "([^"].*)" account$/, async (accountName) => {
  await accountsPage.selectAccountByName(accountName);
});
