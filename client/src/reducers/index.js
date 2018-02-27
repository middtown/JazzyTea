import { combineReducers } from 'redux';
import teas from './tea_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({ teas, user });

export default rootReducer;
