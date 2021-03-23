import { combineReducers } from 'redux';
import user from './auth/index';
import items from './items';
import cells from './cells';
import equipment from './equipment';

const reducers = combineReducers({
  user,
  cells,
  equipment,
  items
});

export type IReduxState = ReturnType<typeof reducers>;

export default reducers;
