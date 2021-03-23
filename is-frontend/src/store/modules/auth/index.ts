import { combineReducers } from 'redux';
import userInfo from "./userInfo";
import login from './login';

const reducers = combineReducers({
  login,
  userInfo
});


export default reducers;