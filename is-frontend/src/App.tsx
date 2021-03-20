import React from 'react';
import { Provider} from 'react-redux';
import createStore from './store/index';
import Layout from './Layouts/index';


const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
