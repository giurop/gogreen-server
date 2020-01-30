const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Recipe = require('../models/Recipes');

router.get('/recipes', (req, res, next) => {

})

module.exports = router;

// /list-all
// /addrecipe
// /recipe/:'id'
// /recipe/:'id'/'edit'