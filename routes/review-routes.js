const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Reviews = require('../models/Reviews');


router.post('/addreview', (req, res, next) => {
  const { owner, score, difficulty, comment } = req.body;
  
  Reviews.create({ owner, score, difficulty, comment })
  .then( newReview => {
    res.status(200).json({ message: 'New review successfully created', newReview });
  })
  .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.get('/review/:id', (req, res, next) => {
  const { id } = req.params;

  Reviews.findById(id)
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
