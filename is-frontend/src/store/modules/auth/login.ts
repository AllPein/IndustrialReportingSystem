import { login as signIn } from '../../../api/login';
import { fetchUserInfo, setUserInfo } from './userInfo';
import { IReduxState } from '../index';
import { api } from '../../../api';


enum ACTIONS {
  REQUEST_LOGIN = 'LOGIN/REQUEST_LOGIN',
  RECEIVE_TOKEN = 'LOGIN/RECEIVE_TOKEN',
  REJECT_LOGIN = 'LOGIN/REJECT_LOGIN',
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.REJECT_LOGIN, string>
  | GAction<ACTIONS.REQUEST_LOGIN, undefined>
  | GAction<ACTIONS.RECEIVE_TOKEN, string>;

interface ILoginState {
  token: string | null,
  loading: boolean,
  error: string | null
}

const initialState: ILoginState = {
  token: null,
  loading: false,
  error: null
};

export const setToken = (token: string | null) => (dispatch: Function) => dispatch({
  type: ACTIONS.RECEIVE_TOKEN,
  payload: token
});

export const login = (username: string, password: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_LOGIN,
  })

  try {
    const token = await signIn(username, password);

    if (!!token) {
      dispatch(setToken(token));
      localStorage.setItem('token', token);
      await dispatch(fetchUserInfo(token));
    }
  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_LOGIN,
      payload: err
    })
  }
}

export const logout = () => async (dispatch: Function) => {
  dispatch(setToken(null));
  localStorage.removeItem('token');
  api.defaults.headers.common['Authorization'] = '';
  dispatch(setUserInfo(null, false));
}


export default (
  state: ILoginState = initialState,
  action: Action
): ILoginState => {
  switch (action.type) {
    case ACTIONS.REQUEST_LOGIN:
      return { ...state, loading: true };
    case ACTIONS.REJECT_LOGIN:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.RECEIVE_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
        error: null
      };
    default:
      return { ...state };
  }
};


export const loadingSelector = (state: IReduxState) => state.user.login.loading;
export const errorSelector = (state: IReduxState) => state.user.login.error;