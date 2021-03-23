import { api } from './index';

export const findCountry = async (value: string) => {
  const data = await api.get(`/v1/country/${value}`);

  return data.data;
}
