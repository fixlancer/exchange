import { ActionTypes } from '../constants';

const initialState = {
  cards: [],
  card: [],
  tradeData : [],
  disableStatus  : null,
  cardIDdata : null,
  codes : null,
  getcodes : null,
  delete_all_giftcards : null,
  delete_admin_card : null,
  list : null,
  our_rate : null,
  
};
function cardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_CARDS:
      return { ...state, cards: payload };
    case ActionTypes.ADD_CARD:
      return { ...state, card: [...state.cards, payload] };
    case ActionTypes.GET_CARD:
      return { ...state };
    case ActionTypes.UPDATE_CARD:
      return { ...state };

      case ActionTypes.GET_TRADE:
      return { ...state, tradeData : payload };

      case ActionTypes.UPDATE_DISABLESTATUS : 
      return{...state, disableStatus : payload};


      case ActionTypes.GET_CARDSID:
        return {...state, cardIDdata : payload };

        case ActionTypes.ADDCODES:
          return {...state, codes: payload };


          case ActionTypes.GETCODES:
            return {...state, getcodes: payload };


            case ActionTypes.DELETE_GIFTCARDS :
          return {...state, delete_all_giftcards: payload };

          case ActionTypes.DELETE_ADMINCARD : 
          return {...state, delete_admin_card: payload };

         case ActionTypes.GET_GIFTCARDBYID:
          return{...state, list : payload}; 

          case ActionTypes.GET_OUR_RATE:
            return{...state, our_rate : payload}
    default:
      return state;
  }
}
export default cardReducer;
