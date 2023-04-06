// Description: This file contains the logic for the user authentication
// sets up bcrypt
const bcrypt = require('bcrypt');
// sets up jsonwebtoken
const jwt = require('jsonwebtoken');
// sets up the user model
const User = require('../models/user');

// exports the signup function
exports.signup = (req, res, next) => {
  // hashes the password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // sets the user
    console.log(hash);
    // sets the user
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    // console.log(user);
    // saves the user
    user
      .save()
      // returns the user
      .then(() => {
        res.status(201).json({
          message: 'User added successfully!',
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      })
  }).catch((error) => {
    res.status(500).json({
      error: error,
    });
  });
}

// exports the login function
exports.login = (req, res, next) => {
  // finds the user by email
  User.findOne({ email: req.body.email })
    // returns the user
    .then((user) => {
      // checks if the user exists
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      // compares the password
      bcrypt
        .compare(req.body.password, user.password)
        // returns the password
        .then((valid) => {
          // checks if the password is valid
          if (!valid) {
            // returns the error
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          // sets the token
          const token = jwt.sign(
            // sets the payload
            {userId: user._id}, 
            'RANDOM_TOKEN_SECRET',
            {expiresIn: '24h'});
          // returns the token
          res.status(200).json({
            userId: user._id,
            token: token
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};