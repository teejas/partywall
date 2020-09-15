# PartyWall API

Created a REST API using Node.js with an Express.js framework

Authentication flow using Passport.js allows users to login or create account within an Express session.
Once authenticated, users can add items to a list of available items, get the list of items, delete items from the list. Using MongoDB as database to store item, user, and session data.

## List of endpoints
- /login POST
	- params: username (string), password (string)
	- if user exists, will authenticate
		- else, will create new user with given username and password
	- if username is found but password doesn't match, returns error

- /items GET, POST, and DELETE
	- you will need to pass authentication before being able to use this endpoint
	- POST
		- params: type ('food' or 'drink'), name (string), description (string), weight/volume (number), price (number), quantity (number)
		- if all necessary params are passed, will create item
			- else will return error
	- DELETE
		- params: id
		- passing id of item to be deleted will result in item being removed from list (and db)

## Usage/Setup

1. Clone the repo, unzip, step into /partywall folder
2. Run `npm install` to install all necessary dependencies
3. Run `npm start` to expose API on port 3000 (make calls to http://localhost:3000).

## Comments

With more time I would've built a usable frontend (something purely functional just allowing user creation, list view, and editing). I did spend some time building one but decided against rendering anything in the interest of cleanliness, but I could show this over video.

I also would've added encryption for passwords using bcrypt and made it so that users can only delete items they added.
