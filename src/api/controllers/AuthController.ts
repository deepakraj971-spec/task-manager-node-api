import { Router } from 'express';
import { ApiResponse } from '../responses/ApiResponse';
import { AuthService } from '../../application/services/AuthService';
import { authGuard } from '../middleware/authGuard';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  const { name,email, password } = req.body as { name : string, email: string; password: string };
  const success = await authService.registerAsync(name, email, password);

  if(success){
    return res.status(200).json(new ApiResponse<boolean>(true, 'User registered successfully', success));
  }else{
    return res.status(400).json(new ApiResponse<boolean>(false, 'User already exist', success))
    }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const token = await authService.loginAsync(email, password);

  if (!token) {
    return res.status(401).json(new ApiResponse<string>(false, 'Invalid credentials'));
  }

  // Set JWT in HttpOnly cookie
  res.cookie('access_token', token, {
  httpOnly: true,
  secure: true,       // only over HTTPS
  sameSite: 'strict', // lowercase
  maxAge: 1000 * 60 * 15 // 15 minutes
});

  return res.status(200).json(new ApiResponse<string>(true, 'Login successful'));
});

router.get('/me', authGuard, async (req, res) => {
  const user = (req as any).user; // set by authGuard
  return res.status(200).json(
    new ApiResponse(true, 'Authenticated user retrieved successfully', {
      id: user.sub,
      email: user.email
    })
  );
});

router.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  return res.status(200).json(new ApiResponse(true, 'Logged out successfully'));
});

export default router;
