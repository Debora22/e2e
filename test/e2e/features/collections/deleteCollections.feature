@collections @delete_collections
Feature: Delete collections
  As a customer
  I want to be able to manage collections
  So that I can collect content

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin
    And user goes to "Collections" page
    And user applies showing filter "All Collections"
    And user sees collections list is empty
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user submits the new collection

  @smoke
  Scenario: Delete a collection
    When user deletes collection number "1"
    Then user should see collections list empty
