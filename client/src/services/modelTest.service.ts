import api from '@/lib/axios';

export interface ModelTestQuestion {
  _id?: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface ModelTestItem {
  _id: string;
  modelTestNo: string;
  post: string;
  time?: string;
  mark?: number;
  totalQuestions?: number;
  content?: string;
  questions?: ModelTestQuestion[];
  isActive: boolean;
  createdAt: string;
}

export interface ModelTestListResponse {
  success: boolean;
  data: ModelTestItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface CreateModelTestData {
  modelTestNo: string;
  post: string;
  time?: string;
  mark?: number;
  totalQuestions?: number;
  content: string;
  questions?: ModelTestQuestion[];
}

export const modelTestService = {
  async getAll(page = 1, limit = 50): Promise<ModelTestListResponse> {
    const res = await api.get(`/model-tests?page=${page}&limit=${limit}`);
    return res.data;
  },
  async getById(id: string): Promise<{ success: boolean; data: ModelTestItem }> {
    const res = await api.get(`/model-tests/${id}`);
    return res.data;
  },
  async adminGetAll(page = 1, limit = 50): Promise<ModelTestListResponse> {
    const res = await api.get(`/admin/model-tests?page=${page}&limit=${limit}`);
    return res.data;
  },
  async create(data: CreateModelTestData): Promise<{ success: boolean; data: ModelTestItem }> {
    const res = await api.post('/admin/model-tests', data);
    return res.data;
  },
  async update(id: string, data: CreateModelTestData): Promise<{ success: boolean; data: ModelTestItem }> {
    const res = await api.put(`/admin/model-tests/${id}`, data);
    return res.data;
  },
  async delete(id: string): Promise<{ success: boolean }> {
    const res = await api.delete(`/admin/model-tests/${id}`);
    return res.data;
  },
};
