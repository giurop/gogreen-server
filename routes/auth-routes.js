const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const User = require('../models/Users');

authRoutes.post('/signup', (req, res, next) => {
  const { email, firstName, lastName, username, password, picture } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Password should be at least 8 characters long' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: 'Username check went bad' });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.'});
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({ email, firstName, lastName, username, password: hashPass, picture })
      .then(user => {
        req.login(user, (err) => {
          if (err) {
            res.status(500).json({ message: 'Login after signup went bad' });
            return;
          }
        });
        res.status(200).json(user);
      })
      .catch(_ => res.status(400).json({ message: 'Saving user went wrong!' }));
  })
});

authRoutes.post('/login', (req, res, next) => {
  console.log('helo')
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong when logging in' });
      return;
    }
    
    if (!user) {
      res.status(401).json({ message: 'Error with username or password... Try again!', failureDetails });
      return;
    }
    
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session saving went bad' });
        return;
      }

      res.status(200).json(user);

    });
  })(req, res, next);
});

authRoutes.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Successfully logged out!' });
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized!!!' });
});

module.exports = authRoutes;
