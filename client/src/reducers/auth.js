import isEmpty from '../validation/is-empty';

// Set initial state for authReducer
const authReducerDefaultState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state=authReducerDefaultState, action) => {
  switch(action.type){
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.decoded),
        user: action.decoded
      }
    default:
      return state
  }
}

export default authReducer;