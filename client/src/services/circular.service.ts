import api from '@/lib/axios';

export interface CircularFilters {
  page?: number;
  limit?: number;
  bankName?: string;
  category?: string;
  division?: string;
  district?: string;
  priority?: string;
  search?: string;
}

export const circularService = {
  // Get all circulars
  async getCirculars(filters: CircularFilters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/circulars?${params.toString()}`);
    return response.data;
  },

  // Get single circular
  async getCircular(idOrSlug: string) {
    const response = await api.get(`/circulars/${idOrSlug}`);
    return response.data.data;
  },

  // Save/unsave circular
  async saveCircular(circularId: string) {
    const response = await api.post(`/circulars/${circularId}/save`);
    return response.data;
  },

  // Get saved circulars
  async getSavedCirculars() {
    const response = await api.get('/circulars/saved');
    return response.data.data;
  },
};
