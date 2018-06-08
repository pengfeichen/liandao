// import io from 'socket.io-client';
import axios from 'axios';
import {getErrors} from '../actions/error';

// Get trades past 300 trades, 1 per minute
// TODO: Handle failur cases
export const getTrades = (productID) => dispatch => {
  dispatch({
    type: 'START_LOADING_TRADES'
  })
  console.log('trades loading should be true')
  axios
    .get(`/api/trades/candles/${productID}`)
    .then(res=>{
      dispatch({
        type: 'GET_TRADES_DATA',
        data: res.data.slice(1,240).reverse(),
        loading: false
      })
    })
    .catch(err=>dispatch(getErrors(err)))
}

// // Get realtime tickers
// // TODO: Handle failur cases
// export const getTickers = () => dispatch => {
//   const socket = io();
//   socket.on('ticker', (data)=>{
//     dispatch({
//       type: 'GET_TRADES_DATA',
//       data
//     })
//   }) 
// }
