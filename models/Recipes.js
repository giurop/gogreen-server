const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  ingredients: [{ type: String, required: true }],
  dishTypes: [String],
  vegan: false,
  cuisines: [String],
  totalTimeMinutes: Number,
  servings: Number,
  instructions: [
    {
      step: Number,
      text: String,
      stepTimeMinutes: Number,
    },
  ],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  // owner api when the data comes from the api and has no ref to the users
  ownerAPI: String,
  picture: String,
  verified: false,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
