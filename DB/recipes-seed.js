// Instantiation of required Schema, mongoose ODM library, and crude recipes input
require('dotenv').config();
const mongoose = require('mongoose');
const Recipes = require('../models/Recipes');
const recipesCrudeJSON = require('./crude-recipes');


// console.log(process.env);
// Mongoose setup via .env 
mongoose.connect('mongodb://localhost/go-green', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(x => {
  console.log('Connect to Mongo DB and ready to seed!')
})
.catch(error => {
  console.log('Error connecting to Mongo DB', error)
});

// Function to clean up the crude recipe data
const cleanRecipesFunction = (recipesCrude) => {

  let recipesClean = [];
  let arrInstructions = [];
  let newRecipeClean = {};
  let newInstruction = {};
  let strIngredients = '';
  let prepTimeMinutes = '';

  for (let i = 0; i < recipesCrude.length; i += 1) {
    strIngredients = '';
    for (let j = 0; j < recipesCrude[i]["extendedIngredients"].length; j += 1) {
      strIngredients += `${
        recipesCrude[i]["extendedIngredients"][j]["originalString"]
      }\n`;
    }

    arrInstructions = [];
    if (recipesCrude[i]["analyzedInstructions"][0] === undefined){
      arrInstructions = [];
    } else {
      for (
        let j = 0;
        j < recipesCrude[i]["analyzedInstructions"][0]["steps"].length;
        j += 1
      ) {
        if (recipesCrude[i]["analyzedInstructions"][0]["steps"][j]["length"] === undefined){
          prepTimeMinutes = ''
        } else {
          prepTimeMinutes = recipesCrude[i]["analyzedInstructions"][0]["steps"][j]["length"]["number"] 
        }
        newInstruction = {
          step: recipesCrude[i]["analyzedInstructions"][0]["steps"][j]["number"],
          text: recipesCrude[i]["analyzedInstructions"][0]["steps"][j]["step"],
          stepTimeMinutes: prepTimeMinutes
        }
      arrInstructions.push(newInstruction);
      }
    }

    newRecipeClean = {
      name: recipesCrude[i]["title"],
      description: '',
      verified: true,
      vegan: recipesCrude[i]["vegan"],
      dishTypes: recipesCrude[i]["dishTypes"],
      cuisines: recipesCrude[i]["cuisines"],
      totalTimeMinutes: recipesCrude[i]["readyInMinutes"],
      servings: recipesCrude[i]["servings"],
      picture: recipesCrude[i]["image"],
      ingredients: strIngredients,
      ownerAPI: `Spoonacular - ${recipesCrude[i]["sourceName"]}`,
      instructions: arrInstructions,
      reviews: []
    };
    recipesClean.push(newRecipeClean);
  }
  return recipesClean;
};

// Actual clean up of crude recipe data
const recipesSeed = cleanRecipesFunction(recipesCrudeJSON);

Recipes.create(recipesSeed)
  .then(allRecipes => {
    console.log(`Created ${allRecipes.length} recipes`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));