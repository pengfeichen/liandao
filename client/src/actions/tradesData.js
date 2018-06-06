import io from 'socket.io-client';
// import {getErrors} from '../actions/error';

// Get trades
// TODO: Handle failur cases
export const getTrades = () => dispatch => {
  const socket = io();
  socket.on('ticker', (data)=>{
    dispatch({
      type: 'GET_TRADES_DATA',
      data
    })
  })
}
