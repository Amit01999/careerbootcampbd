import api from '@/lib/axios';

export const adminService = {
  // Dashboard Stats
  async getDashboardStats(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(`/admin/dashboard/stats?${params.toString()}`);
    return response.data.data;
  },

  // Revenue Analytics
  async getRevenueAnalytics(period = '30') {
    const response = await api.get(`/admin/dashboard/revenue?period=${period}`);
    return response.data.data;
  },

  // User Analytics
  async getUserAnalytics(period = '30') {
    const response = await api.get(`/admin/dashboard/users?period=${period}`);
    return response.data.data;
  },

  // Exam Analytics
  async getExamAnalytics() {
    const response = await api.get('/admin/dashboard/exams');
    return response.data.data;
  },

  // Export Analytics
  async exportAnalytics(type: 'revenue' | 'users' | 'exams', startDate?: string, endDate?: string) {
    const params = new URLSearchParams({ type });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(`/admin/analytics/export?${params.toString()}`, {
      responseType: 'blob',
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}-report-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Question Management
  async uploadQuestionFile(formData: FormData) {
    const response = await api.post('/admin/questions/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  async getQuestionFiles(page = 1, limit = 20, processingStatus?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (processingStatus) params.append('processingStatus', processingStatus);

    const response = await api.get(`/admin/questions/files?${params.toString()}`);
    return response.data;
  },

  async getQuestionFile(fileId: string) {
    const response = await api.get(`/admin/questions/files/${fileId}`);
    return response.data.data;
  },

  async approveParsedQuestion(fileId: string, questionIndex: number) {
    const response = await api.put(`/admin/questions/files/${fileId}/approve/${questionIndex}`);
    return response.data.data;
  },

  async rejectParsedQuestion(fileId: string, questionIndex: number) {
    const response = await api.put(`/admin/questions/files/${fileId}/reject/${questionIndex}`);
    return response.data;
  },
};
