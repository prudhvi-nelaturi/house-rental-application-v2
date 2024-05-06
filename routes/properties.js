// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import {
  validateId,
  validateString,
  validateNumber,
  validateZip,
  checkDecimalValue,
  validateAccType,
  validateApartType,
  validatePropertyType,
  validateState,
  checkMaxValue,
  checkStringMaxLength,
  compareData,
  checkMinValue,
  validateArray,
} from '../helpers.js';
import xss from 'xss';

const router = express.Router();
import { users, properties, comments } from '../data/index.js';
import {
  create,
  getAll,
  get,
  remove,
  update,
  getPropertiesViaSearch,
  addFavInProp,
  removeFavInProp,
} from '../data/properties.js';
import {
  addFav,
  removeFav,
  getFavorites,
  getFavoritesByUser,
} from '../data/user.js';

router.route('/check').post(async (req, res) => {
  //code here for GET
  // let isFavAdded = false;
  let userFavHouses = '';
  if (req.session.user) {
    userFavHouses = await getFavoritesByUser(req.session.user.id);

    // userFavHouses.forEach((element) => {
    //   if (element == req.params.propertyId) {
    //     isFavAdded = true;
    //   }
    // });
  }
  // let isAuthenticated = false;
  // if (req.session.user) {
  //   isAuthenticated = true;
  // }

  let searchInfo = {
    searchProperty: xss(req.body.searchProperty),
    price: xss(req.body.price),
    accomodationType : xss(req.body.accomodationType)
  }

  try {
    if (Number.isNaN(searchInfo.searchProperty)) {
      let isZip = validateZip(searchInfo.searchProperty);
      if (isZip == false) {
        return res.render('searchResults', {
          title: 'searchResults',
          hasError: true,
          error: error,
        });
      }
    } else {
      searchInfo.searchProperty = validateString(searchInfo.searchProperty);
    }
  } catch (error) {
    return res.render('searchResults', {
      title: 'searchResults',
      hasError: true,
      error: error,
      isAuthenticated: isAuthenticated,
    });
  }
  try {
    if (searchInfo.price) {
      searchInfo.price = parseFloat(searchInfo.price);
    }
    let searchResults = await getPropertiesViaSearch(
      searchInfo.searchProperty,
      searchInfo.price,
      searchInfo.accomodationType
    );
    searchResults.forEach((element) => {
      if (userFavHouses.includes(element._id.toString())) {
        element.isFavor = true;
      } else element.isFavor = false;
      if (req.session.user) {
        element.isLoggedin = true;
      } else {
        element.isLoggedin = false;
      }
    });
    let isAuthenticated = false;
    let isLoggedin = false;
    if (req.session.user) {
      isAuthenticated = true;
      isLoggedin = true;
    }
    if (searchResults) {
      return res.render('searchResults', {
        title: 'searchResults',
        searchResults: searchResults,
        isAuthenticated: isAuthenticated,
        userFavHouses: userFavHouses,
        isLoggedin: isLoggedin,
        searchProperty: searchInfo.searchProperty,
      });
    }
  } catch (error) {
    return res.status(400).render('error', { title: 'Error', error: error });
  }
});

router.route('/addProperty').post(async (req, res) => {
  //code here for POST
  let propertyInfoOld = req.body;
  if (!propertyInfoOld || Object.keys(propertyInfoOld).length === 0) {
    return res.status(400).json({ error: 'Request body is empty' });
  }
  let errors = [];
  let propertyInfo = {
    street: xss(req.body.street),
    apartmentNum: xss(req.body.apartmentNum),
    city: xss(req.body.city),
    state: xss(req.body.state),
    zip: xss(req.body.zip),
    nearestLandmarks:  xss(req.body.nearestLandmarks),
    price: xss(req.body.price),
    latitude: xss(req.body.latitude),
    longitude: xss(req.body.longitude),
    description: xss(req.body.description),
    propertyType: xss(req.body.propertyType),
    apartmentType: xss(req.body.apartmentType),
    accomodationType: xss(req.body.accomodationType),
    area: xss(req.body.area),
    bedroomCount: xss(req.body.bedroomCount),
    bathroomCount: xss(req.body.bathroomCount),
    images: xss(req.body.images).split(","),
  }
  //validations -- start

  try {
    propertyInfo.street = validateString(propertyInfo.street, 'Street');
    checkStringMaxLength(propertyInfo.street, 'Street', 50);
  } catch (e) {
    errors.push(e);
  }

  try {
    if (
      propertyInfo.apartmentNum.trim() !== '' &&
      propertyInfo.apartmentNum !== undefined &&
      propertyInfo.apartmentNum !== null
    ) {
      propertyInfo.apartmentNum = validateString(
        propertyInfo.apartmentNum,
        'Apartment No.'
      );
      checkStringMaxLength(propertyInfo.apartmentNum, 'Apartment No.', 25);
    }
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.city = validateString(propertyInfo.city, 'City');
    checkStringMaxLength(propertyInfo.city, 'City', 25);
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.state = validateState(propertyInfo.state, 'State');
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.zip = validateZip(propertyInfo.zip, 'Zip', true);
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.description = validateString(
      propertyInfo.description,
      'Description'
    );
    checkStringMaxLength(propertyInfo.description, 'Description', 1000);
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.propertyType = validatePropertyType(
      propertyInfo.propertyType,
      'Property Type'
    );
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.apartmentType = validateApartType(
      propertyInfo.apartmentType,
      'Apartment Type'
    );
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.accomodationType = validateAccType(
      propertyInfo.accomodationType,
      'Accomodation Type'
    );
  } catch (e) {
    errors.push(e);
  }

  let areaSqFt = parseInt(propertyInfo.area);
  try {
    areaSqFt = validateNumber(areaSqFt, 'Area');
    checkMaxValue(areaSqFt, 'Area', 6000);
    if (areaSqFt <= 0) throw `Area must be greater than 0`;
  } catch (e) {
    errors.push(e);
  }

  let bedroom = parseInt(propertyInfo.bedroomCount);
  try {
    bedroom = validateNumber(bedroom, 'No. of Bedrooms');
    checkMaxValue(bedroom, 'No. of Bedrooms', 6);
    checkMinValue(bedroom, 'No. of Bedrooms', 1);
    // if (bedroom < 0) throw `No. of Bedrooms must be greater than or equal to 0`
  } catch (e) {
    errors.push(e);
  }

  let bathroom = parseInt(propertyInfo.bathroomCount);
  try {
    bathroom = validateNumber(bathroom, 'No. of Bathrooms');
    checkMaxValue(bathroom, 'No. of Bathrooms', 6);
    checkMinValue(bathroom, 'No. of Bathrooms', 1);
    // if (bathroom < 0) throw `No. of Bathrooms must be greater than or equal to 0`
  } catch (e) {
    errors.push(e);
  }

  let lati_tude = parseFloat(propertyInfo.latitude);
  try {
    lati_tude = validateNumber(lati_tude, 'Latitude', false);
  } catch (e) {
    errors.push(e);
  }
  try {
    lati_tude = checkDecimalValue(lati_tude, 'Latitude', 6);
  } catch (e) {
    errors.push(e);
  }

  let longi_tude = parseFloat(propertyInfo.longitude);
  try {
    longi_tude = validateNumber(longi_tude, 'Longitude', false);
  } catch (e) {
    errors.push(e);
  }
  try {
    longi_tude = checkDecimalValue(longi_tude, 'Longitude', 6);
  } catch (e) {
    errors.push(e);
  }

  let p = parseFloat(propertyInfo.price);
  try {
    p = validateNumber(p, 'Price', false);
  } catch (e) {
    errors.push(e);
  }

  try {
    p = checkDecimalValue(p, 'Price', 6);
    if (p <= 0) throw `Price must be greater than 0`;
  } catch (e) {
    errors.push(e);
  }

  try {
    if (
      propertyInfo.nearestLandmarks.trim() !== '' &&
      propertyInfo.nearestLandmarks !== undefined &&
      propertyInfo.nearestLandmarks !== null
    ) {
      propertyInfo.nearestLandmarks = validateString(
        propertyInfo.nearestLandmarks,
        'Nearest Landmarks'
      );
      checkStringMaxLength(
        propertyInfo.nearestLandmarks,
        'Nearest Landmarks',
        1000
      );
    } else {
      propertyInfo.nearestLandmarks = '';
    }
  } catch (e) {
    errors.push(e);
  }

  if (propertyInfo.nearestLandmarks.includes(',')) {
    try {
      let landmarks = propertyInfo.nearestLandmarks.split(',');
      for (let i = 0; i < landmarks.length; i++) {
        landmarks[i] = validateString(landmarks[i], 'Nearest Landmark');
      }
    } catch (e) {
      errors.push(e);
    }
  }

  if (errors.length > 0) {
    //return res.status(400).json({error: errors});
    return res.status(400).render('addProperty', {
      isAuthenticated: true,
      isError: true,
      propData: propertyInfo,
      errors: errors,
      title: 'Add Property Page',
    });
  }

  //validations -- end

  let address = {
    street: propertyInfo.street,
    apartmentNum: propertyInfo.apartmentNum,
    city: propertyInfo.city,
    state: propertyInfo.state,
    zip: propertyInfo.zip,
  };
  let details = {
    description: propertyInfo.description,
    propertyType: propertyInfo.propertyType,
    apartmentType: propertyInfo.apartmentType,
    accomodationType: propertyInfo.accomodationType,
    area: areaSqFt,
    bedroomCount: bedroom,
    bathroomCount: bathroom,
  };
  let location = {
    latitude: lati_tude,
    longitude: longi_tude,
  };
  let ownerFullName =
    req.session.user.firstName + ' ' + req.session.user.lastName;

  let imgs = [];
  req.files.forEach((x)=> {
    imgs.push(x.filename)
  })
  propertyInfo.images = imgs;
  let newProduct = undefined;
  try {
    newProduct = await properties.create(
      address,
      p,
      req.session.user.id,
      ownerFullName,
      location,
      propertyInfo.images,
      details,
      propertyInfo.nearestLandmarks
    );
    // return res.json(newUser);
  } catch (e) {
    return res.status(400).render('addProperty', {
      propData: propertyInfo,
      isAuthenticated: true,
      errorMsg: e,
      errFlag: true,
      title: 'Add Property Page',
    });
  }
  if (newProduct) {
    let email = req.session.user.email;
    let user = await users.getUserByEmail(email);
    let details = await users.getProperties(email);
    //let favorites = await users.getFavorites(user._id);
    return res.render('userPage', {
      title: 'User Profile',
      user: user,
      isAuthenticated: true,
      properties: details,
    });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.route('/editProperty/:propertyId').get(async (req, res) => {
  try {
    req.params.propertyId = validateId(req.params.propertyId);
  } catch (e) {
    return res.status(400).render('editProperty', {
      isAuthenticated: true,
      errorMsg: e,
      errFlag: true,
      title: 'Edit Property Page',
    });
  }
  try {
    const user = await properties.get(req.params.propertyId);
    return res.status(200).render('editProperty', {
      propData: user,
      isAuthenticated: true,
      errFlag: false,
      title: 'Edit Property Page',
    });
  } catch (e) {
    return res.status(404).render('editProperty', {
      isAuthenticated: true,
      errorMsg: e,
      errFlag: true,
      title: 'Edit Property Page',
    });
  }
});

router.route('/updateProperty/:propertyId').put(async (req, res) => {
  let propertyInfoOld = req.body;
  if (!propertyInfoOld || Object.keys(propertyInfoOld).length === 0) {
    return res.status(400).json({ error: 'Request body is empty' });
  }
  let errors = [];
  let propertyInfo = {
    street: xss(req.body.street),
    apartmentNum: xss(req.body.apartmentNum),
    city: xss(req.body.city),
    state: xss(req.body.state),
    zip: xss(req.body.zip),
    nearestLandmarks:  xss(req.body.nearestLandmarks),
    price: xss(req.body.price),
    latitude: xss(req.body.latitude),
    longitude: xss(req.body.longitude),
    description: xss(req.body.description),
    propertyType: xss(req.body.propertyType),
    apartmentType: xss(req.body.apartmentType),
    accomodationType: xss(req.body.accomodationType),
    area: xss(req.body.area),
    bedroomCount: xss(req.body.bedroomCount),
    bathroomCount: xss(req.body.bathroomCount),
    images: xss(req.body.images).split(",")
  }
  try {
    propertyInfo.description = validateString(
      propertyInfo.description,
      'Description'
    );
    checkStringMaxLength(propertyInfo.description, 'Description', 1000);
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.propertyType = validatePropertyType(
      propertyInfo.propertyType,
      'Property Type'
    );
  } catch (e) {
    errors.push(e);
  }

  try {
    propertyInfo.accomodationType = validateAccType(
      propertyInfo.accomodationType,
      'Accomodation Type'
    );
  } catch (e) {
    errors.push(e);
  }

  let p = parseFloat(propertyInfo.price);
  try {
    p = validateNumber(p, 'Price', false);
  } catch (e) {
    errors.push(e);
  }

  try {
    p = checkDecimalValue(p, 'Price', 6);
    if (p <= 0) throw `Price must be greater than 0`;
  } catch (e) {
    errors.push(e);
  }

  try {
    if (
      propertyInfo.nearestLandmarks.trim() !== '' &&
      propertyInfo.nearestLandmarks !== undefined &&
      propertyInfo.nearestLandmarks !== null
    ) {
      propertyInfo.nearestLandmarks = validateString(
        propertyInfo.nearestLandmarks,
        'Nearest Landmarks'
      );
      checkStringMaxLength(
        propertyInfo.nearestLandmarks,
        'Nearest Landmarks',
        1000
      );
    } else {
      propertyInfo.nearestLandmarks = '';
    }
  } catch (e) {
    errors.push(e);
  }
  try {
    req.params.propertyId = validateId(req.params.propertyId);
  } catch (e) {
    errors.push(e);
  }

   let address = {
    street: propertyInfo.street,
    apartmentNum: propertyInfo.apartmentNum,
    city: propertyInfo.city,
    state: propertyInfo.state,
    zip: propertyInfo.zip,
  };
  let details = {
    description: propertyInfo.description,
    propertyType: propertyInfo.propertyType,
    apartmentType: propertyInfo.apartmentType,
    accomodationType: propertyInfo.accomodationType,
    area: parseInt(propertyInfo.area),
    bedroomCount: parseInt(propertyInfo.bedroomCount),
    bathroomCount: parseInt(propertyInfo.bathroomCount),
  };
  let location = {
    latitude: propertyInfo.latitude,
    longitude: propertyInfo.longitude,
  };
  let ownerFullName =
    req.session.user.firstName + ' ' + req.session.user.lastName;
  let newProduct = undefined;
  let retObj = {
    _id : req.params.propertyId,
    address: address,
    details: details,
    nearestLandmarks: propertyInfo.nearestLandmarks,
    price: propertyInfo.price,
    location: location,
  };
  let propertyDetails = undefined;
  try {
    propertyDetails = await properties.get(req.params.propertyId);

    let errStr = compareData(propertyDetails, retObj);
    if (errStr.trim() !== '') errors.push(errStr);
  } catch (e) {
    errors.push(e);
  }
  let finalImages = [];
  let inputImages = []
  if (propertyInfo.images) {
    if (!Array.isArray(propertyInfo.images)) {
      if (propertyInfo.images.trim().length !==0) {
        inputImages.push(propertyInfo.images)
      }
    } else {
      for (let img3 of propertyInfo.images) {
        inputImages.push(img3)
      }
    }
  }
  if (propertyDetails.images) {
    for (let img of propertyDetails.images) {
      finalImages.push(img)
    }
  }
  if (finalImages.length === 5 && inputImages.length > 0) {
    let str = "This property already has 5 images posted, no more images can be uploaded"
    errors.push(str)
  } else if (finalImages.length === 0 && inputImages.length > 5) {
    errors.push("Maximum 5 images can be uploaded")
  } else if (5-finalImages.length < inputImages.length) {
    let str2 = "This property already has " + finalImages.length + " posted, only " + (5-finalImages.length) + " more image/images can be uploaded"
    errors.push(str2)
  } else {
    for (let img2 of inputImages) {
      finalImages.push(img2)
    }
  }
  if (errors.length > 0) {
    return res.status(400).render('editProperty', {
      isAuthenticated: true,
      isError: true,
      propData: retObj,
      errors: errors,
      title: 'Edit Property Page',
    });
  }
  try {
    newProduct = await properties.update(
      req.params.propertyId,
      address,
      p,
      req.session.user.id,
      ownerFullName,
      location,
      propertyDetails.favouriteCount,
      finalImages,
      details,
      propertyInfo.nearestLandmarks,
      propertyDetails.comments
    );
    // return res.json(newUser);
  } catch (e) {
    return res.status(400).render('editProperty', {
      propData: retObj,
      isAuthenticated: true,
      errorMsg: e,
      errFlag: true,
      title: 'Edit Property Page',
    });
  }
  if (newProduct) {
    let email = req.session.user.email;
    let user = await users.getUserByEmail(email);
    let details = await users.getProperties(email);
    //let favorites = await users.getFavorites(user._id);
    return res.render('userPage', {
      title: 'User Profile',
      user: user,
      isAuthenticated: true,
      properties: details,
    });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.route('/property/:propertyId').get(async (req, res) => {
  //code here for GET
  let isAuthenticated = false;
  if (req.session.user) {
    isAuthenticated = true;
  }
  try {
    if (!req.params.propertyId)
      throw `Error: You must supply a valid propertyId!`;
    if (typeof req.params.propertyId !== 'string')
      throw `Error: value must be a string!`;
    req.params.propertyId = req.params.propertyId.trim();
    if (req.params.propertyId.length === 0)
      throw `Error: value cannot be an empty string or string with just spaces`;
  } catch (error) {
    return res.status(400).render('searchResults', {
      error: error,
      hasError: true,
      title: 'Search Results',
      isAuthenticated: isAuthenticated,
    });
  }

  try {
    const propertyDetails = await properties.get(req.params.propertyId);
    let isFavAdded = false;
    if (req.session.user) {
      const userFavHouses = await getFavoritesByUser(req.session.user.id);

      userFavHouses.forEach((element) => {
        if (element == req.params.propertyId) {
          isFavAdded = true;
        }
      });
    }

    res.render('property', {
      title: 'Property',
      propertyDetails: propertyDetails,
      isAuthenticated: isAuthenticated,
      isFavAdded: isFavAdded,
    });
  } catch (e) {
    return res.status(400).render('error', { title: 'error', error: e });
  }
});

router
  .route('/remove/:propertyId')
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
    } catch (e) {
      return res.status(400).render('userPage', { title: 'userPage' });
    }
    try {
      let deletedProperty = await properties.remove(
        req.params.propertyId,
        req.session.user.id
      );
      if (deletedProperty.deleted) {
        //res.status(200).json({message: "Property deleted successfully"});
        return res.status(200).redirect('/userProfile');
      } else {
        return res
          .status(400)
          .json({ message: 'Unable to delete the property' });
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
  });

router.route('/addFav/:propertyId').get(async (req, res) => {
  try {
    req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
  } catch (e) {
    return res.status(400).render('userPage', { title: 'userPage' });
  }
  try {
    let addFavFunctionInUsers = await addFav(
      req.session.user.id,
      req.params.propertyId
    );
    let addFavCount = await addFavInProp(req.params.propertyId);
    if (!addFavCount) {
      return res.status(400).render('error', { title: 'Error' });
    }
    if (addFavFunctionInUsers.added) {
      res.redirect(`/search/property/${req.params.propertyId}`);
    }
  } catch (error) {
    return res.status(400).render('error', { title: 'Error' });
  }
});

router.route('/removeFav/:propertyId').get(async (req, res) => {
  try {
    req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
  } catch (e) {
    return res.status(400).render('userPage', { title: 'userPage' });
  }
  try {
    let RemoveFavFunctionInUsers = await removeFav(
      req.session.user.id,
      req.params.propertyId
    );
    if (RemoveFavFunctionInUsers.deleted) {
      res.redirect(`/search/property/${req.params.propertyId}`);
    }
  } catch (error) {
    return res.status(400).render('error', {
      title: 'Error',
      error: "Couldn't remove fav from user function",
    });
  }
});

router.route('/addFavFromSearch/:propertyId').get(async (req, res) => {
  try {
    req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
  } catch (e) {
    return res.status(400).render('error', { title: 'Error' });
  }
  try {
    let addFavFunctionInUsers = await addFav(
      req.session.user.id,
      req.params.propertyId
    );
    let addFavCount = await addFavInProp(req.params.propertyId);
    if (!addFavCount) {
      return res.status(400).render('error', { title: 'Error' });
    }
    if (addFavCount.favAdded) {
      //res.redirect(`/search/property/${req.params.propertyId}`);
      return res.json(addFavCount);
    }
  } catch (error) {
    return res.status(400).render('error', { title: 'Error' });
  }
});

router.route('/removeFavFromSearch/:propertyId').get(async (req, res) => {
  try {
    req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
  } catch (e) {
    return res.status(400).render('error', { title: 'Error' });
  }
  try {
    let RemoveFavFunctionInUsers = await removeFav(
      req.session.user.id,
      req.params.propertyId
    );
    if (RemoveFavFunctionInUsers.deleted) {
      //res.redirect(`/search/property/${req.params.propertyId}`);
      return res.json(RemoveFavFunctionInUsers);
    }
  } catch (error) {
    return res.status(400).render('error', {
      title: 'Error',
      error: "Couldn't remove fav from user function",
    });
  }
});

export default router;
