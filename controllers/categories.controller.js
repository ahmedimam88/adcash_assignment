const Category = require("../models/category.model.js");

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      else res.send(data);
    });
  };


exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with id " + req.params.categoryId
        });
      }
    } else res.send(data);
  });
};


exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const category = new Category({
        catname: req.body.catname,
        cattype: req.body.cattype,
        catbrand: req.body.catbrand,
        catsegment: req.body.catsegment
    });

    Category.create(category, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Category in the database."
          });
        }
        else res.send(data);
      });
};