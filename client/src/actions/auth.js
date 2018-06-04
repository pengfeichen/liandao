import axios from 'axios';
import {getErrors} from '../actions/error';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// Register user
//TODO: catch server side validation errors and display before pushing to login page.
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res=>{
      // Save to localStorate
      const {token} = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push('/dashboard')
      })
    .catch(err => dispatch(getErrors(err.response.data)));
}

// Set logged in user;
export const setCurrentUser = decoded => ({
  type: 'SET_CURRENT_USER',
  decoded
})

// Log out user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header from future requests
  setAuthToken(false);
  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
