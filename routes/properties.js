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
  .get(async (req, res) => {})
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });

export default router;
