// function to be added in validations.js
const validateStringNew = (str, varName) => {
    if (str === undefined || str === null)
        throw `Error: ${varName || 'Provided parameter'} is null or undefined`;
    if (typeof str !== 'string')
        throw `Error: ${varName || 'Provided parameter'} is not a string`;
    if (str.trim() === '')
        throw `Error: ${varName || 'Provided parameter'} is empty`;
    str = str.trim();
    return str;
};

const checkDecimalValue = (num, numName, dec) => {
    if (dec !== undefined && dec !== null) {
        let test = num.toString();
        let testArr = test.split('.');
        if (testArr.length > dec && testArr[1].length > dec)
            throw `Error: ${numName || 'Provided parameter'
            } must be upto ${dec} decimal place`;
    }
    return num;
};

const checkStringMinLength = (str, varName, min) => {
    str = validateStringNew(str, varName);
    if (min !== undefined && min !== null && str.length < min)
        throw `Error: ${varName || 'Provided parameter'
        } should consist of at least ${min} characters`;
    return str;
};

const checkStringMaxLength = (str, varName, max) => {
    str = validateStringNew(str, varName);
    if (max !== undefined && max !== null && str.length > max)
        throw `Error: ${varName || 'Provided parameter'
        } should consist of at most ${max} characters`;
    return str;
};

const validatePrice = (price, varName) => {
    price = validateNumber(price, varName, false);
    if (price <= 0.0)
        throw `${varName || 'Provided parameter'} must be greater than 0`;
    checkDecimalValue(price, varName, 2);
    return price;
};

const validateNumber = (num, numName, intFlag) => {
    if (num === undefined || num === null)
        throw `Error: ${numName || 'Provided parameter'} is null or undefined`;
    if (typeof num != 'number')
        throw `Error: ${numName || 'Provided parameter'} is not a number`;
    if (Number.isNaN(num))
        throw `Error: ${numName || 'Provided parameter'} is NaN`;
    if (intFlag) {
        if (!Number.isInteger(num))
            throw `Error: ${numName || 'Provided parameter'
            } is a decimal number, Only whole numbers/integers are allowed`;
    }
    return num;
};

const validateZip = (zip, varName) => {
    zip = validateStringNew(zip, varName);
    for (i of zip) {
        let num = parseInt(i);
        if (num === undefined || num === null)
            throw `Error: ${varName || 'Zip'} is invalid`;
        if (typeof num != 'number')
            throw `Error: ${varName || 'Zip'} must consist of all numbers`;
        if (Number.isNaN(num))
            throw `Error: ${varName || 'Zip'} is invalid`;
    }
    if (zip.length != 5 ) throw `Error: ${varName || 'Zip'} must consist of five digits`
    return zip
};

const validateStateName = (state, varName) => {
    const names = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
        'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ]

    state = validateStringNew(state, varName)

    if (!names.includes(state)) throw `Invalid state`

    return state
}

const validatePropertyType = (propertyType, varName) => {
    propertyType = validateStringNew(propertyType, varName);
    if (propertyType !== 'private' && propertyType !== 'shared') throw  `Invalid ${varName || 'Property Type'}`
    return propertyType
}

const validateApartType = (apartmentType, varName) => {
    apartmentType = validateStringNew(apartmentType, varName);
    if (apartmentType !== '1bhk' 
    && apartmentType !== '2bhk'
    && apartmentType !== '3bhk'
    && apartmentType !== '4bhk'
    && apartmentType !== 'studio'
    && apartmentType !== 'flex') throw  `Invalid ${varName || 'Apartment Type'}`
    return apartmentType
}

const validateAccType = (accomodationType, varName) => {
    accomodationType = validateStringNew(accomodationType, varName);
    if (accomodationType !== 'permanent' && accomodationType !== 'temporary') 
        throw `Invalid ${varName || 'Accomodation Type'}`
    return accomodationType
}
