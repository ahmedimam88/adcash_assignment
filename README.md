# Adcash Assignment April 2020
## Ahmed Samir Imam

This REST API application uses NodeJs with Postgresql database

Postgresql Configuration files
  * File 1 :  config/db.config.js
  * File 2 :  config/test_config.json

 
To run the migrations
  * First, please change the Postgresql configuration files
  * Run Migrations
    * If Linux
      * Migrate Up `npm run migrate_up`
      * Migrate Down `npm run migrate_down`
  
    * If windows
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


Endpoints Summary:
  * GET /api/categories - Get All Categories
  * GET /api/products - Get All Products
  * GET /api/categories/:id/products - Get All products for a certain category
  * GET /api/categories/:id - Get specific category
  * GET /api/products/:id - Get specific product
  * POST /api/categories - Create new category
  * POST /api/products - Create new product
  * PUT /api/categories/:id - Update existing category
  * PUT /api/products/:id - Update existing product
  * DELETE /api/categories/:id - Delete a category 
  * DELETE /api/products/:id - Delete a product