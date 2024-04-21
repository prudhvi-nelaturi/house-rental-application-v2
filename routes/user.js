import express from 'express';
import {users} from '../data/index.js';

const router = express.Router();
  
  router
    .route('/user')
    .post(async (req, res) => {
      //code here for POST
      let errors = [];
  
      if(!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.gender || !req.body.age || !req.body.userType  || !req.body.city || !req.body.state ) {
        errors.push("All required fields must be filled!");
        return res.status(400).render('register', {isError: true, postData: req.body, errors: errors});
      }
      
      let data = req.body;
    //   try{
    //     data.firstName = validateString(data.firstName, 'firstName');
    //   } catch(e) {
    //     errors.push(e);
    //   }
  
    //   try{
    //     data.lastName = validateString(data.lastName, 'lastName');
    //   } catch(e) {
    //     errors.push(e);
    //   }
  
    //   try{
    //     data.email = validateEmail(data.email, 'email');
    //   } catch(e) {
    //     errors.push(e);
    //   }
  
    //   try{
    //     data.password = validatePassword(data.password, 'password');
    //   } catch(e) {
    //     errors.push(e);
    //   }
  
    //   try{
    //     data.gender = validateGender(data.gender, 'gender');
    //   } catch(e) {
    //     errors.push(e);
    //   }
  
    //   try{
    //     data.age = validateAge(data.age, 'age');
    //   } catch(e) {
    //     errors.push(e);
    //   }
  
    //   try{
    //     data.userType = validateUserType(data.userType, 'userType');
    //   } catch(e) {
    //     errors.push(e);
    //   }

    //   try{
    //     data.city = validateCity(data.city, 'city');
    //   } catch(e) {
    //     errors.push(e);
    //   }

    //   try{
    //     data.state = validateState(data.state, 'state');
    //   } catch(e) {
    //     errors.push(e);
    //   }
      
    //   if(errors.length > 0) {
    //     return res.status(400).json({error: errors});
    //   }

    if(!data.hasOwnProperty('middleName')) {
        data.middleName = '';
    }
    if(!data.hasOwnProperty('profilePicture')) {
        data.profilePicture = '';
    }
  
      try{
        const {firstName, middleName, lastName, email, password, gender, age, userType, city, state, profilePicture} = data;        
        let newuser = await users.createUser(firstName, middleName, lastName, email, gender, age, userType, password, city, state, profilePicture);
        return res.status(200).json(newuser);
      } catch(e) {
        return res.status(500).json({error: e});
      }  
    });
  
  router
    .route('/:userId')
    .get(async (req, res) => {
      //code here for GET
    //   try {
    //     req.params.userId = validateId(req.params.userId);
    //   } catch(e) {
    //     return res.status(400).json({error: e});
    //   }
  
      try{
        const user = await users.getUser(req.params.userId);
        return res.status(200).json(user);
      } catch(e) {
        return res.status(404).json({error: e});
      }
    })
    .patch(async (req, res) => {
        let id = req.params.userId;
        // try {
        //     id = validateId(id);
        // } catch(e) {
        //     return res.status(400).json({error: e});
        // }

        let userObj = req.body;
        // try{
        //     userObj = validateUser(userObj);
        //   }catch(e) {
        //     return res.status(400).json({error: e});
        //   }
      
          try{
            let user = await users.updateUser(id, userObj);
            return res.json(user);
          } catch(e) {
            return res.status(404).json({error: e});
          }

    })
      
  


export default router;