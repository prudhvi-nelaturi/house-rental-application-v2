// This data file should export all functions using the ES6 standard as shown in the lecture code
import { properties } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

export const create = async (
  address,
  price,
  ownerId,
  location,
  images,
  details
) => {
  let newProperty = {
    address: address,
    price: price,
    ownerId: ownerId,
    location: location,
    favouriteCount: 0,
    images: images,
    details: details,
    comments: [],
  };

  let propertyCollection = await properties();
  const insertInfo = await propertyCollection.insertOne(newProperty);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error("Couldn't add property");
  }
  const newId = insertInfo.insertedId.toString();
  const theProperty = get(newId);
  return theProperty;
};

const getAll = async () => {};

export const get = async (propertyId) => {
  // const id = validation.checkId(propertyId);
  let propertyCollection = await properties();
  const theProperty = await propertyCollection.findOne({
    _id: new ObjectId(propertyId),
  });
  if (!theProperty) {
    throw new Error('No property with that id');
  }
  return theProperty;
};

const remove = async (propertyId) => {};

const update = async (
  propertyId,
  address,
  ownerId,
  price,
  location,
  favouriteCount,
  images,
  details,
  comments
) => {};
