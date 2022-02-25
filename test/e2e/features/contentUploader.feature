@contentUploader
Feature: Content Uploader

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin
    And user goes to "Content Uploader" page
    Then user should see the empty preview has the legend "The content will appear here, you can edit username, tag to streams, add caption and keywords."

  @smoke
  Scenario: Browse a photo to be uploaded
    When user browse a photo named "butterfly.jpg" from computer
    And user browse a photo named "donut.jpg" from computer
    Then user should see "You are uploading 2 media that will be attributed to username @settingsAutomation" on preview

  @smoke
  Scenario: Delete a photo from preview to be uploaded
    When user browse a photo named "butterfly.jpg" from computer
    And user deletes photo number "1" from preview
    Then user should see the empty preview has the legend "The content will appear here, you can edit username, tag to streams, add caption and keywords."

  @sanity @keywords
  Scenario: Prepare medias with keywords to be uploaded
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks on "Add keywords" button
    And user clicks on "+ Add keywords" on edition modal and enter the keyword "lemur"
    Then user should see the keyword "lemur" in position "1" added in modal
    And user should see "1" keywords in modal

  @sanity @username
  Scenario: Prepare medias with username changed to be uploaded
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks on "(change)" to edit username
    And user writes the username as "lemur0002" in modal
    And user clicks on "save" button in modal
    And user closes the content uploader modal
    Then user should see "You are uploading 1 media that will be attributed to username @lemur0002" on preview

  @sanity
  Scenario: Prepare medias editing the caption before uploading
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks the "Edit" button on photo "1"
    And user writes the caption "Hello this is a test" on edit window
    And user saves changes on edit window
    Then user should see "You are uploading 1 media that will be attributed to username @settingsAutomation" on preview

  @sanity @streams
  Scenario: Prepare medias with streams to be uploaded
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks on "Tag to Stream" button
    And user searches by "backend_stream_1" stream name in the modal
    And user selects the found stream "1" in the modal
    And user presses the "Tag 1 Stream" button in the modal
    Then user should see the media is tagged to the stream in the modal

  @regression @streams
  Scenario: Cancel add stream action for valid media already browsed
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks on "Tag to Stream" button
    And user searches by "backend_stream_1" stream name in the modal
    And user selects the found stream "1" in the modal
    And user presses the "Cancel" button on tag to stream tab in modal
    Then user should see the list of streams suggested by search is empty on Tag to Stream tab in modal

  @regression
  Scenario: Cancel caption edition of browsed media in uploader
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks the "Edit" button on photo "1"
    And user writes the caption "Hello this is a test" on edit window
    And user cancels edition
    Then user should see "You are uploading 1 media that will be attributed to username @settingsAutomation" on preview

  @regression
  Scenario: Browse an invalid file type is rejected in uploader
    When user browse a photo named "smithers.gif" from computer
    Then user should see the empty preview has the legend "The content will appear here, you can edit username, tag to streams, add caption and keywords."

  @regression @keywords
  Scenario: Delete keywords in modal for valid media already browsed
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks on "Add keywords" button
    And user clicks on "+ Add keywords" on edition modal and enter the keyword "lemur"
    And user clicks on "+ Add keywords" on edition modal and enter the keyword "butterfly"
    And user deletes the keyword "butterfly" in position "2"
    Then user should see the keyword "lemur" in position "1" added in modal
    And user should see "1" keywords in modal

  @regression @username
  Scenario: Change username by an invalid username in modal for valid media already browsed
    When user browse a photo named "butterfly.jpg" from computer
    And user clicks on "(change)" to edit username
    And user writes the username as ".@badusername." in modal
    Then user should see the message "Sorry, the username cannot contain more than 64 characters, spaces, and special characters." under username box in modal
    When user writes the username as "bad*username" in modal
    Then user should see the message "Sorry, the username cannot contain more than 64 characters, spaces, and special characters." under username box in modal
