import { IReduxState } from './index';
import { addItem, fetchAllItems, updateItems } from '../../api/items';
import { ItemsResponse } from '../../models/Item';
import { Item } from '../../models/Item';
import { setModalContent, setShowModal } from './modal';

enum ACTIONS {
  REQUEST_DATA = 'ITEMS/REQUEST_DATA',
  RECEIVE_DATA = 'ITEMS/RECEIVE_DATA',
  REJECT_DATA = 'ITEMS/REJECT_DATA',
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.REQUEST_DATA, undefined>
  | GAction<ACTIONS.REJECT_DATA, string>
  | GAction<ACTIONS.RECEIVE_DATA, ItemsResponse>

interface IItemsState {
  items: Array<Item>;
  loading: boolean;
  error: string | null
}

const initialState: IItemsState = {
  items: [],
  loading: false,
  error: null
};


export const fetchItems = () => async (dispatch: Function, getState: Function) => {
  const authenticated = getState().user.userInfo.authenticated;
  if (authenticated) {
    dispatch({
      type: ACTIONS.REQUEST_DATA
    });

    try {
      const items = await fetchAllItems();
      if (!!items) {
        dispatch({
          type: ACTIONS.RECEIVE_DATA,
          payload: items
        });
      }

    } catch (err) {
      dispatch({
        type: ACTIONS.REJECT_DATA,
        payload: err
      })
    }
  }
}

export const updateAllItems = (items: Partial<Item>[]) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    const data = await updateItems(items);
    if (!!data) {
      dispatch({
        type: ACTIONS.RECEIVE_DATA,
        payload: data
      });
    }

  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    })
  }
}

export const addNewItem = (data: any) => async (dispatch: Function) => {
  try {
    await addItem(data);
    dispatch(fetchItems());
    dispatch(setShowModal(false));
    dispatch(setModalContent(null));
  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    })
  }
}


export default (
  state: IItemsState = initialState,
  action: Action
): IItemsState => {
  switch (action.type) {
    case ACTIONS.REQUEST_DATA:
      return { ...state, loading: true };
    case ACTIONS.REJECT_DATA:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.RECEIVE_DATA:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};


export const itemsSelector = (state: IReduxState) => state.items.items;
export const loadingSelector = (state: IReduxState) => state.items.loading;