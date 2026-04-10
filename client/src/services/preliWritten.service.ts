import api from '@/lib/axios';

export interface PreliWrittenItem {
  _id: string;
  headline: string;
  content?: string;
  isActive: boolean;
  createdAt: string;
}

export interface PreliWrittenListResponse {
  success: boolean;
  data: PreliWrittenItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreatePreliWrittenData {
  headline: string;
  content: string;
}

export const preliWrittenService = {
  // Public: get all headlines
  async getAll(page = 1, limit = 50): Promise<PreliWrittenListResponse> {
    const response = await api.get(`/preli-written?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Public: get single item with full content
  async getById(id: string): Promise<{ success: boolean; data: PreliWrittenItem }> {
    const response = await api.get(`/preli-written/${id}`);
    return response.data;
  },

  // Admin: get all (including inactive)
  async adminGetAll(page = 1, limit = 50): Promise<PreliWrittenListResponse> {
    const response = await api.get(`/admin/preli-written?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Admin: create new content
  async create(data: CreatePreliWrittenData): Promise<{ success: boolean; data: PreliWrittenItem }> {
    const response = await api.post('/admin/preli-written', data);
    return response.data;
  },

  // Admin: update content
  async update(id: string, data: CreatePreliWrittenData): Promise<{ success: boolean; data: PreliWrittenItem }> {
    const response = await api.put(`/admin/preli-written/${id}`, data);
    return response.data;
  },

  // Admin: delete (soft)
  async delete(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/admin/preli-written/${id}`);
    return response.data;
  },
};
