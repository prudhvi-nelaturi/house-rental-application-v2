// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { propertiesData } from '../data/index.js';

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
    let propertyInfo = req.body;
    try {
      const newProduct = await propertiesData.create(
        propertyInfo.productName,
        propertyInfo.productDescription,
        propertyInfo.modelNumber,
        propertyInfo.price,
        propertyInfo.manufacturer,
        propertyInfo.manufacturerWebsite,
        propertyInfo.keywords,
        propertyInfo.categories,
        propertyInfo.dateReleased,
        propertyInfo.discontinued
      );
      return res.json(newProduct);
      // return res.json(newUser);
    } catch (e) {
      return res.sendStatus(500).json({ error: e.message });
    }
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });
