const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to adcash application." });
});

app.set('json spaces',0);


// require("./routes/category.routes.js")(app);
// require("./routes/product.routes.js")(app);

// set port, listen for requests
module.exports = app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

