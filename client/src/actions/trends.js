import axios from 'axios';
import {getErrors} from '../actions/error';

// Get Google Trends
export const getTrends = options => dispatch => {
  dispatch({
    type: 'START_LOADING_TRENDS'
  })
  console.log('loading trends should be true')
  axios
    .post('/api/trends/time', options)
    .then(res=> {
      dispatch({
        type: 'GET_TRENDS',
        options,
        data: res.data,
        loading: false
      })
    })
    .catch(err=>dispatch(getErrors(err)))

    axios
      .post('/api/trends/related', options)
      .then(related=> {
        dispatch({
          type: 'GET_TRENDS_RELATED',
          options,
          related,
          loading: false
        })
      })
      .catch(err=>dispatch(getErrors(err)))
  }


