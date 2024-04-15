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

export const getAll = async () => {
  let propertyCollection = await properties();
  let propertyList = await propertyCollection.find({}, {projection: {address: 1},}).toArray();
  if (!propertyList) throw "Could not get all properties";
  return propertyList;
};

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

export const remove = async (propertyId) => {
  let propertyCollection = await properties();
  const deletionInfo = await propertyCollection.findOneAndDelete({
    _id: new ObjectId(propertyId),
  });

  if (!deletionInfo) {
    throw `Could not delete property with id of ${propertyId}`;
  }

  return { _id: deletionInfo._id, deleted: true };
};

export const update = async (
  propertyId,
  address,
  price,
  ownerId,
  location,
  favouriteCount,
  images,
  details,
  comments
) => {
  let getCollectionFn = await properties();

  await getCollectionFn.updateOne(
    { _id: new ObjectId(propertyId) },
    {
      $set: {
        address: address,
        price: price,
        ownerId: ownerId,
        location: location,
        favouriteCount: favouriteCount,
        images: images,
        details: details,
        comments: comments
      },
    }
  );

  return await get(propertyId);
};
