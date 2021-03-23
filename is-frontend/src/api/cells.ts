import { api } from './index';

export const fetchAllCells = async () => {
  const data = await api.get('/v1/cell');

  return data.data;
}
