import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LOGIN, HOME } from '../constants/routes';
import Login from '../components/Login';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={LOGIN} component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;