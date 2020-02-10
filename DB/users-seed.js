require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
const Users = require('../models/Users');
const Recipe = require('../models/Recipes');

// mongoose.connect('mongodb://heroku_0lpkwr3k:p9uf697beu8ppkd4jkc5nbhp84@ds045637.mlab.com:45637/heroku_0lpkwr3k', {
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((_) => {
    console.log('Connect to Mongo DB and ready to seed!')
  })
  .catch((error) => {
    console.log('Error connecting to Mongo DB', error)
  })

const users = [{
  firstName: 'Giulia',
  lastName: 'Roperto',
  username: 'giulia',
  password: '1234',
  role: 'admin',
}, {
  firstName: 'Henrique',
  lastName: 'Mandruzato',
  username: 'henrique',
  password: '1234',
  role: 'admin',
}, {
  firstName: 'Alex',
  lastName: 'Chivvy',
  username: 'alex',
  password: '1234',
  role: 'admin',
}, {
  firstName: 'Fernando',
  lastName: 'Borrelli',
  username: 'fernando',
  password: '1234',
  role: 'admin',
}, {
  firstName: 'User',
  lastName: 'Vegan',
  username: 'user',
  password: '1234',
  role: 'user',
}]

users.forEach((user) => {
  const { firstName, lastName, username, password, role } = user;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  Users.create({ firstName, lastName, username, password: hashPass, role })
    .then((userData) => {
      console.log(`Created user ${userData}`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});
