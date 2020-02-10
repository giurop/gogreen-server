const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  score: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  comment: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Reviews = model('Reviews', reviewSchema);

module.exports = Reviews;
