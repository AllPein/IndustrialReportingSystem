import { IReduxState } from './index';
import { Cell, CellResponse } from '../../models/Cell';
import { fetchAllCells } from '../../api/cells';

enum ACTIONS {
  SET_CONTENT = 'MODAL/REQUEST_DATA',
  SHOW_MODAL = 'MODAL/SHOW_MODAL',
  SET_TITLE = 'MODAL/SET_TITLE'
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.SET_CONTENT, JSX.Element>
  | GAction<ACTIONS.SHOW_MODAL, boolean>
  | GAction<ACTIONS.SET_TITLE, string>

interface IModalState {
  content: JSX.Element | null;
  showModal: boolean;
  title: string | null;
}

const initialState: IModalState = {
  content: null,
  title: null,
  showModal: false
};


export const setShowModal = (showModal: boolean) => (dispatch: Function) => {
  if (showModal === false) {
    dispatch(setModalContent(null));
  }
  
  dispatch({ type: ACTIONS.SHOW_MODAL, payload: showModal });
};
export const setModalTitle = (title: JSX.Element | null) => ({ type: ACTIONS.SET_TITLE, payload: title });
export const setModalContent = (content: JSX.Element | null) => ({ type: ACTIONS.SET_CONTENT, payload: content });

export default (
  state: IModalState = initialState,
  action: Action
): IModalState => {
  switch (action.type) {
    case ACTIONS.SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
    case ACTIONS.SET_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case ACTIONS.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return { ...state };
  }
};


export const showModalSelector = (state: IReduxState) => state.modal.showModal;
export const modalContentSelector = (state: IReduxState) => state.modal.content;
export const modalTitleSelector = (state: IReduxState) => state.modal.title;