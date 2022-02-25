@saveForLater
Feature: Save for later media
  As a customer
  I want to be able to save for later media
  So that I can save possible relevant content

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin

  @smoke
  Scenario: Save for later media with no rights in New content section
    And user refines media search by "No Rights" on "RIGHTS STATUS" filter
    And user should see there is at least a media present
    When user presses the "Save for Later" secondary button from the library card of media "1"
    And user goes to "Saved For Later" secondary section
    And user searches by the discarded media id
    Then user should see the media searched by id is present
