const initialState = {
  data:[],
  loading: false
};

const tradeDataReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'START_LOADING_TRADES':
      return {
        ...state,
        loading: true
      }
    case "GET_TRADES_DATA":
      return {
        ...state,
        data: action.data,
        loading: action.loading
      }
    default:
      return state;
  }  
}

export default tradeDataReducer;