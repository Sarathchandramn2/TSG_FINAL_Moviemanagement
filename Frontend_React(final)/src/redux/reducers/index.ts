import { combineReducers } from 'redux';
import commonReducer from './common';
import userReducer from './user';

const RootReducer: any = combineReducers({
    common: commonReducer,
    user:userReducer,
});

export default RootReducer;
