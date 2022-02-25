const {
  Before, When, Then,
} = require('cucumber');

const RightsMessagesPage = require('../../pages/rightsMessagesPage');

let rightsMessagesPage;

Before(() => {
  rightsMessagesPage = new RightsMessagesPage();
});

// WHEN
When(/^user goes to "Rights Messages" page$/, async () => {
  await rightsMessagesPage.go();
});

When(/^user opens the new messages group form$/, async () => {
  await rightsMessagesPage.createButton.click();
});

When(/^user enters the group name "([^"]*)"$/, async (rightsGroupName) => {
  await rightsMessagesPage.setInputValue(
    rightsMessagesPage.rightsGroupName,
    rightsGroupName,
  );
});

When(/^user enters the group approval hashtag "([^"]*)"$/, async (rightsApprovalHashtag) => {
  await rightsMessagesPage.setInputValue(
    rightsMessagesPage.rightsApprovalHashtag,
    rightsApprovalHashtag,
  );
});

When(/^user enters the group tos url "([^"]*)"$/, async (rightsTosUrl) => {
  await rightsMessagesPage.setInputValue(
    rightsMessagesPage.rightsTosUrl,
    rightsTosUrl,
  );
});

When(
  /^user selects the message "([^"]*)" social network "([^"]*)"$/,
  async (rightsMessagePosition, rigthsMessageSocialNetwork) => {
    const socialNetworkDropdown = rightsMessagesPage
    .getMessageSocialNetworkDropdownByPosition(rightsMessagePosition);
    await rightsMessagesPage.scrollToElement(socialNetworkDropdown);
    await rightsMessagesPage.selectDropdownOption(
      socialNetworkDropdown,
      rigthsMessageSocialNetwork,
    );
  },
);

When(/^user enters the message "([^"]*)" name "([^"]*)"$/, async (rightsMessagePosition, rightsMessageName) => {
  const messageNameInput = await rightsMessagesPage.getMessageNameInputByPosition(rightsMessagePosition);
  await rightsMessagesPage.setInputValue(
    messageNameInput,
    rightsMessageName,
  );
});

When(/^user enters the message "([^"]*)" body "([^"]*)"$/, async (rightsMessagePosition, rightsMessageBody) => {
  const messageNameInput = await rightsMessagesPage.getMessageBodyInputByPosition(rightsMessagePosition);
  await rightsMessagesPage.setInputValue(
    messageNameInput,
    rightsMessageBody,
  );
});

When(
  /^user deletes the rights message "([^"]*)" of group number "([^"]*)"$/,
  async (rightsMessagePosition, rightsGroupPosition) => {
    const deleteButton = await rightsMessagesPage
    .getRightsMessageDeleteByPosition(rightsMessagePosition, rightsGroupPosition);
    await deleteButton.click();
    await rightsMessagesPage.acceptConfirmation();
  },
);

When(/^user submits the message "([^"]*)"$/, async (rightsMessagePosition) => {
  const nextbutton = await rightsMessagesPage.getNextSubmitButtonByPosition(rightsMessagePosition);
  await nextbutton.click();
});

When(/^user submits the group$/, async () => {
  const savebutton = await rightsMessagesPage.save;
  await savebutton.click();
});

When(/^user goes back to groups list$/, async () => {
  const backButton = rightsMessagesPage.back;
  await backButton.click();
});

When(/^user (?:expands|collapse) the group "([^"]*)"$/, async (rightsGroupPosition) => {
  const group = rightsMessagesPage.getRightsGroupByPosition(rightsGroupPosition);
  await group.click();
});

When(/^user deletes the group number "([^"]*)"$/, async (rightsGroupPosition) => {
  const deleteButton = rightsMessagesPage.getRightsGroupDeleteByPosition(rightsGroupPosition);
  await deleteButton.click();
  await rightsMessagesPage.acceptConfirmation();
});

// THEN
Then(/^user should see the rights group number "([^"]*)" name is "([^"]*)"$/, async (rightsGroupPosition, name) => {
  const text = await rightsMessagesPage.getRightsGroupNameByPosition(rightsGroupPosition).getText();
  expect(text).to.be.equal(name, 'The rights group name is not correct.');
});

Then(
  /^user should see the rights group number "([^"]*)" (Instagram|Twitter) social network status is "([^"]*)"$/,
  async (rightsGroupPosition, socialNetwork, name) => {
    const text = await rightsMessagesPage
    .getRightsGroupSocialNetworkStatusByPosition(socialNetwork, rightsGroupPosition).getText();
    expect(text).to.be.equal(name, 'The rights group social network status is not correct.');
  },
);

Then(
  /^user should see the rights message "([^"]*)" of group number "([^"]*)" name is "([^"]*)"$/,
  async (rightsMessagePosition, rightsGroupPosition, messageName) => {
    const text = await rightsMessagesPage
    .getRightsMessageNameFromGroupByPosition(rightsMessagePosition, rightsGroupPosition).getText();
    expect(text).to.be.equal(messageName, 'The rights message name is not correct.');
  },
);

Then(
  /^user should see the rights message "([^"]*)" of group number "([^"]*)" has the "(Instagram|Twitter)" icon$/,
  async (rightsMessagePosition, rightsGroupPosition, socialNetwork) => {
    const iconClass = await rightsMessagesPage
    .getRightsMessageSocialNetworkIconClassFromGroupByPosition(rightsMessagePosition, rightsGroupPosition);
    expect(iconClass).to.contain(socialNetwork.toLowerCase(), 'The rights message social network icon is not correct.');
  },
);

Then(/^user sees the group list is empty$/, async () => {
  const isDisplayed = await rightsMessagesPage.emptyGroupPage.isDisplayed();
  expect(isDisplayed).to.be.equal(true, 'The group list is not empty.');
});

Then(/^user sees the group empty page content contains "([^"]*)"$/, async (groupEmptyPageContent) => {
  const text = await rightsMessagesPage.getEmptyGroupContent().getText();
  expect(text).to.contain(groupEmptyPageContent, 'The group empty page content is not correct.');
});
