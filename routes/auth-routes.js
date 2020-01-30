const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = authRoutes;

// POST - signup/login

// /login
// /signup