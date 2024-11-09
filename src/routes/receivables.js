const express = require('express');
const api = require('../utils/api');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await api.get('/receivables', { params: req.query });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const response = await api.post('/receivables', req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await api.get(`/receivables/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const response = await api.patch(`/receivables/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/send', async (req, res, next) => {
  try {
    const response = await api.post(`/receivables/${req.params.id}/send`, req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;