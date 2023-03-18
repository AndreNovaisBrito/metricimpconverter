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
      assert.strictEqual(convertHandler.getNum("1/2mi"), 0.5);
    });

    test("Fractional Number With Decimal", () => {
      assert.strictEqual(convertHandler.getNum("1.5/3mi"), 0.5);
    });
    test("Double Fraction Error", () => {
      assert.strictEqual(convertHandler.getNum("1/1/1"), "invalid number");
    });
    test("No number input defaults to 1", () => {
      assert.strictEqual(convertHandler.getNum("mi"), 1);
    });
    test("Read All Units", () => {
      assert.strictEqual(convertHandler.getUnit("22gal"), "gal");
      assert.strictEqual(convertHandler.getUnit("22lbs"), "lbs");
      assert.strictEqual(convertHandler.getUnit("22mi"), "mi");
      assert.strictEqual(convertHandler.getUnit("22l"), "L");
      assert.strictEqual(convertHandler.getUnit("22kg"), "kg");
      assert.strictEqual(convertHandler.getUnit("22km"), "km");
    });
    test("Read SpellOut Units", () => {
      assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
      assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
      assert.strictEqual(convertHandler.spellOutUnit("l"), "liters");
      assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
      assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
    });
    test("Return Units", () => {
      assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
      assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
      assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
      assert.strictEqual(convertHandler.getReturnUnit("l"), "gal");
      assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
      assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
    });
  });
});
