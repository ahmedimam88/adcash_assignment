module.exports = app => {
    const categories = require("../controllers/categories.controller.js");

    app.get("/api/categories", categories.findAll);
    app.get("/api/categories/:categoryId", categories.findOne);
    app.post("/api/categories", categories.create);
    app.put("/api/categories/:categoryId", categories.update);
    app.delete("/api/categories/:categoryId", categories.delete);
    app.get("/api/categories/:categoryId/products", categories.findProductsByCatId);

  };