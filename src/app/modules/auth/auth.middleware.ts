/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { config } from '../../config';
import { User } from '../user/user.model';

const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messsage: "'Unauthorized: No token provided'" });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ messsage: "'user not found'" });
    }

    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ messsage: 'Unauthorized: User is not an admin' });
    }
    next();
  } catch (error: any) {
    next(error);
  }
};

const IsUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messsage: "'Unauthorized: No token provided'" });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ messsage: "'user not found'" });
    }

    // req.user = user;
    next();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { isAdmin, IsUser };
