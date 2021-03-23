import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from '../router/index';
import { fetchUserInfo, authenticatedSelector, userSelector } from '../store/modules/auth/userInfo';
import { logout, setToken } from '../store/modules/auth/login';
import { useHistory } from 'react-router';
import { AxiosRequestConfig } from 'axios';
import { api } from '../api/index';
import Header from '../components/Header';
import ModalsLayout from './Modals';

const Layout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authenticated = useSelector(authenticatedSelector);
  const userInfo = useSelector(userSelector);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!!token) {
      dispatch(setToken(token));
      dispatch(fetchUserInfo(token));
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    await history.push('/login');
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      history.replace('/');
    }
    else history.replace('/login');
  }, [authenticated]);

  return (
    <>
      {authenticated && <Header onLogout={handleLogout} username={userInfo?.username || ''} role={userInfo?.role || ''} />}
      <Router />
      <ModalsLayout />
    </>

  );


}

export default Layout;
