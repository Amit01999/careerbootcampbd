import api from '@/lib/axios';

export interface AdminUserRow {
  _id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  createdAt: string;
  role: 'student' | 'admin' | 'super_admin';
  isActive: boolean;
  isBlocked: boolean;
}

export interface UsersListResponse {
  success: boolean;
  data: AdminUserRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const userManagementService = {
  async getAll(params?: { page?: number; limit?: number; search?: string }) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    const search = params?.search?.trim();

    const qs = new URLSearchParams();
    qs.set('page', String(page));
    qs.set('limit', String(limit));
    if (search) qs.set('search', search);

    const response = await api.get(`/admin/users?${qs.toString()}`);
    return response.data as UsersListResponse;
  },
};

