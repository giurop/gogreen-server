require('dotenv').config();

const mongoose = require('mongoose');
const Recipes = require('../models/Recipes');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(x => {
  console.log('Connect to Mongo DB and ready to seed!')
})
.catch(error => {
  console.log('Error connecting to Mongo DB', error)
})

const recipes = [{}]

Recipes.create(recipes)
  .then(allRecipes => {
    console.log(`Created ${allRecipes.length} recipes`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));