@tagToStream
Feature: Tag media to stream
  As a customer
  I want to be able to tag media to stream
  So that I can publish content

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin

  @smoke
  Scenario: Tag single media to a stream in New content section
    And user refines media search by "Untagged" on "STREAMS" filter
    And user should see there is at least a media present
    When user presses the "Tag to Stream" secondary button from the library card of media "1"
    And user searches by "backend_stream_1" stream name in the modal
    And user selects the found stream "1" in the modal
    And user presses the "Tag 1 Stream" button in the modal
    Then user should see the "Add stream" button is present in the modal
    And user should see the media is tagged to the stream in the modal
    When user closes the modal
    Then user should see the media "1" is tagged to stream "backend_stream_1"
