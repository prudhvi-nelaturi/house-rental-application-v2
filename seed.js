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

// firstName,
//   middleName,
//   lastName,
//   email,
//   gender,
//   age,
//   password,
//   city,
//   state,
//   profilePicture
try {
  let firstName = "Shreya"; //user1
  let middleName = "";
  let lastName = "Jacob";
  let email = "testershreya@gmail.com";
  let gender = "female";
  let age = "06/12/1998";
  let password = "Test@123";
  let city = "jersey city";
  let state = "NJ";
  let profilePicture;
  const result = await createUser(
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
  );
  if (result) {
    count++;
  }
} catch (error) {
  console.log(error);
}

// try {
//   let firstName = "Prudhvi"; //user2
//   let middleName = "";
//   let lastName = "Nelaturi";
//   let email = "testerprudhvi@gmail.com";
//   let gender = "male";
//   let age = "01/29/1999";
//   let password = "Tester@123";
//   let city = "harrison";
//   let state = "NJ";
//   let profilePicture;
//   const result = await createUser(
//     firstName,
//     middleName,
//     lastName,
//     email,
//     gender,
//     age,
//     password,
//     city,
//     state,
//     profilePicture
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error);
// }

// try {
//   let firstName = "Sakshi"; //user3
//   let middleName = "";
//   let lastName = "Sherkar";
//   let email = "testersakshi@gmail.com";
//   let gender = "female";
//   let age = "06/08/1998";
//   let password = "Test@123";
//   let city = "jersey city";
//   let state = "NJ";
//   let profilePicture;
//   const result = await createUser(
//     firstName,
//     middleName,
//     lastName,
//     email,
//     gender,
//     age,
//     password,
//     city,
//     state,
//     profilePicture
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error);
// }

// try {
//   let address = {
//     street: "302 N 2nd St",
//     apartmentNum: "2",
//     city: "Harrison",
//     state: "NJ",
//     zip: "07029",
//   };
//   let price = 1500;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428";
//   let location = {
//     latitude: 40.74856,
//     longitude: -74.16018,
//   };
//   let images = [
//     "/static/house1.jpg",
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A spacious home",
//     propertyType: "private",
//     apartmentType: "2bhk",
//     accomodationType: "permanent",
//     area: 666,
//     bedroomCount: 2,
//     bathroomCount: 2,
//   };
//   let ownerName = "Prudhvi";
//   let nearestLandmark =
//     "15 min to path, 10 min to indian groceries, 5 min to bus stop";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error);
// }

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
    latitude: 40.719074,
    longitude: -74.050552,
  };
  let images = [
    "/static/house1.jpg",
    "/static/bedroom1.jpg",
    "/static/bathroom.jpg",
  ];
  let details = {
    description: "A condo house",
    propertyType: "shared",
    apartmentType: "4bhk",
    accomodationType: "temporary",
    area: 789,
    bedroomCount: 4,
    bathroomCount: 1,
  };
  let ownerName = "Shreya";
  let nearestLandmark =
    "2 min to Laudromat, 10 min to Patel's, 5 min to bus stop";
  const result = await create(
    address,
    price,
    ownerId,
    ownerName,
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
    latitude: 40.74856,
    longitude: -74.16018,
  };
  let images = [
    "/static/house1.jpg",
    "/static/bedroom1.jpg",
    "/static/bathroom.jpg",
  ];
  let details = {
    description: "A beautiful home",
    propertyType: "private",
    apartmentType: "3bhk",
    accomodationType: "permanent",
    area: 666,
    bedroomCount: 3,
    bathroomCount: 2,
  };
  let ownerName = "Prudhvi Nelaturi";
  let nearestLandmark =
    "15 min to path, 10 min to indian groceries, 5 min to bus stop";
  const result = await create(
    address,
    price,
    ownerId,
    ownerName,
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
//     street: "837 S Miller St", // new 1
//     apartmentNum: "",
//     city: "Chicago",
//     state: "IL",
//     zip: "60607",
//   };
//   let price = 4200;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 41.87097,
//     longitude: -87.65197,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "House with river view",
//     propertyType: "private",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 812,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   let ownerName = "Shashwat";
//   let nearestLandmark = "5 min to river";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "3035 California St", // new 2
//     apartmentNum: "",
//     city: "Omaha",
//     state: "NE",
//     zip: "68131",
//   };
//   let price = 5000;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 41.87097,
//     longitude: -87.65197,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A new house in lushgreen neighborhood",
//     propertyType: "private",
//     apartmentType: "4bhk",
//     accomodationType: "temporary",
//     area: 1075,
//     bedroomCount: 5,
//     bathroomCount: 2,
//   };
//   let ownerName = "Ankush";
//   let nearestLandmark = "5 min to bus stop";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error);
// }

// try {
//   let address = {
//     street: "120 N Leonard St", // new 3
//     apartmentNum: "",
//     city: "Liberty",
//     state: "MO",
//     zip: "64068",
//   };
//   let price = 3700;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 39.247583,
//     longitude: -94.41784,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A beautiful home", //change..
//     propertyType: "private",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 1100,
//     bedroomCount: 3,
//     bathroomCount: 3,
//   };
//   let ownerName = "Sakshi";
//   let nearestLandmark = "15 min to bus stop";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "775 E 1st St", // new 4
//     apartmentNum: "",
//     city: "Mesa",
//     state: "AZ",
//     zip: "85203",
//   };
//   let price = 2100;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 33.41737,
//     longitude: -111.81469,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "Neatly maintained beautiful house",
//     propertyType: "private",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 1200,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   let ownerName = "Varun";
//   let nearestLandmark = "10 min to nearest groceries store";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "2867 Garden Ave", // new 5
//     apartmentNum: "",
//     city: "San Jose",
//     state: "CA",
//     zip: "95111",
//   };
//   let price = 500;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 37.29479,
//     longitude: -121.84399,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A beautiful home",
//     propertyType: "shared",
//     apartmentType: "3bhk",
//     accomodationType: "temporary",
//     area: 2100,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   let ownerName = "Pavan";
//   let nearestLandmark = "";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "1046 E 24th St", // new 6
//     apartmentNum: "",
//     city: "Los Angeles",
//     state: "CA",
//     zip: "90011",
//   };
//   let price = 650;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 37.29479,
//     longitude: -121.84399,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A beautiful home",
//     propertyType: "shared",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 1300,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   let ownerName = "Sakshi Sherker";
//   let nearestLandmark = "10 min from airport";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "2710 Leeland St", // new 7
//     apartmentNum: "",
//     city: "Houston",
//     state: "TX",
//     zip: "77003",
//   };
//   let price = 2500;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 29.74326,
//     longitude: -95.35382,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A beautiful home",
//     propertyType: "private",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 850,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   let ownerName = "Shreya Daniel";
//   let nearestLandmark = "10 min to indian shopping center, 5 min to bus stop";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "2319 Ramblewood Dr", // new 8
//     apartmentNum: "",
//     city: "District Heights",
//     state: "MD",
//     zip: "20747",
//   };
//   let price = 2500;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 38.85737,
//     longitude: -76.88906,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "A beautiful home in a peaceful location", //change..
//     propertyType: "private",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 666,
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   let ownerName = "Dimple";
//   let nearestLandmark = "Nearest hospital in 5 min";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "2319 Ramblewood Dr", // new 9
//     apartmentNum: "1",
//     city: "District Heights",
//     state: "MD",
//     zip: "20747",
//   };
//   let price = 2500;
//   let ownerId = new ObjectId();
//   ownerId = "6633fbc47da8725139cb4428"; // change
//   let location = {
//     latitude: 38.85737,
//     longitude: -76.88906,
//   };
//   let images = [
//     "/static/house1.jpg", //change..
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "Spacious house",
//     propertyType: "private",
//     apartmentType: "3bhk",
//     accomodationType: "permanent",
//     area: 915,
//     bedroomCount: 4,
//     bathroomCount: 2,
//   };
//   let ownerName = "Priya";
//   let nearestLandmark = "2 min to bus stop";
//   const result = await create(
//     address,
//     price,
//     ownerId,
//     ownerName,
//     location,
//     images,
//     details,
//     nearestLandmark
//   );
//   if (result) {
//     count++;
//   }
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let address = {
//     street: "30 poplar street",
//     apartmentNum: "2",
//     city: "Jersey city",
//     state: "NJ",
//     zip: "07307",
//   };
//   let price = 11;
//   let ownerId = new ObjectId();
//   let location = {
//     latitute: "40.75396",
//     longitute: "-74.04547",
//   };
//   let comments = [];
//   let images = [
//     "/static/house1.jpg",
//     "/static/bedroom1.jpg",
//     "/static/bathroom.jpg",
//   ];
//   let details = {
//     description: "This house is very old",
//     propertyType: "Private",
//     apartmentType: "3BHK",
//     accomodationType: "Permanent",
//     area: "1012 ft",
//     bedroomCount: 3,
//     bathroomCount: 2,
//   };
//   async function main() {
//     const updateProp = await update(
//       "661ca190df012c073aac5f13",
//       address,
//       price,
//       ownerId,
//       location,
//       3,
//       images,
//       details,
//       comments
//     );
//   }
//   await main();
// } catch (error) {
//   console.log(error);
// }

// try {
//   let result = await createUser(
//     "testFirstName",
//     "",
//     "testLastName",
//     "Test@gmail.com",
//     "male",
//     "08/24/1992",
//     "Test@123",
//     "Hoboken",
//     "NJ",
//     "BasePic.jpg"
//   );
// } catch (e) {
//   console.log(e);
// }
console.log("Done seeding database");
// ifclear
