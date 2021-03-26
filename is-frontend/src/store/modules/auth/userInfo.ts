import { IReduxState } from '../index';
import { UserResponse, User } from '../../../models/User';
import { fetchUserData } from '../../../api/userInfo';
import { api } from '../../../api/index';
import { fetchItems } from '../items';
import { fetchCells } from '../cells';
import { fetchEquipment } from '../equipment';
enum ACTIONS {
  RECEIVE_DATA = 'USERINFO/RECEIVE_DATA',
  REQUEST_DATA = 'USERINFO/REQUEST_DATA',
  REJECT_DATA = 'USERINFO/REJECT_DATA'
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.RECEIVE_DATA, UserResponse>
  | GAction<ACTIONS.REJECT_DATA, undefined>
  | GAction<ACTIONS.REQUEST_DATA, undefined>;

interface IUserState {
  data: User | null,
  authenticated: boolean,
  loading: boolean
}

const initialState: IUserState = {
  data: null,
  authenticated: false,
  loading: false
};

export const setUserInfo = (userInfo: object | null, authenticated: boolean) => ({
  type: ACTIONS.RECEIVE_DATA,
  payload: {
    userInfo,
    authenticated
  }
})

export const fetchUserInfo = (token: string) => async (dispatch: Function) => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  dispatch({ type: ACTIONS.REQUEST_DATA });

  try {
    const data = await fetchUserData(token);

    if (!!data) {
      dispatch(setUserInfo(data.data, true));
      dispatch(fetchItems());
      dispatch(fetchCells());
      dispatch(fetchEquipment());
    }
  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA
    })
  }
}


export default (
  state: IUserState = initialState,
  action: Action
): IUserState => {
  switch (action.type) {
    case ACTIONS.REQUEST_DATA:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.RECEIVE_DATA:
      return {
        ...state,
        data: action.payload.userInfo,
        loading: false,
        authenticated: action.payload.authenticated
      };
    case ACTIONS.REJECT_DATA:
      return {
        ...state,
        loading: false,
        authenticated: false
      };
    default:
      return { ...state };
  }
};

export const userSelector = (state: IReduxState) => state.user.userInfo.data;
export const authenticatedSelector = (state: IReduxState) => state.user.userInfo.authenticated;
export const loadingSelector = (state: IReduxState) => state.user.userInfo.loading;
export const roleSelector = (state: IReduxState) => state.user.userInfo?.data?.role;