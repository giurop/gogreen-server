const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./Users');

const recipeSchema = new Schema({

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;