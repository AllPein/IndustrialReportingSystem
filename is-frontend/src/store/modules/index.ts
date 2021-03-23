import { combineReducers } from 'redux';
import user from './auth/index';
import items from './items';
import cells from './cells';
import equipment from './equipment';
import modal from './modal';

const reducers = combineReducers({
  user,
  cells,
  modal,
  equipment,
  items
});

export type IReduxState = ReturnType<typeof reducers>;

export default reducers;
