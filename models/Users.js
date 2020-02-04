const mongoose = require('mongoose');
const { Schema } = mongoose;

const Recipe = require('./Recipes');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  role: { type: String, enum: ['admin', 'user'] },
  picture: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
