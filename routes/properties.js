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

router
  .route('/check')
  .post(async (req, res) => {
    //code here for GET
    try {
      if (Number.isNaN(req.body.searchProperty)) {
        let isZip = validateZip(req.body.searchProperty);
        if (isZip == false) {
          res.render('searchResults', {
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
      });
    }
    try {
      let searchResults = await getPropertiesViaSearch(req.body.searchProperty);
      if (searchResults) {
        return res.render('searchResults', {
          title: 'searchResults',
          searchResults: searchResults
        });
      }
    } catch (error) {
      return res.status(404).render('error', { title: 'Error', error: error });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let propertyInfo = req.body;
    try {
      const newProduct = await properties.create(
        propertyInfo.address,
        propertyInfo.price,
        propertyInfo.ownerId,
        propertyInfo.location,
        propertyInfo.images,
        propertyInfo.details
      );
      res.render('home');
      // return res.json(newUser);
    } catch (e) {
      return res.sendStatus(500).json({ error: e.message });
    }
  });

router
  .route('/:propertyId')
  .get(async (req, res) => {
    //code here for GET
    try {
      if (!req.params.propertyId)
        throw `Error: You must supply a valid propertyId!`;
      if (typeof req.params.propertyId !== 'string')
        throw `Error: value must be a string!`;
      req.params.propertyId = req.params.propertyId.trim();
      if (req.params.propertyId.length === 0)
        throw `Error: value cannot be an empty string or string with just spaces`;
    } catch (error) {
      res
        .status(400)
        .render('searchResults', {
          error: error,
          hasError: true,
          title: 'Search Results',
        });
    }
    try {
      const propertyDetails = await properties.get(req.params.propertyId);
      res.render('property', {
        title: 'Property',
        propertyDetails: propertyDetails,
      });
    } catch (e) {
      res.status(404).render('error', { title: 'error', error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
    } catch (e) {
      return res.status(400).render('userPage', { title: 'userPage' });
    }
    try {
      let deletedProperty = await properties.remove(req.params.propertyId);
      if (deletedProperty.deleted) {
        res.status(200).json({ message: 'Property deleted successfully' });
      } else {
        res.status(404).json({ message: 'Unable to delete the property' });
      }
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
  });

export default router;
