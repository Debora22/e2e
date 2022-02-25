@advocates
Feature: Advocates
  As a customer
  I want to be able to see advocates
  So that I can collect content

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin
    And user goes to "Advocates" page


  @smoke
  Scenario: Filter advocates list by username
    When user searches by "chloegouriou" username
    Then user should see the advocate searched by username contains username equals to "chloegouriou"

  @smoke
  Scenario: Sort advocates list by Revenue (Descending)
  When user sorts advocates by "Revenue (Descending)"
  Then user should see advocates list sorted by Revenue "Descending"

  @sanity
  Scenario: Sort advocates list by Revenue (Ascending)
    When user sorts advocates by "Revenue (Ascending)"
    Then user should see advocates list sorted by Revenue "Ascending"

  @sanity
  Scenario: Sort advocates list by Convertions (Descending)
    When user sorts advocates by "Conversions (Descending)"
    Then user should see advocates list sorted by Conversions "Descending"

  @sanity
  Scenario: Sort advocates list by Convertions (Ascending)
    When user sorts advocates by "Conversions (Ascending)"
    Then user should see advocates list sorted by Conversions "Ascending"

  @sanity
  Scenario: Sort advocates list by Lightbox Views (Descending)
    When user sorts advocates by "Lightbox Views (Descending)"
    Then user should see advocates list sorted by Lightbox Views "Descending"

  @sanity
  Scenario: Sort advocates list by Lightbox Views (Ascending)
    When user sorts advocates by "Lightbox Views (Ascending)"
    Then user should see advocates list sorted by Lightbox Views "Ascending"

  @sanity
  Scenario: Sort advocates list by Conversion Rate (Descending)
    When user sorts advocates by "Conversion Rate (Descending)"
    Then user should see advocates list sorted by Conversion Rate "Descending"

  @sanity
  Scenario: Sort advocates list by Conversion Rate (Ascending)
    When user sorts advocates by "Conversion Rate (Ascending)"
    Then user should see advocates list sorted by Conversion Rate "Ascending"
