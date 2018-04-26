import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import accountReducer from './accountReducer';

export default combineReducers({
    accountState:accountReducer,
    routing: routerReducer
})