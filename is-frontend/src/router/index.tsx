import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LOGIN, HOME } from '../constants/routes';
import Login from '../components/Login';
import Home from '../components/Home';


const Router: React.FC = () => (
  <Switch>
    <Route path={LOGIN} component={Login} />
    <Route path={HOME} component={Home} />
  </Switch>
);

export default Router;