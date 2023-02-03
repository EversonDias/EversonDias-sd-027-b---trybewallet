import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import currencies from './currencies';

const rootReducers = combineReducers({
  currencies,
  user,
  wallet,
});

export default rootReducers;
