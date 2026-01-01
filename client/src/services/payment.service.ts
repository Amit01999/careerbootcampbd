import api from '@/lib/axios';

export interface InitiatePaymentData {
  examId: string;
  paymentMethod?: 'bkash' | 'nagad' | 'rocket' | 'card' | 'dummy';
}

export const paymentService = {
  // Initiate payment
  async initiatePayment(data: InitiatePaymentData) {
    const response = await api.post('/payments/initiate', data);
    return response.data.data;
  },

  // Check payment status
  async checkPaymentStatus(transactionId: string) {
    const response = await api.get(`/payments/${transactionId}/status`);
    return response.data.data;
  },

  // Get my payments
  async getMyPayments(page = 1, limit = 20, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) params.append('status', status);

    const response = await api.get(`/payments/my-payments?${params.toString()}`);
    return response.data;
  },

  // Check if exam is purchased
  async checkExamPurchase(examId: string) {
    const response = await api.get(`/payments/check-purchase/${examId}`);
    return response.data.data.hasPurchased;
  },
};
