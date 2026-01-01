import api from '@/lib/axios';

export interface ExamFilters {
  page?: number;
  limit?: number;
  examType?: string;
  category?: string;
  isFree?: boolean;
  search?: string;
}

export interface StartExamResponse {
  attemptId: string;
  exam: any;
  questions: any[];
  expiresAt: string;
}

export interface SaveProgressData {
  answers: any[];
}

export interface SubmitExamData {
  answers: any[];
}

export const examService = {
  // Get all exams
  async getExams(filters: ExamFilters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/exams?${params.toString()}`);
    return response.data;
  },

  // Get single exam
  async getExam(idOrSlug: string) {
    const response = await api.get(`/exams/${idOrSlug}`);
    return response.data.data;
  },

  // Get exam leaderboard
  async getLeaderboard(examId: string, page = 1, limit = 10) {
    const response = await api.get(`/exams/${examId}/leaderboard?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Start exam
  async startExam(examId: string): Promise<StartExamResponse> {
    const response = await api.post(`/exams/${examId}/start`);
    return response.data.data;
  },

  // Save progress (autosave)
  async saveProgress(attemptId: string, data: SaveProgressData) {
    const response = await api.put(`/exams/attempts/${attemptId}/save`, data);
    return response.data.data;
  },

  // Submit exam
  async submitExam(attemptId: string, data: SubmitExamData) {
    const response = await api.post(`/exams/attempts/${attemptId}/submit`, data);
    return response.data.data;
  },

  // Get attempt result
  async getAttemptResult(attemptId: string) {
    const response = await api.get(`/exams/attempts/${attemptId}/result`);
    return response.data.data;
  },

  // Get my attempts
  async getMyAttempts(page = 1, limit = 10, examId?: string, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (examId) params.append('examId', examId);
    if (status) params.append('status', status);

    const response = await api.get(`/exams/my-attempts?${params.toString()}`);
    return response.data;
  },

  // Get dashboard statistics
  async getDashboardStats() {
    const response = await api.get('/exams/dashboard/stats');
    return response.data.data;
  },
};
