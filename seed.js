import { create, get, getAll, remove, update } from "./data/properties.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import { ObjectId } from "mongodb";
import { createUser } from "./data/user.js";
import { updateUser } from "./data/user.js";
import {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  removeComment,
} from "./data/comments.js";

const db = await dbConnection();
let count = 0;
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

try {
  let address = {
    street: "302 N 2nd St",
    apartmentNum: "2",
    city: "Harrison",
    state: "NJ",
    zip: "07029",
  };
  let price = 1500;
  let ownerId = new ObjectId();
  ownerId = "6633fbc47da8725139cb4428";
  let location = {
    latitude: "40.74856",
    longitude: "-74.16018",
  };
  let images = [
    "/static/house1.jpg",
    "/static/bedroom1.jpg",
    "/static/bathroom.jpg",
  ];
  let details = {
    description: "A spacious home",
    propertyType: "Private",
    apartmentType: "2BHK",
    accommodationType: "permanent",
    area: 666,
    bedroomCount: 2,
    bathroomCount: 2,
  };
  let nearestLandmark =
    "15 min to path, 10 min to indian groceries, 5 min to bus stop";
  const result = await create(
    address,
    price,
    ownerId,
    "TEst",
    location,
    images,
    details,
    nearestLandmark
  );
  if (result) {
    count++;
  }
} catch (error) {
  console.log(error);
}

try {
  let address = {
    street: "150 North St",
    apartmentNum: "6",
    city: "Jersey city",
    state: "NJ",
    zip: "07307",
  };
  let price = 3100;
  let ownerId = new ObjectId();
  ownerId = "6633fbc47da8725139cb4428";
  let location = {
    latitude: "40.719074",
    longitude: "-74.050552",
  };
  let images = [
    "/static/house1.jpg",
    "/static/bedroom1.jpg",
    "/static/bathroom.jpg",
  ];
  let details = {
    description: "A spacious home",
    propertyType: "Shared",
    apartmentType: "4BHK",
    accommodationType: "permanent",
    area: 789,
    bedroomCount: 4,
    bathroomCount: 1,
  };
  let nearestLandmark =
    "2 min to Laudromat, 10 min to Patel's, 5 min to bus stop";
  const result = await create(
    address,
    price,
    ownerId,
    "TEst",
    location,
    images,
    details,
    nearestLandmark
  );
  if (result) {
    count++;
  }
} catch (error) {
  console.log(error);
}

try {
  let address = {
    street: "300 N 2nd St",
    apartmentNum: "4",
    city: "Harrison",
    state: "NJ",
    zip: "07029",
  };
  let price = 1700;
  let ownerId = new ObjectId();
  ownerId = "6633fbc47da8725139cb4428";
  let location = {
    latitude: "40.74856",
    longitude: "-74.16018",
  };
  let images = [
    "/static/house1.jpg",
    "/static/bedroom1.jpg",
    "/static/bathroom.jpg",
  ];
  let details = {
    description: "A beautiful home",
    propertyType: "Private",
    apartmentType: "3BHK",
    accommodationType: "permanent",
    area: 666,
    bedroomCount: 3,
    bathroomCount: 2,
  };
  let nearestLandmark =
    "15 min to path, 10 min to indian groceries, 5 min to bus stop";
  const result = await create(
    address,
    price,
    ownerId,
    "TEst",
    location,
    images,
    details,
    nearestLandmark
  );
  if (result) {
    count++;
  }
} catch (error) {
  console.log(error.message);
}

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

try {
  let result = await createUser(
    'testFirstName',
    '',
    'testLastName',
    'Test@gmail.com',
    'male',
    '08/24/1992',
    'Test@123',
    'Hoboken',
    'NJ',
    'BasePic.jpg'
  );
} catch (e) {
  console.log(e);
}
console.log("Done seeding database");
// ifclear
