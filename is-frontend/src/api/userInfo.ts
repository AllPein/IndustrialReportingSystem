import { api } from './index';

export const fetchUserData = async (token: string) => {
  const data = await api.get('/v1/user', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return data;
}