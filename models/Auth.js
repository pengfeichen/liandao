const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  loggedin :{
    type: Boolean,
    required: true,
    default: false
  },
  logins:[{
    time: {
      type: Date,
      default: Date.now
    }
  }]
})