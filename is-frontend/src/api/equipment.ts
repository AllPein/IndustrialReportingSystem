import { api } from './index';

export const fetchAllEquipment = async () => {
  const data = await api.get('/v1/equipment');

  return data.data;
}
