const client = require("./db.js");

client.connect()

// constructor
const Category = function(category) {
  this.catname = category.catname;
  this.cattype = category.cattype;
  this.catbrand = category.catbrand;
  this.catsegment = category.catsegment;
};

Category.create = (newCategory, result) => {
  client.query("INSERT INTO categories(catname, cattype, catbrand, catsegment) VALUES ($1 , $2 , $3, $4) RETURNING id",
  [newCategory.catname, newCategory.cattype, newCategory.catbrand,newCategory.catsegment], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.rows[0].id, ...newCategory });
    result(null, { id: res.rows[0].id, ...newCategory });
  });
};

Category.findById = (categoryId, result) => {
  client.query("SELECT * FROM categories WHERE id = $1",[categoryId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res.rows[0]);

    if (res.rows.length) {
      result(null, res.rows[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  client.query("SELECT * FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("categories: ", res.rows);
    result(null, res.rows);
  });
};

Category.updateById = (id, category, result) => {

  client.query("UPDATE categories SET catname = $1, cattype = $2, catbrand = $3, catsegment = $4 WHERE id = $5",
    [category.catname, category.cattype, category.catbrand,category.catsegment, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Results: ",res);

      if (res.rowCount == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {

  client.query("DELETE FROM categories WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);

    if (res.rowCount > 0) {
      console.log("found category: ", res);
      result(null, res.rows[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Category.removeAll = result => {

  client.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted All categories`);
    result(null, res);
  });
};


module.exports = Category;

