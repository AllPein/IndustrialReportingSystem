import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import * as UI from './styles';
import { login, loadingSelector, errorSelector } from '../../store/modules/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../UI/Typography';
import colors from '../../constants/colors';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const handleLoginChange = (event: any): void => {
    setLoginValue(event.target.value);
  };

  const handlePasswordChange = (event: any): void => {
    setPasswordValue(event.target.value);
  };

  const handleLogin = useCallback(async () => {
    await dispatch(login(loginValue, passwordValue));
  }, [loginValue, passwordValue]);


  return (
    <UI.Wrapper>
      <UI.FormLogin>
        <Typography type="p2" color={colors.grey} styles={UI.LabelStyles}>Логин</Typography>
        <Input
          placeholder='Заполните поле'
          value={loginValue}
          onChange={handleLoginChange}
          disabled={loading}
          style={{ marginBottom: 16 }}
        />
        <Typography type="p2" color={colors.grey} styles={UI.LabelStyles}>Пароль</Typography>
        <Input
          placeholder='Заполните поле'
          value={passwordValue}
          onChange={handlePasswordChange}
          type='password'
          disabled={loading}
        />
        <UI.ButtonWrapper>
          <Button
            block
            type='primary'
            disabled={loading}
            onClick={handleLogin}
          >
            Войти
          </Button>
        </UI.ButtonWrapper>
      </UI.FormLogin>
    </UI.Wrapper>
  );
}

export default Login;
