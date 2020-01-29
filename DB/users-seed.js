require('dotenv').config();

const mongoose = require('mongoose');
const Users = require('../models/Users');

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

const users = [{}]

Users.create(users)
  .then(allUsers => {
    console.log(`Created ${allUsers.length} users`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));