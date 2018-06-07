import axios from 'axios';
import {getErrors} from '../actions/error';

// Get Google Trends
export const getTrends = options => dispatch => {
  axios
    .post('/api/trends', options)
    .then(res=> {
      dispatch({
        type: 'GET_TRENDS',
        options,
        data: res.data
      })
    })
}


