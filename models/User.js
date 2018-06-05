const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Model Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registrationdate: {
    type: Date,
    default: Date.now
  },
  logins:[{
    time: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = User = mongoose.model('users', UserSchema);