import { Request } from 'express';
import { TUser } from '../user/user.interface';

export interface AuthenticatedRequest extends Request {
  user?: TUser;
}
