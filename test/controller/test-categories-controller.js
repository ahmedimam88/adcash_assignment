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
