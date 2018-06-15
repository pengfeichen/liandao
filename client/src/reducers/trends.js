const initialState = {
  options: {},
  data: {},
  related: {},
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
      };
    case 'GET_TRENDS_RELATED':
      return {
        ...state,
        related: action.related
      }
    default:
      return state;
  }
}

export default trendsReducer;