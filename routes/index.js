// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /products use the routes defined in the products.js routing file
    - When the route is /reviews use the routes defined in reviews.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/

import userRoutes from './user.js';
import mainRoutes from './mainRoute.js';
import propertyRoutes from './properties.js';
import commentRoutes from './comments.js';

const configRoutesFunction = (app) => {
  app.use('/', mainRoutes);

  app.use('/', userRoutes);
  app.use('/', propertyRoutes);
  app.use('/search', propertyRoutes);
  app.use('/comment', commentRoutes);

  app.use('/addProperty', propertyRoutes);
  app.use('/editProperty', propertyRoutes);
  // app.use('/property/:propertyId', propertyRoutes);
  //app.use('/search/propertyId', propertyRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
  });
};

export default configRoutesFunction;
