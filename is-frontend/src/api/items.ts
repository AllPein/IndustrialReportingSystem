import { api } from './index';

export const fetchAllItems = async () => {
  const data = await api.get('/v1/item');

  return data.data;
}
