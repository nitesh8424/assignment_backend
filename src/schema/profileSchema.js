const mongoose = require('mongoose');

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique  : true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: Number,
  email: String
},{
  collection: 'user_data',
  timestamps : true,
});

const User = mongoose.model('user_data', user);

module.exports = User;