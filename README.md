# PartyWall API

Created a REST API using Node.js with an Express.js framework

## List of endpoints
- /login POST
	- params: username (string), password (string)
	- if user exists, will authenticate
	- else, will create new user
	- if username is found but password doesn't match, returns error

- /items GET, POST, and DELETE
	- you will need to pass authentication before being able to use this endpoint
	- POST
		- params: type (food or drink), name, description, weight/volume, price, quantity
		- if all necessary params are passed, will create item
		- else will return error
	- DELETE
		- params: id
		- passing id of item to be deleted will result in item being removed from db
