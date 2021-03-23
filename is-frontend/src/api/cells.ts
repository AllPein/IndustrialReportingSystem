import { Cell } from '../models/Cell';
import { api } from './index';

export const fetchAllCells = async () => {
  const data = await api.get('/v1/cell');

  return data.data;
}


export const updateCells = async (data: Partial<Cell>[]) => {
  const response = await api.patch('/v1/cell', data);

  return response.data;
}