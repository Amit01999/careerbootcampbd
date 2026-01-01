import api from '@/lib/axios';
import { auth } from '@/lib/auth';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  education?: any;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  // Register new user
  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    const { accessToken, refreshToken, user } = response.data.data;

    auth.setTokens(accessToken, refreshToken);
    auth.setUser(user);

    return response.data;
  },

  // Login
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    const { accessToken, refreshToken, user } = response.data.data;

    auth.setTokens(accessToken, refreshToken);
    auth.setUser(user);

    return response.data;
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      auth.clearAuth();
    }
  },

  // Get current user
  async getMe() {
    const response = await api.get('/auth/me');
    const user = response.data.data;

    auth.setUser(user);

    return user;
  },

  // Update profile
  async updateProfile(data: UpdateProfileData) {
    const response = await api.put('/auth/profile', data);
    const user = response.data.data;

    auth.setUser(user);

    return user;
  },

  // Change password
  async changePassword(data: ChangePasswordData) {
    const response = await api.put('/auth/password', data);
    return response.data;
  },

  // Register FCM token for push notifications
  async registerFCMToken(fcmToken: string) {
    const response = await api.post('/auth/fcm-token', { fcmToken });
    return response.data;
  },
};
