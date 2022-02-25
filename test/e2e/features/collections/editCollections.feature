@collections @edit_collections
Feature: Edit collections
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
  Scenario Outline: Edit a collection by adding rules
    When user clicks on Edit the collection number "1"
    And user clicks on "Add rule" button
    And user selects the operator "<operator>" for rule number "1"
    And user selects the type "<operator_type>" for rule number "1"
    And user enters the value "<operator_value>" for rule number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1 <operator> <expected_operator_value>"
    And user should see the collection number "1" status is "ON"
    Examples:
      | Case         | operator  | operator_type     | operator_value | expected_operator_value |
      | Hashtag      | including | hashtag           | myhashtag      | #myhashtag              |
      | User profile | including | user profile      | lemur0002      | @lemur0002              |
      | Hashtag      | excluding | hashtag           | myhashtag      | #myhashtag              |
      | User profile | excluding | user profile      | lemur0002      | @lemur0002              |

  @sanity
  Scenario: Edit a collection by deleting rules
    Given user clicks on Edit the collection number "1"
    And user clicks on "Add rule" button
    And user selects the operator "including" for rule number "1"
    And user selects the type "hashtag" for rule number "1"
    And user enters the value "myhashtag" for rule number "1"
    And user submits the new collection
    When user clicks on Edit the collection number "1"
    And user removes the rule number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Edit a collection by adding streams
    When user clicks on Edit the collection number "1"
    And user scrolls down to streams
    And user clicks on "Add stream" button
    And user searches "backend_stream_1" for stream number "1"
    And user selects suggestion "backend_stream_1" for stream number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1 and assign to stream backend_stream_1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Edit a collection by deleting streams
    Given user clicks on Edit the collection number "1"
    And user scrolls down to streams
    And user clicks on "Add stream" button
    And user searches "backend_stream_1" for stream number "1"
    And user selects suggestion "backend_stream_1" for stream number "1"
    And user submits the new collection
    When user clicks on Edit the collection number "1"
    And user removes the stream number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Edit a collection by enabling videos media type
    When user clicks on Edit the collection number "1"
    And user enables the media type checkbox "videos"
    And user submits the new collection
    Then user should see the collection number "1" with description "Collect photos and videos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @regression
  Scenario: Edit a collection by changing its name
    When user clicks on Edit the collection number "1"
    And user enters the collection name "My Edited collection"
    And user submits the new collection
    Then user should see the collection number "1" with name "My Edited collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @regression
  Scenario: Edit a collection by disabling photos media type
    When user clicks on Edit the collection number "1"
    And user enables the media type checkbox "videos"
    And user disables the media type checkbox "photos"
    And user submits the new collection
    Then user should see the collection number "1" with description "Collect videos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @regression @wip
  Scenario: Try to create an existent collection with the same base and media type
    """
    WIP: Until find a way to capture error notification.
    """
    When user opens the new collection form
    And user enters the collection name "New collection to be edited."
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user enables the media type checkbox "videos"
    And user submits the new collection
    And user clicks on Edit the collection number "2"
    And user disables the media type checkbox "videos"
    And user submits the new collection
    And user should see the notification is displayed with text "Sorry, you're already collecting on these items. We cannot create a duplicated collection."
