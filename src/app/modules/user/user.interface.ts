export type TUser = {
  name: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
};
