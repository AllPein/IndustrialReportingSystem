import { api } from './index';

export const login = async (username: string, password: string) => {
  const data = await api.post('/v1/auth/login', { username, password });

  return data.data.token;
}