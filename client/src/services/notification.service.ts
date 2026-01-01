import api from '@/lib/axios';

export const notificationService = {
  // Get my notifications
  async getMyNotifications(page = 1, limit = 20, type?: string, isRead?: boolean) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (type) params.append('type', type);
    if (isRead !== undefined) params.append('isRead', isRead.toString());

    const response = await api.get(`/notifications?${params.toString()}`);
    return response.data;
  },

  // Get unread count
  async getUnreadCount() {
    const response = await api.get('/notifications/unread-count');
    return response.data.data.count;
  },

  // Mark as read
  async markAsRead(notificationId: string) {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data.data;
  },

  // Mark all as read
  async markAllAsRead() {
    const response = await api.patch('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  async deleteNotification(notificationId: string) {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};
