const validateString = (str, varName) => {
    if (str === undefined || str === null)
      throw `${varName} must be provided`;
    if (typeof str !== 'string')
      throw `${varName} must be string`;
    if (str.trim() === '')
      throw `${varName} must not have all spaces`;
  };

  const validatepassword = (value, name) => {
    if(!value) throw `Error: ${name} must be supplied`;
    if(typeof value !== 'string') throw `Error: ${name} must be a string`;
    if(value.trim().length === 0) throw `Error: ${name} must not be have all spaces`;

    if(value.includes(' ')) throw "Error: password can not have spaces";
    
    if(value.length < 8 || value.length > 16) throw `Error: ${name} must be 8 to 16 chars long`;
    if(!checkUpper(value)) throw `Error: ${name} must have atleast one upper char`;
    if(!checkNumber(value)) throw `Error: ${name} must have atleast one number`;
    if(!checkSpecial(value)) throw `Error: ${name} must have atleast one special char`;
}

const checkUpper = (val) => {
    for(let x of val) {
        if(x >= 'A' && x<= 'Z') return true;
    }
     return false;
}

const checkNumber = (val) => {
    for(let x of val) {
        if(!isNaN(x)) return true;
    }
    return false;
}

const checkSpecial = (val) => {
    const specials = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '_'];
    for(let x of val) {
        if(specials.includes(x)) return true;
    }
    return false;
}

const validateEmail = (value , name) => {
  if(!value) throw `Error: ${name} must be supplied`;
  if(typeof value !== 'string') throw `Error: ${name} must be a string`;
  if(value.trim().length === 0) throw `Error: ${name} must not be have all spaces`;
  value = value.trim().toLowerCase();
  //let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!pattern.test(value)) {
    throw `Error: ${name} is not valid`;
  }
}

const validateName = (value, name) => {
  if(!value) throw `Error: ${name} must be supplied`;
  if(typeof value !== 'string') throw `Error: ${name} must be a string`;
  if(value.trim().length === 0) throw `Error: ${name} must not be empty`;

  value = value.trim();
  if(value.length <2 || value.length > 25) throw `Error: ${name} must be 2 to 25 chars long`;
  for(let x of value) {
      if(!isNaN(x)) throw `Error: ${name} must not contain numbers`;
  }
}

const validateState = (state, varName) => {
  const names = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
      'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
      'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  validateString(state, varName)

  if (!names.includes(state)) throw `Invalid state`
}

const validateGender = (value, varName) => {
  const options = ['male', 'female', 'other'];

  validateString(value, varName)
  if (!options.includes(value)) throw `Gender is not valid!`
}

const validateAge = (inputDate, varName) => {
  validateString(inputDate, varName);
  inputDate = inputDate.trim();
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
      } );

  let input = formatAge(inputDate);
  // let dateCheck = input.split('/');
  // if(dateCheck.length !== 3) throw `Error: ${varName} must have mm/dd/yyyy`;
  // if(dateCheck[0].length !== 2) throw `Error: ${varName} must have 2 chars for month`;
  // if(dateCheck[1].length !== 2) throw `Error: ${varName} must have 2 chars for day`;
  // if(dateCheck[2].length !== 4) throw `Error: ${varName} must have 4 chars for year`;

  // dateCheck = dateCheck.map(x => Number(x));
  // dateCheck.forEach(x => {
  //     if(isNaN(x)) throw "Error: Date must have numbers"
  // });

  let diff = Date.now() - (new Date(input)).getTime();
  let age = new Date(diff);
  let val = Math.abs(1970 - age.getUTCFullYear());
  if (val < 18 || val > 100)
      throw `${varName || 'Provided parameter'} should be between 18-100`;
};

const formatAge = (val) => {
  val = val.trim();
  let ans =  val.split('-');
  let age = ans[1]+'/'+ans[2]+'/'+ans[0];
  return age;
}