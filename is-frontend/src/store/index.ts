import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import modules from './modules/index';

export default () => configureStore({ reducer: modules, middleware: [thunk] });
