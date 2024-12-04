Feature: Order Management
  As a user of the API
  I want to manage orders
  So that I can create, retrieve, update, and list orders.

  Scenario: Create a new order
    Given I have a valid order payload
    When I send a POST request to "/orders"
    Then I should receive a response with a status code of 201
    And the response should indicate that the order was created

  Scenario: Get order details by ID
    Given I have a valid order ID
    When I send a GET request to "/orders/{id}"
    Then I should receive a response with a status code of 200
    And the response should contain the order details

  Scenario: List all orders
    When I send a GET request to "/orders"
    Then I should receive a response with a status code of 200
    And the response should contain a list of orders

  Scenario: Update an order's status
    Given I have a valid order update payload
    When I send a PUT request to "/orders"
    Then I should receive a response with a status code of 200
    And the response should indicate that the order was updated
