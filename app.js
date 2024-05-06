import express from 'express';
import configRoutesFunction from './routes/index.js';
import exphbs from 'express-handlebars';
import session from 'express-session';
import multer from 'multer';
import path from 'path';
import {
  searchPropertyMiddleware,
  editPropertyMiddleware,
  addPropertyMiddleware,
  loginMiddleware,
  registerMiddleware,
  userMiddleware,
} from './middleware.js';

const app = express();

app.use(express.json());
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const changeRemoveMethod = (req, res, next) => {
  req.method = 'DELETE';
  next();
};

const changeEditMethod = (req, res, next) => {
  req.method = 'PUT';
  next();
};

let storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, img, next) {
    next(null, 'img_' + Date.now() + path.extname(img.originalname));
  },
});
let storage2 = multer.diskStorage({
  destination: './uploads/images',
  filename: function (req, file, next) {
    next(null, 'img_' + Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({ storage: storage });
let upload2 = multer({ storage: storage2 });

app.use(
  session({
    name: 'AuthenticationState',
    secret: 'This is our secret message!!!',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/login', loginMiddleware);
app.use('/register', registerMiddleware);
app.use('/userProfile', userMiddleware);
app.use('/addProperty', addPropertyMiddleware);
app.use('/addProperty', upload2.array('images', 5));
app.use('/editProperty', editPropertyMiddleware);
app.use('/search/addProperty', searchPropertyMiddleware);
app.use('/search/editProperty/:propertyId', editPropertyMiddleware);
app.use('/search/updateProperty/:propertyId', editPropertyMiddleware);
app.use('/register', upload.single('profilePicture'));
app.use('/edit', upload.single('profilePicture'));
app.use('/search/remove/:propertyId', changeRemoveMethod);
app.use('/removeFavorite/:propId', changeRemoveMethod);
app.use('/search/updateProperty/:propertyId', changeEditMethod);
app.use('/search/updateProperty/:propertyId', upload2.array('images', 5));
configRoutesFunction(app);

app.listen(3000, (req, res) => {
  console.log('Our server is running at port 3000!');
});

// This file should set up the express server as shown in the lecture code

// import { create, get, getAll, remove, update } from './data/properties.js';
// import { dbConnection, closeConnection } from './config/mongoConnection.js';
// import { ObjectId } from 'mongodb';
// import { createUser } from './data/user.js';
// import { updateUser } from './data/user.js';
// import {
//   createComment,
//   getComment,
//   getAllComments,
//   updateComment,
//   removeComment,
// } from './data/comments.js';

//Seeding
// const db = await dbConnection();
// const userId = new ObjectId();
// try {
//   const result = await createComment(
//     '66258634bd80a46bc8795047',
//     userId.toString(),
//     'This is a comment'
//   );
// } catch (error) {
//   console.log(error);
// }

// try {
//   let address = {
//     street: '302 N 2nd St',
//     apartmentNum: '2',
//     city: 'Harrison',
//     state: 'NJ',
//     zip: '07029',
//   };
//   let price = 1500;
//   let ownerId = new ObjectId();
//   let location = {
//     latitute: '40.74856',
//     longitute: '-74.16018',
//   };
//   let images = [
//     '/static/house1.jpg',
//     '/static/bedroom1.jpg',
//     '/static/bathroom.jpg',
//   ];
//   let details = {
//     description: 'A spacious home',
//     propertyType: 'Private',
//     apartmentType: '2BHK',
//     accommodationType: 'Permanent',
//     area: 666,
//     bedroomCount: 2,
//     bathroomCount: 2,
//   };
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     location,
//     images,
//     details
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error);
// }

// try {
//   let address = {
//     street: '150 North St',
//     apartmentNum: '6',
//     city: 'Jersey city',
//     state: 'NJ',
//     zip: '07307',
//   };
//   let price = 3100;
//   let ownerId = new ObjectId();
//   let location = {
//     latitute: '40.719074',
//     longitute: '-74.050552',
//   };
//   let images = [
//     '/static/house1.jpg',
//     '/static/bedroom1.jpg',
//     '/static/bathroom.jpg',
//   ];
//   let details = {
//     description: 'A spacious home',
//     propertyType: 'Shared',
//     apartmentType: '4BHK',
//     accommodationType: 'Permanent',
//     area: 789,
//     bedroomCount: 4,
//     bathroomCount: 1,
//   };
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     location,
//     images,
//     details
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error);
// }

// try {
//   let address = {
//     street: '300 N 2nd St',
//     apartmentNum: '4',
//     city: 'Harrison',
//     state: 'NJ',
//     zip: '07029',
//   };
//   let price = 1700;
//   let ownerId = new ObjectId();
//   let location = {
//     latitute: '40.74856',
//     longitute: '-74.16018',
//   };
//   let images = [
//     '/static/house1.jpg',
//     '/static/bedroom1.jpg',
//     '/static/bathroom.jpg',
//   ];
//   let details = {
//     description: 'A beautiful home',
//     propertyType: 'Private',
//     apartmentType: '3BHK',
//     accommodationType: 'Permanent',
//     area: 666,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     location,
//     images,
//     details
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   async function main() {
//     const propertyCollection = await getAll();
//     console.log(propertyCollection);
//   }
//   await main();
// } catch (error) {
//   console.log(error);
// }

// try {
//   async function main() {
//     const removeProp = await remove('661c8d63ded84c1fa5b355be');
//     console.log(removeProp);
//   }
//   await main();
// } catch (error) {
//   console.log(error);
// }

// try {
//   let address = {
//     street: '30 poplar street',
//     apartmentNum: '2',
//     city: 'Jersey city',
//     state: 'NJ',
//     zip: '07307',
//   };
//   let price = 11;
//   let ownerId = new ObjectId();
//   let location = {
//     latitute: '40.75396',
//     longitute: '-74.04547',
//   };
//   let comments = [];
//   let images = [
//     '/static/house1.jpg',
//     '/static/bedroom1.jpg',
//     '/static/bathroom.jpg',
//   ];
//   let details = {
//     description: 'This house is very old',
//     propertyType: 'Private',
//     apartmentType: '3BHK',
//     accommodationType: 'Permanent',
//     area: '1012 ft',
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   async function main() {
//     const updateProp = await update(
//       '661ca190df012c073aac5f13',
//       address,
//       price,
//       ownerId,
//       location,
//       3,
//       images,
//       details,
//       comments
//     );
//     console.log(updateProp);
//   }
//   await main();
// } catch (error) {
//   console.log(error);
// }

// try {
//   let result = await updateUser('661ed4e5a908d4d11ac4398d', {});
//   console.log(result);
// } catch (e) {
//   console.log(e);
// }

// try {
//   let result = await createUser(
//     'Edwin',
//     'A',
//     'Stevens',
//     'abcde@gmail.com',
//     'M',
//     25,
//     'owner',
//     'thisismypassword',
//     'Hoboken',
//     'NJ',
//     '/static/picture1.jpg'
//   );
//   console.log(result);
// } catch (e) {
//   console.log(e);
// }

// await closeConnection();
