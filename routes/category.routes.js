module.exports = app => {
    const categories = require("../controllers/categories.controller.js");
  
    app.get("/api/categories", categories.findAll);
  

  };