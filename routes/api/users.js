const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Load User model
const User = require('../../models/User');

//Load input validation
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

// @route   POST api/users/register
// @dec     Register user
// @access  Public
router.post('/register', (req, res) => {
  // Check if info is valid
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check if user already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    //If email not registered, create new user in the database
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    // Store the hased password in the database using bcrypt
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.json({
            status: 'OK',
            name: user.name,
            email: user.email
          });
        })
        .catch(e => console.log(e));
    });
  });
});

// @route   POST api/users/login
// @dec     Authenticate user
// @access  Public
router.post('/login', (req, res) => {
  // Check validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Find user by email
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.user = 'user not found';
      return res.status(400).json(errors);
    }
    // Compare password
    bcrypt.compare(password, user.password).then((isMatch, err) => {
      if (err){
        errors.password = "Password inncorrect";
        return res.json(errors)
      }
      if (isMatch) {
        // Create JWT payload
      const payload = {
        id: user.id,
        name: user.name
      };
      // Sign token
      jwt.sign(
        payload,
        process.env.SECRETORKEY,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) {
            errors.jwt = 'JWT error';
            return res.json(errors);
          }
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
      // Create auth log
      user.logins = user.logins.concat({})
      user.save(function (err) {
        if(err) {
            console.error('Login Logs error!');
        }
      });
      } else {
        errors.password = 'Password inncorrect';
        return res.status(400).json(errors);
      }
    });
  })
  .catch(e=>console.log(e));
});

module.exports = router;
