import moment from 'moment';
import PasswordValidator from 'password-validator';
import validator from 'validator';
import { ObjectId } from 'mongodb';
import { postcodeValidator } from 'postcode-validator';

// arr: the variable for array
// arrName: the name of the field or variable name
const validateArray = (arr, arrName) => {
  if (arr === undefined || arr === null)
    throw `Error: ${arrName || 'Provided parameter'} is null or undefined `;
  if (!Array.isArray(arr))
    throw `Error: ${arrName || 'Provided parameter'} is not an array`;
  if (arr.length == 0)
    throw `Error: ${arrName || 'Provided parameter'} is an empty array`;
  return arr;
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
  return num;
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
  return obj;
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
  return ratings;
};

const validatePassword = (pass, pName) => {
  if (pass.includes(' ')) throw `Password must not consist of spaces`;
  pass = validateString(pass, pName);
  const schema = new PasswordValidator();
  const minLen = 8;
  const maxLen = 16;
  schema
    .is()
    .min(minLen)
    .is()
    .max(maxLen)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();

  // Validate a password
  if (!schema.validate(pass)) {
    let valList = schema.validate(pass, { list: true });
    let errStr = `${pName || 'Provided parameter'} must consist of `;
    for (let i = 0; i < valList.length; i++) {
      if (i != 0 && i != valList.length - 1) errStr = errStr + `, `;
      if (i == valList.length - 1 && i != 0) errStr = errStr + ` and `;
      if (valList[i] == 'min') errStr = errStr + `minimum ${minLen} characters`;
      if (valList[i] == 'max') errStr = errStr + `maximum ${maxLen} characters`;
      if (valList[i] == 'uppercase') errStr = errStr + `an uppercase letter`;
      if (valList[i] == 'lowercase') errStr = errStr + `a lowercase letter`;
      if (valList[i] == 'digits') errStr = errStr + `a number`;
      if (valList[i] == 'symbols') errStr = errStr + `a special character`;
    }
    throw errStr;
  }
  return pass;
};

//this function requires date input in mm-dd-yyyy format
const validateAge = (inputDate, varName) => {
    inputDate = validateString(inputDate, varName);
    //if(inputDate.length != 10) "Error: Enter date in mm/dd/yyyy format"
    if(inputDate.length != 10) "Error: Enter date in yyyy-mm-dd format"
    let dateCheck = inputDate.split('-');
    if(dateCheck.length !== 3) throw `Error: ${varName} must have yyyy-mm-dd`;
    if(dateCheck[0].length !== 4) throw `Error: ${varName} must have 4 chars for year`;
    if(dateCheck[1].length !== 2) throw `Error: ${varName} must have 2 chars for month`;
    if(dateCheck[2].length !== 2) throw `Error: ${varName} must have 2 chars for day`;

    dateCheck = dateCheck.map(x => Number(x));
    dateCheck.forEach(x => {
        if(isNaN(x)) throw "Error: Date must have numbers"
    });

    inputDate = formatDob(inputDate);
    // let dateCheck = inputDate.split('/');
    // if(dateCheck.length !== 3) throw `Error: ${varName} must have mm/dd/yyyy`;
    // if(dateCheck[0].length !== 2) throw `Error: ${varName} must have 2 chars for month`;
    // if(dateCheck[1].length !== 2) throw `Error: ${varName} must have 2 chars for day`;
    // if(dateCheck[2].length !== 4) throw `Error: ${varName} must have 4 chars for year`;

    // dateCheck = dateCheck.map(x => Number(x));
    // dateCheck.forEach(x => {
    //     if(isNaN(x)) throw "Error: Date must have numbers"
    // });

  if (!moment(inputDate, 'MM/DD/YYYY').isValid())
    throw `Error: ${varName} must be a valid date`;

  let birthDate = moment(inputDate, 'MM/DD/YYYY');
  let age = moment().diff(birthDate, 'years');
  if (age < 18 || age >= 100)
    throw `${varName || 'Provided parameter'} should be between 18-100`;
  return inputDate;
};

const validateEmail = (email, varName) => {
  email = validateString(email, varName);
  if (!validator.isEmail(email))
    throw `${varName || 'Provided parameter'} is invalid`;
  return email.toLowerCase();
};

const validateId = (objId, varName) => {
  objId = validateString(objId, varName);
  if (!ObjectId.isValid(objId))
    throw `${varName || 'Provided parameter'} is invalid`;
  return objId;
};

const validatePrice = (price, varName) => {
  price = validateNumber(price, varName, false);
  if (price <= 0.0)
    throw `${varName || 'Provided parameter'} must be greater than 0`;
  checkDecimalValue(price, varName, 2);
  return price;
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
  return num;
};

const checkStringMinLength = (str, varName, min) => {
  str = validateString(str, varName);
  if (min !== undefined && min !== null && str.length < min)
    throw `Error: ${
      varName || 'Provided parameter'
    } should consist of at least ${min} characters`;
  return str;
};

const checkStringMaxLength = (str, varName, max) => {
  str = validateString(str, varName);
  if (max !== undefined && max !== null && str.length > max)
    throw `Error: ${
      varName || 'Provided parameter'
    } should consist of at most ${max} characters`;
  return str;
};

const checkArrLength = (arr, arrName, min) => {
  if (min !== undefined && min !== null) {
    if (arr.length < min)
      throw `Error: ${
        arrName || 'Provided parameter'
      } should consist of at least ${min} elements`;
  }
  return arr;
};

const checkMinValue = (num, numName, min) => {
  if (num < min)
    throw `Error: Minimum value of ${
      numName || 'Provided parameter'
    } should be ${min}`;
  return num;
};

const checkMaxValue = (num, numName, max) => {
  if (num > max)
    throw `Error: Maximum value of ${
      numName || 'Provided parameter'
    } should be ${max}`;
  return num;
};

const validateUserObj = (userObj) => {
  if (userObj['firstName']) {
    userObj['firstName'] = validateName(userObj['firstName'], 'firstName');
  }
  if (userObj['middleName']) {
    userObj['middleName'] = validateName(userObj['middleName'], 'middleName');
  }
  if (userObj['lastName']) {
    userObj['lastName'] = validateName(userObj['lastName'], 'lastName');
  }
  if (userObj['email']) {
    userObj['email'] = validateEmail(userObj['email'], 'email');
  }
  if (userObj['city']) {
    userObj['city'] = validateString(userObj['city'], 'city');
  }
  if (userObj['state']) {
    userObj['state'] = validateState(userObj['state'], 'state');
  }
  if (userObj['password']) {
    userObj['password'] = validatePassword(userObj['password'], 'password');
  }
  if (userObj['gender']) {
    userObj['gender'] = validateGender(userObj['gender'], 'gender');
  }
  if (userObj['age']) {
    userObj['age'] = validateDob(userObj['age'], 'age');
  }

  return userObj;
};

const validateZip = (zip, varname) => {
  if (postcodeValidator(zip.trim(), 'US')) {
    return zip.trim();
  }
  throw 'Enter valid zip';
};

const validateState = (state, varName) => {
  const names = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  state = validateString(state, varName);

  if (!names.includes(state)) throw `Invalid state`;

  return state;
};

const validateName = (value, name) => {
  if (!value) throw `Error: ${name} must be supplied`;
  if (typeof value !== 'string') throw `Error: ${name} must be a string`;
  if (value.trim().length === 0) throw `Error: ${name} must not be empty`;

  value = value.trim();
  if (value.length < 2 || value.length > 25)
    throw `Error: ${name} must be 2 to 25 chars long`;
  for (let x of value) {
    if (!isNaN(x)) throw `Error: ${name} must not contain numbers`;
  }
  return value;
};

const validateGender = (value, varName) => {
  const options = ['male', 'female', 'other'];

  value = validateString(value, varName);
  if (!options.includes(value)) throw `Gender is not valid!`;
  return value;
};

const formatDob = (val) => {
  val = val.trim();
  let ans = val.split('-');
  let age = ans[1] + '/' + ans[2] + '/' + ans[0];
  return age;
};

const validateDob = (inputDate, varName) => {
  inputDate = validateString(inputDate, varName);
  let dateCheck = inputDate.split('/');
  if (dateCheck.length !== 3) throw `Error: ${varName} must have mm/dd/yyyy`;
  if (dateCheck[0].length !== 2)
    throw `Error: ${varName} must have 2 chars for month`;
  if (dateCheck[1].length !== 2)
    throw `Error: ${varName} must have 2 chars for day`;
  if (dateCheck[2].length !== 4)
    throw `Error: ${varName} must have 4 chars for year`;

  dateCheck = dateCheck.map((x) => Number(x));
  dateCheck.forEach((x) => {
    if (isNaN(x)) throw 'Error: Date must have numbers';
  });

  if (!moment(inputDate, 'MM/DD/YYYY').isValid())
    throw `Error: ${varName} must be a valid date`;

  let birthDate = moment(inputDate, 'MM/DD/YYYY');
  let age = moment().diff(birthDate, 'years');
  if (age < 18 || age >= 100)
    throw `${varName || 'Provided parameter'} should be between 18-100`;
  return inputDate;
};

const validatePropertyType = (propertyType, varName) => {
  propertyType = validateString(propertyType, varName);
  if (propertyType !== 'private' && propertyType !== 'shared') throw  `Invalid ${varName || 'Property Type'}`
  return propertyType
}

const validateApartType = (apartmentType, varName) => {
  apartmentType = validateString(apartmentType, varName);
  if (apartmentType !== '1bhk' 
  && apartmentType !== '2bhk'
  && apartmentType !== '3bhk'
  && apartmentType !== '4bhk'
  && apartmentType !== 'studio'
  && apartmentType !== 'flex') throw  `Invalid ${varName || 'Apartment Type'}`
  return apartmentType
}

const validateAccType = (accomodationType, varName) => {
  accomodationType = validateString(accomodationType, varName);
  if (accomodationType !== 'permanent' && accomodationType !== 'temporary') 
      throw `Invalid ${varName || 'Accomodation Type'}`
  return accomodationType
}

const compareData = (newData, oldData) => {
  let finalStr = "";
  if (oldData.street !== newData.street) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Street '
  } 
  if (oldData.apartmentNum !== newData.apartmentNum) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Apartment No. '
  } 
  if (oldData.city !== newData.city) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'City '
  } 
  if (oldData.state !== newData.state) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'State '
  } 
  if (oldData.zip !== newData.zip) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Zip Code '
  } 
  if (oldData.latitude !== newData.latitude) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Latitude '
  } 
  if (oldData.longitude !== newData.longitude) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Longitude '
  } 
  if (oldData.apartmentType !== newData.apartmentType) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Apartment Type '
  } 
  if (oldData.area !== newData.area) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Area '
  } 
  if (oldData.bedroomCount !== newData.bedroomCount) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'No. of Bedrooms '
  } 
  if (oldData.bathroomCount !== newData.bathroomCount) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'No. of Bathrooms '
  } 
  if (oldData.images !== newData.images) {
    if (finalStr != "") finalStr = finalStr + ', '
    finalStr = finalStr + 'Images '
  } 
  if (finalStr != "") {
    finalStr = finalStr + " cannot be modified, if these field need to be modified then remove the property and add a new one."
  }

  return finalStr
}

export {
  validateArray,
  validateNumber,
  validateString,
  validateObject,
  validateRatings,
  validatePassword,
  validateAge,
  validateEmail,
  validateId,
  validatePrice,
  checkDecimalValue,
  checkArrLength,
  checkMaxValue,
  checkMinValue,
  checkStringMaxLength,
  checkStringMinLength,
  validateUserObj,
  validateZip,
  validateState,
  validateName,
  validateGender,
  validateDob,
  validateAccType,
  validatePropertyType,
  validateApartType,
  compareData
};
