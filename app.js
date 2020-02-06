require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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
    maxAge: 6000000,
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
//
app.use(cors({
  credentials: true,
  origin: ['https://go-green.netlify.com'],
}));

// routes

// const index = require('./routes/index');
// app.use('/', index);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

app.use('/api', require('./routes/user-routes'));
app.use('/api', require('./routes/recipe-routes'));
app.use('/api', require('./routes/review-routes'));

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT, () => console.log(`Listening on Port: ${process.env.PORT}`));

module.exports = app;
