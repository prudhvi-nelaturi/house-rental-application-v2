// This file should set up the express server as shown in the lecture code

import { create, get } from './data/properties.js';
import { dbConnection, closeConnection } from './config/mongoConnection.js';
import { ObjectId } from 'mongodb';

//Seeding
const db = await dbConnection();
try {
  let address = {
    street: '302 N 2nd St',
    apartmentNum: '2',
    city: 'Harrison',
    state: 'NJ',
    zip: '07029',
  };
  let price = 1500;
  let ownerId = new ObjectId();
  let location = {
    latitute: '40.74856',
    longitute: '-74.16018',
  };
  let images = [
    '/static/house1.jpg',
    '/static/bedroom1.jpg',
    '/static/bathroom.jpg',
  ];
  let details = {
    description: 'A spacious home',
    propertyType: 'Private',
    apartmentType: '2BHK',
    accommodationType: 'Permanent',
    area: '666 ft',
    bedroomCount: 2,
    bathroomCount: 2,
  };
  const result = await create(
    address,
    price,
    ownerId,
    location,
    images,
    details
  );
  console.log(result);
} catch (error) {
  console.log(error.message);
}

await closeConnection();
