import {ActionTypes} from '../constants';

const initialState = {
  bonus: null,
  display_bonus : null,
};
function bonusReducer(state = initialState, {type, payload}) {
  switch (type) {
    case ActionTypes.GET_BONUS_LIST:
      return {...state, bonus: payload};

    case ActionTypes.ADD_BONUS:
      return {...state};
    case ActionTypes.DELETE_BONUS:
      return {...state};

case ActionTypes.UPDATE_BONUS_STATUS:
  return{...state};

  case ActionTypes.DISPLAY_BONUS:
    return{...state, display_bonus : payload};


    default:
      return state;
  }
}
export default bonusReducer;
