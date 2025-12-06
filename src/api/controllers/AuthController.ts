import { Router } from 'express';
import { ApiResponse } from '../responses/ApiResponse';
import { AuthService } from '../../application/services/AuthService';
import { authGuard } from '../middleware/authGuard';
import { verifyToken, signToken } from '../../infrastructure/auth/jwt';
import { env } from '../../config/env';
import { SignOptions } from 'jsonwebtoken';

const router = Router();
const authService = new AuthService();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };
  const success = await authService.registerAsync(name, email, password);

  if (success) {
    return res.status(200).json(new ApiResponse<boolean>(true, 'User registered successfully', success));
  } else {
    return res.status(400).json(new ApiResponse<boolean>(false, 'User already exists', success));
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const tokens = await authService.loginAsync(email, password);

  if (!tokens) {
    return res.status(401).json(new ApiResponse<string>(false, 'Invalid credentials'));
  }

  // Access token cookie
  res.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: true,       // only over HTTPS
    sameSite: 'strict',
    maxAge: 1000 * 60 * 15 // 15 minutes
  });

  // Refresh token cookie
  res.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });

  return res.status(200).json(new ApiResponse<string>(true, 'Login successful'));
});

// Me
router.get('/me', authGuard, async (req, res) => {
  const user = (req as any).user; // set by authGuard
  return res.status(200).json(
    new ApiResponse(true, 'Authenticated user retrieved successfully', {
      id: user.sub,
      email: user.email
    })
  );
});

// Refresh
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies['refresh_token'];
  if (!refreshToken) {
    return res.status(401).json(new ApiResponse(false, 'No refresh token'));
  }

  const payload = verifyToken(refreshToken);
  if (!payload || payload.type !== 'refresh') {
    return res.status(401).json(new ApiResponse(false, 'Invalid refresh token'));
  }

  // Issue new access token
  const newAccessToken = signToken(
    { sub: payload.sub, email: payload.email, type: 'access' },
    env.jwt.accessExpiresIn as SignOptions['expiresIn']
  );

  res.cookie('access_token', newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 15
  });

  return res.status(200).json(new ApiResponse(true, 'Access token refreshed'));
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  return res.status(200).json(new ApiResponse(true, 'Logged out successfully'));
});

export default router;
