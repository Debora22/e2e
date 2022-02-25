@approve
Feature: Approve media
  As a customer
  I want to be able to approve media
  So that I can publish content

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin

  @smoke
  Scenario: Approve single media with rights in New content section
    And user refines media search by "Rights Approved" on "RIGHTS STATUS" filter
    And user should see there is at least a media present
    When user presses the "Approve" main button from the library card of media "1"
    And user goes to "Approved Content" primary section
    And user searches by the approved media id
    Then user should see the media searched by id is present
