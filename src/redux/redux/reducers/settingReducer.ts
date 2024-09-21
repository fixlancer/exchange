import { ActionTypes } from '../constants';

const initialState = {
  setting: null,
  create_updatesetting : null,
  toggle : null,
};
function settingReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_SETTING:
      return { ...state, setting: payload };
    
      case ActionTypes.CREATE_UPDATESETTINGS:
    return{...state, create_updatesetting : payload};
    
    case ActionTypes.TOGGLE_SETTING :
      return{...state, toggle : payload};
    default:
      return state;
  }
}
export default settingReducer;
