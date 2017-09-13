import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import pin from './pinReducer';

export default combineReducers({
  routing: routerReducer,
  auth,
  pin
});