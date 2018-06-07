const initialState = {
  options: {},
  data: {}
}

const trendsReducer = (state=initialState, action) => {
  switch(action.type){
    case 'GET_TRENDS':
      return {
        ...state,
        options: action.options,
        data: action.data
      }
    default:
      return state;
  }
}

export default trendsReducer;