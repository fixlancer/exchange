import {ActionTypes} from '../constants';

const initialState = {
  toprates : null,
};
function topratesReducer(state = initialState, {type, payload}) {
  switch (type) {
        case ActionTypes.GET_TOPRATE:
            return{...state,toprates:payload};
    default:
      return state;
  }
}
export default topratesReducer;
