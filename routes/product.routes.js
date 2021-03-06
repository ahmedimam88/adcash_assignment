module.exports = app => {
    const products = require("../controllers/products.controller.js");
  
    app.get("/api/products", products.findAll);
    app.get("/api/products/:productId", products.findOne);
    app.post("/api/categories/:categoryId/products", products.create);
    app.put("/api/products/:productId", products.update);
    app.delete("/api/products/:productId", products.delete);

  };
