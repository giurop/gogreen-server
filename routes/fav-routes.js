const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/Users');
const Recipes = require('../models/Recipes');

// router.get('/user/:username/favourites', (req, res, next) => {
//   const { username } = req.params;

//   User.findOne({ username })
//     .populate('favourites')
//     .then((response) => res.status(200).json(response))
//     .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
// });


router.put('/addfavourite', (req, res, next) => {
  const { userID, recipeID } = req.body;
  console.log('inside backend fav');
  
  Recipes.findById(recipeID)
  .then((recipe) => {
    const { name } = recipe;
    
    Users.findByIdAndUpdate(userID, {$push: {favourites: recipeID } })
    .then((response) => res.status(200).json({ message: `${name} successfully favourited!`, response }))
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
  })
  .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
});

router.put('/unfavourite', (req, res, next) => {
  const { userID, recipeID } = req.body;
  console.log('inside backend unfav');

  Recipes.findById(recipeID)
  .then((recipe) => {
    const { name } = recipe;
    
    Users.findByIdAndUpdate(userID, {$pull: {favourites: recipeID } })
    .then((response) => res.status(200).json({ message: `${name} successfully unfavourited!`, response }))
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
  })
  .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));

});

module.exports = router;