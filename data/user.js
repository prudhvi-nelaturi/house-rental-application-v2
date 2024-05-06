import { users, properties } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import {
  validateString,
  validateEmail,
  validateId,
  validateUserObj,
  validatePassword,
  validateName,
  validateState,
  validateGender,
  validateDob,
} from '../helpers.js';
import { removeFavInProp } from './properties.js';

const rounds = 10;

export const createUser = async (
  firstName,
  middleName,
  lastName,
  email,
  gender,
  age,
  password,
  city,
  state,
  profilePicture
) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !gender ||
    !age ||
    !password ||
    !city ||
    !state
  )
    throw 'Error: All fields must be supplied!';

  firstName = validateName(firstName, 'firstName');
  if (middleName) middleName = validateName(middleName, 'middleName');
  lastName = validateName(lastName, 'lastName');
  email = validateEmail(email, 'email');
  age = validateDob(age, 'age');
  state = validateState(state, 'state');
  city = validateString(city, 'city');
  password = validatePassword(password, 'password');
  gender = validateGender(gender, 'gender');

  let oldUser = await getUserByEmail(email);
  if (oldUser !== null) {
    throw 'Error: Email Id is already used.';
  }

  const hashPassword = await bcrypt.hash(password, rounds);

  let userObj = {
    firstName,
    middleName,
    lastName,
    email: email.toLowerCase(),
    gender,
    age,
    city,
    hashPassword: hashPassword,
    state,
    profilePicture,
    housesPosted: [],
    favouriteIds: [],
  };

  let userCollection = await users();
  let newUser = await userCollection.insertOne(userObj);

  if (!newUser.acknowledged || !newUser.insertedId)
    throw 'Error: User could not be added';
  let newId = newUser.insertedId.toString();
  let user = getUser(newId);
  return user;
};

export const getUser = async (userId) => {
  userId = validateId(userId, 'userId');
  let userCollection = await users();
  let user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (!user) throw 'Error: No User found.';
  return { ...user, _id: user._id.toString() };
};

export const getUserByEmail = async (emailId) => {
  emailId = validateEmail(emailId, 'email');
  let userCollection = await users();
  let user = await userCollection.findOne({ email: emailId.toLowerCase() });
  return user;
};

export const updateUser = async (userId, updateObject) => {
  userId = validateId(userId, 'userId');
  let userCollection = await users();
  let user = await getUser(userId);

  //what all can an user uppdate??
  updateObject = validateUserObj(updateObject);
  let keys = Object.keys(updateObject);

  let newObj = {
    firstName: updateObject.firstName,
    //middleName: updateObject.middleName,
    lastName: updateObject.lastName,
    email: updateObject.email.toLowerCase(),
    gender: updateObject.gender,
    age: updateObject.age,
    state: updateObject.state,
    city: updateObject.city,
    //profilePicture: updateObject.profilePicture,
  };

  if (updateObject['password'] != '') {
    updateObject['hashedPassword'] = await bcrypt.hash(
      updateObject.password,
      rounds
    );
    delete updateObject.password;
    delete updateObject.confirmPassword;
    newObj.hashPassword = updateObject['hashedPassword'];
  }

  if (keys.includes('profilePicture')) {
    newObj.profilePicture = updateObject.profilePicture;
  }
  if (keys.includes('middleName')) {
    newObj.middleName = updateObject.middleName;
  }

  //let updatedUser = await userCollection.findOneAndUpdate({_id: new ObjectId(userId)}, {$set: updateObject}, {returnDocument: 'after'});
  let updatedUser = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: newObj }
  );
  if (!updatedUser) throw 'Error: User can not be updated';
  let newuser = await getUser(userId);
  return newuser;
};

export const loginUser = async (email, password) => {
  if (!email || !password) throw 'Error: All fields must be supplied.';
  email = validateEmail(email, 'email');
  password = validatePassword(password, 'password');

  const user = await getUserByEmail(email.toLowerCase());
  if (!user) throw 'Error: No details found with this email ID';

  const check = await bcrypt.compare(password, user.hashPassword);
  if (check) {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      age: user.age,
      city: user.city,
      state: user.state,
      profilePicture: user.profilePicture,
    };
  } else {
    throw 'Error: Either the username or password is invalid';
  }
};

export const getProperties = async (userId) => {
  //let user = await getUser(userId);
  let user = await getUserByEmail(userId);

  let propertyIds = user.housesPosted;
  propertyIds = propertyIds.map((x) => new ObjectId(x));

  let details = [];
  if (propertyIds.length == 0) return details;
  let propCollection = await properties();
  details = await propCollection.find({ _id: { $in: propertyIds } }).toArray();
  return details;
};

export const getFavorites = async (userId) => {
  let user = await getUser(userId);
  //let user = await getUserByEmail(userId);

  let favouriteIds = user.favouriteIds;
  favouriteIds = favouriteIds.map((x) => new ObjectId(x));

  let favorites = [];
  if (favouriteIds.length == 0) return favorites;
  let propCollection = await properties();
  favorites = await propCollection
    .find({ _id: { $in: favouriteIds } })
    .toArray();
  return favorites;
};

export const removeFav = async (userId, propId) => {
  propId = validateId(propId, 'propertyId');
  let userCollection = await users();
  let removed = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { favouriteIds: propId } }
  );
  if (!removed) {
    throw `Could not remove property from favorites`;
  }
  let decremented = await removeFavInProp(propId);
  if (decremented && decremented.favAdded) return { deleted: true };
  else return { deleted: false };
};

export const addFav = async (userId, propId) => {
  propId = validateId(propId, 'propertyId');
  let userCollection = await users();
  let added = await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { favouriteIds: propId } }
  );
  if (!added) {
    throw `Could not remove property from favorites`;
  }
  return { _id: added, added: true };
};

export const getFavoritesByUser = async (userId) => {
  let user = await getUser(userId);
  //let user = await getUserByEmail(userId);

  let favouriteIds = user.favouriteIds;
  return favouriteIds;
};

export const propertyAdsLast = async () => {
  let propCollection = await properties();
  let allProps = await propCollection.find({}).toArray();
  if (!allProps) throw 'Error: Could not fetch properties';
  let n = allProps.length;
  if (n > 0) return allProps[n - 1];
  else return { propLen: 0 };
};

export const propertyAdsRandom = async () => {
  let propCollection = await properties();
  let allProps = await propCollection.find({}).toArray();
  if (!allProps) throw 'Error: Could not fetch properties';
  let n = allProps.length;
  if (n > 1) {
    let index = Math.floor(Math.random() * n);
    return allProps[index - 1];
  } else if (n == 1) return allProps[0];
  else return { propLen: 0 };
};
