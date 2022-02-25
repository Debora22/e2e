@filter
Feature: Filter media
  As a customer
  I want to be able to filter media
  So that I can refine content searchs

  Background:
    Given user is on the login page
    And user sends correct access credentials
    And user selects "settingsAutomation" account
    And user is in the Content Engine admin

  @smoke
  Scenario: Filter media by Rights status - Rights approved in New content section
    When user refines media search by "Rights Approved" on "RIGHTS STATUS" filter
    Then user should see the "Rights Approved" on "RIGHTS STATUS" filter is selected
    And user should see the search summary "Showing {TOTAL} media with Rights Approved."
    And user should see the media count matches with "Rights Approved" on "RIGHTS STATUS" filter count
    And user should see the pagination total matches with "Rights Approved" on "RIGHTS STATUS" filter count
    And user should see the media with "Rights Approved" rights status count matches with "Rights Approved" on "RIGHTS STATUS" filter count
    And user should see all the media filtered has "Rights Approved" rights status
    And user should see the media with "Rights Approved" rights status count matches the pagination total
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @smoke
  Scenario: Filter media by Collection method - @mentions and Twitter in New content section
    When user refines media search by "@mentions and Twitter" on "COLLECTION METHOD" filter
    Then user should see the "@mentions and Twitter" on "COLLECTION METHOD" filter is selected
    And user should see the "COLLECTION METHOD" filter has a tooltip stating "You can use this filter to see how content was collected."
    And user should see the search summary "Showing {TOTAL} media from @mentions and Twitter."
    And user should see the media count matches with "@mentions and Twitter" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with "@mentions and Twitter" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @sanity
  Scenario: Filter media by Collection method - Hashtags and Tags in New content section
    When user refines media search by "Hashtags and Tags" on "COLLECTION METHOD" filter
    Then user should see the "Hashtags and Tags" on "COLLECTION METHOD" filter is selected
    And user should see the search summary "Showing {TOTAL} media from Hashtags and Tags."
    And user should see the media count matches with "Hashtags and Tags" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with "Hashtags and Tags" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @smoke
  Scenario: Filter media by Collection method - @mentions and Twitter in Saved for Later section
    And user goes to "Saved For Later" secondary section
    When user refines media search by "@mentions and Twitter" on "COLLECTION METHOD" filter
    Then user should see the "@mentions and Twitter" on "COLLECTION METHOD" filter is selected
    And user should see the "COLLECTION METHOD" filter has a tooltip stating "You can use this filter to see how content was collected."
    And user should see the search summary "Showing {TOTAL} media from @mentions and Twitter."
    And user should see the media count matches with "@mentions and Twitter" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with "@mentions and Twitter" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @sanity
  Scenario: Filter media by Collection method - Hashtags and Tags in Saved for Later section
    And user goes to "Saved For Later" secondary section
    When user refines media search by "Hashtags and Tags" on "COLLECTION METHOD" filter
    Then user should see the "Hashtags and Tags" on "COLLECTION METHOD" filter is selected
    And user should see the search summary "Showing {TOTAL} media from Hashtags and Tags."
    And user should see the media count matches with "Hashtags and Tags" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with "Hashtags and Tags" on "COLLECTION METHOD" filter count
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @smoke
  @sorting
  Scenario: Sort media by date approved in Approved section
    When user goes to "Approved Content" primary section
    Then user should see the default sorting option is "Date approved (newest)"
    And user should see the media with id "689065892" is in position "1"
    And user should see the media with id "686770990" is in position "2"
    And user should see the media with id "688407853" is in position "3"
    And user should see the media with id "689004978" is in position "last"
    When user sorts media by "Date approved (oldest)"
    Then user should see the media with id "689004978" is in position "1"
    And user should see the media with id "689082696" is in position "2"
    And user should see the media with id "1119578200" is in position "3"
    And user should see the media with id "689065892" is in position "last"

  @sanity
  @sorting
  Scenario: Sort media by date collected in Approved section
    And user goes to "Approved Content" primary section
    When user sorts media by "Date collected (newest)"
    Then user should see the media with id "686770990" is in position "1"
    And user should see the media with id "689065892" is in position "2"
    And user should see the media with id "688407853" is in position "3"
    And user should see the media with id "689004978" is in position "last"
    When user sorts media by "Date collected (oldest)"
    Then user should see the media with id "689004978" is in position "1"
    And user should see the media with id "689082696" is in position "2"
    And user should see the media with id "1119578200" is in position "3"
    And user should see the media with id "686770990" is in position "last"

  @sanity
  @sorting
  Scenario: Sort media by date collected in New Content section
    Then user should see the default sorting option is "Date collected (newest)"
    And user should see the media with id "2918757239" is in position "1"
    And user should see the media with id "2918757228" is in position "2"
    And user should see the media with id "2918754371" is in position "3"
    And user should see the media with id "2199042329" is in position "last"
    When user sorts media by "Date collected (oldest)"
    Then user should see the media with id "2199042329" is in position "1"
    And user should see the media with id "2199042394" is in position "2"
    And user should see the media with id "2199042484" is in position "3"
    And user should see the media with id "2918757239" is in position "last"

  @regression
  @sorting
  Scenario: Sort media by date approved in Discarded section
    When user goes to "Discarded" secondary section
    Then user should see the default sorting option is "Date discarded (newest)"
    And user should see the media with id "3199051358" is in position "1"
    And user should see the media with id "3341851912" is in position "2"
    When user sorts media by "Date discarded (oldest)"
    Then user should see the media with id "3341851912" is in position "1"
    And user should see the media with id "3199051358" is in position "2"

  @regression
  @sorting
  Scenario: Sort media by date collected in Discarded section
    And user goes to "Discarded" secondary section
    When user sorts media by "Date collected (newest)"
    Then user should see the media with id "3341851912" is in position "1"
    And user should see the media with id "3199051358" is in position "2"
    When user sorts media by "Date collected (oldest)"
    Then user should see the media with id "3199051358" is in position "1"
    And user should see the media with id "3341851912" is in position "2"

  @sanity
  Scenario: Filter media by all whitelisted accounts
    When user refines media search by "All" on "WHITELISTED USERS" filter
    Then user should see the "All" on "WHITELISTED USERS" filter is selected
    And user should see the search summary "Showing {TOTAL} media with whitelisted users."
    And user should see all the media filtered has "Rights Approved" rights status
    And user should see the media with "Rights Approved" rights status count matches the pagination total
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @sanity
  Scenario: Filter media by all whitelisted account - selecting from username filter too
    When user refines media search by "All" on "WHITELISTED USERS" filter
    And user refines media search by "biz.8.dp" on "USERNAME" filter
    Then user should see the "All" on "WHITELISTED USERS" filter is selected
    And user should see the "biz.8.dp" on "USERNAME" filter is selected
    And user should see the search summary "Showing {TOTAL} media with whitelisted users; and from @biz.8.dp."
    And user should see the media count matches with "biz.8.dp" on "USERNAME" filter count
    And user should see the pagination total matches with "biz.8.dp" on "USERNAME" filter count
    And user should see the media with "Rights Approved" rights status count matches with "biz.8.dp" on "USERNAME" filter count
    And user should see all the media filtered has "Rights Approved" rights status
    And user should see the media with "Rights Approved" rights status count matches the pagination total
    And user should see the pagination total matches with media count
    And user should see "Reset all filters" option is displayed

  @sanity
  Scenario: Clear Tag to Stream search field in modal
    And user refines media search by "Untagged" on "STREAMS" filter
    And user should see there is at least a media present
    When user presses the "Tag to Stream" secondary button from the library card of media "1"
    And user searches by "backend_stream_1" stream name in the modal
    And user clears tag to stream search in the modal
    Then user should see the tag to stream search field contains ""
    And user should see the list of streams suggested by search is empty on Tag to Stream tab in modal

  @sanity
  Scenario: Clear search box in New Content section
    And user enters "anything" in content search
    When user clears content search
    Then user should see the content search field contains ""
