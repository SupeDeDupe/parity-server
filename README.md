parity-server [![Build Status](https://travis-ci.org/kevinhughes27/parity-server.svg)](https://travis-ci.org/kevinhughes27/parity-server)
=============

new backend for [OCUA Parity League](http://www.ocua.ca/Parity-League) stats.

production: [https://parity-server.herokuapp.com/](https://parity-server.herokuapp.com/)


Server
------
  **Flow**:

    1. Stats Keeping Client `POSTs` a JSON object to the server.

    2. Node server receives the request parses the events into stats

    3. The game is saved to the database and a `201` is returned to the client

    4. All `games` processed by the app are visible at `/games` and each week of stats is at `/weeks`

    5. An app to view the data is served from '/'


Setup
-----

Dependencies:
  * node / npm
  * mongodb

Then run `npm install` to get the required modules.


Running:
--------
  To run the server locally by starting it with `npm run start` (or `start:dev` if developing to live reload on changes)

  Then run the following command to send a job to the server:

  ```
  curl -X POST -d '{"week": 1, "events": ["Pull\tMike", "Direction\t<<<<<<", "POINT\tJill\tPass\tBob"]}' -H "Content-Type: application/json" http://localhost:3000/upload
  ```

  or you can send a full set of events from `test/files` using:

  ```
  curl -X POST --data @test/files/week1_game1.json -H "Content-Type: application/json" http://localhost:3000/upload
  ```

  To seed your development database with all the test files run `npm run db:seed`

  To clear all the data saved in the database run `npm run db:reset`


Testing
-------
  run `npm test`

  to run a single test: `mocha <path_to_test> --grep <something unique in the test name>`

  there is also an `test:dev` command which re-runs the whole suite any time a file is saved.

Front End
---------

To develop on the front end app you need to run `npm run start:ui` then the script will open your browser to the app. You'll need to run the server as well in order to be able to fetch data.

Similarly for testing run `npm run test:ui`


Deploy
------

The app is deployed to heroku. To deploy run `npm run deploy`. In order to do this you will need access to the heroku app and you will need to setup the heroku git remote.


Contributing
------------

PRs welcome!

If you are interested in contributing (especially if you play in the league!) Feel free to contact me first if you need any help or have questions.

contact: `kevinhughes27@gmail.com`
