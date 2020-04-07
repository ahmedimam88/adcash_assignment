module.exports = app => {
    const products = require("../controllers/products.controller.js");
  
    app.get("/api/products", products.findAll);
    app.get("/api/products/:productId", products.findOne);

  };