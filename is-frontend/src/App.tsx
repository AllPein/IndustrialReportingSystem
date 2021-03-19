import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/index';
import Router from './router/index';

const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
