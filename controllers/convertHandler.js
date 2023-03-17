function ConvertHandler() {
  function extractNumberFromString(input) {
    // Use a regular expression to match a number at the start of the string
    const numberMatch = input.match(/^\d+(\.\d+)?/);

    // If a number was found, convert it to a number type and return it
    if (numberMatch) {
      return Number(numberMatch[0]);
    }

    // If no number was found, return null
    return null;
  }

  function extractUnitFromString(input) {
    // Use a regular expression to match the unit at the end of the string
    const unitMatch = input.match(/[a-zA-Z]+$/);

    // If a unit was found, return it
    if (unitMatch) {
      return unitMatch[0];
    }

    // If no unit was found, return null
    return null;
  }

  this.getNum = function (input) {

    // If the input is null, undefined, or not a string, return 'invalid number'
    if (input === null || input === undefined || typeof input !== 'string') {
      return 'invalid number';
    }
    
    // Check for multiple forward slashes in the input
    const matches = input.match(/\//g);
    if (matches && matches.length > 1) {
      return 'invalid number';
    }
    
    // Extract the numerical value from the input string
    const value = extractNumberFromString(input);
    
    // If the value is null, return an error
    if (value === null) {
      return 'invalid number';
    }
    
    // Otherwise, return the value
    return value;
  };

  this.getUnit = function (input) {
    // Extract the unit from the input string
    const unit = extractUnitFromString(input);

    // If the unit is invalid, return 'invalid unit'
    if (!unit || !this.spellOutUnit(unit)) {
      return "invalid unit";
    }

    // Otherwise, return the unit
    return unit.toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    if (typeof initUnit === 'string') {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          result = 'L';
          break;
        case 'lbs':
          result = 'kg';
          break;
        case 'mi':
          result = 'km';
          break;
        case 'l':
          result = 'gal';
          break;
        case 'kg':
          result = 'lbs';
          break;
        case 'km':
          result = 'mi';
          break;
        default:
          result = null;
      }
    } else {
      result = null;
    }
  
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
  
    if (unit) {
      result = unit.toLowerCase();
    }
  
    switch (result) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
  
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }
  
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
  
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  
    return result;
  };
}
// const ConvertHandler = require('./ConvertHandler.js');
const convertHandler = new ConvertHandler();
const input = "3.1mi";
const num = convertHandler.getNum(input)
const unit = convertHandler.getUnit(input)
const returnUnit = convertHandler.getReturnUnit(unit)
const convert = convertHandler.convert(num, unit)
const spellOutUnit = convertHandler.spellOutUnit(returnUnit)
const result = convertHandler.getString(num, unit, convert, returnUnit)
  


console.log("get num: ", num);
console.log("get unit: ", unit);
console.log("getReturnUnit: ", returnUnit);
console.log("spellOutUnit", spellOutUnit);
console.log("convert ", convert);
console.log("result", result)



module.exports = ConvertHandler;
