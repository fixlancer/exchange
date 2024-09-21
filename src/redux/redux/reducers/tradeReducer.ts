import { ActionTypes } from '../constants';

const initialState = {
  
  tradeData : [],
  tradeDataID : [],
  update_data : null,
  update_trade_status : null,
  updateonretry : null,
  updateonswitch : null,
  new_trade: null,
  ongoing_count : null,
  completed_count : null,
};
function tradeReducer(state = initialState, { type, payload }) {
  switch (type) {
    

      case ActionTypes.GET_TRADE:
      return { ...state, tradeData : payload };

      case ActionTypes.GET_TRADE_ID:
        return{...state, tradeDataID : payload};
            case ActionTypes.UPDATE_TRADEDATA:
              return{...state, update_data : payload};


              case ActionTypes.UPDATE_TRADEDATASTATUS:
                return {...state,  update_trade_status : payload}


               case ActionTypes.UPDATE_ONRETRY : 
               return{...state,updateonretry : payload}

               case ActionTypes.UPDATE_ONSWITCH : 
               return{...state,updateonswitch : payload}

                case ActionTypes.CREATE_TRADE:
                  return{...state, getbytradeid: payload};

                  case ActionTypes.ONGOING__COUNT:
                    return{...state, ongoing_count: payload};

                    case ActionTypes.COMPLETED__COUNT:
                      return{...state, completed_count: payload};

    default:
      return state;
  }
}
export default tradeReducer;
