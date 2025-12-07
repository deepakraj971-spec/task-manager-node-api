import { RequestHandler } from 'express';
import { ApiResponse } from '../responses/ApiResponse';
import { verifyToken } from '../../infrastructure/auth/jwt';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      email?: string;
    }
  }
}

export const authGuard: RequestHandler = (req, res, next) => {
  const token = req.cookies['access_token'];
  if (!token) return res.status(401).json(new ApiResponse(false, 'Unauthorized'));

  const payload = verifyToken(token,'access');
  if (!payload) return res.status(401).json(new ApiResponse(false, 'Invalid token'));
  
  (req as any).user = payload;
  req.userId = payload.sub;
  next();
};
