const {
  Before, When, Then,
} = require('cucumber');

const ModalPage = require('../../pages/modalPage');

let modalPage;

Before(() => {
  modalPage = new ModalPage();
});

// WHEN
When(/^user searches by "([^"].*)" stream name in the modal$/, async (streamSearch) => {
  await modalPage.setInputValue(
    modalPage.searchBoxInput,
    streamSearch,
  );
});

When(/^user (selects|views) the found stream "([^"].*)" in the modal$/, async (action, streamPosition) => {
  if (action === 'selects') {
    await modalPage.saveTaggedStreamByPosition(streamPosition);
    await modalPage.clickStreamAction(streamPosition, 'Select');
  } else {
    await modalPage.clickStreamAction(streamPosition, 'View');
  }
});

When(/^user presses the "([^"].*)" button in the modal$/, async (action) => {
  await modalPage.clickModalAction(action);
});

When(/^user closes the modal$/, async () => {
  await modalPage.close.click();
});

When(/^user clears tag to stream search in the modal$/, async () => {
  await modalPage.clearTagToStreamSearch();
});

When(/^user presses the "Cancel" button on tag to stream tab in modal$/, async () => {
  await modalPage.cancelTagToStreamButton.click();
});

// THEN
Then(/^user should see the "Add stream" button is present in the modal$/, async () => {
  const isPresent = await modalPage.addStream.isPresent();
  expect(isPresent).to.be.equal(true, 'Add stream button is not present.');
});

Then(/^user should see the media is tagged to the stream in the modal$/, async () => {
  const text = await modalPage.getTaggedStreamById(modalPage.taggedStreamId).getText();
  expect(text).to.contain(modalPage.taggedStreamId, `Stream with id "${modalPage.taggedStreamId}" not found.`);
});

Then('user should see the tag to stream search field contains {string}', async (expects) => {
  const text = await modalPage.searchBox.getText() || '';
  expect(text).be.equal(expects, `search box should contain '${expects}'.`);
});

Then(/^user should see the list of streams suggested by search is empty on Tag to Stream tab in modal$/, async () => {
  const result = await modalPage.searchStreamResults.isPresent();
  expect(result).be.equal(false, 'Stream search has not been cleared.');
});
