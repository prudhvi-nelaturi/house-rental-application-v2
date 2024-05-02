import express from 'express';
import {users} from '../data/index.js';
import {validateId, validateString, validateEmail, validatePassword, validateAge, validateUserObj} from '../helpers.js';

const router = express.Router();

  router
    .route('/register')
    .post(async (req, res) => {
      let errors = [];

      console.log(req.body);
      //console.log(req.file.filename);
  
      if(!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.gender || !req.body.age || !req.body.city || !req.body.state ) {
        errors.push("All required fields must be filled!");
        return res.status(400).render('register', {isError: true, postData: req.body, errors: errors, title: "Register Page"});
      }
      
      let data = req.body;
      try{
        data.firstName = validateString(data.firstName, 'firstName');
      } catch(e) {
        errors.push(e);
      }
  
      try{
        data.lastName = validateString(data.lastName, 'lastName');
      } catch(e) {
        errors.push(e);
      }
  
      try{
        data.email = validateEmail(data.email, 'email');
      } catch(e) {
        errors.push(e);
      }
  
      try{
        data.password = validatePassword(data.password, 'password');
      } catch(e) {
        errors.push(e);
      }
  
      try{
        data.age = validateAge(data.age, 'age');
      } catch(e) {
        errors.push(e);
      }

      try{
        data.city = validateString(data.city, 'city');
      } catch(e) {
        errors.push(e);
      }

      if(data.password != data.confirmPassword) errors.push("Error: Confirm Password is not same as password!");

      if(errors.length > 0) {
        //return res.status(400).json({error: errors});
        return res.status(400).render('register', {isError: true, postData: req.body, errors: errors, title: "Register Page"});
      }

    // if(!data.hasOwnProperty('middleName')) {
    //     data.middleName = '';
    // }
    // if(!data.hasOwnProperty('profilePicture')) {
    //     data.profilePicture = '';
    // }

    let profilePicture = "";
    if(req.file && req.file.filename) {
      profilePicture = req.file.filename;
    }
    let newuser = undefined;

      try{
        const {firstName, middleName, lastName, email, password, gender, age, city, state} = data;        
        newuser = await users.createUser(firstName, middleName, lastName, email, gender, age, password, city, state, profilePicture);
        //return res.status(200).json(newuser);
        //return res.render('login');
      } catch(e) {
          errors.push(e);
          return res.status(400).render('register', {isError: true, postData: req.body, errors: errors, title: "Register Page"});
      }  

      if(newuser) {
        return res.render('login', {title: "Login Page"});
      }
      else {
        return res.status(500).json({error: 'Internal Server Error'});
      }

    });
  
  router
    .route('/users/:userId')
    .get(async (req, res) => {
      //code here for GET
      try {
        req.params.userId = validateId(req.params.userId);
      } catch(e) {
        return res.status(400).json({error: e});
      }
  
      try{
        const user = await users.getUser(req.params.userId);
        return res.status(200).json(user);
      } catch(e) {
        return res.status(404).json({error: e});
      }
    })

    router
    .route('/edit')
    .post(async (req, res) => {
        let userObj = req.body;
        //validations here

        if(userObj['password'] != "") {
          try{
            userObj.password = validateString(userObj.password);
          }catch(e) {
            return res.status(400).json({error: e});
          }

          if(userObj['confirmPassword'] == ""){
            return res.status(400).json({error: "Confirm password is required"});
          }
          else {
            if(userObj.password != userObj.confirmPassword) return res.status(400).json({error: "Passwords must match"});
          }
        }

        if(req.file && req.file.filename)
          userObj['profilePicture'] =  req.file.filename;

        //change to session afterwards
        //let user = await users.getUserByEmail(userObj.email);
        let email = "";
        if(req.session && req.session.user){
            email = req.session.user.email;
        }
        let user = await users.getUserByEmail(email);
        let id = user._id.toString();

        try{
            userObj = validateUserObj(userObj);
          }catch(e) {
            return res.status(400).json({error: e});
          }
      
          try{
            let user = await users.updateUser(id, userObj);
            return res.json(user);
          } catch(e) {
            return res.status(404).json({error: e});
          }

    })


  router
    .route('/login')
    .post(async (req, res) => {
    let errors = [];

    if(!req.body || !req.body.email || !req.body.password) {
      errors.push("All fields must be supplied!");
      return res.status(400).render('login', {isError: true, postData: req.body, errors: errors, title: "Login Page"});
    }

    let data = req.body;

    try{
      data.email = validateEmail(data.email, 'email');
    } catch(e) {
      errors.push(e);
    }

    try{
      data.password = validatePassword(data.password, 'password');
    } catch(e) {
      errors.push(e);
    }

    if(errors.length > 0) {
      return res.status(400).render('login', {isError: true, postData: req.body, errors: errors, title: "Login Page"});
    }

    let user = {};
    const {email, password} = data;
    try{
      user = await users.loginUser(email, password);
    } catch(e) {
      errors.push(e);
      return res.status(400).render('login', {isError: true, postData: req.body, errors: errors, title: "Login Page"});
    }

    if(user && user.email == email) {
        req.session.user = {id: user.id, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName, email: user.email, gender: user.gender, age: user.age, city: user.city, state: user.state, profilePicture: user.profilePicture};
        //return res.render('homepage', {isAuthenticated: true});
        return res.redirect('/');
    }
    else {
      errors.push("Did not provide a valid username and/or password.")
      return res.status(400).render('login', {isError: true, postData: req.body, errors: errors, title: "Login Page"});
    }
  
  })

  router
    .route('/userProfile')
    .get(async (req, res) => {
      let email = req.session.user.email;
      let user = await users.getUserByEmail(email);
      let details = await users.getProperties(email);
      //let favorites = await users.getFavorites(user._id);
      return res.render('userPage', {title: "User Profile", user: user, isAuthenticated: true, properties: details});
    })


  router
    .route('/user/favorites/:userId')
    .get(async (req, res) => {
      let details = await users.getFavorites(req.params.userId);
      return res.json(details);
    })

  router
    .route('/logout')
    .get(async (req, res) => {
      if(!req.session.user){
        return res.redirect('/login');
      }
      else {
        req.session.destroy();
        //return res.render('homepage', {title: "Homepage", isAuthenticated: false});
        return res.redirect('/');
      }
  })

  router
    .route('/removeFavorite/:propId')
    .delete(async (req, res) => {
      let propId = req.params.propId;
      try {
        propId = validateId(propId, 'Property Id');
      } catch (e) {
        return res.status(400).json({error: 'Provide a valid property Id'});
      }
      let userId = req.session.user.id;
      try {
        let removed = await users.removeFav(userId, propId);
        if(removed){
          return res.status(200).redirect('/userProfile');
        }
        else{
          res.status(404).json({message: "Unable to remove from favorites"});
        }
      } catch (e) {
        res.status(404).json({error: e});
      }
    })

export default router;