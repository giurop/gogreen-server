const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = authRoutes;