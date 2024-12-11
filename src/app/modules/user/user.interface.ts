export type TUser = {
  name: string;
  email: string;
  role: 'admin' | 'user';
  image: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};
