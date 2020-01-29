require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const favicon = require('serve-favicon');

require('./configs/passport');

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then((response) => console.log(`MongoDB: ${response.connections[0].name}`))
.catch((err) => console.log(err));

// middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session

app.use(session({
  secret: 'go-green',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000, //TODO random value - adjust
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
}));

// initializing passport

app.use(passport.initialize());
app.use(passport.session());

// cors

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// routes

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

app.listen(process.env.PORT, () => console.log(`Listening on Port: ${process.env.PORT}`));

module.exports = app;
