const validateString = (str, varName) => {
    if (str === undefined || str === null)
      throw `${varName} must be provided`;
    if (typeof str !== 'string')
      throw `${varName} must be string`;
    if (str.trim() === '')
      throw `${varName} must not have all spaces`;
  };

  