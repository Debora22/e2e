@login
Feature: Login
  As a customer
  I want to be able to login
  So that I can access restricted features

  @smoke
  Scenario: Unauthenticated user
    Given user is on the login page
    When user sends incorrect access credentials
    Then user is not logged in
    And user sees an error message "Invalid Credentials." is shown
