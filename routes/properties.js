// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { properties } from '../data/index.js';

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
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
    if (!req.params.propertyId) throw `Error: You must supply a valid propertyId!`;
    if (typeof req.params.propertyId !== 'string') throw `Error: value must be a string!`;
    req.params.propertyId = req.params.propertyId.trim();
    if (req.params.propertyId.length === 0)
      throw `Error: value cannot be an empty string or string with just spaces`;
  } catch (error) {
    res.status(400).render("searchResults", {error: error, hasError: true, title: "Search Results"});
  }
  try {
    const propertyDetails = await properties.get(req.params.propertyId);
    res.render('property', {title: "Property", propertyDetails: propertyDetails});
  } catch (e) {
    res.status(404).render('error', { title: "error", error: e});
  }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.propertyId = validateId(req.params.propertyId, 'Id URL Param');
    } catch (e) {
      return res.status(400).render('userPage', {title: "userPage"})
    }
    try {
      let deletedProperty = await properties.remove(req.params.propertyId);
      if(deletedProperty.deleted){
        res.status(200).json({message: "Property deleted successfully"});
      }
      else{
        res.status(404).json({message: "Unable to delete the property"});
      }
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT
  });
