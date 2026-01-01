import logger from '../config/logger.js';
import { Payment } from '../models/index.js';

/**
 * Payment Adapter Interface
 * This allows easy swapping of payment providers (bKash, Nagad, etc.)
 */

class PaymentAdapter {
  constructor(provider) {
    this.provider = provider;
  }

  async createPayment(paymentData) {
    throw new Error('createPayment must be implemented');
  }

  async verifyPayment(transactionId) {
    throw new Error('verifyPayment must be implemented');
  }

  async refundPayment(transactionId, amount) {
    throw new Error('refundPayment must be implemented');
  }

  async handleWebhook(webhookData) {
    throw new Error('handleWebhook must be implemented');
  }
}

/**
 * Dummy Payment Provider for development/testing
 */
class DummyPaymentProvider extends PaymentAdapter {
  constructor() {
    super('dummy');
  }

  async createPayment(paymentData) {
    const { userId, examId, amount } = paymentData;

    logger.info(`[DUMMY] Creating payment for user ${userId}, exam ${examId}, amount ${amount}`);

    // Simulate payment creation
    const payment = await Payment.create({
      user: userId,
      exam: examId,
      amount,
      paymentMethod: 'dummy',
      status: 'pending',
      metadata: {
        examTitle: paymentData.examTitle,
        originalPrice: amount,
      },
    });

    // Generate a dummy payment URL
    const paymentUrl = `http://localhost:5000/api/v1/payments/dummy/${payment.transactionId}`;

    return {
      paymentId: payment._id,
      transactionId: payment.transactionId,
      paymentUrl,
      qrCode: null,
      message: 'Dummy payment created. Auto-confirm in 5 seconds.',
    };
  }

  async verifyPayment(transactionId) {
    logger.info(`[DUMMY] Verifying payment: ${transactionId}`);

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      throw new Error('Payment not found');
    }

    // Simulate random success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      await payment.markAsCompleted({
        provider: 'dummy',
        providerTransactionId: `DUMMY-${Date.now()}`,
        status: 'success',
      });

      return {
        success: true,
        transactionId,
        status: 'completed',
        message: 'Payment verified successfully',
      };
    }

    await payment.markAsFailed('Dummy payment failed (simulated)');

    return {
      success: false,
      transactionId,
      status: 'failed',
      message: 'Payment failed (simulated)',
    };
  }

  async refundPayment(transactionId, amount) {
    logger.info(`[DUMMY] Refunding payment: ${transactionId}, amount: ${amount}`);

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      throw new Error('Payment not found');
    }

    await payment.processRefund(amount, 'Dummy refund', null);

    return {
      success: true,
      refundId: `REF-${Date.now()}`,
      message: 'Refund processed successfully',
    };
  }

  async handleWebhook(webhookData) {
    logger.info('[DUMMY] Processing webhook:', webhookData);

    // Dummy webhook processing
    return {
      success: true,
      message: 'Webhook processed',
    };
  }
}

/**
 * bKash Payment Provider (Stub - to be implemented with actual API)
 */
class BkashPaymentProvider extends PaymentAdapter {
  constructor() {
    super('bkash');
    this.apiKey = process.env.BKASH_API_KEY;
    this.apiSecret = process.env.BKASH_API_SECRET;
    this.baseUrl = process.env.BKASH_BASE_URL || 'https://checkout.pay.bka.sh/v1.2.0-beta';
  }

  async createPayment(paymentData) {
    // TODO: Implement actual bKash API integration
    // Steps:
    // 1. Get bKash token
    // 2. Create payment
    // 3. Return payment URL and transaction ID
    throw new Error('bKash integration not implemented yet');
  }

  async verifyPayment(transactionId) {
    // TODO: Implement bKash payment verification
    throw new Error('bKash integration not implemented yet');
  }

  async refundPayment(transactionId, amount) {
    // TODO: Implement bKash refund
    throw new Error('bKash integration not implemented yet');
  }

  async handleWebhook(webhookData) {
    // TODO: Implement bKash webhook handling
    throw new Error('bKash integration not implemented yet');
  }
}

/**
 * Nagad Payment Provider (Stub - to be implemented with actual API)
 */
class NagadPaymentProvider extends PaymentAdapter {
  constructor() {
    super('nagad');
    this.merchantId = process.env.NAGAD_MERCHANT_ID;
    this.merchantKey = process.env.NAGAD_MERCHANT_KEY;
    this.baseUrl = process.env.NAGAD_BASE_URL || 'https://api.mynagad.com';
  }

  async createPayment(paymentData) {
    // TODO: Implement actual Nagad API integration
    throw new Error('Nagad integration not implemented yet');
  }

  async verifyPayment(transactionId) {
    // TODO: Implement Nagad payment verification
    throw new Error('Nagad integration not implemented yet');
  }

  async refundPayment(transactionId, amount) {
    // TODO: Implement Nagad refund
    throw new Error('Nagad integration not implemented yet');
  }

  async handleWebhook(webhookData) {
    // TODO: Implement Nagad webhook handling
    throw new Error('Nagad integration not implemented yet');
  }
}

/**
 * Payment Service Factory
 */
export const getPaymentProvider = (providerName = null) => {
  const provider = providerName || process.env.PAYMENT_PROVIDER || 'dummy';

  switch (provider.toLowerCase()) {
    case 'bkash':
      return new BkashPaymentProvider();
    case 'nagad':
      return new NagadPaymentProvider();
    case 'dummy':
    default:
      return new DummyPaymentProvider();
  }
};

export default {
  getPaymentProvider,
  DummyPaymentProvider,
  BkashPaymentProvider,
  NagadPaymentProvider,
};

/**
 * Helper function to initiate a payment
 */
export const initiatePayment = async (paymentData, providerName = null) => {
  const provider = getPaymentProvider(providerName);
  return await provider.createPayment(paymentData);
};

/**
 * Helper function to verify a payment
 */
export const verifyPayment = async (transactionId, providerName = null) => {
  const provider = getPaymentProvider(providerName);
  return await provider.verifyPayment(transactionId);
};

/**
 * Helper function to refund a payment
 */
export const refundPayment = async (transactionId, amount, providerName = null) => {
  const provider = getPaymentProvider(providerName);
  return await provider.refundPayment(transactionId, amount);
};

/**
 * Helper function to handle payment webhook
 */
export const handlePaymentWebhook = async (webhookData, providerName = null) => {
  const provider = getPaymentProvider(providerName);
  return await provider.handleWebhook(webhookData);
};
