@rightsMessages
Feature: Rights Messages
  As a customer
  I want to be able to manage the rights messages
  So that I can ask for rights to media to be approved

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin
    And user goes to "Rights Messages" page

  @smoke @cleanLionelhutzDatabase
  Scenario: Create an Instagram valid rights messages group
    When user opens the new messages group form
    And user enters the group name "My new IG rights messages group"
    And user enters the group approval hashtag "automationHashtag"
    And user enters the group tos url "https://my.tos/automation"
    And user selects the message "1" social network "Instagram"
    And user enters the message "1" name "Message IG 1"
    And user enters the message "1" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "1"
    And user selects the message "2" social network "Instagram"
    And user enters the message "2" name "Message IG 2"
    And user enters the message "2" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "2"
    And user selects the message "3" social network "Instagram"
    And user enters the message "3" name "Message IG 3"
    And user enters the message "3" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "3"
    And user selects the message "4" social network "Instagram"
    And user enters the message "4" name "Message IG 4"
    And user enters the message "4" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "4"
    And user selects the message "5" social network "Instagram"
    And user enters the message "5" name "Message IG 5"
    And user enters the message "5" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "5"
    And user goes back to groups list
    And user expands the group "1"
    Then user should see the rights group number "1" name is "My new IG rights messages group"
    And user should see the rights group number "1" Instagram social network status is "Complete"
    And user should see the rights group number "1" Twitter social network status is "0 of 1"
    And user should see the rights message "1" of group number "1" name is "Message IG 1"
    And user should see the rights message "1" of group number "1" has the "Instagram" icon
    And user should see the rights message "2" of group number "1" name is "Message IG 2"
    And user should see the rights message "2" of group number "1" has the "Instagram" icon
    And user should see the rights message "3" of group number "1" name is "Message IG 3"
    And user should see the rights message "3" of group number "1" has the "Instagram" icon
    And user should see the rights message "4" of group number "1" name is "Message IG 4"
    And user should see the rights message "4" of group number "1" has the "Instagram" icon
    And user should see the rights message "5" of group number "1" name is "Message IG 5"
    And user should see the rights message "5" of group number "1" has the "Instagram" icon

  @sanity @cleanLionelhutzDatabase
  Scenario: Create an Twitter valid rights messages group
    When user opens the new messages group form
    And user enters the group name "My new TW rights messages group"
    And user enters the group approval hashtag "automationHashtag"
    And user enters the group tos url "https://my.tos/automation"
    And user selects the message "1" social network "Twitter"
    And user enters the message "1" name "Message TW 1"
    And user enters the message "1" body "Validate the Twitter rights message. Reply with {{hashtag}}. Read our ToS here {{tos_url}}"
    And user submits the message "1"
    And user goes back to groups list
    And user expands the group "1"
    Then user should see the rights group number "1" name is "My new TW rights messages group"
    And user should see the rights group number "1" Twitter social network status is "Complete"
    And user should see the rights group number "1" Instagram social network status is "0 of 5"
    And user should see the rights message "1" of group number "1" name is "Message TW 1"
    And user should see the rights message "1" of group number "1" has the "Twitter" icon

  @sanity @cleanLionelhutzDatabase
  Scenario: Create an Instagram and Twitter valid rights messages group
    When user opens the new messages group form
    And user enters the group name "My new IG rights messages group"
    And user enters the group approval hashtag "automationHashtag"
    And user enters the group tos url "https://my.tos/automation"
    And user selects the message "1" social network "Instagram"
    And user enters the message "1" name "Message IG 1"
    And user enters the message "1" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "1"
    And user selects the message "2" social network "Instagram"
    And user enters the message "2" name "Message IG 2"
    And user enters the message "2" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "2"
    And user selects the message "3" social network "Instagram"
    And user enters the message "3" name "Message IG 3"
    And user enters the message "3" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "3"
    And user selects the message "4" social network "Instagram"
    And user enters the message "4" name "Message IG 4"
    And user enters the message "4" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "4"
    And user selects the message "5" social network "Instagram"
    And user enters the message "5" name "Message IG 5"
    And user enters the message "5" body "This is an automated test to validate the Instagram rights message. Reply with {{hashtag}}. Last but not least, read our ToS here {{tos_url}}"
    And user submits the message "5"
    And user selects the message "6" social network "Twitter"
    And user enters the message "6" name "Message TW 6"
    And user enters the message "6" body "Validate the Twitter rights message. Reply with {{hashtag}}. Read our ToS here {{tos_url}}"
    And user submits the group
    And user expands the group "1"
    Then user should see the rights group number "1" name is "My new IG rights messages group"
    And user should see the rights group number "1" Instagram social network status is "Complete"
    And user should see the rights group number "1" Twitter social network status is "Complete"
    And user should see the rights message "1" of group number "1" name is "Message IG 1"
    And user should see the rights message "1" of group number "1" has the "Instagram" icon
    And user should see the rights message "2" of group number "1" name is "Message IG 2"
    And user should see the rights message "2" of group number "1" has the "Instagram" icon
    And user should see the rights message "3" of group number "1" name is "Message IG 3"
    And user should see the rights message "3" of group number "1" has the "Instagram" icon
    And user should see the rights message "4" of group number "1" name is "Message IG 4"
    And user should see the rights message "4" of group number "1" has the "Instagram" icon
    And user should see the rights message "5" of group number "1" name is "Message IG 5"
    And user should see the rights message "5" of group number "1" has the "Instagram" icon
    And user should see the rights message "6" of group number "1" name is "Message TW 6"
    And user should see the rights message "6" of group number "1" has the "Twitter" icon

  @sanity @cleanLionelhutzDatabase
  Scenario: Delete a rights messages group
    When user expands the group "1"
    And user deletes the rights message "1" of group number "1"
    And user deletes the rights message "1" of group number "1"
    And user deletes the rights message "1" of group number "1"
    And user deletes the rights message "1" of group number "1"
    And user deletes the rights message "1" of group number "1"
    And user deletes the group number "1"
    Then user sees the group list is empty
    And user sees the group empty page content contains "No Rights Message Yet"
    And user sees the group empty page content contains "You will need to create a message to approve and request rights on content."
