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
  