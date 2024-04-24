import { users } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';
import { validateString, validateEmail, validateAge, validateId, validateUserObj, validatePassword } from "../helpers.js";

const rounds = 16;

export const createUser = async (firstName, middleName, lastName, email, gender, age, password, city, state, profilePicture) => {

  if(!firstName || !lastName || !email || !gender || !age || !password || !city || !state) throw "Error: All fields must be supplied!";

   firstName = validateString(firstName, 'firstName');
   if(middleName.trim() != 0) middleName = validateString(middleName, 'middleName');
   lastName = validateString(lastName, 'lastName');
   email = validateEmail(email, 'email');
   age = validateAge(age, 'age');
   state = validateString(state, 'state');
   city = validateString(city, 'city');
   password = validatePassword(password, 'password');
  
  let oldUser = await getUserByEmail(email);
  if(oldUser !== null) {
    throw "Error: Email Id is already used."
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
    favouriteIds: []
  }

  let userCollection = await users();
  let newUser = await userCollection.insertOne(userObj);

  if(!newUser.acknowledged || !newUser.insertedId) throw "Error: User could not be added";
  let newId = newUser.insertedId.toString();
  let user = getUser(newId);
  return user;

};
    
export  const getUser = async (userId) => {
  userId = validateId(userId, 'userId');
  let userCollection = await users();
  let user = await userCollection.findOne({_id: new ObjectId(userId)});
  if(!user) throw "Error: No User found.";
  return {...user, _id: user._id.toString()};
};

export  const getUserByEmail = async (emailId) => {
  emailId = validateEmail(emailId, 'email');
  let userCollection = await users();
  let user = await userCollection.findOne({email: emailId.toLowerCase()});
  return user;
};
  

export const updateUser = async (userId, updateObject) => {
  userId = validateId(userId, 'userId');
  let userCollection = await users();
  let user = await getUser(userId);

  //what all can an user uppdate??
  updateObject = validateUserObj(updateObject);
  let keys = Object.keys(updateObject);
  if(keys.includes('email')) updateObject['email'] = updateObject.email.toLowerCase();
  if(keys.includes('password')) {
    updateObject['hashedPassword'] = await bcrypt.hash(updateObject.password, rounds);
    delete updateObject.password;
    delete updateObject.confirmPassword;
  }

  let updatedUser = await userCollection.findOneAndUpdate({_id: new ObjectId(userId)}, {$set: updateObject}, {returnDocument: 'after'});
  if(!updatedUser) throw "Error: User can not be updated";
  return {...updatedUser, _id: updatedUser._id.toString()};

};
  