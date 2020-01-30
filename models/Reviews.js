const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  score: { type: Number, required: true },
  comment: { type: String, required: true }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Review = model('Review', reviewSchema);

module.exports = Review;
