MY REST API

cd my-api
node server.js
follow the link http://localhost:3000 add /items so that it take you to the browser.

Testing the API with Postman
Open Postman and follow these steps to test each route:

GET /items
Method: GET
URL: http://localhost:3000/items
Expected Response: It should return the list of items from items.json.

POST /items
Method: POST
URL: http://localhost:3000/items
Body:
Go to the "Body" tab in Postman, select raw, and choose JSON.
Expected Response: It should return the newly added item and append it to items.json.

PUT /items/
Method: PUT
URL: http://localhost:3000/items/44 (to update item with id 44)
Body:
Go to the "Body" tab, select raw, and choose JSON.
Expected Response: It should return the updated item.

DELETE /items/
Method: DELETE
URL: http://localhost:3000/items/460 (to delete item with id 460)
Expected Response: Status 204 No Content if the item is deleted successfully.




