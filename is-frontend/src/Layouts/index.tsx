import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from '../router/index';
import { fetchUserInfo, authenticatedSelector } from '../store/modules/auth/userInfo';
import { setToken } from '../store/modules/auth/login';
import { useHistory } from 'react-router';
import { AxiosRequestConfig } from 'axios';
import { api } from '../api/index';

const Layout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authenticated = useSelector(authenticatedSelector);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!!token) {      
      dispatch(setToken(token));
      dispatch(fetchUserInfo(token));
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      history.replace('/');
    }
    else history.replace('/login');
  }, [authenticated]);

  return <Router />;


}

export default Layout;
