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

    test("Read Unit for gallons", () => {
      assert.strictEqual(convertHandler.getUnit("22gal"), "gal");
    });

    test("Read Unit for pounds", () => {
      assert.strictEqual(convertHandler.getUnit("22lbs"), "lbs");
    });

    test("Read Unit for miles", () => {
      assert.strictEqual(convertHandler.getUnit("22mi"), "mi");
    });

    test("Read Unit for liters", () => {
      assert.strictEqual(convertHandler.getUnit("22l"), "L");
    });

    test("Read Unit for kilograms", () => {
      assert.strictEqual(convertHandler.getUnit("22kg"), "kg");
    });

    test("Read Unit for kilometers", () => {
      assert.strictEqual(convertHandler.getUnit("22km"), "km");
    });

    test("Spell out units for gallons", () => {
      assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
    });

    test("Spell out units for pounds", () => {
      assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
    });

    test("Spell out units for miles", () => {
      assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
    });

    test("Spell out units for liters", () => {
      assert.strictEqual(convertHandler.spellOutUnit("l"), "liters");
    });

    test("Spell out units for kilograms", () => {
      assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
    });

    test("Spell out units for kilometers", () => {
      assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
    });

    test("Return Unit for gallons", () => {
      assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
    });

    test("Return Unit for pounds", () => {
      assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
    });

    test("Return Unit for miles", () => {
      assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
    });

    test("Return Unit for liters", () => {
      assert.strictEqual(convertHandler.getReturnUnit("l"), "gal");
    });

    test("Return Unit for kilograms", () => {
      assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
    });

    test("Return Unit for kilometers", () => {
      assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
    });
    test("Convert 1 gallon to liters", () => {
      assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
    });

    test("Convert 1 pound to kilograms", () => {
      assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.1);
    });

    test("Convert 1 mile to kilometers", () => {
      assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1);
    });

    test("Convert 1 liter to gallons", () => {
      assert.approximately(convertHandler.convert(1, "l"), 0.26417, 0.1);
    });

    test("Convert 1 kilogram to pounds", () => {
      assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1);
    });
    test("Convert 1 kilogram to pounds", () => {
        assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1);
      });
  });
});
