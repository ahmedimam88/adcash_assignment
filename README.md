# Adcash Assignment April 2020
## Ahmed Samir Imam

This REST API application uses NodeJs with Postgresql database

Postgresql Configuration files
  * File 1 :  config/db.config.js
  * File 2 :  config/test_config.json

 
To run the migrations
  * First, please change the Postgresql configuration files
  * Run Migrations
    * Migrate Up `npm run migrate_up` (Works on Linux)
    * Migrate Down `npm run migrate_down` (Works on Linux)
  or (if windows)
    * Migrate Up `./node_modules/db-migrate/bin/db-migrate up --config ./config/test_config.json`
    * Migrate Down `./node_modules/db-migrate/bin/db-migrate down --config ./config/test_config.json`

 
Unit Test Files (TDD)
  * Category Controller Tests        : test/controllers/test-categories-controller.js
  * Product Controller Tests         : test/controllers/test-products-controller.js


To run the TDD tests
  * Run the tests `npm run mocha_run_tests`


To start the server:
  * run `npm install`
  * Change postgresql database configuration files
  * Create a new database `./node_modules/db-migrate/bin/db-migrate db:create adcash_nodejs --config ./config/test_config.json`
  * Run Migration UP Twice `npm run migrate_up` or `./node_modules/db-migrate/bin/db-migrate up --config ./config/test_config.json`
  * Start the server `node server.js`
  * The configred URL is [`localhost:3000`](http://localhost:3000) 