const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    describe("GET /api/convert", () => {
        it("should convert a valid input such as 10L", (done) => {
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
              assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
              done();
            });
        });
    });
});
