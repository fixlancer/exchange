import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import homeReducer from '../reducers/homeReducer';
import bonusReducer from '../reducers/bonusReducer';
import newsReducer from '../reducers/newsReducer';
import userReducer from '../reducers/userReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {useDispatch} from 'react-redux';
import getTransaction from '../reducers/transactionReducer';
import settingReducer from '../reducers/settingReducer';
import notifcationReducer from '../reducers/notificationReducer';
import cardReducer from '../reducers/cardReducer';
import tradeReducer from '../reducers/tradeReducer';
import statsReducer from '../reducers/statsReducer';
import tradecounterReducer from '../reducers/tradecounterReducer';
import topratesReducer from '../reducers/toprateReducer';


const rootReducer = combineReducers({
  authReducer,
  homeReducer,
  bonusReducer,
  newsReducer,
  userReducer,
  getTransaction,
  settingReducer,
  notifcationReducer,
  cardReducer,
  tradeReducer,
  statsReducer,
  tradecounterReducer,
  topratesReducer,
});
let middleware = [logger, thunk];

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
