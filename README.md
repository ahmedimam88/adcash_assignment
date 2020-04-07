# Adcash Assignment April 2020
## Ahmed Samir Imam

This REST API application uses NodeJs with Postgresql database

Postgresql Configuration files

  * File 1 :  config/db.config.js
  * File 2 :  config/test_config.json


To run the migrations

  * First, please change the Postgresql configuration files
  * Migrate Up `npm run migrate_up`
  * Migrate Down `npm run migrate_down`


Unit Test Files (TDD)

  * Category Controller Tests        : test/controllers/test-categories-controller.js
  * Product Controller Tests         : test/controllers/test-products-controller.js

To run the TDD tests

  * Run the tests `npm run mocha_run_tests`


To start the server:

  * Change postgresql database configuration files
  * Run Migration `npm run migrate_up && npm run migrate_up`
  * Start the server `node server.js`
  * The configred URL is [`localhost:3000`](http://localhost:3000) 

