import api from '@/lib/axios';

export interface VivaPreparationItem {
  _id: string;
  headline: string;
  content?: string;
  isActive: boolean;
  createdAt: string;
}

export interface VivaPreparationListResponse {
  success: boolean;
  data: VivaPreparationItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateVivaPreparationData {
  headline: string;
  content: string;
}

export const vivaPreparationService = {
  async getAll(page = 1, limit = 50): Promise<VivaPreparationListResponse> {
    const response = await api.get(`/viva-preparation?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: string): Promise<{ success: boolean; data: VivaPreparationItem }> {
    const response = await api.get(`/viva-preparation/${id}`);
    return response.data;
  },

  async adminGetAll(page = 1, limit = 50): Promise<VivaPreparationListResponse> {
    const response = await api.get(`/admin/viva-preparation?page=${page}&limit=${limit}`);
    return response.data;
  },

  async create(data: CreateVivaPreparationData): Promise<{ success: boolean; data: VivaPreparationItem }> {
    const response = await api.post('/admin/viva-preparation', data);
    return response.data;
  },

  async update(id: string, data: CreateVivaPreparationData): Promise<{ success: boolean; data: VivaPreparationItem }> {
    const response = await api.put(`/admin/viva-preparation/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/admin/viva-preparation/${id}`);
    return response.data;
  },
};
