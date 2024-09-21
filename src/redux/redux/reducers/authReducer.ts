import { ActionTypes } from '../constants';

const initialState = {
  users: null,
  bankDetail:null

};
function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.LOGIN_USER:
      return { ...state, users: payload };
    case ActionTypes.REGISTER_USER:
      return { ...state, users: payload };
    case ActionTypes.GET_USER_DETAILS:
      return { ...state, users: payload };
    case ActionTypes.EDIT_USER_DETAILS:
      return { ...state, users: payload };
    case ActionTypes.UPDATE_BANK_DETAILS:
      return { ...state, bankDetail: payload };
    default:
      return state;
  }
}
export default authReducer;
