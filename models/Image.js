const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  name: { type: String},
  description: { type: String},
  imageUrl: { type: String, required: true },
}, {timestamps: true});

const Image = model('Image', imageSchema);

module.exports = Review;
