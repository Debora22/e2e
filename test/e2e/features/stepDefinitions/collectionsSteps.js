const { Before, Then, When } = require('cucumber');

const CollectionsPage = require('../../pages/collectionsPage');

let collectionsPage;

Before(() => {
  collectionsPage = new CollectionsPage();
});

// GIVEN
When(/^user sees collections list is empty$/, async () => {
  await collectionsPage.deleteAll();
});

When(/^user deletes collection number "([^"]*)"$/, async (collectionPosition) => {
  await collectionsPage.deleteCollection(collectionPosition);
});

// WHEN
When(/^user goes to "Collections" page$/, async () => {
  await collectionsPage.go();
});

When(/^user opens the new collection form$/, async () => {
  await collectionsPage.createButton.click();
});

When(/^user enters the collection name "([^"]*)"$/, async (collectionName) => {
  await collectionsPage.setInputValue(
    collectionsPage.newCollectionName,
    collectionName,
  );
});

When(/^user selects the collection type "([^"]*)"$/, async (collectionType) => {
  await collectionsPage.selectType(collectionType);
});

When(/^user selects the mention handler "([^"]*)"$/, async (mentionHandler) => {
  await collectionsPage.selectMentionHandler(mentionHandler);
});

When(/^user submits the new collection$/, async () => {
  await collectionsPage.submitButton.click();
});

When(/^user enters the collection base "([^"]*)"$/, async (collectionBase) => {
  await collectionsPage.setInputValue(
    collectionsPage.newCollectionBaseValue,
    collectionBase,
  );
});

When(/^user clicks on "Add rule" button$/, async () => {
  await collectionsPage.addRule.click();
});

When(/^user clicks on "Add stream" button$/, async () => {
  await collectionsPage.addStream.click();
});

When(
  /^user selects the operator "(including|excluding)" for rule number "([^"]*)"$/,
  async (ruleOperator, rulePosition) => {
    await collectionsPage.selectRuleOperator(ruleOperator, rulePosition);
  },
);

When(/^user removes the rule number "([^"]*)"$/, async (rulePosition) => {
  await collectionsPage.removeRuleByPosition(rulePosition);
});

When(
  /^user selects the type "(hashtag|user profile|user mention)" for rule number "([^"]*)"$/,
  async (ruleType, rulePosition) => {
    await collectionsPage.selectRuleType(ruleType, rulePosition);
  },
);

When(/^user enters the value "([^"]*)" for rule number "([^"]*)"$/, async (ruleValue, rulePosition) => {
  await collectionsPage.setRuleValue(ruleValue, rulePosition);
});

When(/^user searches "([^"]*)" for stream number "([^"]*)"$/, async (streamName, streamPosition) => {
  await collectionsPage.setStreamSearch(streamName, streamPosition);
});

When(/^user selects suggestion "([^"]*)" for stream number "([^"]*)"$/, async (streamName, streamPosition) => {
  await collectionsPage.selectStreamSuggestion(streamName, streamPosition);
});

When(/^user removes the stream number "([^"]*)"$/, async (streamPosition) => {
  await collectionsPage.removeStreamByPosition(streamPosition);
});

When(/^user scrolls down to streams$/, async () => {
  await collectionsPage.scrollToStream();
});

When(/^user turns (off|on) the collection number "([^"]*)"$/, async (status, collectionPosition) => {
  await collectionsPage.changeStatus(status, collectionPosition);
});

When(/^user applies (showing|sorting) filter "([^"]*)"$/, async (filter, option) => {
  await collectionsPage.applyFilter(filter, option);
});

When(/^user (?:enables|disables) the media type checkbox "photos"$/, async () => {
  await collectionsPage.photosCheckbox.click();
});

When(/^user (?:enables|disables) the media type checkbox "videos"$/, async () => {
  await collectionsPage.videosCheckbox.click();
});

When(/^user clicks on Edit the collection number "([^"]*)"$/, async (collectionPosition) => {
  await collectionsPage.editCollectionByPosition(collectionPosition);
});

// THEN
Then(
  /^user should see the collection number "([^"]*)" with name "([^"]*)"$/,
  async (collectionPosition, collectionName) => {
    const text = await collectionsPage.getCollectionNameByPosition(collectionPosition).getText();
    expect(text).to.be.equal(collectionName, 'The collection name is not correct.');
  },
);

Then(
  /^user should see the collection number "([^"]*)" with description "([^"]*)"$/,
  async (collectionPosition, collectionDescription) => {
    const text = await collectionsPage.getCollectionDescriptionByPosition(collectionPosition).getText();
    expect(text).to.be.equal(collectionDescription, 'The collection description is not correct.');
  },
);

Then(/^user should see the collection number "([^"]*)" status is "(OFF|ON)"$/, async (collectionPosition, status) => {
  const text = await collectionsPage.getStatus(collectionPosition).getText();
  expect(text.toUpperCase()).to.be.equal(status, 'The collection status is not correct.');
});

Then(/^user should see the error "([^"]*)" for collection name$/, async (error) => {
  const text = await collectionsPage.newCollectionNameError.getText();
  expect(text).to.be.equal(error, 'The collection name error is not correct.');
});

Then(/^user should see the error "([^"]*)" on rule number "([^"]*)" type$/, async (error, rulePosition) => {
  const text = await collectionsPage.getRuleTypeError(rulePosition).getText();
  expect(text).to.be.equal(error, 'The rule type error is not correct.');
});

Then(/^user should see collections list empty$/, async () => {
  const empty = await collectionsPage.isEmpty();
  expect(empty).to.be.equal(true, 'The list of collections is not empty.');
});
