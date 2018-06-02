import axios from 'axios';

// Get trades
export const getTrades = (limit=50) => dispatch => {
  axios
    .get(`https://api.cryptowat.ch/markets/gdax/btcusd/trades?limit=${limit}`)
    .then(res => {
      dispatch({
        type: 'GET_TRADES',
        data: res.data.result
      })
    })
    .catch(err => {
      console.log(err)
    })
}