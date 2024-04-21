// arr: the variable for array
// arrName: the name of the field or variable name
const validateArray = (arr, arrName) => {
  if (arr === undefined || arr === null)
    throw `Error: ${arrName || 'Provided parameter'} is null or undefined `;
  if (!Array.isArray(arr))
    throw `Error: ${arrName || 'Provided parameter'} is not an array`;
  if (arr.length == 0)
    throw `Error: ${arrName || 'Provided parameter'} is an empty array`;
};

// num: the variable for number
// numName: the name of number field or variable name
// intFlag: set inflag as true to check if the number is an integer, else set it as false
const validateNumber = (num, numName, intFlag) => {
  if (num === undefined || num === null)
    throw `Error: ${numName || 'Provided parameter'} is null or undefined`;
  if (typeof num != 'number')
    throw `Error: ${numName || 'Provided parameter'} is not a number`;
  if (Number.isNaN(num))
    throw `Error: ${numName || 'Provided parameter'} is NaN`;
  if (intFlag) {
    if (!Number.isInteger(num))
      throw `Error: ${
        numName || 'Provided parameter'
      } is a decimal number, Only whole numbers/integers are allowed`;
  }
};

// str: the variable for string
// varName: the name of string field or variable name
const validateString = (str, varName) => {
  if (str === undefined || str === null)
    throw `Error: ${varName || 'Provided parameter'} is null or undefined`;
  if (typeof str !== 'string')
    throw `Error: ${varName || 'Provided parameter'} is not a string`;
  if (str.trim() === '')
    throw `Error: ${varName || 'Provided parameter'} is empty`;
  str = str.trim();
  return str;
};

// obj: the variable for object
// objName: the name of object field or variable name
const validateObject = (obj, objName) => {
  if (obj === null || obj === undefined)
    throw `Error: ${objName || 'Provided parameter'} is null or undefined`;
  if (typeof obj !== 'object' || Array.isArray(obj))
    throw `Error: ${objName || 'Provided parameter'} is not an object`;
  if (Object.keys(obj).length === 0)
    throw `Error: ${objName || 'Provided parameter'} has no keys`;
  if (Object.values(obj).length === 0)
    throw `Error: ${
      objName || 'Provided parameter'
    } has no values corresponding to its keys`;
};

const validateRatings = (ratings, numName) => {
  if (ratings === undefined || ratings === null)
    throw `Error: ${numName || 'Provided parameter'} is null or undefined`;

  if (typeof ratings !== 'number')
    throw `Error: ${numName || 'Provided parameter'} is not a number`;

  if (Number.isNaN(ratings))
    throw `Error: ${numName || 'Provided parameter'} is NaN`;

  if (ratings < 1 || ratings > 5)
    throw `Error: ${numName || 'Provided parameter'} must be between 1-5`;

  let test = ratings.toString();
  let testArr = test.split('.');
  if (testArr.length > 1 && testArr[1].length > 1)
    throw `Error: ${
      numName || 'Provided parameter'
    } must be upto 1 decimal place`;
};

const checkDecimalValue = (num, numName, dec) => {
  if (dec !== undefined && dec !== null) {
    let test = num.toString();
    let testArr = test.split('.');
    if (testArr.length > dec && testArr[1].length > dec)
      throw `Error: ${
        numName || 'Provided parameter'
      } must be upto ${dec} decimal place`;
  }
};

const checkStringMinLength = (str, varName, min) => {
  if (min !== undefined && min !== null && str.length < min)
    throw `Error: ${
      varName || 'Provided parameter'
    } should consist of at least ${min} characters`;
};

const checkStringMaxLength = (str, varName, max) => {
  if (max !== undefined && max !== null && str.length > max)
    throw `Error: ${
      varName || 'Provided parameter'
    } should consist of at most ${max} characters`;
};

const checkArrLength = (arr, arrName, min) => {
  if (min !== undefined && min !== null) {
    if (arr.length < min)
      throw `Error: ${
        arrName || 'Provided parameter'
      } should consist of at least ${min} elements`;
  }
};

const checkMinValue = (num, numName, min) => {
  if (num < min)
    throw `Error: Minimum value of ${
      numName || 'Provided parameter'
    } should be ${min}`;
};

const checkMaxValue = (num, numName, max) => {
  if (num > max)
    throw `Error: Maximum value of ${
      numName || 'Provided parameter'
    } should be ${max}`;
};

export {
  validateArray,
  validateNumber,
  validateString,
  validateObject,
  validateRatings,
  checkDecimalValue,
  checkArrLength,
  checkMaxValue,
  checkMinValue,
  checkStringMaxLength,
  checkStringMinLength,
};
