const client = require("./db.js");
client.connect()

// constructor
const Product = function(product) {
  this.productcode = product.productcode;
  this.productname = product.productname;
  this.description = product.description;
  this.onhand = product.onhand;
  this.volume = product.volume;
  this.weight = product.weight;
  this.category_id = product.category_id;
};

Product.create = (newProduct, result) => {
  client.query("INSERT INTO products(productcode,productname,description,onhand,volume,weight,category_id)  VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id",
  [newProduct.productcode, newProduct.productname, newProduct.description, newProduct.onhand, newProduct.volume, newProduct.weight, newProduct.category_id] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.rows[0].id, ...newProduct });
    result(null, { id: res.rows[0].id, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  client.query("SELECT * FROM products WHERE id = $1",[productId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.rows.length) {
      console.log("found product: ", res.rows[0]);
      result(null, res.rows[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  client.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("products: ", res.rows);
    result(null, res.rows);
  });
};

Product.updateById = (id, product, result) => {
  client.query(
    "UPDATE products SET productcode = $1, productname = $2, description = $3, onhand = $4, weight= $5 , volume = $6, category_id = $7 WHERE id = $8",
    [product.productcode, product.productname, product.description,product.onhand, product.weight,product.volume,product.category_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.rowCount == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  client.query("DELETE FROM products WHERE id = $1", [id], (err, res) => {
    console.log("Result: ",res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Result: ",res);

    if (res.rowCount > 0) {
      console.log("Deleted product: ", res);
      result(null, res.rows[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.removeAll = result => {
  client.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted All Products`);
    result(null, res);
  });
};

Product.removeAllByCatId = (category_id, result) => {
  client.query("DELETE FROM products WHERE category_id = $1",[category_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res.rows);
  });
};


Product.findProductsByCatId = (category_id, result) => {
  client.query("SELECT * FROM products WHERE category_id = $1",[category_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.rows.length) {
      console.log("found product: ", res[0]);
      result(null, res.rows);
      return;
    }

    result({ kind: "not_found" }, null);
  });

}
module.exports = Product;