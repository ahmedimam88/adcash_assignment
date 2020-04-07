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
  