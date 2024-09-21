import { ActionTypes } from '../constants';

const initialState = {
  news: null,
  add_news : null,
  delete_news:null,
};
function newsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_NEWS:
      return { ...state, news: payload };

      case ActionTypes.ADD_NEWS:
        return {...state,add_news : payload};

       case ActionTypes.DELETE_NEWS:
        return { ...state, delete_news: payload };

    default:
      return state;
  }
}
export default newsReducer;
