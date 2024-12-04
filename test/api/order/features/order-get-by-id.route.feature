Feature: Get Order By Id

  Scenario: Successfully get order by id
    Given I have a valid order id "d072c976-ccf5-4ad1-9d06-513941213e62"
    When I send a GET request to "/orders/d072c976-ccf5-4ad1-9d06-513941213e62"
    Then the response status code should be 200
    And the response should contain the order

  Scenario: Fail to get order by id due to non-existent id
    Given I have an invalid order id "c65a5554-bdcf-447a-b5e2-bb06e6aa94b7"
    When I send a GET request to "/orders/c65a5554-bdcf-447a-b5e2-bb06e6aa94b7"
    Then the response status code should be 500
    And the response should contain an error message "Order not found"
