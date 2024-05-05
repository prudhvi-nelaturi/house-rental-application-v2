// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import {
  validateId,
  validateString,
  validateEmail,
  validatePassword,
  validateAge,
  validateUserObj,
  validateNumber,
  validateZip,
} from '../helpers.js';

const router = express.Router();
import { properties } from '../data/index.js';
import {
  create,
  getAll,
  get,
  remove,
  update,
  getPropertiesViaSearch,
} from '../data/properties.js';

router.route('/check').post(async (req, res) => {
  //code here for GET
  let isAuthenticated = false;
  if (req.session.user) {
    isAuthenticated = true;
  }
  try {
    if (Number.isNaN(req.body.searchProperty)) {
      let isZip = validateZip(req.body.searchProperty);
      if (isZip == false) {
        return res.render('searchResults', {
          title: 'searchResults',
          hasError: true,
          error: error,
        });
      }
    } else {
      req.body.searchProperty = validateString(req.body.searchProperty);
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
    let searchResults = await getPropertiesViaSearch(req.body.searchProperty);
    if (searchResults) {
      return res.render('searchResults', {
        title: 'searchResults',
        searchResults: searchResults,
        isAuthenticated: isAuthenticated,
      });
    }
  } catch (error) {
    return res.status(404).render('error', { title: 'Error', error: error });
  }
});

router.route('/addProperty').post(async (req, res) => {
  //code here for POST
  let propertyInfo = req.body;
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
    area: propertyInfo.area,
    bedroomCount: propertyInfo.bedroomCount,
    bathroomCount: propertyInfo.bathroomCount,
  };
  let location = {
    latitude: propertyInfo.latitude,
    longitude: propertyInfo.longitude,
  };

  let ownerFullName = req.session.user.firstName + '  ' + req.session.user.lastName;
  console.log("req.session.user", req.session.user);
  let newProduct = undefined;
  try {
      newProduct = await properties.create(
      address,
      propertyInfo.price,
      req.session.user.id,
      ownerFullName,
      location,
      propertyInfo.images,
      details,
      propertyInfo.nearestLandmarks
    );
    console.log("returning from routes");
    // return res.json(newUser);
  } catch (e) {
    return res.status(400).render('addProperty',{ errorMsg: e, errFlag: true, title: 'Home Page'});
  }
  if (newProduct) {
    return res.render('homepage', {title: 'Home Page'})
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
    return res.render('property', {
      title: 'Property',
      propertyDetails: propertyDetails,
      isAuthenticated: isAuthenticated,
    });
  } catch (e) {
    return res.status(404).render('error', { title: 'error', error: e });
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
        return res.status(404).json({ message: 'Unable to delete the property' });
      }
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
  });

export default router;
