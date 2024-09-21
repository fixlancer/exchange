import { ActionTypes } from '../constants';

const initialState = {
  userByID : [],
  change_pass : null,
  remove_fcm  : null,
  set_fcm : null,
  resolve_acc : null,
  reset_pass : null,
  verify_code : null,
  set_new_pass : null,
  user_status : null,
};
function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.EDIT_USER_ROLE:
      return { ...state, user: payload };

      case ActionTypes.GET_USER_BY_ID:
        return { ...state, userByID: payload };

        case ActionTypes.CHANGE_PASS:
          return {...state, change_pass : payload};

          case ActionTypes.REMOVE_FCM_TOKEN:
            return {...state, remove_fcm : payload};  

            case ActionTypes.SET_FCM_TOKEN:
              return {...state, set_fcm : payload};  

              case ActionTypes.RESOLVE_ACC:
              return {...state, resolve_acc : payload};  

              case ActionTypes.RESET_PASS:
              return {...state, reset_pass : payload};  
              case ActionTypes.VERIFY_CODE:
              return {...state, verify_code : payload};  

              case ActionTypes.SET_NEWPASS:
              return {...state, set_new_pass : payload};  
                
                case ActionTypes.GET_STATUS:
                  return{...state, user_status : payload};

    default:
      return state;
  }
}
export default userReducer;
