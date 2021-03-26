import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import * as UI from './styles';
import { login, loadingSelector, errorSelector } from '../../store/modules/auth/login';
import { loadingSelector as userLoadingSelector } from '../../store/modules/auth/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../UI/Typography';
import colors from '../../constants/colors';
import { openNotification } from '../../helpers/notification';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const userLoading = useSelector(userLoadingSelector);
  const error = useSelector(errorSelector);


  useEffect(() => {
    if (!!error) {
      openNotification('Ошибка авторизации', 'Неверно введет логин или пароль');
    }
  }, [error]);

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
          disabled={loading || userLoading}
          style={{ marginBottom: 16 }}
        />
        <Typography type="p2" color={colors.grey} styles={UI.LabelStyles}>Пароль</Typography>
        <Input
          placeholder='Заполните поле'
          value={passwordValue}
          onChange={handlePasswordChange}
          type='password'
          disabled={loading || userLoading}
        />
        <UI.ButtonWrapper>
          <Button
            block
            type='primary'
            disabled={loading || userLoading}
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
