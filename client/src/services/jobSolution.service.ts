import api from '@/lib/axios';

export interface JobSolutionQuestion {
  _id?: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface JobSolutionItem {
  _id: string;
  bankName: string;
  post: string;
  time?: string;
  mark?: number;
  totalQuestions?: number;
  content?: string;
  questions?: JobSolutionQuestion[];
  isActive: boolean;
  createdAt: string;
}

export interface JobSolutionListResponse {
  success: boolean;
  data: JobSolutionItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface CreateJobSolutionData {
  bankName: string;
  post: string;
  time?: string;
  mark?: number;
  totalQuestions?: number;
  content: string;
  questions?: JobSolutionQuestion[];
}

export const jobSolutionService = {
  async getAll(page = 1, limit = 50): Promise<JobSolutionListResponse> {
    const response = await api.get(`/job-solutions?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: string): Promise<{ success: boolean; data: JobSolutionItem }> {
    const response = await api.get(`/job-solutions/${id}`);
    return response.data;
  },

  async adminGetAll(page = 1, limit = 50): Promise<JobSolutionListResponse> {
    const response = await api.get(`/admin/job-solutions?page=${page}&limit=${limit}`);
    return response.data;
  },

  async create(data: CreateJobSolutionData): Promise<{ success: boolean; data: JobSolutionItem }> {
    const response = await api.post('/admin/job-solutions', data);
    return response.data;
  },

  async update(id: string, data: CreateJobSolutionData): Promise<{ success: boolean; data: JobSolutionItem }> {
    const response = await api.put(`/admin/job-solutions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/admin/job-solutions/${id}`);
    return response.data;
  },
};
