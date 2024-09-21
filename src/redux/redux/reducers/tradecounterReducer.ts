import { ActionTypes } from '../constants';

const initialState = {
  
  trade_counters : null, 
  
};
function tradecounterReducer(state = initialState, { type, payload }) {
  switch (type) {
    
      case ActionTypes.GET_TRADECOUNTER:
        return { ...state, trade_counters : payload };

    default:
      return state;
  }
}
export default tradecounterReducer;
