const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  suite("GET /api/convert", () => {
    test("Convert valid input", (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "10L" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(
            res.body.string,
            "10 liters converts to 2.64172 gallons"
          );
          done();
        });
    });
  });
  suite("GET /api/convert", () => {
    test("Check for invalid unit", (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "32g" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 32);
          assert.equal(res.body.initUnit, "invalid unit");
          assert.equal(res.body.returnUnit, "invalid unit");
          assert.equal(res.body.string, "invalid unit");
          done();
        });
    });
  });
  suite("GET /api/convert", () => {
    test("Check for invalid number", (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kg" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "invalid number");
          assert.equal(res.body.initUnit, "kg");
          assert.equal(res.body.returnUnit, "lbs");
          assert.equal(res.body.string, "invalid number");
          done();
        });
    });
  });
  suite("GET /api/convert", () => {
    test("Check for invalid number and unit", (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kilomegagram" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "invalid number");
          assert.equal(res.body.initUnit, "invalid unit");
          assert.equal(res.body.returnUnit, "invalid unit");
          assert.equal(res.body.string, "invalid number and unit");
          done();
        });
    });
  });
  suite("GET /api/convert", () => {
    test("Check for no number and type unit", (done) => {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "kg" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "1");
          assert.equal(res.body.initUnit, "kg");
          assert.equal(res.body.returnUnit, "lbs");
          assert.equal(
            res.body.string,
            "1 kilograms converts to 2.20462 pounds"
          );
          done();
        });
    });
  });
});
