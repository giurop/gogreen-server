const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  score: { type: Number, required: true },
  comment: { type: String, required: true }
}, {
  timestamps: true
});

const Review = model('Review', reviewSchema);

module.exports = Review;
