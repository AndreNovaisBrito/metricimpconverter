function ConvertHandler() {
  function getFraction(input) {
    const fractionRegex = /^(\d+(\.\d+)?)?\/(\d+(\.\d+)?)?/;
    const match = input.match(fractionRegex);
    if (!match) {
      return null; // return null if input does not contain a fraction
    }
    const numerator = match[1] ? Number(match[1]) : 1; // if no numerator, assume it's 1
    const denominator = Number(match[3]); // denominator is always present
    return numerator / denominator;
  }
  
  function extractNumberFromString(input) {

    const matches = input.match(/\//g);
    if (matches && matches.length == 1) {
      return getFraction(input);
    }
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
    
    //Default Value
    if (value === null) {
      return 1;
    }
    
    return value;
  };

  this.getUnit = function (input) {
    // Extract the unit from the input string
    const unit = extractUnitFromString(input);

    // If the unit is invalid, return 'invalid unit'
    if (!unit || this.spellOutUnit(unit)=='invalid unit') {
      return "invalid unit";
    }
    if(unit == 'l' || unit == 'L') return 'L';
    // Otherwise, return the unit in lower case
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
          result = 'invalid unit';
        }
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
    if(initNum == 'invalid number' && this.getUnit(initUnit) == 'invalid unit') return "invalid number and unit"
    if(initNum == 'invalid number') return "invalid number"
    if(this.getUnit(initUnit) == 'invalid unit') return "invalid unit"

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
        return 'invalid unit'
    }
    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    
    if(initNum == 'invalid number' && this.getUnit(initUnit) == 'invalid unit') return "invalid number and unit"
    if(initNum == 'invalid number') return "invalid number"
    if(this.getUnit(initUnit) == 'invalid unit') return "invalid unit"

    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  
    return result;
  };
}
// const ConvertHandler = require('./ConvertHandler.js');
const convertHandler = new ConvertHandler();
const input = "23l";
const num = convertHandler.getNum(input)
const unit = convertHandler.getUnit(input)
const returnUnit = convertHandler.getReturnUnit(unit)
const convert = convertHandler.convert(num, unit)
const spellOutUnit = convertHandler.spellOutUnit(returnUnit)
const result = convertHandler.getString(num, unit, convert, returnUnit)
  


// console.log("get num: ", num);
// console.log("get unit: ", unit);
// console.log("getReturnUnit: ", returnUnit);
// console.log("spellOutUnit", spellOutUnit);
// console.log("convert ", convert);
// console.log("result", result)



module.exports = ConvertHandler;
