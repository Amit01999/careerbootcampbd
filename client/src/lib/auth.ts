/**
 * Authentication utility functions
 */

export const auth = {
  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  // Save tokens
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  // Save user data
  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get user data
  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin' || user?.role === 'super_admin';
  },

  // Clear all auth data
  clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
};
