const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("ConvertHandler", function () {
    test("Whole number", function () {
      assert.strictEqual(convertHandler.getNum("32L"), 32);
    });
    test("Decimal Number", () => {
      assert.strictEqual(convertHandler.getNum("3.1L"), 3.1);
    });
    test("Fractional Number", () => {
        assert.strictEqual(convertHandler.getNum("1/5mi"), 0.5);
      });
      test("Fractional Number", () => {
        assert.strictEqual(convertHandler.getNum("1.5/3mi"), 0.5);
      });
      test("Fractional Number With Decimal", () => {
        assert.strictEqual(convertHandler.getNum("1/5mi"), 0.5);
      });
      test("Double Fraction Error", () => {
        assert.strictEqual(convertHandler.getNum("1/1/1"), 'invalid number');
      });
      test("No number input defaults to 1", () => {
        assert.strictEqual(convertHandler.getNum("mi"), 1);
      });
      test("Read All Units", () => {
        assert.strictEqual(convertHandler.getUnit("22gal"), 'gal');
        assert.strictEqual(convertHandler.getUnit("22lbs"), 'lbs');
        assert.strictEqual(convertHandler.getUnit("22mi"), 'mi');
        assert.strictEqual(convertHandler.getUnit("22l"), 'L');
        assert.strictEqual(convertHandler.getUnit("22kg"), 'kg');
        assert.strictEqual(convertHandler.getUnit("22km"), 'km');
      });

    
  });
});
