@collections @create_collections
Feature: Create collections
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

  @smoke
  Scenario: Create a new photos Instagram mention collection
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @smoke
  Scenario: Create a new videos Instagram mention collection
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user enables the media type checkbox "videos"
    And user disables the media type checkbox "photos"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect videos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @smoke
  Scenario: Create a new photos and videos Instagram mention collection
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user enables the media type checkbox "videos"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos and videos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "ON"

  @smoke
  Scenario: Create a new Twitter profile collection
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from Twitter profile"
    And user enters the collection base "new.handler"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from Twitter profile @new.handler"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario Outline: Create a new photos Instagram mention collection with rules
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
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
  Scenario Outline: Create a new videos Instagram mention collection with rules
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user clicks on "Add rule" button
    And user selects the operator "<operator>" for rule number "1"
    And user selects the type "<operator_type>" for rule number "1"
    And user enters the value "<operator_value>" for rule number "1"
    And user enables the media type checkbox "videos"
    And user disables the media type checkbox "photos"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect videos from user mention @mockedhandler1 <operator> <expected_operator_value>"
    And user should see the collection number "1" status is "ON"
    Examples:
      | Case         | operator  | operator_type     | operator_value | expected_operator_value |
      | Hashtag      | including | hashtag           | myhashtag      | #myhashtag              |
      | User profile | including | user profile      | lemur0002      | @lemur0002              |
      | Hashtag      | excluding | hashtag           | myhashtag      | #myhashtag              |
      | User profile | excluding | user profile      | lemur0002      | @lemur0002              |

  @sanity
  Scenario Outline: Create a new photos and videos Instagram mention collection with rules
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user clicks on "Add rule" button
    And user selects the operator "<operator>" for rule number "1"
    And user selects the type "<operator_type>" for rule number "1"
    And user enters the value "<operator_value>" for rule number "1"
    And user enables the media type checkbox "videos"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos and videos from user mention @mockedhandler1 <operator> <expected_operator_value>"
    And user should see the collection number "1" status is "ON"
    Examples:
      | Case         | operator  | operator_type     | operator_value | expected_operator_value |
      | Hashtag      | including | hashtag           | myhashtag      | #myhashtag              |
      | User profile | including | user profile      | lemur0002      | @lemur0002              |
      | Hashtag      | excluding | hashtag           | myhashtag      | #myhashtag              |
      | User profile | excluding | user profile      | lemur0002      | @lemur0002              |

  @sanity
  Scenario Outline: Create a new Twitter profile collection with rules
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from Twitter profile"
    And user enters the collection base "new.handler"
    And user clicks on "Add rule" button
    And user selects the operator "<operator>" for rule number "1"
    And user selects the type "<operator_type>" for rule number "1"
    And user enters the value "<operator_value>" for rule number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from Twitter profile @new.handler <operator> <expected_operator_value>"
    And user should see the collection number "1" status is "ON"
    Examples:
      | Case         | operator  | operator_type     | operator_value | expected_operator_value |
      | Hashtag      | including | hashtag           | myhashtag      | #myhashtag              |
      | User mention | including | user mention      | lemur0002      | mention @lemur0002      |
      | Hashtag      | excluding | hashtag           | myhashtag      | #myhashtag              |
      | User mention | excluding | user mention      | lemur0002      | mention @lemur0002      |

  @sanity
  Scenario: Create a new photos Instagram mention collection tagging a stream
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user scrolls down to streams
    And user clicks on "Add stream" button
    And user searches "backend_stream_1" for stream number "1"
    And user selects suggestion "backend_stream_1" for stream number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1 and assign to stream backend_stream_1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Create a new videos Instagram mention collection tagging a stream
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user scrolls down to streams
    And user clicks on "Add stream" button
    And user searches "backend_stream_1" for stream number "1"
    And user selects suggestion "backend_stream_1" for stream number "1"
    And user enables the media type checkbox "videos"
    And user disables the media type checkbox "photos"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect videos from user mention @mockedhandler1 and assign to stream backend_stream_1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Create a new photos and videos Instagram mention collection tagging a stream
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user scrolls down to streams
    And user clicks on "Add stream" button
    And user searches "backend_stream_1" for stream number "1"
    And user selects suggestion "backend_stream_1" for stream number "1"
    And user enables the media type checkbox "videos"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos and videos from user mention @mockedhandler1 and assign to stream backend_stream_1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Create a new Twitter profile collection tagging a stream
    When user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from Twitter profile"
    And user enters the collection base "new.handler"
    And user scrolls down to streams
    And user clicks on "Add stream" button
    And user searches "Backend_stream_1" for stream number "1"
    And user selects suggestion "backend_stream_1" for stream number "1"
    And user submits the new collection
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from Twitter profile @new.handler and assign to stream backend_stream_1"
    And user should see the collection number "1" status is "ON"

  @sanity
  Scenario: Turn off a photos Instagram mention collection
    And user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user submits the new collection
    When user turns off the collection number "1"
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "OFF"

  @sanity
  Scenario: Turn off a videos Instagram mention collection
    And user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user enables the media type checkbox "videos"
    And user disables the media type checkbox "photos"
    And user submits the new collection
    When user turns off the collection number "1"
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect videos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "OFF"

  @sanity
  Scenario: Turn off a photos and videos Instagram mention collection
    And user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user enables the media type checkbox "videos"
    And user submits the new collection
    When user turns off the collection number "1"
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos and videos from user mention @mockedhandler1"
    And user should see the collection number "1" status is "OFF"

  @sanity
  Scenario: Turn off a Twitter profile collection
    And user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from Twitter profile"
    And user enters the collection base "new.handler"
    And user submits the new collection
    When user turns off the collection number "1"
    Then user should see the collection number "1" with name "My new collection"
    And user should see the collection number "1" with description "Collect photos from Twitter profile @new.handler"
    And user should see the collection number "1" status is "OFF"

  @regression
  Scenario: Try to create a collection with name already in use
    And user opens the new collection form
    And user enters the collection name "My new collection"
    And user selects the collection type "from Twitter profile"
    And user enters the collection base "new.handler"
    And user submits the new collection
    When user opens the new collection form
    And user enters the collection name "my NEW collection"
    And user should see the error "Sorry, this collection name is already in use. Please select another name." for collection name

  @regression
  Scenario: Try to create a mention collection including user mention rule
    When user opens the new collection form
    And user selects the collection type "from user mention"
    And user selects the mention handler "mockedhandler1"
    And user clicks on "Add rule" button
    And user selects the operator "including" for rule number "1"
    And user selects the type "user mention" for rule number "1"
    And user should see the error "Sorry, collections cannot contain more than one user mention." on rule number "1" type

  @regression
  Scenario: Try to create a Twitter profile collection including user profile rules
    When user opens the new collection form
    And user selects the collection type "from Twitter profile"
    And user enters the collection base "new.handler"
    And user clicks on "Add rule" button
    And user selects the operator "including" for rule number "1"
    And user selects the type "user profile" for rule number "1"
    And user should see the error "Sorry, collections cannot contain more than one user profile." on rule number "1" type
