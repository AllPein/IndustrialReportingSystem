import { IReduxState } from './index';
import { Cell, CellResponse } from '../../models/Cell';
import { fetchAllCells } from '../../api/cells';
import { Item } from '../../models/Item';
import { updateItem } from '../../api/items';
import { fetchItems } from './items';

enum ACTIONS {
  REQUEST_DATA = 'CELLS/REQUEST_DATA',
  RECEIVE_DATA = 'CELLS/RECEIVE_DATA',
  REJECT_DATA = 'CELLS/REJECT_DATA',
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.REQUEST_DATA, undefined>
  | GAction<ACTIONS.REJECT_DATA, string>
  | GAction<ACTIONS.RECEIVE_DATA, CellResponse>

interface ICellsState {
  cells: Array<Cell>;
  loading: boolean;
  error: string | null
}

const initialState: ICellsState = {
  cells: [],
  loading: false,
  error: null
};


export const fetchCells = () => async (dispatch: Function, getState: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    const cells = await fetchAllCells();
    if (!!cells) {
      dispatch({
        type: ACTIONS.RECEIVE_DATA,
        payload: cells
      });
    }

  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    })
  }
}

export const addItemToCell = (item: Partial<Item>) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    const response = await updateItem([item]);
    if (!!response) {
      await dispatch(fetchItems());
      await dispatch(fetchCells());
    }

  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    });
  }
}




export default (
  state: ICellsState = initialState,
  action: Action
): ICellsState => {
  switch (action.type) {
    case ACTIONS.REQUEST_DATA:
      return { ...state, loading: true };
    case ACTIONS.REJECT_DATA:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.RECEIVE_DATA:
      return {
        ...state,
        cells: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};


export const cellsSelector = (state: IReduxState) => state.cells.cells;
export const loadingSelector = (state: IReduxState) => state.cells.loading;