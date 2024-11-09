const api = require('../utils/api');

const createPaymentLink = async (req, res) => {
  try {
    const response = await api.post('/payment_links', {
      payment_methods: ['sepa_credit', 'card'],
      recipient: {
        id: req.body.recipientId,
        type: req.body.recipientType || 'entity'
      },
      amount: req.body.amount,
      currency: req.body.currency,
      expires_at: req.body.expiresAt,
      return_url: req.body.returnUrl
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating payment link:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'Internal server error' }
    });
  }
};

const getPaymentLink = async (req, res) => {
  try {
    const response = await api.get(`/payment_links/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error getting payment link:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'Internal server error' }
    });
  }
};

const expirePaymentLink = async (req, res) => {
  try {
    const response = await api.post(`/payment_links/${req.params.id}/expire`);
    res.json(response.data);
  } catch (error) {
    console.error('Error expiring payment link:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'Internal server error' }
    });
  }
};

module.exports = {
  createPaymentLink,
  getPaymentLink,
  expirePaymentLink
};