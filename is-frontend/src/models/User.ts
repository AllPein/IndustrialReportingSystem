export interface User {
  username: string;
  id: string;
  role: string;
}

export type UserResponse = {
  userInfo: User;
  authenticated: boolean;
}