const initialState = {};

const tradeDataReducer = (state=initialState, action) => {
  switch(action.type) {
    case "GET_TRADES":
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
}

export default tradeDataReducer;