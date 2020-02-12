const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Reviews = require('../models/Reviews');
const Recipe = require('../models/Recipes');


router.post('/addreview', (req, res, next) => {
  const { owner, score, difficulty, comment } = req.body;
  const { recipeID } = req.body.recipeID;

  Reviews.create({ owner, score, difficulty, comment })
    .then((newReview) => {
      const { _id } = newReview;

      if(!mongoose.Types.ObjectId.isValid(recipeID)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Recipe.findByIdAndUpdate(recipeID, { $push: { reviews: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New review successfully created', newReview });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.get('/review/:id', (req, res, next) => {
  const { id } = req.params;

  Reviews.findById(id)
    .populate('owner')
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.put('/review/:id', (req, res, next) => {
  const { id } = req.params;
  const { score, difficulty, comment } = req.body;

  Reviews.findByIdAndUpdate(id, { score, difficulty, comment })
    .then(review => res.status(200).json({ message: 'Review successfully updated' }))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.delete('/review/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  Reviews.findByIdAndRemove(id)
    .then(review => {
      console.log(review);
      res.status(200).json({ message: 'Review successfully deleted' });
    })
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

module.exports = router;
