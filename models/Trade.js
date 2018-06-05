const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Trade Model Schema
const TradeSchema = new Schema({
  time: {
    type: Date,
    required: true
  },
  currencypair: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount:{
    type: Number,
    required: true
  }
})