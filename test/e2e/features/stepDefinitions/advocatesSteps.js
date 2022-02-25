const { Before, Then, When } = require('cucumber');

const AdvocatesPage = require('../../pages/advocatesPage');

let advocatesPage;

Before(() => {
  advocatesPage = new AdvocatesPage();
});

// WHEN
When(/^user goes to "Advocates" page$/, async () => {
  await advocatesPage.go();
});

When(/^user searches by "([^"]*)" username$/, async (username) => {
  await advocatesPage.filterAdvocatesByUsername(username);
  await advocatesPage.searchButton.click();
});

When(/^user sorts advocates by "([^"].*)"$/, async (sortingOption) => {
  await advocatesPage.sortAdvocates(sortingOption);
});

// THEN
Then(/^user should see the advocate searched by username contains username equals to "([^"].*)"$/, async (username) => {
  const advocate = await advocatesPage.isAdvocatePersent(username);
  expect(advocate).to.be.equal(true, `Advocate user name not found ${username}`);
});

Then(/^user should see advocates list sorted by Revenue "([^"].*)"$/, async (sortingOption) => {
  const isSorted = await advocatesPage.isAdvocatesListSortedByRevenue(sortingOption);
  expect(isSorted).to.be.equal(true, `Advocated list is not sorted by Revenue ${sortingOption}`);
});

Then(/^user should see advocates list sorted by Conversions "([^"].*)"$/, async (sortingOption) => {
  const isSorted = await advocatesPage.isAdvocatesListSortedByConversions(sortingOption);
  expect(isSorted).to.be.equal(true, `Advocated list is not sorted by Conversions ${sortingOption}`);
});

Then(/^user should see advocates list sorted by Lightbox Views "([^"].*)"$/, async (sortingOption) => {
  const isSorted = await advocatesPage.isAdvocatesListSortedByLightboxViews(sortingOption);
  expect(isSorted).to.be.equal(true, `Advocated list is not sorted by Lightbox Views ${sortingOption}`);
});

Then(/^user should see advocates list sorted by Conversion Rate "([^"].*)"$/, async (sortingOption) => {
  const isSorted = await advocatesPage.isAdvocatesListSortedByConvertionRate(sortingOption);
  expect(isSorted).to.be.equal(true, `Advocated list is not sorted by Conversion Rate ${sortingOption}`);
});
