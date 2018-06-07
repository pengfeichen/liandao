const express = require('express');
const router = express.Router();
const axios = require('axios');
const googleTrends = require('google-trends-api');

// @route   POST api/trends/
// @dec     Get trends data
// @access  Public
router.post('/', (req, res) => {
  const { keyword } = req.body;
  const optionsObject = {
    keyword
  };

  googleTrends
    .interestOverTime(optionsObject)
    .then(function(results) {
      res.json(JSON.parse(results));
    })
    .catch(function(err) {
      console.error('Oh no there was an error', err);
      res.status(400).json({error: 'Something went wrong with Google Trends API'})
    });
});

module.exports = router;
