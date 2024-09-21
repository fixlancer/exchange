import {ActionTypes} from '../constants';

const initialState = {
  transaction_user : null,
  withdraw : null,
  get_withdraw : null,
  pending_withdrawals : null,
  airtime_payments : null,
  billers : null,
  cable_billers:null,
  cable_payments : null,
  bank_names : null,
  trans_count : null,
  pending_withdrawal_count_user : null,
  declined_withdrawal_count_user : null,
};
function getTransaction(state = initialState, {type, payload}) {
  switch (type) {

      case ActionTypes.GET_TRANSACTIONUSER:
        return {...state, transaction_user : payload};


        case ActionTypes.CREATEWITH_DRAW : 
        return{...state, withdraw : payload};

        case ActionTypes.GET_WITHDRAW :
          return{...state, get_withdraw : payload};


              case ActionTypes.GET_WITHDRAWAL_BY_ID:
                return{...state, pending_withdrawals : payload};

                case ActionTypes.AIR_TIME_DATA_PAYMENTS:
                  return{...state, airtime_payments : payload};

                  case ActionTypes.GET_BILLERS:
                    return{...state, billers : payload}; 

                    case ActionTypes.GET_CABLE_BILLERS:
                      return{...state, cable_billers : payload}; 

                      case ActionTypes.DSTV_GOTV_PAYMENTS:
                        return{...state, cable_payments : payload}; 

                        case ActionTypes.BANK_NAMES:
                          return{...state, bank_names : payload}; 

                          case ActionTypes.GET_TRANSCOUNT:
                            return {...state, trans_count : payload};

                            case ActionTypes.GET_PENDING_WITHDRAWAL_COUNT_USER:
                            return {...state, pending_withdrawal_count_user : payload};

                            case ActionTypes.GET_DECLINED_WITHDRAWAL_COUNT_USER:
                            return {...state, declined_withdrawal_count_user : payload};
                     
        
    default:
      return state;
  }
}
export default getTransaction;
