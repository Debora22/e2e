const {
  Before, Given, When, Then,
} = require('cucumber');

const ContentPage = require('../../pages/contentPage');

let contentPage;

Before(() => {
  contentPage = new ContentPage();
});

// GIVEN
Given(/^user should see there is at least a media present$/, async () => {
  await contentPage.saveMediaByPosition(1);
});

// WHEN
When(/^user goes to "Content" page$/, async () => {
  await contentPage.go();
});

When(/^user refines media search by "([^"].*)" on "([^"].*)" filter$/, async (filterOption, filter) => {
  await contentPage.selectFilterOption(filter, filterOption);
});

When(
  /^user presses the "([^"].*)" main button from the library card of media "([^"].*)"$/,
  async (action, mediaPosition) => {
    await contentPage.clickMediaCardMainActionByPosition(action, mediaPosition);
  },
);

When(
  /^user presses the "([^"].*)" secondary button from the library card of media "([^"].*)"$/,
  async (action, mediaPosition) => {
    await contentPage.clickMediaCardSecondaryActionByPosition(action, mediaPosition);
  },
);

When(/^user goes to "([^"].*)" primary section$/, async (sectionName) => {
  await contentPage.goToContentMainSection(sectionName);
});

When(/^user goes to "([^"].*)" secondary section$/, async (sectionName) => {
  await contentPage.goToContentSecondarySection(sectionName);
});

When(/^user searches by the (?:approved|rights requested|discarded|saved for later) media id$/, async () => {
  await contentPage.setInputValue(
    contentPage.searchBoxInput,
    contentPage.mediaId,
  );
  await contentPage.searchButton.click();
});

When(/^user sorts media by "([^"].*)"$/, async (sortingOption) => {
  await contentPage.selectDropdownOption(contentPage.sortMediaDropdown, sortingOption);
});

When(/^user enters "([^"].*)" in content search$/, async (text) => {
  await contentPage.setInputValue(
    contentPage.searchBoxInput,
    text,
  );
});

When(/^user clears content search$/, async () => {
  await contentPage.clearContentSearch();
});

// THEN
Then(/^user should see the media searched by id is present$/, async () => {
  const check = await contentPage.checkMediaIdByPosition(1);
  expect(check).to.be.equal(true, 'Media id found is not correct.');
});

Then(/^user should see the media "([^"].*)" is tagged to stream "([^"].*)"$/, async (mediaPosition, streamName) => {
  const isPresent = await contentPage.getTaggedStreamOnMediaByName(streamName, mediaPosition).isPresent();
  expect(isPresent).to.be.equal(true, `Tagged stream "${streamName}" not present on media card.`);
});

Then(/^user should see the "([^"].*)" on "([^"].*)" filter is selected$/, async (filterOption, filter) => {
  const isSelected = await contentPage.isFilterOptionSelected(filter, filterOption);
  expect(isSelected).to.be.equal(true, 'The filter is not selected.');
});

Then(/^user should see the search summary "([^"].*)"$/, async (searchSummary) => {
  const text = await contentPage.searchSummary.getText();
  const paginationCount = await contentPage.getPaginationTotal();
  const searchSummaryReplaced = searchSummary.replace(
    '{TOTAL}',
    paginationCount,
  );

  expect(text).to.be.equal(searchSummaryReplaced, 'The search summary is not correct.');
});

Then(/^user should see "Reset all filters" option is displayed$/, async () => {
  const isDisplayed = await contentPage.resetAllFilters.isDisplayed();
  expect(isDisplayed).to.be.equal(true, 'Reset all filters option is not displayed.');
});

Then(
  /^user should see the "([^"].*)" filter has a tooltip stating "([^"].*)"$/,
  async (filter, tooltip) => {
    const selectedFilterTooltip = await contentPage.getFilterTooltipText(filter);
    expect(tooltip).to.be.equal(selectedFilterTooltip, 'The filter tooltip is not correct.');
  },
);

Then(/^user should see the media with id "([^"].*)" is in position "([^"].*)"$/, async (mediaId, mediaPosition) => {
  const mediaIdToCheck = await contentPage.getMediaIdByPosition(mediaPosition);
  expect(mediaId).to.be.equal(mediaIdToCheck, 'Media id does not match.');
});

Then('user should see the content search field contains {string}', async (expects) => {
  const text = await contentPage.searchBoxInput.getText();
  expect(text).be.equal(expects, `search box should contain '${expects}'.`);
});

Then(
  /^user should see the media count matches with "([^"].*)" on "([^"].*)" filter count$/,
  async (filterOption, filter) => {
    const mediaCount = await contentPage.medias.count();
    const filterCount = await contentPage.getFilterCount(filter, filterOption);
    expect(mediaCount).to.be.equal(filterCount, 'Media filtered count does not match with filter total.');
  },
);

Then(
  /^user should see the pagination total matches with "([^"].*)" on "([^"].*)" filter count$/,
  async (filterOption, filter) => {
    const paginationCountTop = await contentPage.getPaginationTotal(true);
    const paginationCountBottom = await contentPage.getPaginationTotal(false);
    const filterCount = await contentPage.getFilterCount(filter, filterOption);
    expect(paginationCountTop).to.be.equal(
      filterCount,
      'Media filtered count does not match with pagination top total.',
    );
    expect(paginationCountBottom).to.be.equal(
      filterCount,
      'Media filtered count does not match with pagination bottom total.',
    );
  },
);

Then(/^user should see the pagination total matches with media count$/, async () => {
  const paginationCountTop = await contentPage.getPaginationTotal(true);
  const paginationCountBottom = await contentPage.getPaginationTotal(false);
  const mediaCount = await contentPage.medias.count();
  expect(paginationCountTop).to.be.equal(
    mediaCount,
    'Media count does not match with pagination top total.',
  );
  expect(paginationCountBottom).to.be.equal(
    mediaCount,
    'Media count does not match with pagination bottom total.',
  );
});

Then(
  /^user should see the media with "([^"].*)" rights status count matches with "([^"].*)" on "([^"].*)" filter count$/,
  async (rightsStatus, filterOption, filter) => {
    const mediaCount = await contentPage.getMediaRightsStatusCount(rightsStatus);
    const filterCount = await contentPage.getFilterCount(filter, filterOption);
    expect(mediaCount).to.be.equal(filterCount, 'Media count does not match with filter total.');
  },
);

Then(
  /^user should see the media with "([^"].*)" rights status count matches the pagination total$/,
  async (rightsStatus) => {
    const paginationCountTop = await contentPage.getPaginationTotal(true);
    const paginationCountBottom = await contentPage.getPaginationTotal(false);
    const mediaCount = await contentPage.getMediaRightsStatusCount(rightsStatus);
    expect(paginationCountTop).to.be.equal(
      mediaCount,
      'Media count does not match with pagination top total.',
    );
    expect(paginationCountBottom).to.be.equal(
      mediaCount,
      'Media count does not match with pagination bottom total.',
    );
  },
);

Then(/^user should see all the media filtered has "([^"].*)" rights status$/, async (rightsStatus) => {
  const mediaWithRightsStatusCount = await contentPage.getMediaRightsStatusCount(rightsStatus);
  const mediaCount = await contentPage.medias.count();
  expect(mediaCount).to.be.equal(mediaWithRightsStatusCount, 'There is media present with wrong rights status.');
});

Then(/^user should see the default sorting option is "([^"].*)"$/, async (sortingOption) => {
  const defaultSortingOption = await contentPage.sortMediaDropdown.getText();
  expect(defaultSortingOption).to.contain(sortingOption.toUpperCase(), 'The sorting option is not correct.');
});
