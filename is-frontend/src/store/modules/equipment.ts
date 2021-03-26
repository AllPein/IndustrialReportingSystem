import { IReduxState } from './index';
import { Cell, CellResponse } from '../../models/Cell';
import { fetchAllCells } from '../../api/cells';
import { Equipment, EquipmentResponse } from '../../models/Equipment';
import { addEquipment, fetchAllEquipment, updateEquipment } from '../../api/equipment';
import { Item } from '../../models/Item';
import { updateItem } from '../../api/items';
import { fetchItems } from './items';
import { setShowModal } from './modal';

enum ACTIONS {
  REQUEST_DATA = 'EQUIPMENT/REQUEST_DATA',
  RECEIVE_DATA = 'EQUIPMENT/RECEIVE_DATA',
  REJECT_DATA = 'EQUIPMENT/REJECT_DATA',
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.REQUEST_DATA, undefined>
  | GAction<ACTIONS.REJECT_DATA, string>
  | GAction<ACTIONS.RECEIVE_DATA, EquipmentResponse>

interface IEquipmentState {
  equipment: Array<Equipment>;
  loading: boolean;
  error: string | null
}

const initialState: IEquipmentState = {
  equipment: [],
  loading: false,
  error: null
};

export const addNewEquipment = (equipment: Partial<Equipment>) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    await addEquipment(equipment);
    dispatch(fetchEquipment());
    dispatch(setShowModal(false));
  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    })
  }
}

export const fetchEquipment = () => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    const equipment = await fetchAllEquipment();
    if (!!equipment) {
      dispatch({
        type: ACTIONS.RECEIVE_DATA,
        payload: equipment
      });
    }

  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    })
  }

}

export const addItemToEquipment = (item: Partial<Item>) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    const response = await updateItem([item]);
    if (!!response) {
      await dispatch(fetchItems());
      await dispatch(fetchEquipment());
    }

  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA,
      payload: err
    });
  }
}

export const updateAllEquipment = (equipment: Partial<Equipment>[]) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.REQUEST_DATA
  });

  try {
    const data = await updateEquipment(equipment);
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


export default (
  state: IEquipmentState = initialState,
  action: Action
): IEquipmentState => {
  switch (action.type) {
    case ACTIONS.REQUEST_DATA:
      return { ...state, loading: true };
    case ACTIONS.REJECT_DATA:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.RECEIVE_DATA:
      return {
        ...state,
        equipment: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};


export const equipmentSelector = (state: IReduxState) => state.equipment.equipment;
export const loadingSelector = (state: IReduxState) => state.cells.loading;
export const errorSelector = (state: IReduxState) => state.equipment.error;