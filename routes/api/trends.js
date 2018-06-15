const express = require('express');
const router = express.Router();
const googleTrends = require('google-trends-api');

// @route   POST api/trends/time
// @dec     Get trends data based on time
// @access  Public
router.post('/time', (req, res) => {
  const {
    keyword,
    startTime,
    endTime,
    geo,
    hl,
    timezone,
    category
  } = req.body;

  const optionsObject = {
    keyword,
    startTime: startTime && new Date(startTime * 1000),
    endTime: endTime && new Date(endTime * 1000),
    geo,
    hl,
    timezone,
    category,
    granularTimeResolution: true
  };

  googleTrends
    .interestOverTime(optionsObject)
    .then(function (results) {
      res.json(JSON.parse(results));
    })
    .catch(function (err) {
      console.error('Oh no there was an error', err);
      res.status(400).json({
        error: 'Something went wrong with Google Trends API'
      })
    });
});

// @route   POST api/trends/related
// @dec     Get related searches
// @access  Public
router.post('/related', (req, res) => {
  const {
    keyword,
    startTime,
    endTime,
    geo,
    hl,
    timezone,
    category
  } = req.body;
  const optionsObject = {
    keyword,
    startTime: startTime && new Date(startTime * 1000),
    endTime: endTime && new Date(endTime * 1000),
    geo,
    hl,
    timezone,
    category,
    granularTimeResolution: true
  };

  googleTrends.relatedQueries(optionsObject)
    .then(data => {
      res.json(JSON.parse(data))
    })
    .catch((err) => {
      console.log(err);
    })
})


module.exports = router;