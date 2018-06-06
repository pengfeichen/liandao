const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Ticker Model Schema
const TickerSchema = new Schema({
  sequence: {
    type: Number,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  open_24h: {
    type: Number,
    required: true
  },
  volume_24h: {
    type: Number,
    required: true
  },
  low_24h: {
    type: Number,
    required: true
  },
  high_24h: {
        type: Number,
    required: true
  },
  volume_30d: {
        type: Number,
    required: true
  },
  best_bid: {
        type: Number,
    required: true
  },
  best_ask: {
        type: Number,
    required: true
  },
  side: {
    type: String
  },
  time:{
    type: Number,
    required: true
  },
  trade_id:{
    type: Number
  },
  last_size:{
    type: Number
  }

})

module.exports = Ticker = mongoose.model('tickers', TickerSchema);