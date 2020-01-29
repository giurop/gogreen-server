const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./Users');
const Review = require('./');

const recipeSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [{ type: String, required: true }],
  dishTypes: [String],
  cuisines: [String],
  readyInMinutes: Number,
  servings: Number,
  instructions: [{
    step: String,
    duration: Number,
  }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  picture: String,
  verified: false,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
