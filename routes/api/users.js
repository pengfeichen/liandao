const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Load User model
const User = require('../../models/User');

// @route   GET api/users/register
// @dec     Register user
// @access  Public
router.post('/register', (req, res)=>{
  // Check if info is valid
  
  // Check if user already exist
  User.findOne({email: req.body.email})
    .then(user=>{
      if(user){
        return res.status(400).json({email: "Email already exists"})
      }
      //If email not registered, create new user in the database
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      // Store the hased password in the database using bcrypt
      bcrypt.hash(newUser.password, 10, (err, hash)=>{
        if(err){throw err};
        newUser.password = hash;
        newUser.save()
          .then(user=>{
            res.json({
              status: 'OK',
              name: user.name,
              email: user.email
            })
          })
          .catch(e => console.log(e))
      })
    })
})

module.exports = router;