const express = require('express');
const router = express.Router();
const axios = require('axios');

// Import db model
const Trade = require('../../models/Trade');

// @route   GET api/trades/
// @dec     Get trade data
// @access  Private
router.get('/candles/:productID', (req, res)=>{
  const productID = req.params.productID
  axios
  .get(`https://api.gdax.com/products/${productID}/candles`)
  .then(trades => {
    if(trades.statusText === 'OK'){
      res.json(trades.data)
    } else {
      res.status(400).json(trades.data)
    }
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;