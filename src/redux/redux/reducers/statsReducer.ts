import {ActionTypes} from '../constants';

const initialState = {
  user_stats : null,
  get_user_stats : null,
};
function statsReducer(state = initialState, {type, payload}) {
  switch (type) {
    case ActionTypes.UPDATE_USER_STATS:
      return {...state, user_stats: payload};

      case ActionTypes.GET_USER_STATS:
      return {...state, getstats: payload};

    default:
      return state;
  }
}
export default statsReducer;
