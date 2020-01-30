const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const User = require('../models/Users');

router.get('/user/:username', (req, res, next) => {
  const { username } = req.params;

  User.findOne({ username })
    .populate('favourites')
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

router.put('/user/:username', (req, res, next) => {
  const { username } = req.params;
  const { firstName, lastName, email, usernameForm, oldPassword, newPassword } = req.body;

  console.log(username);

  if (!oldPassword) {
    res.json({ message: 'Password is required' });
    return;
  }

  User.findOne({ username })
    .then((response) => {
      if (!bcrypt.compareSync(oldPassword, response.password)) {
        res.json({ message: 'Incorrect password' });
        return;
      }
      
      if (newPassword) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const password = bcrypt.hashSync(newPassword, salt);
          
          User.findOneAndUpdate({ username }, { firstName, lastName, email, username: usernameForm, password }, { new: true })
          .then((_) => res.status(200).json({ message: `User ${username} was updated successfully.` }))
          .catch((err) => res.json(err))
        } else {
          User.findOneAndUpdate({ username }, { firstName, lastName, email, username: usernameForm }, { new: true })
            .then((_) => res.status(200).json({ message: `User ${username} was updated successfully.` }))
            .catch((err) => res.json(err))
      }
    })
    .catch((err) => res.json(err));
});

router.delete('/user/:username', (req, res, next) => {
  const { username } = req.params;

  User.findOneAndRemove({ username })
    .then((_) => res.status(200).json({ message: `User ${username} was successfully deleted.` }))
    .catch((err) => res.json(err));
});


module.exports = router;


// GET - profile details - route API DONE
// /user/:username - route API DONE
// PUT - edit profile - route API DONE
// /user/:username/'edit' - route API DONE
// DELETE - delete profile - route API Done
