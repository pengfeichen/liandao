import axios from 'axios';
import {getErrors} from '../actions/error';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch(getErrors(err.response.data)));
};