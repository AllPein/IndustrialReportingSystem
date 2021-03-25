import { Equipment } from '../models/Equipment';
import { api } from './index';

export const fetchAllEquipment = async () => {
  const data = await api.get('/v1/equipment');

  return data.data;
}

export const updateEquipment = async (data: Partial<Equipment>[]) => {
  const response = await api.patch('/v1/equipment', data);

  return response.data;
}