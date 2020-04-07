module.exports = app => {
    const products = require("../controllers/products.controller.js");
  
    app.get("/api/products", products.findAll);
    app.get("/api/products/:productId", products.findOne);

  };

  describe("POST /api/categories/:id/products", () => {
    it("Create Product with success", async () => {
      var rand =  Math.random();
      const res = await request(app)
        .post("/api/categories/1/products")
        .send({
          "productcode": "Test P009" + rand,
          "productname": "Test P009" + rand,
          "description": "Test P009" + rand,
          "onhand": 100,
          "volume": 2.1,
          "weight": 22.2
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("productcode", "Test P009"+rand);
    });
  });

  describe("POST /api/categories", () => {
    it("Create Product with Failure", async () => {
      var rand =  Math.random();
      const res = await request(app)
        .post("/api/categories/1/products")
        .send({
          "productname": "Test P009" + rand,
          "description": "Test P009" + rand,
          "onhand": 100,
          "volume": 2.1,
          "weight": 22.2
        });
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
});
