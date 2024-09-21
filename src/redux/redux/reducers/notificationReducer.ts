import {ActionTypes} from '../constants';

const initialState = {
  notifcation: null,
  get_notification : null,
};
function notifcationReducer(state = initialState, {type, payload}) {
  switch (type) {
    case ActionTypes.SEND_NOTIFICATION:
      return {...state, notifcation: payload};

      case ActionTypes.GET_NOTIFICATION:
        return{...state, get_notification : payload};
    default:
      return state;
  }
}
export default notifcationReducer;
