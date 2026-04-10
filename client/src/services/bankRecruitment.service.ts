import api from '@/lib/axios';

export interface BankRecruitmentItem {
  _id: string;
  bankLogoUrl: string;
  bankName: string;
  positionTitle: string;
  details?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface BankRecruitmentListResponse {
  success: boolean;
  data: BankRecruitmentItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean };
}

export const bankRecruitmentService = {
  async getAll(page = 1, limit = 50): Promise<BankRecruitmentListResponse> {
    const response = await api.get(`/bank-recruitments?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getById(id: string): Promise<{ success: boolean; data: BankRecruitmentItem }> {
    const response = await api.get(`/bank-recruitments/${id}`);
    return response.data;
  },

  async adminGetAll(page = 1, limit = 50): Promise<BankRecruitmentListResponse> {
    const response = await api.get(`/admin/bank-recruitments?page=${page}&limit=${limit}`);
    return response.data;
  },

  async create(data: { bankName: string; positionTitle: string; details: string; logoFile: File }) {
    const form = new FormData();
    form.append('bankName', data.bankName);
    form.append('positionTitle', data.positionTitle);
    form.append('details', data.details);
    form.append('logo', data.logoFile);

    const response = await api.post('/admin/bank-recruitments', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data as { success: boolean; data: BankRecruitmentItem };
  },

  async update(id: string, data: { bankName: string; positionTitle: string; details: string; logoFile?: File | null }) {
    const form = new FormData();
    form.append('bankName', data.bankName);
    form.append('positionTitle', data.positionTitle);
    form.append('details', data.details);
    if (data.logoFile) form.append('logo', data.logoFile);

    const response = await api.put(`/admin/bank-recruitments/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data as { success: boolean; data: BankRecruitmentItem };
  },

  async delete(id: string) {
    const response = await api.delete(`/admin/bank-recruitments/${id}`);
    return response.data as { success: boolean };
  },
};

