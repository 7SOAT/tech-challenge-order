Feature: Order Route

  Scenario: Successfully retrieve all orders
    Given the order service is available
    When I send a GET request to "/orders"
    Then I should receive a 200 status code
    And the response should contain a list of orders

  Scenario: No orders found
    Given the order service is available
    When I send a GET request to "/orders"
    Then I should receive a 500 status code
    And the response should contain "No orders found"
