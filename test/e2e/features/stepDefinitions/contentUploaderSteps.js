const { Before, When, Then } = require('cucumber');

const ContentUploaderPage = require('../../pages/contentUploaderPage');

let contentUploaderPage;

Before(() => {
  contentUploaderPage = new ContentUploaderPage();
});

// WHEN
When(/^user goes to "Content Uploader" page$/, async () => {
  await contentUploaderPage.go();
});

When(/^user browse a photo named "(.*)" from computer$/, async (fileName) => {
  await contentUploaderPage.browse(fileName);
});

When(/^user clicks on "Upload" button$/, async () => {
  await contentUploaderPage.upload();
});

When(/^user deletes photo number "(\d+)" from preview$/, async (position) => {
  await contentUploaderPage.deleteMediaInPreviewByPosition(position);
});

When(/^user clicks the "Edit" button on photo "(\d+)"$/, async (position) => {
  await contentUploaderPage.editMediaInPreviewByPosition(position);
});

When(/^user writes the caption "(.*)" on edit window$/, async (caption) => {
  await contentUploaderPage.editCaptionForSelectedMedia(caption);
});

When(/^user saves changes on edit window$/, async () => {
  await contentUploaderPage.modalSaveChanges.click();
});

When(/^user cancels edition$/, async () => {
  await contentUploaderPage.cancelEdition();
});

When(/^user clicks on "Add keywords" button$/, async () => {
  await contentUploaderPage.addKeywordsButtonOnBottomBar.click();
});

When(/^user clicks on "Tag to Stream" button$/, async () => {
  await contentUploaderPage.addStreamsButtonOnBottomBar.click();
});

When(/^user clicks on "\+ Add keywords" on edition modal and enter the keyword "(.*)"$/, async (keywords) => {
  await contentUploaderPage.addKeywordAction(keywords);
});

When(/^user deletes the keyword "(.*)" in position "(\d+)"$/, async (keyword, position) => {
  await contentUploaderPage.keywordDeletesByPosition(position);
});

When(/^user clicks on "\(change\)" to edit username$/, async () => {
  await contentUploaderPage.changeUsernameButton.click();
});

When(/^user writes the username as "(.*)" in modal$/, async (username) => {
  await contentUploaderPage.writeUsername(username);
});

When(/^user clicks on "save" button in modal$/, async () => {
  await contentUploaderPage.saveUsernameButton.click();
});

When(/^user closes the content uploader modal$/, async () => {
  await contentUploaderPage.closeModalX.click();
});

Then(/^user should see the empty preview has the legend "(.*)"$/, async (expects) => {
  const text = await contentUploaderPage.emptyContentMedia.getText();
  expect(text).be.equal(expects, `preview should show the message: '${expects}'.`);
});

Then(/^user should see "(.*)" on preview$/, async (expects) => {
  const text = await contentUploaderPage.contentMediaText.getText();
  expect(text).contains(expects, `preview should show the message: '${expects}'.`);
});

Then(/^user should see the keyword "(.*)" in position "(\d+)" added in modal$/, async (keyword, position) => {
  const index = contentUploaderPage.getIndexOfNaturalPosition(position);
  const keywordAdded = await contentUploaderPage.addedKeywords.get(index).getText();
  expect(keywordAdded).be.equal(keyword, `Keyword '${keyword}' was not found in position '${position}'.
  Was found'${keywordAdded}' instead.`);
});

Then(/^user should see "(\d+)" keywords in modal$/, async (expects) => {
  const numberOfKeywordsAdded = await contentUploaderPage.addedKeywords.count();
  expect(numberOfKeywordsAdded).be.equal(expects, `Expects to find '${expects}' keyword(s)
  instead of '${numberOfKeywordsAdded}'.`);
});

Then(/^user should see the message "(.*)" under username box in modal$/, async (expects) => {
  const text = await contentUploaderPage.usernameMessage.getText();
  expect(text).be.equal(expects, `Expects to find '${expects}' instead of '${text}'.`);
});
