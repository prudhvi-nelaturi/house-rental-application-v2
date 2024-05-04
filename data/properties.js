// This data file should export all functions using the ES6 standard as shown in the lecture code
import { properties, users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import {
  validateZip,
  checkDecimalValue,
  validateNumber,
  validateObject,
  validateString,
  validateId,
  validateArray,
} from '../helpers.js';
import { getUser } from './user.js';

export const create = async (
  address,
  price,
  ownerId,
  ownerFullName,
  location,
  images,
  details,
  nearestLandmarks
) => {
  if (
    !address ||
    !price ||
    !ownerId ||
    !ownerFullName ||
    !location ||
    !images ||
    !details ||
    !nearestLandmarks
  ) {
    throw 'All fields must be defined';
  }
  ownerFullName = validateString(ownerFullName, 'Owner Full Name');
  nearestLandmarks = validateString(nearestLandmarks, 'nearest Landmark');

  let nearestLandmarkArray = nearestLandmarks.split(',');
  for (let i = 0; i < nearestLandmarkArray.length; i++) {
    nearestLandmarkArray[i] = validateString(
      nearestLandmarkArray[i],
      'Landmark'
    );
  }

  validateObject(address, 'address');
  if (!address.street) throw 'street must be present';
  else address.street = validateString(address.street, 'street');
  if (address.apartmentNum)
    address.apartmentNum = validateString(address.apartmentNum, 'apartmentNum');
  if (!address.city) throw 'city must be present';
  else address.city = validateString(address.city, 'city');
  if (!address.zip) throw 'zip must be present';
  else address.zip = validateZip(address.zip, 'zip');
  validateNumber(price, 'price');
  // if (!ObjectId.isvalid(ownerId)) throw 'ownerId is not valid';
  ownerId = validateId(ownerId, 'ownerId');
  validateObject(location, 'location');
  validateObject(details, 'details');
  if (!details.description) throw 'description must be present';
  else details.description = validateString(details.description, 'description');
  if (!details.area) throw 'area must be present';
  else validateNumber(details.area, 'area', true);
  let newProperty = {
    address: address,
    price: price,
    ownerId: ownerId,
    ownerFullName: ownerFullName,
    location: location,
    favouriteCount: 0,
    images: images,
    details: details,
    nearestLandmarks: nearestLandmarkArray,
    comments: [],
  };

  let propertyCollection = await properties();
  const insertInfo = await propertyCollection.insertOne(newProperty);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error("Couldn't add property");
  }
  const newId = insertInfo.insertedId.toString();
  const theProperty = get(newId);
  let userCollection = await users();
  userCollection.updateOne(
    { _id: new ObjectId(ownerId) },
    {
      $push: {
        housesPosted: newId,
      },
    }
  );
  return theProperty;
};

export const getAll = async () => {
  let propertyCollection = await properties();
  let propertyList = await propertyCollection.find({}).toArray();
  if (!propertyList) throw 'Could not get all properties';
  return propertyList;
};

export const get = async (propertyId) => {
  // const id = validation.checkId(propertyId);
  propertyId = validateId(propertyId, 'propertyId');
  let propertyCollection = await properties();
  const theProperty = await propertyCollection.findOne({
    _id: new ObjectId(propertyId),
  });
  if (!theProperty) {
    throw new Error('No property with that id');
  }
  return theProperty;
};

export const remove = async (propertyId, ownerId) => {
  propertyId = validateId(propertyId, 'propertyId');
  let propertyCollection = await properties();
  const deletionInfo = await propertyCollection.findOneAndDelete({
    _id: new ObjectId(propertyId),
  });

  let userCollection = await users();
  userCollection.updateOne(
    { _id: new ObjectId(ownerId) },
    {
      $pull: {
        housesPosted: propertyId,
      },
    }
  );
  if (!deletionInfo) {
    throw `Could not delete property with id of ${propertyId}`;
  }

  return { _id: deletionInfo, deleted: true };
};

export const update = async (
  propertyId,
  address,
  price,
  ownerId,
  ownerFullName,
  location,
  favouriteCount,
  images,
  details,
  nearestLandmarks,
  comments
) => {
  if (
    !propertyId ||
    !address ||
    !price ||
    !ownerId ||
    !ownerFullName ||
    !location ||
    !images ||
    !details ||
    !nearestLandmarks
  ) {
    throw 'All fields must be defined';
  }

  ownerFullName = validateString(ownerFullName, 'Owner Full Name');
  nearestLandmarks = validateString(nearestLandmarks, 'nearest Landmark');

  let nearestLandmarkArray = nearestLandmarks.split(',');
  for (let i = 0; i < nearestLandmarkArray.length; i++) {
    nearestLandmarkArray[i] = validateString(
      nearestLandmarkArray[i],
      'Landmark'
    );
  }

  address = validateObject(address, 'address');
  if (!address.street) throw 'street must be present';
  else address.street = validateString(address.street, 'street');
  if (address.apartmentNum)
    address.apartmentNum = address.apartmentNum = validateString(
      address.apartmentNum,
      'apartmentNum'
    );
  if (!address.city) throw 'city must be present';
  else address.city = validateString(address.city, 'city');
  if (!address.zip) throw 'zip must be present';
  else address.zip = validateZip(address.zip, 'zip');
  price = validateNumber(price, 'price');
  // if (!ObjectId.isvalid(ownerId)) throw 'ownerId is not valid';
  ownerId = validateId(ownerId, 'ownerId');
  location = validateObject(location, 'location');
  details = validateObject(details, 'details');
  if (!details.description) throw 'description must be present';
  else details.description = validateString(details.description, 'description');
  if (!details.area) throw 'area must be present';
  else details.area = validateNumber(details.area, 'area');
  let getCollectionFn = await properties();
  let theProperty = get(propertyId);

  await getCollectionFn.updateOne(
    { _id: new ObjectId(propertyId) },
    {
      $set: {
        address: address,
        price: price,
        ownerId: ownerId,
        ownerFullName: ownerFullName,
        location: location,
        favouriteCount: favouriteCount,
        images: images,
        details: details,
        nearestLandmarks: nearestLandmarkArray,
        comments: comments,
      },
    }
  );

  return await get(propertyId);
};

//gives search result for city, zip, state. gives emtpy Array if no results.
export const getPropertiesViaSearch = async (
  search,
  price,
  accomodationType
) => {
  if (typeof search === 'string') {
    search = validateString(search, 'search');
  }
  if (typeof search === 'number') {
    search = validateNumber(search, 'search');
  }
  if (price) {
    price = validateNumber(price, 'price');
  } else {
    let propertyCollection = await properties();
    let allProperties = await propertyCollection.find({}).toArray();
    if (allProperties.length > 0) {
      const prices = allProperties.map((property) => property.price);

      price = Math.max(...prices);
    } else {
      price = 0;
    }
  }
  if (accomodationType) {
    accomodationType = validateString(accomodationType, 'accomodation Type');
  } else {
    accomodationType = 'permanent';
  }
  const propertyCollection = await properties();
  const query = new RegExp(search, 'i');
  const propertyList = await propertyCollection
    .find({
      $and: [
        {
          $or: [
            { 'address.city': { $regex: query } },
            { 'address.zip': { $regex: query } },
            { 'address.state': { $regex: query } },
          ],
        },
        { price: { $lte: price } },
        { 'details.accommodationType': accomodationType },
      ],
    })
    .toArray();
  return propertyList;
};

export const getPropertiesByOwner = async (ownerId) => {
  ownerId = validateId(ownerId, 'ownerId');
  const propertyCollection = await properties();
  const propertyList = await propertyCollection
    .find({ ownerId: ownerId })
    .toArray();
  return propertyList;
};

export const addFavInProp = async (propertyId) => {
  propertyId = validateId(propertyId, 'propertyId');
  let propertyCollection = await properties();
  let property = await propertyCollection.updateOne(
    { _id: new ObjectId(propertyId) },
    {
      $inc: {
        favouriteCount: +1,
      },
    }
  );
  if (property) {
    return { favAdded: true };
  } else {
    throw 'Unable to add favorite';
  }
};

export const removeFavInProp = async (propertyId) => {
  propertyId = validateId(propertyId, 'propertyId');
  let propertyCollection = await properties();
  let property = await propertyCollection.updateOne(
    { _id: new ObjectId(propertyId) },
    {
      $inc: {
        favouriteCount: -1,
      },
    }
  );
  if (property) {
    return { favAdded: true };
  } else {
    throw 'Unable to add favorite';
  }
};
