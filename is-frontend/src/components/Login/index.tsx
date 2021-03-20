import React, { useState, useCallback } from 'react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import * as UI from './styles';
import { login } from '../../store/modules/auth/login';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const handleLoginChange = (newValue: string): void => {
    setLoginValue(newValue);
  };

  const handlePasswordChange = (newValue: string): void => {
    setPasswordValue(newValue);
  };

  const handleLogin = useCallback(async () => {
    await dispatch(login(loginValue, passwordValue));
  }, [loginValue, passwordValue]);


  return (
    <UI.Wrapper>
      <UI.FormLogin>
        <Input
          label="Логин"
          placeholder='Заполните поле'
          value={loginValue}
          onChange={handleLoginChange}
        />
        <Input
          label="Пароль"
          placeholder='Заполните поле'
          value={passwordValue}
          onChange={handlePasswordChange}
          type='password'
        />
        <UI.ButtonWrapper>
          <Button onClick={handleLogin}>Войти</Button>
        </UI.ButtonWrapper>
      </UI.FormLogin>
    </UI.Wrapper>
  );
}

export default Login;
