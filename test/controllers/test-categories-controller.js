var supertest = require('supertest'),
app = require('../../server');
const request = require("supertest");
const Category = require("../../models/category.model.js");
const Product = require("../../models/product.model.js");
const expect = require("chai").expect;

const { exec } = require('child_process');
exec('npm run migrate_down && npm run migrate_down && npm run migrate_up && npm run migrate_up', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});

describe("GET /api/categories", () => {
    it("List all Categories with success", async () => {
  
      const res = await request(app).get("/api/categories");
      
      expect(res.status).to.equal(200);
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0]).to.have.property("catname", "Category 1");
    });
  });

  
  describe("GET /api/categories/:id", () => {
    it("List Specific Category with Success", async () => {
  
      var rescat = await request(app).get("/api/categories");
      const res = await request(app).get("/api/categories/" + rescat.body[0].id);
      
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id", rescat.body[0].id);
      expect(res.body).to.have.property("catname", "Category 1");
    });
  });


  describe("GET /api/categories/:id", () => {
    it("List Specific Category with Failure", async () => {
  
      const res = await request(app).get("/api/categories/1444");
      
      expect(res.status).to.equal(404);
    });
  });


describe("POST /api/categories", () => {
    it("Create Category with success", async () => {
      var rand =  Math.random();
  
      const res = await request(app)
        .post("/api/categories")
        .send({
          "catname": "Test33" + rand,
          "cattype": "Test33" + rand,
          "catbrand": "Test33" + rand,
          "catsegment": "Test33" + rand
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("catname", "Test33"+ rand);
    });
  });

describe("POST /api/categories", () => {
    it("Create Category with Failure", async () => {
      const res = await request(app)
        .post("/api/categories")
        .send({
          "cattype": "Test33",
          "catbrand": "Test33",
          "catsegment": "Test33"
        });
      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
});

describe("PUT /api/categories", () => {
    it("Update Category with Success", async () => {
  
      var rescat = await request(app).get("/api/categories");
      var rand =  Math.random();
  
      const res = await request(app)
        .put("/api/categories/" + rescat.body[0].id)
        .send({
          "catname": "Test33-UPDATED" + rand,
          "cattype": "Test33-UPDATED" + rand,
          "catbrand": "Test33-UPDATED" + rand,
          "catsegment": "Test33-UPDATED" + rand
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("catname","Test33-UPDATED" + rand);
    });
  });


  describe("PUT /api/categories", () => {
    it("Update Category with Failure", async () => {
  
      const res = await request(app)
        .put("/api/categories/4444")
        .send({
          "catname": "Test33-UPDATED",
          "cattype": "Test33-UPDATED",
          "catbrand": "Test33-UPDATED",
          "catsegment": "Test33-UPDATED"
        });
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message","Not found Category with id 4444.");
    });
  });


  describe("DELETE /api/categories/:id", () => {
    it("Delete Category with Success", async () => {
      var rescat = await request(app).get("/api/categories");
      const res = await request(app)
        .delete("/api/categories/" + rescat.body[0].id)
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message","Category was deleted successfully!");
    });
  });
  
  describe("DELETE /api/categories/:id", () => {
    it("Delete Category with Failure", async () => {
      var rescat = await request(app).get("/api/categories");
      const res = await request(app)
        .delete("/api/categories/" + 444)
        .send();
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message","Not found Category with id 444");
    });
  });


  describe("GET /api/categories/:id/products", () => {
    it("List all products with success", async () => {
  
      const res = await request(app).get("/api/categories/3/products");
      
      expect(res.status).to.equal(200);

      res.body.forEach(function(i) {
        console.log("Erreeeeeeeeeeeeeeor: ", i);
        expect(i.category_id).to.equal(3);
       });
      
    });
  });