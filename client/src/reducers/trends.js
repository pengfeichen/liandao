const initialState = {
  options: {},
  data: {},
  loading: false
}

const trendsReducer = (state=initialState, action) => {
  switch(action.type){
    case 'START_LOADING_TRENDS':
      return {
        ...state,
        loading: true
      }
    case 'GET_TRENDS':
      return {
        ...state,
        options: action.options,
        data: action.data,
        loading: action.loading
      }
    default:
      return state;
  }
}

export default trendsReducer;