const Product = require("../models/product.model.js");
const Category = require("../models/category.model.js");

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
  };
