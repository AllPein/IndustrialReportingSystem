import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LOGIN, HOME } from '../constants/routes';
import Login from '../pages/Login';
import Home from '../pages/Main';


const Router: React.FC = () => (
  <Switch>
    <Route path={LOGIN} component={Login} />
    <Route path={HOME} component={Home} />
  </Switch>
);

export default Router;