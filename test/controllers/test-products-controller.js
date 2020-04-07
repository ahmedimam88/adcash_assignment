var supertest = require('supertest'),
app = require('../../server');
const request = require("supertest");
const Category = require("../../models/category.model.js");
const Product = require("../../models/product.model.js");
const expect = require("chai").expect;

// Product.removeAll((err, data) => {});
// Category.removeAll((err, data) => {});

describe("GET /api/products", () => {
    it("List all products with success", async () => {
  
      const res = await request(app).get("/api/products");
      
      expect(res.status).to.equal(200);
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0]).to.have.property("productcode");
    });
  });

  describe("GET /api/products/:id", () => {
    it("List Specific product with Success", async () => {
  
      var resp = await request(app).get("/api/products");
      const res = await request(app).get("/api/products/" + resp.body[0].id);
      
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id", resp.body[0].id);
      expect(res.body).to.have.property("productcode", resp.body[0].productcode);
    });
  });
  
  describe("GET /api/products/:id", () => {
    it("List Specific product with Failure", async () => {
  
      const res = await request(app).get("/api/products/2121");
      
      expect(res.status).to.equal(404);
    });
  });
  
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


describe("PUT /api/products/:id", () => {
    it("Update Product with Success", async () => {
  
      var resp = await request(app).get("/api/products");
      var rand =  Math.random();
  
  
      const res = await request(app)
        .put("/api/products/" + resp.body[0].id)
        .send({
          "productcode": "Test xxx-UPDATED" + rand,
          "productname": "Test xxx-UPDATED" + rand,
          "description": "Test xxx-UPDATED" + rand,
          "onhand": 100,
          "volume": 2.1,
          "weight": 22.2,
          "category_id": resp.body[0].category_id
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("productcode", "Test xxx-UPDATED"+rand);
      expect(res.body).to.have.property("onhand", 100);
  
    });
  });
  
  describe("PUT /api/products/:id", () => {
    it("Update Product with Failure", async () => {
  
      const res = await request(app)
        .put("/api/products/4444")
        .send({
          "productcode": "Test P009-01-UPDATED",
          "productname": "Test P009-01-UPDATED",
          "description": "Test P009-01-UPDATED",
          "onhand": 100,
          "volume": 2.1,
          "weight": 22.2,
          "category_id": 1
  
        });
      expect(res.status).to.equal(404);
    });
  });


  describe("DELETE /api/products/:id", () => {
    it("Delete Product with Success", async () => {
      var resp = await request(app).get("/api/products");
      const res = await request(app)
        .delete("/api/products/" + resp.body[0].id)
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message","Product was deleted successfully!");
    });
  });
  
  describe("DELETE /api/products/:id", () => {
    it("Delete Product with Failure", async () => {
      var rescat = await request(app).get("/api/products");
      const res = await request(app)
        .delete("/api/products/" + 44412)
        .send();
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message","Product with id 44412 is not found.");
    });
  });