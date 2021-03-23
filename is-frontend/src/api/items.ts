import { Item } from '../models/Item';
import { api } from './index';

export const fetchAllItems = async () => {
  const data = await api.get('/v1/item');

  return data.data;
}

export const addItem = async (data: Partial<Item>) => {
  await api.post('/v1/item', data);
}

export const updateItems = async (data: Partial<Item>[]) => {
  const response = await api.patch('/v1/item', data);

  return response.data;
}