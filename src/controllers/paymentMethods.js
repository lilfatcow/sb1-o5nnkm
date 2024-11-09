const api = require('../utils/api');
const { validatePaymentMethodsRequest } = require('../validators/paymentMethods');

const getEnabledPaymentMethods = async (req, res) => {
  try {
    const { entityId } = req.params;

    if (!entityId) {
      return res.status(400).json({
        error: {
          message: 'Entity ID is required'
        }
      });
    }

    const response = await api.get(`/entities/${entityId}/payment_methods`);
    res.json(response.data);
  } catch (error) {
    console.error('Error getting payment methods:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { 
        message: 'Failed to retrieve payment methods',
        details: error.message
      }
    });
  }
};

const enablePaymentMethods = async (req, res) => {
  try {
    const { entityId } = req.params;
    const validation = validatePaymentMethodsRequest(req.body);

    if (!entityId) {
      return res.status(400).json({
        error: {
          message: 'Entity ID is required'
        }
      });
    }

    if (!validation.isValid) {
      return res.status(400).json({
        error: {
          message: 'Invalid request',
          details: validation.errors
        }
      });
    }

    const { payment_methods_receive, payment_methods_send } = req.body;
    
    const response = await api.put(`/entities/${entityId}/payment_methods`, {
      payment_methods_receive,
      payment_methods_send
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error enabling payment methods:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || {
        message: 'Failed to update payment methods',
        details: error.message
      }
    });
  }
};

module.exports = {
  getEnabledPaymentMethods,
  enablePaymentMethods
};