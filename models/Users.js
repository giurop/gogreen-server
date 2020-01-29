const mongoose = require('mongoose');
const { Schema } = mongoose;

const Recipe = require('./Recipes');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;