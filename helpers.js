import moment from 'moment';
import PasswordValidator from 'password-validator';
import validator from 'validator';
import { ObjectId } from "mongodb";

// arr: the variable for array
// arrName: the name of the field or variable name
const validateArray = (arr, arrName) => {
    if (arr === undefined || arr === null)
        throw `Error: ${arrName || 'Provided parameter'} is null or undefined `
    if (!Array.isArray(arr))
        throw `Error: ${arrName || 'Provided parameter'} is not an array`
    if (arr.length == 0)
        throw `Error: ${arrName || 'Provided parameter'} is an empty array`
    return arr
}

// num: the variable for number
// numName: the name of number field or variable name
// intFlag: set inflag as true to check if the number is an integer, else set it as false
const validateNumber = (num, numName, intFlag) => {
    if (num === undefined || num === null)
        throw `Error: ${numName || 'Provided parameter'} is null or undefined`
    if (typeof num != "number")
        throw `Error: ${numName || 'Provided parameter'} is not a number`
    if (Number.isNaN(num))
        throw `Error: ${numName || 'Provided parameter'} is NaN`
    if (intFlag) {
        if (!Number.isInteger(num))
            throw `Error: ${numName || 'Provided parameter'} is a decimal number, Only whole numbers/integers are allowed`
    }
    return num
}

// str: the variable for string
// varName: the name of string field or variable name
const validateString = (str, varName) => {
    if (str === undefined || str === null)
        throw `Error: ${varName || 'Provided parameter'} is null or undefined`
    if (typeof str !== 'string')
        throw `Error: ${varName || 'Provided parameter'} is not a string`
    if (str.trim() === '')
        throw `Error: ${varName || 'Provided parameter'} is empty`
    str = str.trim()
    return str
}

// obj: the variable for object
// objName: the name of object field or variable name
const validateObject = (obj, objName) => {
    if (obj === null || obj === undefined)
        throw `Error: ${objName || 'Provided parameter'} is null or undefined`
    if (typeof obj !== 'object' || Array.isArray(obj))
        throw `Error: ${objName || 'Provided parameter'} is not an object`
    if (Object.keys(obj).length === 0)
        throw `Error: ${objName || 'Provided parameter'} has no keys`
    if (Object.values(obj).length === 0)
        throw `Error: ${objName || 'Provided parameter'} has no values corresponding to its keys`
    return obj
}

const validateRatings = (ratings, numName) => {
    if (ratings === undefined || ratings === null) throw `Error: ${numName || 'Provided parameter'} is null or undefined`

    if (typeof ratings !== "number") throw `Error: ${numName || 'Provided parameter'} is not a number`

    if (Number.isNaN(ratings)) throw `Error: ${numName || 'Provided parameter'} is NaN`

    if (ratings < 1 || ratings > 5) throw `Error: ${numName || 'Provided parameter'} must be between 1-5`

    let test = ratings.toString()
    let testArr = test.split(".")
    if (testArr.length > 1 && testArr[1].length > 1) throw `Error: ${numName || 'Provided parameter'} must be upto 1 decimal place`
    return ratings
}

const validatePassword = (pass, pName) => {
    if (pass.includes(" ")) throw `Password must not consist of spaces`
    pass = validateString(pass, pName)
    const schema = new PasswordValidator();
    const minLen = 8;
    const maxLen = 16;
    schema
        .is().min(minLen)
        .is().max(maxLen)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols();

    // Validate a password
    if (!schema.validate(pass)) {
        let valList = schema.validate(pass, { list: true })
        let errStr = `${pName || 'Provided parameter'} must consist of `
        for (let i = 0; i < valList.length; i++) {
            if (i != 0 && i != valList.length - 1) errStr = errStr + `, `
            if (i == valList.length - 1 && i != 0) errStr = errStr + ` and `
            if (valList[i] == 'min') errStr = errStr + `minimum ${minLen} characters`
            if (valList[i] == 'max') errStr = errStr + `maximum ${maxLen} characters`
            if (valList[i] == 'uppercase') errStr = errStr + `an uppercase letter`
            if (valList[i] == 'lowercase') errStr = errStr + `a lowercase letter`
            if (valList[i] == 'digits') errStr = errStr + `a number`
            if (valList[i] == 'symbols') errStr = errStr + `a special character`
        }
        throw errStr
    }
    return pass;
}

//this function requires date input in mm-dd-yyyy format
const validateAge = (inputDate, varName) => {
    inputDate = validateString(inputDate, varName)
    let birthDate = moment(inputDate, 'MM/DD/YYYY')
    let age = moment().diff(birthDate, 'years')
    if (age < 18 || age >= 100) throw `${varName || 'Provided parameter'} should be between 18-100`
    return inputDate
}

const validateEmail = (email, varName) => {
    email = validateString(email, varName)
    if (!validator.isEmail(email)) throw `${varName || 'Provided parameter'} is invalid`
    return email
}

const validateId = (objId, varName) => {
    objId = validateString(objId, varName)
    if (!ObjectId.isValid(objId)) throw `${varName || 'Provided parameter'} is invalid`
    return objId
}

const validatePrice = (price, varName) => {
    price = validateNumber(price, varName, false)
    if (price <= 0.00) throw `${varName || 'Provided parameter'} must be greater than 0`
    checkDecimalValue(price, varName, 2)
    return price
}


const checkDecimalValue = (num, numName, dec) => {
    if (dec !== undefined && dec !== null) {
        let test = num.toString()
        let testArr = test.split(".")
        if (testArr.length > dec && testArr[1].length > dec) throw `Error: ${numName || 'Provided parameter'} must be upto ${dec} decimal place`
    }
    return num
}

const checkStringMinLength = (str, varName, min) => {
    str = validateString(str, varName)
    if ((min !== undefined && min !== null) && str.length < min)
        throw `Error: ${varName || 'Provided parameter'} should consist of at least ${min} characters`
    return str
}

const checkStringMaxLength = (str, varName, max) => {
    str = validateString(str, varName)
    if ((max !== undefined && max !== null) && str.length > max)
        throw `Error: ${varName || 'Provided parameter'} should consist of at most ${max} characters`
    return str
}

const checkArrLength = (arr, arrName, min) => {
    if (min !== undefined && min !== null) {
        if (arr.length < min)
            throw `Error: ${arrName || 'Provided parameter'} should consist of at least ${min} elements`
    }
    return arr
}

const checkMinValue = (num, numName, min) => {
    if (num < min)
        throw `Error: Minimum value of ${numName || 'Provided parameter'} should be ${min}`
    return num
}

const checkMaxValue = (num, numName, max) => {
    if (num > max)
        throw `Error: Maximum value of ${numName || 'Provided parameter'} should be ${max}`
    return num
}

export { validateArray, validateNumber, validateString, validateObject, validateRatings, validatePassword, validateAge, validateEmail, validateId, validatePrice, checkDecimalValue, checkArrLength, checkMaxValue, checkMinValue, checkStringMaxLength, checkStringMinLength }